import { openai } from '@ai-sdk/openai';
import { generateText, tool } from 'ai';
import { calculateBookshelf } from '@/lib/calculators/bookshelf';
import { generateBookshelfSpec } from '@/lib/generators/specGenerator';

// Allow streaming responses
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are a woodworking design assistant helping users plan their bookshelf project.

Your task is to collect the required information to generate a bookshelf specification.

**CRITICAL - Panel Definitions:**
- The TOP PANEL is a fixed structural panel that caps the sides. It is NOT an adjustable shelf.
- The BOTTOM PANEL is a fixed structural panel that caps the sides. It is NOT an adjustable shelf.
- Adjustable shelves are the movable shelves the user can reposition.
- When a user says "5 shelves," they mean 5 ADJUSTABLE shelves, NOT including top and bottom.

**Required information you MUST collect (one at a time):**
1. Overall height (in inches)
2. Overall width (in inches)
3. Overall depth (in inches)
4. Number of adjustable shelves (how many shelves they want to adjust)
5. Material thickness (default is 3/4 inch if user doesn't specify)

**Dimension Conversion:**
- Convert natural language to inches: "6 feet" = 72 inches, "3 feet" = 36 inches, "a foot" = 12 inches
- "About", "roughly", "around" - treat as the stated value
- You may round to the nearest practical inch

**Your responsibilities:**
- Ask one question at a time in a friendly, conversational way
- Confirm each value with the user before moving on
- Once all 5 values are collected, summarize and ask for confirmation
- After user confirms, execute the calculateBookshelf tool to generate the specification

**What you MUST NOT do:**
- Do NOT generate BOMs, cut lists, or dimensions yourself
- Do NOT calculate shelf spacing or part dimensions
- Do NOT attempt to perform calculations
- ALWAYS use the calculateBookshelf tool for generation

**Shelf Clarification:**
- If a user says something ambiguous like "5 shelves", ask: "Do you mean 5 adjustable shelves in addition to the fixed top and bottom, or 5 total storage levels?"
- Clarify before proceeding

**When to trigger the tool:**
After you have collected all values AND the user has confirmed they are correct.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = generateText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages,
      maxSteps: 10,
      tools: {
        calculateBookshelf: tool({
          description: 'Calculate bookshelf parts, cut list, and project specifications based on user requirements. Use this tool to generate the complete project specification including parts, cut list, and lumber recommendations.',
          parameters: {
            type: 'object',
            properties: {
              overallHeight: {
                type: 'number',
                description: 'Overall height of the bookshelf in inches',
              },
              overallWidth: {
                type: 'number',
                description: 'Overall width of the bookshelf in inches',
              },
              overallDepth: {
                type: 'number',
                description: 'Overall depth of the bookshelf in inches',
              },
              adjustableShelfCount: {
                type: 'number',
                description: 'Number of adjustable shelves (NOT including fixed top and bottom panels)',
              },
              carcassThickness: {
                type: 'number',
                description: 'Material thickness in inches (default: 0.75)',
                default: 0.75,
              },
              backPanelThickness: {
                type: 'number',
                description: 'Back panel thickness in inches (default: 0.25)',
                default: 0.25,
              },
            },
            required: ['overallHeight', 'overallWidth', 'overallDepth', 'adjustableShelfCount'],
          },
          execute: async (params) => {
            // Call the calculator API logic directly
            const calcSpec = calculateBookshelf({
              overallHeight: params.overallHeight,
              overallWidth: params.overallWidth,
              overallDepth: params.overallDepth,
              carcassThickness: params.carcassThickness ?? 0.75,
              backPanelThickness: params.backPanelThickness ?? 0.25,
              adjustableShelfCount: params.adjustableShelfCount,
            });

            const projectSpec = generateBookshelfSpec(calcSpec, 'Custom Bookshelf');

            return {
              success: true,
              specification: projectSpec,
            };
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}