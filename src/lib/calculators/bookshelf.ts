/**
 * Bookshelf Calculator
 * 
 * Validated formulas for 72" × 36" × 12" bookshelf with 5 adjustable shelves:
 * - Top Panel: 36" × 11.75" × 3/4"
 * - Bottom Panel: 36" × 11.75" × 3/4"
 * - Side Panels: 70.5" × 11.75" × 3/4" (height = 72" - 2×0.75")
 * - Adjustable Shelves (5): 34.5" × 11.75" × 3/4" (width = 36" - 2×0.75")
 * - Back Panel: 36" × 72" × 1/4"
 */

export interface BookshelfInput {
  overallHeight: number;   // inches
  overallWidth: number;    // inches
  overallDepth: number;    // inches
  carcassThickness: number;  // inches (default 0.75")
  backPanelThickness: number; // inches (default 0.25")
  adjustableShelfCount: number;
  materialThickness?: number; // Same as carcassThickness for V1
}

export interface PanelPart {
  name: string;
  length: number;  // Primary dimension (width for horizontal panels, height for vertical)
  width: number;
  thickness: number;
  quantity: number;
  material: string;
  notes?: string;
}

export interface BookshelfSpec {
  inputs: BookshelfInput;
  parts: PanelPart[];
  designAssumptions: string[];
  interiorDimensions: {
    height: number;
    width: number;
    depth: number;
  };
  gapHeight: number; // Space between adjustable shelves
}

/**
 * Calculate shelf spacing accounting for adjustable shelf material thickness
 * 
 * Formula: Gap Height = (Interior Height - (n × shelf thickness)) / (n + 1)
 * Where n = number of adjustable shelves
 */
export function calculateGapHeight(interiorHeight: number, shelfCount: number, shelfThickness: number): number {
  const totalShelfMaterial = shelfCount * shelfThickness;
  const remainingForGaps = interiorHeight - totalShelfMaterial;
  const numberOfGaps = shelfCount + 1;
  return remainingForGaps / numberOfGaps;
}

/**
 * Calculate all parts for a bookshelf
 */
export function calculateBookshelf(input: BookshelfInput): BookshelfSpec {
  const { 
    overallHeight, 
    overallWidth, 
    overallDepth, 
    carcassThickness = 0.75,
    backPanelThickness = 0.25,
    adjustableShelfCount 
  } = input;

  // Use carcassThickness as material thickness if not specified
  const materialThickness = input.materialThickness ?? carcassThickness;
  
  // Carcass depth = overall depth - back panel thickness (back panel overlays rear)
  const carcassDepth = overallDepth - backPanelThickness;
  
  // Interior dimensions
  const interiorHeight = overallHeight - (2 * materialThickness);
  const interiorWidth = overallWidth - (2 * materialThickness);
  const interiorDepth = carcassDepth;
  
  // Gap height between adjustable shelves
  const gapHeight = calculateGapHeight(interiorHeight, adjustableShelfCount, materialThickness);
  
  const parts: PanelPart[] = [];
  
  // Top Panel - caps the sides, full width
  parts.push({
    name: 'Top Panel',
    length: overallWidth,
    width: carcassDepth,
    thickness: materialThickness,
    quantity: 1,
    material: 'Plywood',
    notes: 'Caps side panels, full width'
  });
  
  // Bottom Panel - caps the sides, full width
  parts.push({
    name: 'Bottom Panel',
    length: overallWidth,
    width: carcassDepth,
    thickness: materialThickness,
    quantity: 1,
    material: 'Plywood',
    notes: 'Caps side panels, full width'
  });
  
  // Side Panels - height = overall height - 2× material thickness (top/bottom cap)
  parts.push({
    name: 'Side Panel',
    length: overallHeight - (2 * materialThickness),
    width: carcassDepth,
    thickness: materialThickness,
    quantity: 2,
    material: 'Plywood',
    notes: 'Left and Right'
  });
  
  // Adjustable Shelves - width = overall width - 2× material thickness (sides)
  if (adjustableShelfCount > 0) {
    parts.push({
      name: 'Adjustable Shelf',
      length: overallWidth - (2 * materialThickness),
      width: carcassDepth,
      thickness: materialThickness,
      quantity: adjustableShelfCount,
      material: 'Plywood',
      notes: `User-specified: ${adjustableShelfCount}`
    });
  }
  
  // Back Panel - full overlay (covers entire rear)
  parts.push({
    name: 'Back Panel',
    length: overallWidth,
    width: overallHeight,
    thickness: backPanelThickness,
    quantity: 1,
    material: 'Plywood',
    notes: 'Full-overlay, attached to rear of carcass'
  });
  
  const designAssumptions = [
    `Fixed top panel (${materialThickness}" thickness)`,
    `Fixed bottom panel (${materialThickness}" thickness)`,
    `${adjustableShelfCount} adjustable shelf${adjustableShelfCount === 1 ? '' : 's'}`,
    `Full-overlay back panel (${backPanelThickness}" thickness)`,
    `${materialThickness}" material thickness`,
    'Butt-joint construction',
    'No face frame',
    'No dado joinery',
    'No rabbets'
  ];
  
  return {
    inputs: input,
    parts,
    designAssumptions,
    interiorDimensions: {
      height: interiorHeight,
      width: interiorWidth,
      depth: interiorDepth
    },
    gapHeight
  };
}

