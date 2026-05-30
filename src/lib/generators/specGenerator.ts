/**
 * Project Specification Generator
 * 
 * Transforms calculator output into a user-friendly project specification
 */

import { BookshelfSpec, PanelPart } from './bookshelf';

export interface ProjectSpecification {
  id?: string;
  projectName: string;
  projectType: 'bookshelf';
  createdAt?: string;
  
  // Overall dimensions
  overallDimensions: {
    height: number;
    width: number;
    depth: number;
    units: 'inches';
  };
  
  // Material specifications
  materials: {
    carcassThickness: number;
    backPanelThickness: number;
    defaultMaterial: string;
  };
  
  // Interior dimensions
  interiorDimensions: {
    height: number;
    width: number;
    depth: number;
  };
  
  // Shelf configuration
  shelfConfiguration: {
    adjustableShelfCount: number;
    gapHeight: number;
  };
  
  // Parts list organized by category
  partsList: {
    fixedPanels: PanelPart[];
    adjustableShelves: PanelPart[];
    backPanel: PanelPart[];
  };
  
  // Raw parts for cutting
  cutList: Array<{
    name: string;
    quantity: number;
    length: number;
    width: number;
    thickness: number;
    material: string;
    notes?: string;
  }>;
  
  // Design assumptions for display
  designAssumptions: string[];
  
  // Lumber purchasing hints (V1 - basic)
  lumberHints?: {
    recommendedSheetQty: number;
    estimatedWaste: string;
  };
}

/**
 * Generate a project specification from a bookshelf calculation
 */
export function generateBookshelfSpec(
  calcSpec: BookshelfSpec,
  projectName: string = 'My Bookshelf'
): ProjectSpecification {
  const { inputs, parts, designAssumptions, interiorDimensions, gapHeight } = calcSpec;
  
  // Organize parts by category
  const fixedPanels = parts.filter(p => 
    p.name === 'Top Panel' || p.name === 'Bottom Panel' || p.name === 'Side Panel'
  );
  
  const adjustableShelves = parts.filter(p => p.name === 'Adjustable Shelf');
  const backPanel = parts.filter(p => p.name === 'Back Panel');
  
  // Build cut list
  const cutList = parts.flatMap(part => 
    Array.from({ length: part.quantity }, (_, i) => ({
      name: part.quantity > 1 ? `${part.name} ${i + 1}` : part.name,
      quantity: 1,
      length: part.length,
      width: part.width,
      thickness: part.thickness,
      material: part.material,
      notes: part.notes
    }))
  );
  
  // Calculate lumber hints (rough V1 estimate)
  // For 72x36x12 with 5 shelves: ~2.5 sheets of 4x8 plywood
  const totalSquareInches = parts.reduce((sum, p) => sum + (p.length * p.width * p.quantity), 0);
  const sheetArea = 48 * 96; // 4x8 sheet in square inches
  const sheetsNeeded = Math.ceil(totalSquareInches / sheetArea * 1.4); // 40% waste buffer
  
  return {
    projectName,
    projectType: 'bookshelf',
    createdAt: new Date().toISOString(),
    
    overallDimensions: {
      height: inputs.overallHeight,
      width: inputs.overallWidth,
      depth: inputs.overallDepth,
      units: 'inches'
    },
    
    materials: {
      carcassThickness: inputs.carcassThickness,
      backPanelThickness: inputs.backPanelThickness,
      defaultMaterial: 'Plywood'
    },
    
    interiorDimensions,
    
    shelfConfiguration: {
      adjustableShelfCount: inputs.adjustableShelfCount,
      gapHeight: Math.round(gapHeight * 1000) / 1000 // Round to 3 decimal places
    },
    
    partsList: {
      fixedPanels,
      adjustableShelves,
      backPanel
    },
    
    cutList,
    
    designAssumptions,
    
    lumberHints: {
      recommendedSheetQty: sheetsNeeded,
      estimatedWaste: '~40% (rough estimate)'
    }
  };
}

/**
 * Format a dimension for display
 */
export function formatDimension(inches: number): string {
  // Convert to feet and inches if > 12 inches
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  
  if (feet === 0) {
    return `${remainingInches}"`;
  } else if (remainingInches === 0) {
    return `${feet}'`;
  } else {
    return `${feet}'${remainingInches}"`;
  }
}

/**
 * Format a part for display in the UI
 */
export function formatPart(part: {
  name: string;
  length: number;
  width: number;
  thickness: number;
  quantity: number;
}): string {
  return `${part.name} × ${part.quantity}: ${formatDimension(part.length)} × ${formatDimension(part.width)} × ${part.thickness}"`;
}