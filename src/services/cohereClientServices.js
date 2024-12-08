import { CohereClient } from "cohere-ai";

const apiKey = import.meta.env.VITE_APP_COHERE_API_KEY;

export const cohereClient = new CohereClient({
  token: import.meta.env.VITE_APP_COHERE_API_KEY,
});