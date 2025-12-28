import { getUrl } from "../../urlGetter";

const url = getUrl();

export const streamLLMResponse = async (message: string, onChunk: (text: string) => void) => {

    const response = await fetch(`${url}/message/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        
        onChunk(accumulatedText);
    }
};