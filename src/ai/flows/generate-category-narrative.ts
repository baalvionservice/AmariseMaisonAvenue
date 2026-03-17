'use server';
/**
 * @fileOverview A Genkit flow for generating immersive luxury category narratives.
 *
 * - generateCategoryNarrative - A function that handles the narrative generation process.
 * - GenerateCategoryNarrativeInput - The input type for the function.
 * - GenerateCategoryNarrativeOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCategoryNarrativeInputSchema = z.object({
  categoryName: z.string().describe('The name of the luxury department or category.'),
  subcategories: z.array(z.string()).describe('List of subcategories in this department.'),
});
export type GenerateCategoryNarrativeInput = z.infer<
  typeof GenerateCategoryNarrativeInputSchema
>;

const GenerateCategoryNarrativeOutputSchema = z.object({
  narrative: z.string().describe('The immersive luxury narrative for the category.'),
});
export type GenerateCategoryNarrativeOutput = z.infer<
  typeof GenerateCategoryNarrativeOutputSchema
>;

export async function generateCategoryNarrative(
  input: GenerateCategoryNarrativeInput
): Promise<GenerateCategoryNarrativeOutput> {
  return generateCategoryNarrativeFlow(input);
}

const categoryNarrativePrompt = ai.definePrompt({
  name: 'categoryNarrativePrompt',
  input: {schema: GenerateCategoryNarrativeInputSchema},
  output: {schema: GenerateCategoryNarrativeOutputSchema},
  prompt: `You are the lead editor for the AMARISÉ Journal.
Your task is to write a sophisticated, evocative, and brief introduction to a luxury product department.
The tone should be intellectual, exclusive, and highlight the craft associated with these items.

Category: {{{categoryName}}}
Includes: {{#each subcategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Write a single, powerful paragraph (approx 3-4 sentences) that defines the spirit of this department:`,
});

const generateCategoryNarrativeFlow = ai.defineFlow(
  {
    name: 'generateCategoryNarrativeFlow',
    inputSchema: GenerateCategoryNarrativeInputSchema,
    outputSchema: GenerateCategoryNarrativeOutputSchema,
  },
  async input => {
    const {output} = await categoryNarrativePrompt(input);
    return output!;
  }
);
