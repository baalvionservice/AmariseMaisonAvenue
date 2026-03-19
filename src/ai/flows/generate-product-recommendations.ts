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
  basePrice: z.number().describe('Mock base price of the product.'),
  currency:
    z.string().describe('Currency of the mock price (e.g., "USD", "GBP", "AED").'),
  imageUrl: z.string().url().describe('URL to a mock image of the product.'),
  category: z.string().describe('Category of the recommended product.'),
  departmentId: z.string().describe('The department ID (women, men, jewelry, watches).'),
  categoryId: z.string().describe('The category ID.'),
  subcategoryId: z.string().describe('The subcategory slug.'),
  isVip: z.boolean().describe('Whether it is a VIP artifact.'),
  rating: z.number().describe('Mock rating from 4.0 to 5.0.'),
  reviewsCount: z.number().describe('Mock review count.'),
});

const GenerateProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedProductSchema)
    .describe('A list of recommended products.'),
});
export type GenerateProductRecommendationsOutput = z.infer<
  typeof GenerateProductRecommendationsOutputSchema
>;

/**
 * Enhanced wrapper with fallback logic for quota resilience.
 */
export async function generateProductRecommendations(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  try {
    return await generateProductRecommendationsFlow(input);
  } catch (error) {
    console.warn("AI Recommendation Quota Exceeded or API Error. Returning curated fallback selection.");
    // Curated Fallback Selection for Maison Connoisseurs
    return {
      recommendations: [
        {
          id: 'fallback-1',
          name: 'Amarisé Heritage Silk Scarf',
          description: 'A masterpiece of hand-painted silk from our 1924 archive.',
          basePrice: 1200,
          currency: 'USD',
          imageUrl: 'https://picsum.photos/seed/amarise-fallback-1/800/800',
          category: 'Accessories',
          departmentId: 'women',
          categoryId: 'accessories',
          subcategoryId: 'silk-scarves',
          isVip: true,
          rating: 4.9,
          reviewsCount: 124
        },
        {
          id: 'fallback-2',
          name: 'Maison Grand Complication',
          description: 'A Swiss-engineered marvel with hand-polished heritage movements.',
          basePrice: 18500,
          currency: 'USD',
          imageUrl: 'https://picsum.photos/seed/amarise-fallback-2/800/800',
          category: 'Watches',
          departmentId: 'watches',
          categoryId: 'wa-complications',
          subcategoryId: 'tourbillons',
          isVip: true,
          rating: 5.0,
          reviewsCount: 18
        },
        {
          id: 'fallback-3',
          name: 'Nocturnal Allure Evening Gown',
          description: 'Sculpted from midnight velvet and reclaimed gold thread.',
          basePrice: 9400,
          currency: 'USD',
          imageUrl: 'https://picsum.photos/seed/amarise-fallback-3/800/800',
          category: 'Apparel',
          departmentId: 'women',
          categoryId: 'w-couture',
          subcategoryId: 'evening-gowns',
          isVip: false,
          rating: 4.8,
          reviewsCount: 42
        }
      ]
    };
  }
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

Please recommend 3-5 luxury products. Ensure the recommendations are diverse yet relevant to the scenario and fit the AMARISÉ Luxe brand. 

CRITICAL: You must provide the following fields exactly as named in the output schema:
- id: unique string starting with 'rec-'
- name: concise product name
- description: brief narrative
- basePrice: a number between 500 and 100000
- currency: USD, GBP, or AED
- imageUrl: https://picsum.photos/seed/<unique_id>/800/800
- category: human-readable category name
- departmentId: one of [women, men, jewelry, watches, accessories]
- categoryId: e.g., w-bags, j-high, wa-complications
- subcategoryId: slug-style subcategory
- isVip: boolean
- rating: number between 4.0 and 5.0
- reviewsCount: integer`,
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