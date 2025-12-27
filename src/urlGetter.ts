export function getUrl() : string{
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const serverPort = parseInt(import.meta.env.VITE_SERVER_PORT, 10);
    return `http://${serverHost}:${serverPort}/`;
}