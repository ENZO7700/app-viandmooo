
'use server';
/**
 * @fileOverview Flow to get related blog articles.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RelatedArticlesInputSchema = z.object({
  currentArticleContent: z.string().describe('The content of the current article, including title and summary.'),
  availableArticles: z.array(z.object({
    slug: z.string(),
    title: z.string(),
  })).describe('A list of other available articles to choose from.'),
});

const RelatedArticlesOutputSchema = z.array(z.string()).length(3).describe('An array of 3 slugs of the most related articles.');

export async function getRelatedArticles(input: z.infer<typeof RelatedArticlesInputSchema>): Promise<string[]> {
    return relatedArticlesFlow(input);
}

const relatedArticlesFlow = ai.defineFlow(
  {
    name: 'relatedArticlesFlow',
    inputSchema: RelatedArticlesInputSchema,
    outputSchema: RelatedArticlesOutputSchema,
  },
  async (input) => {
    const prompt = `
        You are a blog assistant. Based on the content of the current article, your task is to find the 3 most thematically related articles from the provided list.
        Return only an array of 3 slugs for the articles you have chosen as the most relevant. Do not include the current article in the recommendations.

        Current article content:
        """
        ${input.currentArticleContent}
        """

        List of available articles to choose from (title and slug):
        ${input.availableArticles.map(a => `- ${a.title} (slug: ${a.slug})`).join('\n')}

        Your response must be a JSON array of 3 strings, where each string is the slug of a recommended article. For example: ["slug-of-article-1", "slug-of-article-2", "slug-of-article-3"]
    `;

    const llmResponse = await ai.generate({
        // Note: Using a more capable model might yield better results for this kind of task.
        model: 'googleai/gemini-pro', 
        prompt: prompt,
        output: {
            schema: RelatedArticlesOutputSchema
        }
    });

    const output = llmResponse.output;

    if (!output) {
      throw new Error('AI did not return a valid list of related articles.');
    }

    return output;
  }
);
