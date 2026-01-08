import { useAnalysis } from '@/context/AnalysisContext';

const API_URL = 'http://127.0.0.1:8000';

export function useCopilot() {
    const { analysis } = useAnalysis();

    const askCopilot = async (question: string): Promise<string> => {
        const res = await fetch(`${API_URL}/copilot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                context: analysis ?? {},
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Copilot API error:', errorText);
            throw new Error('Copilot request failed');
        }

        const data = await res.json();
        return data.answer;
    };

    return { askCopilot };
}
