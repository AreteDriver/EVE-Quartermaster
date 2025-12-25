/**
 * Utility functions for formatting data
 */

/**
 * Format ISK values with appropriate suffix (K, M, B)
 */
export const formatISK = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B ISK`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M ISK`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K ISK`;
  }
  return `${value.toFixed(2)} ISK`;
};

/**
 * Format time duration in seconds to human-readable format
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 24) {
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return remainingHours > 0
    ? `${days}d ${remainingHours}h`
    : `${days} day${days !== 1 ? 's' : ''}`;
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  
  return then.toLocaleDateString();
};

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format security status with color coding
 */
export const formatSecurityStatus = (secStatus: number): { text: string; color: string } => {
  const rounded = secStatus.toFixed(1);
  let color = '#ffffff';
  
  if (secStatus >= 0.5) {
    color = '#4CAF50'; // High sec - green
  } else if (secStatus > 0) {
    color = '#FFC107'; // Low sec - yellow
  } else {
    color = '#f44336'; // Null sec - red
  }

  return { text: rounded, color };
};

/**
 * Format percentage value
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};
