'use server';
/**
 * @fileOverview A Genkit flow for generating mock product recommendations.
 *
 * - generateProductRecommendations - A function that handles the generation of product recommendations.
 * - GenerateProductRecommendationsInput - The input type for the generateProductRecommendations function.
 * - GenerateProductRecommendationsOutput - The return type for the generateProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductRecommendationsInputSchema = z.object({
  scenario: z
    .string()
    .describe(
      'A description of the user scenario or preferences for recommendations.'
    ),
  currentProductId:
    z.string().optional().describe('The ID of the product currently being viewed, if any.'),
});
export type GenerateProductRecommendationsInput = z.infer<
  typeof GenerateProductRecommendationsInputSchema
>;

const RecommendedProductSchema = z.object({
  id: z.string().describe('Unique identifier for the recommended product.'),
  name: z.string().describe('Name of the recommended product.'),
  description: z.string().describe('Brief description of the recommended product.'),
  price: z.number().describe('Mock price of the product.'),
  currency:
    z.string().describe('Currency of the mock price (e.g., "USD", "GBP", "AED").'),
  imageUrl: z.string().url().describe('URL to a mock image of the product.'),
  category: z.string().describe('Category of the recommended product.'),
});

const GenerateProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedProductSchema)
    .describe('A list of recommended products.'),
});
export type GenerateProductRecommendationsOutput = z.infer<
  typeof GenerateProductRecommendationsOutputSchema
>;

export async function generateProductRecommendations(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  return generateProductRecommendationsFlow(input);
}

const productRecommendationPrompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: GenerateProductRecommendationsInputSchema},
  output: {schema: GenerateProductRecommendationsOutputSchema},
  prompt: `You are an expert luxury product curator for AMARISÉ Luxe. Your task is to generate a list of personalized product recommendations based on the provided user scenario.

User Scenario: {{{scenario}}}
{{#if currentProductId}}
The user is currently viewing product with ID: {{{currentProductId}}}. Consider this in your recommendations.
{{/if}}

Please recommend 3-5 luxury products. Ensure the recommendations are diverse yet relevant to the scenario and fit the AMARISÉ Luxe brand. Provide a unique ID, a concise name, a brief description, a mock price (between 500 and 10000), a currency (USD, GBP, AED, INR, SGD), a placeholder image URL (e.g., 'https://via.placeholder.com/150/0D2678/FFFFFF?text=AMARISE'), and a category for each product.`,
});

const generateProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateProductRecommendationsFlow',
    inputSchema: GenerateProductRecommendationsInputSchema,
    outputSchema: GenerateProductRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await productRecommendationPrompt(input);
    return output!;
  }
);
