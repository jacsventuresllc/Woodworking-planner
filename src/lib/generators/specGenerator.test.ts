import { describe, it, expect } from 'vitest';
import { calculateBookshelf } from '../calculators/bookshelf';
import { generateBookshelfSpec, formatDimension } from './specGenerator';

describe('Spec Generator', () => {
  describe('generateBookshelfSpec', () => {
    it('should generate a complete specification for 72x36x12 bookshelf', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const calcSpec = calculateBookshelf(input);
      const spec = generateBookshelfSpec(calcSpec, 'Test Bookshelf');
      
      expect(spec.projectName).toBe('Test Bookshelf');
      expect(spec.projectType).toBe('bookshelf');
      expect(spec.overallDimensions.height).toBe(72);
      expect(spec.overallDimensions.width).toBe(36);
      expect(spec.overallDimensions.depth).toBe(12);
      expect(spec.shelfConfiguration.adjustableShelfCount).toBe(5);
      expect(spec.cutList.length).toBeGreaterThan(0);
      expect(spec.designAssumptions.length).toBeGreaterThan(0);
    });
    
    it('should organize parts into correct categories', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const calcSpec = calculateBookshelf(input);
      const spec = generateBookshelfSpec(calcSpec);
      
      expect(spec.partsList.fixedPanels.length).toBeGreaterThan(0);
      expect(spec.partsList.adjustableShelves.length).toBeGreaterThan(0);
      expect(spec.partsList.backPanel.length).toBe(1);
    });
    
    it('should include lumber hints', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        adjustableShelfCount: 5
      };
      
      const calcSpec = calculateBookshelf(input);
      const spec = generateBookshelfSpec(calcSpec);
      
      expect(spec.lumberHints).toBeDefined();
      expect(spec.lumberHints?.recommendedSheetQty).toBeGreaterThan(0);
    });
  });
  
  describe('formatDimension', () => {
    it('should format inches only', () => {
      expect(formatDimension(6)).toBe('6"');
      expect(formatDimension(11.75)).toBe('11.75"');
    });
    
    it('should format feet only', () => {
      expect(formatDimension(24)).toBe("2'");
      expect(formatDimension(72)).toBe("6'");
    });
    
    it('should format feet and inches', () => {
      expect(formatDimension(18)).toBe("1'6\"");
      expect(formatDimension(66)).toBe("5'6\"");
    });
  });
});