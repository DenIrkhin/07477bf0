/**
 * Type-safe environment variables
 * In Vite, environment variables are exposed on the special import.meta.env object
 * Variables must be prefixed with VITE_ to be exposed to the client
 */

export const config = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  
  // Add other environment variables here as needed
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}

// Validate required environment variables
if (!config.apiUrl) {
  throw new Error('VITE_API_URL environment variable is required')
}
