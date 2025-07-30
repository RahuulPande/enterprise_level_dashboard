/**
 * Utility function to get the application URL dynamically
 * Supports both development and production environments
 */
export const getAppUrl = (): string => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Check for environment variable
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
};

/**
 * Get the current URL with path
 */
export const getCurrentUrl = (path: string = ''): string => {
  const baseUrl = getAppUrl();
  return `${baseUrl}${path}`;
};

/**
 * Check if we're in production
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Get QR code URL for mobile access
 */
export const getQRCodeUrl = (): string => {
  return getCurrentUrl();
}; 