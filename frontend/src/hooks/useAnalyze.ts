import { post } from "../lib/api";
import { useAnalysis, AnalysisData } from "../context/AnalysisContext";

export function useAnalyze() {
    const { setAnalysis } = useAnalysis();

    async function analyzeReturns(returns: any[]) {
        const res = await post<AnalysisData>("/analyze", { returns });
        setAnalysis(res);
        return res;
    }

    return { analyzeReturns };
}
