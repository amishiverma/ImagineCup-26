import { createContext, useContext, useState, ReactNode } from "react";

export interface AnalysisData {
    total_returns: number;
    return_rate: number;
    return_rate_trend: number;
    fixes_applied: number;
    returns_avoided: number;
    categories: Record<string, number>;
    trends: { date: string; count: number }[];
    root_causes: any[];
}

interface AnalysisContextType {
    analysis: AnalysisData | null;
    setAnalysis: (data: AnalysisData) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

    return (
        <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis must be used within AnalysisProvider");
    }
    return context;
}
