// Vercel AI SDK Tool Definition for Bookshelf Calculator
// Used in the /api/chat route to enable native tool-calling

export const calculateBookshelfTool = {
  name: 'calculateBookshelf',
  description: 'Calculate bookshelf parts, cut list, and project specifications based on user requirements. Use this tool to generate the complete project specification including parts, cut list, and lumber recommendations.',
  parameters: {
    type: 'object',
    properties: {
      overallHeight: {
        type: 'number',
        description: 'Overall height of the bookshelf in inches (typical range: 24-84 inches)',
        minimum: 6,
        maximum: 96
      },
      overallWidth: {
        type: 'number',
        description: 'Overall width of the bookshelf in inches (typical range: 12-48 inches)',
        minimum: 6,
        maximum: 72
      },
      overallDepth: {
        type: 'number',
        description: 'Overall depth of the bookshelf in inches (typical range: 6-18 inches)',
        minimum: 4,
        maximum: 24
      },
      adjustableShelfCount: {
        type: 'number',
        description: 'Number of adjustable shelves. Does NOT include the fixed top and bottom panels - only the shelves the user wants to adjust. Typical range: 1-6',
        minimum: 0,
        maximum: 12
      },
      carcassThickness: {
        type: 'number',
        description: 'Material thickness in inches (default: 0.75 for 3/4 inch plywood)',
        minimum: 0.25,
        maximum: 1.5,
        default: 0.75
      },
      backPanelThickness: {
        type: 'number',
        description: 'Back panel thickness in inches (default: 0.25 for 1/4 inch plywood)',
        minimum: 0.125,
        maximum: 0.75,
        default: 0.25
      }
    },
    required: ['overallHeight', 'overallWidth', 'overallDepth', 'adjustableShelfCount']
  }
};

export type CalculateBookshelfInput = {
  overallHeight: number;
  overallWidth: number;
  overallDepth: number;
  adjustableShelfCount: number;
  carcassThickness?: number;
  backPanelThickness?: number;
};