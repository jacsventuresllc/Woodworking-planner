import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/projects/[id] - Get single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT /api/projects/[id] - Update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  
  const project = await prisma.project.updateMany({
    where: { id, userId: session.user.id },
    data: {
      name: body.name,
      imageUrl: body.imageUrl,
      components: body.components ? JSON.stringify(body.components) : undefined,
      bom: body.bom ? JSON.stringify(body.bom) : undefined,
      cutList: body.cutList ? JSON.stringify(body.cutList) : undefined,
      instructions: body.instructions ? JSON.stringify(body.instructions) : undefined,
      skillLevel: body.skillLevel,
      kerfWidth: body.kerfWidth,
      status: body.status,
    },
  });

  if (project.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.project.findUnique({ where: { id } });
  return NextResponse.json(updated);
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await prisma.project.deleteMany({
    where: { id, userId: session.user.id },
  });

  if (project.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
