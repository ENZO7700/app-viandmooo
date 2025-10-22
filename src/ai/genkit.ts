
import { genkit, Ai } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// This is a workaround for a known issue with the Google AI plugin.
// It can be removed once the issue is resolved.
process.env.GRPC_DNS_RESOLVER = "native";

const plugins: any[] = [];
if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI({
    apiVersion: ['v1', 'v1beta']
  }));
}

export const ai: Ai = genkit({
  plugins,
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
