
'use server';
/**
 * @fileOverview A Genkit flow for generating luxury marketing campaign copy.
 *
 * - generateCampaignCopy - A function that handles the copy generation process.
 * - GenerateCampaignCopyInput - The input type for the function.
 * - GenerateCampaignCopyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampaignCopyInputSchema = z.object({
  campaignType: z.enum(['email', 'push']).describe('The type of marketing campaign.'),
  productName: z.string().describe('The name of the featured product.'),
  category: z.string().describe('The luxury category.'),
  country: z.string().describe('The target market/country.'),
});
export type GenerateCampaignCopyInput = z.infer<typeof GenerateCampaignCopyInputSchema>;

const GenerateCampaignCopyOutputSchema = z.object({
  subjectLine: z.string().describe('An evocative, luxury-themed subject line.'),
  bodyText: z.string().describe('The core message or push body text.'),
});
export type GenerateCampaignCopyOutput = z.infer<typeof GenerateCampaignCopyOutputSchema>;

export async function generateCampaignCopy(
  input: GenerateCampaignCopyInput
): Promise<GenerateCampaignCopyOutput> {
  return generateCampaignCopyFlow(input);
}

const campaignCopyPrompt = ai.definePrompt({
  name: 'campaignCopyPrompt',
  input: {schema: GenerateCampaignCopyInputSchema},
  output: {schema: GenerateCampaignCopyOutputSchema},
  prompt: `You are the Global Marketing Director for AMARISÉ Luxe.
Your task is to write high-end marketing copy for a new campaign in the {{{country}}} market.
The tone must be exclusive, sophisticated, and evocative. Use vocabulary that suggests heritage, craft, and rarity.

Type: {{{campaignType}}}
Product: {{{productName}}} ({{{category}}})
Region: {{{country}}}

{{#if (eq campaignType "email")}}
Write a subject line that invites curiosity and a brief 2-sentence opening body.
{{else}}
Write a punchy, ultra-luxury push notification (max 120 chars).
{{/if}}`,
});

const generateCampaignCopyFlow = ai.defineFlow(
  {
    name: 'generateCampaignCopyFlow',
    inputSchema: GenerateCampaignCopyInputSchema,
    outputSchema: GenerateCampaignCopyOutputSchema,
  },
  async input => {
    const {output} = await campaignCopyPrompt(input);
    return output!;
  }
);