/**
 * Validate against the 72" × 36" × 12" example
 * Expected parts:
 * - Top Panel: 36" × 11.75" × 3/4"
 * - Bottom Panel: 36" × 11.75" × 3/4"
 * - Side Panels (2): 70.5" × 11.75" × 3/4"
 * - Adjustable Shelves (5): 34.5" × 11.75" × 3/4"
 * - Back Panel: 36" × 72" × 1/4"
 */
export function validate72x36x12Example(spec: BookshelfSpec): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Helper to find a part by name
  const findPart = (name: string) => spec.parts.find(p => p.name === name);
  
  // Top Panel
  const topPanel = findPart('Top Panel');
  if (!topPanel) {
    errors.push('Missing Top Panel');
  } else {
    if (topPanel.length !== 36) errors.push(`Top Panel length: expected 36, got ${topPanel.length}`);
    if (topPanel.width !== 11.75) errors.push(`Top Panel width: expected 11.75, got ${topPanel.width}`);
    if (topPanel.thickness !== 0.75) errors.push(`Top Panel thickness: expected 0.75, got ${topPanel.thickness}`);
    if (topPanel.quantity !== 1) errors.push(`Top Panel quantity: expected 1, got ${topPanel.quantity}`);
  }
  
  // Bottom Panel
  const bottomPanel = findPart('Bottom Panel');
  if (!bottomPanel) {
    errors.push('Missing Bottom Panel');
  } else {
    if (bottomPanel.length !== 36) errors.push(`Bottom Panel length: expected 36, got ${bottomPanel.length}`);
    if (bottomPanel.width !== 11.75) errors.push(`Bottom Panel width: expected 11.75, got ${bottomPanel.width}`);
    if (bottomPanel.thickness !== 0.75) errors.push(`Bottom Panel thickness: expected 0.75, got ${bottomPanel.thickness}`);
    if (bottomPanel.quantity !== 1) errors.push(`Bottom Panel quantity: expected 1, got ${bottomPanel.quantity}`);
  }
  
  // Side Panels
  const sidePanel = findPart('Side Panel');
  if (!sidePanel) {
    errors.push('Missing Side Panel');
  } else {
    if (sidePanel.length !== 70.5) errors.push(`Side Panel length: expected 70.5, got ${sidePanel.length}`);
    if (sidePanel.width !== 11.75) errors.push(`Side Panel width: expected 11.75, got ${sidePanel.width}`);
    if (sidePanel.thickness !== 0.75) errors.push(`Side Panel thickness: expected 0.75, got ${sidePanel.thickness}`);
    if (sidePanel.quantity !== 2) errors.push(`Side Panel quantity: expected 2, got ${sidePanel.quantity}`);
  }
  
  // Adjustable Shelves
  const adjustableShelf = findPart('Adjustable Shelf');
  if (!adjustableShelf) {
    errors.push('Missing Adjustable Shelf');
  } else {
    if (adjustableShelf.length !== 34.5) errors.push(`Adjustable Shelf length: expected 34.5, got ${adjustableShelf.length}`);
    if (adjustableShelf.width !== 11.75) errors.push(`Adjustable Shelf width: expected 11.75, got ${adjustableShelf.width}`);
    if (adjustableShelf.thickness !== 0.75) errors.push(`Adjustable Shelf thickness: expected 0.75, got ${adjustableShelf.thickness}`);
    if (adjustableShelf.quantity !== 5) errors.push(`Adjustable Shelf quantity: expected 5, got ${adjustableShelf.quantity}`);
  }
  
  // Back Panel
  const backPanel = findPart('Back Panel');
  if (!backPanel) {
    errors.push('Missing Back Panel');
  } else {
    if (backPanel.length !== 36) errors.push(`Back Panel length: expected 36, got ${backPanel.length}`);
    if (backPanel.width !== 72) errors.push(`Back Panel width: expected 72, got ${backPanel.width}`);
    if (backPanel.thickness !== 0.25) errors.push(`Back Panel thickness: expected 0.25, got ${backPanel.thickness}`);
    if (backPanel.quantity !== 1) errors.push(`Back Panel quantity: expected 1, got ${backPanel.quantity}`);
  }
  
  // Verify gap height
  // Interior height = 72 - 1.5 = 70.5
  // Gap height = (70.5 - (5 × 0.75)) / 6 = (70.5 - 3.75) / 6 = 66.75 / 6 = 11.125
  const expectedGapHeight = 11.125;
  if (Math.abs(spec.gapHeight - expectedGapHeight) > 0.001) {
    errors.push(`Gap height: expected ${expectedGapHeight}, got ${spec.gapHeight}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}