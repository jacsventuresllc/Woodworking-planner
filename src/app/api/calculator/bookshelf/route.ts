import { NextRequest, NextResponse } from 'next/server';
import { calculateBookshelf } from '@/lib/calculators/bookshelf';
import { generateBookshelfSpec } from '@/lib/generators/specGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { overallHeight, overallWidth, overallDepth, adjustableShelfCount } = body;
    
    if (!overallHeight || !overallWidth || !overallDepth || adjustableShelfCount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: overallHeight, overallWidth, overallDepth, adjustableShelfCount' },
        { status: 400 }
      );
    }
    
    // Optional fields with defaults
    const carcassThickness = body.carcassThickness ?? 0.75;
    const backPanelThickness = body.backPanelThickness ?? 0.25;
    const materialThickness = body.materialThickness ?? carcassThickness;
    const projectName = body.projectName ?? 'My Bookshelf';
    
    // Calculate the bookshelf specification
    const calcSpec = calculateBookshelf({
      overallHeight,
      overallWidth,
      overallDepth,
      carcassThickness,
      backPanelThickness,
      materialThickness,
      adjustableShelfCount
    });
    
    // Generate the project specification
    const projectSpec = generateBookshelfSpec(calcSpec, projectName);
    
    return NextResponse.json(projectSpec);
  } catch (error) {
    console.error('Calculator error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate bookshelf specification' },
      { status: 500 }
    );
  }
}

// GET request for testing/validation
export async function GET() {
  return NextResponse.json({
    message: 'Bookshelf Calculator API',
    methods: ['POST'],
    example: {
      overallHeight: 72,
      overallWidth: 36,
      overallDepth: 12,
      adjustableShelfCount: 5,
      carcassThickness: 0.75,
      backPanelThickness: 0.25,
      projectName: 'My Bookshelf'
    }
  });
}