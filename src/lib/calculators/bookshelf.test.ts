import { describe, it, expect } from 'vitest';
import { calculateBookshelf, calculateGapHeight, validate72x36x12Example } from './bookshelf';

describe('Bookshelf Calculator', () => {
  describe('72" × 36" × 12" validation example', () => {
    it('should produce correct dimensions for 72×36×12 with 5 adjustable shelves', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const spec = calculateBookshelf(input);
      const validation = validate72x36x12Example(spec);
      
      if (!validation.valid) {
        console.error('Validation errors:', validation.errors);
      }
      
      expect(validation.valid, `Validation failed: ${validation.errors.join(', ')}`).toBe(true);
    });
    
    it('should calculate correct gap height', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const spec = calculateBookshelf(input);
      
      // Interior height = 72 - (2 × 0.75) = 70.5
      // Gap height = (70.5 - (5 × 0.75)) / 6 = 66.75 / 6 = 11.125
      expect(spec.gapHeight).toBeCloseTo(11.125, 3);
    });
    
    it('should include correct design assumptions', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const spec = calculateBookshelf(input);
      
      // Check that we have the expected number of assumptions
      expect(spec.designAssumptions.length).toBeGreaterThanOrEqual(9);
      expect(spec.designAssumptions).toContain('Full-overlay back panel (0.25" thickness)');
      expect(spec.designAssumptions).toContain('0.75" material thickness');
      expect(spec.designAssumptions).toContain('Butt-joint construction');
    });
    
    it('should calculate correct interior dimensions', () => {
      const input = {
        overallHeight: 72,
        overallWidth: 36,
        overallDepth: 12,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 5
      };
      
      const spec = calculateBookshelf(input);
      
      // Carcass depth = 12 - 0.25 = 11.75
      expect(spec.interiorDimensions.depth).toBe(11.75);
      // Interior width = 36 - (2 × 0.75) = 34.5
      expect(spec.interiorDimensions.width).toBe(34.5);
      // Interior height = 72 - (2 × 0.75) = 70.5
      expect(spec.interiorDimensions.height).toBe(70.5);
    });
  });
  
  describe('calculateGapHeight', () => {
    it('should calculate gap height with 0 shelves (just top and bottom)', () => {
      // With 0 shelves, gap is evenly distributed above and below
      const gapHeight = calculateGapHeight(70.5, 0, 0.75);
      // (70.5 - 0) / 1 = 70.5
      expect(gapHeight).toBe(70.5);
    });
    
    it('should calculate gap height with 1 shelf', () => {
      const gapHeight = calculateGapHeight(70.5, 1, 0.75);
      // (70.5 - 0.75) / 2 = 69.75 / 2 = 34.875
      expect(gapHeight).toBeCloseTo(34.875, 3);
    });
    
    it('should calculate gap height with 3 shelves', () => {
      const gapHeight = calculateGapHeight(70.5, 3, 0.75);
      // (70.5 - 2.25) / 4 = 68.25 / 4 = 17.0625
      expect(gapHeight).toBeCloseTo(17.0625, 3);
    });
  });
  
  describe('Edge cases', () => {
    it('should handle minimum size bookshelf', () => {
      const input = {
        overallHeight: 12,
        overallWidth: 12,
        overallDepth: 6,
        carcassThickness: 0.75,
        backPanelThickness: 0.25,
        adjustableShelfCount: 1
      };
      
      const spec = calculateBookshelf(input);
      
      expect(spec.parts.length).toBeGreaterThan(0);
      expect(spec.interiorDimensions.height).toBeGreaterThan(0);
    });
    
    it('should handle default thickness values', () => {
      const input = {
        overallHeight: 36,
        overallWidth: 24,
        overallDepth: 12,
        adjustableShelfCount: 2
      };
      
      const spec = calculateBookshelf(input);
      
      // Should use defaults: carcassThickness = 0.75, backPanelThickness = 0.25
      const sidePanel = spec.parts.find(p => p.name === 'Side Panel');
      expect(sidePanel?.thickness).toBe(0.75);
      
      const backPanel = spec.parts.find(p => p.name === 'Back Panel');
      expect(backPanel?.thickness).toBe(0.25);
    });
  });
});