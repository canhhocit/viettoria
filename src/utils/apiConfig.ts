const DEFAULT_API_BASE_URL = 'http://localhost:8081/api';

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
const baseWithoutTrailingSlash = (configuredBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, '')
  || DEFAULT_API_BASE_URL;

// Accept both https://host and https://host/api so Vercel env values cannot
// accidentally drop the API prefix or append it twice.
export const API_BASE_URL = /\/api$/i.test(baseWithoutTrailingSlash)
  ? baseWithoutTrailingSlash
  : `${baseWithoutTrailingSlash}/api`;

export const BACKEND_HOST = API_BASE_URL.replace(/\/api$/i, '');
