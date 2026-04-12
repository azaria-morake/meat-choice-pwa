import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure dynamic data isn't stale if needed
});
