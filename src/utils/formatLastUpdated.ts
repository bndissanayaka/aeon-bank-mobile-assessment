export const formatLastUpdated = (timestamp: number): string => {
  return new Intl.DateTimeFormat('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};
