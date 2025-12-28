export function getUrlPort(): string {
  const host = import.meta.env.VITE_SERVER_HOST;
  const port = import.meta.env.VITE_SERVER_PORT;
  
  return `https://${host}:${port}`;
}

export function getUrl() : string {
    const host = import.meta.env.VITE_SERVER_HOST;

    return `https://${host}`;
}