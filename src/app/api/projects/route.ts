import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/projects - List all projects for current user
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(projects);
}

// POST /api/projects - Create new project
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, imageUrl, components, bom, cutList, instructions, skillLevel, kerfWidth } = body;

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      name: name || "New Project",
      imageUrl,
      components: components ? JSON.stringify(components) : null,
      bom: bom ? JSON.stringify(bom) : null,
      cutList: cutList ? JSON.stringify(cutList) : null,
      instructions: instructions ? JSON.stringify(instructions) : null,
      skillLevel: skillLevel || "beginner",
      kerfWidth: kerfWidth || 3.0,
      status: "draft",
    },
  });

  return NextResponse.json(project);
}
