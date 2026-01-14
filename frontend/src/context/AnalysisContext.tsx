import { createContext, useContext, useState, ReactNode } from 'react';
import { RootCause } from '@/types';
import { useApp } from '@/context/AppContext';

interface AnalysisContextType {
  analysis: any | null;
  setAnalysisResult: (data: { analysis: any; rootCauses: any[] }) => void;
  resetAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<any | null>(null);

  const { setRootCauses, setIsDataLoaded } = useApp();

  const setAnalysisResult = (data: {
    analysis: any;
    rootCauses: any[];
  }) => {
    setAnalysis(data.analysis ?? null);

    const adaptedRootCauses: RootCause[] = (data.rootCauses ?? [])
  .filter(c => typeof c?.reason === 'string' && c.reason.trim())
  .map((cause, idx) => {
    const sentiment = cause.sentiment_breakdown ?? {};

    const negative = sentiment.negative ?? 0;
    const neutral = sentiment.neutral ?? 0;

    const frequencyBoost = Math.min(15, idx * 3); 
    const confidence = Math.round(
       Math.min(95, (negative * 100) + (neutral * 20) - frequencyBoost)
      );

    return {
      id: String(idx),
      title: cause.reason,
      description: 'AI-detected return pattern from customer feedback',
      impact: confidence > 75 ? 'high' : confidence > 55 ? 'medium' : 'low',
      confidence,
      category: 'Returns',
      affectedProducts: cause.affected_products ?? [],
      evidenceSnippets: cause.evidence ?? [],
      recommendations: [],
      detectedAt: new Date().toISOString(),
      status: cause.status ?? 'new',
    };
  });

    setRootCauses(adaptedRootCauses);
    setIsDataLoaded(true);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setRootCauses([]);
    setIsDataLoaded(false);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysisResult,
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider');
  }
  return context;
}
