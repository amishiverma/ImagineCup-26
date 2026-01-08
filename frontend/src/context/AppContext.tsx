import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, FilterState, RootCause, AppState } from '@/types';
import { mockRootCauses } from '@/data/mockData';

interface AppContextType extends AppState {
  setRole: (role: UserRole) => void;
  setIsDataLoaded: (loaded: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSelectedRootCause: (rootCause: RootCause | null) => void;
  applyFix: (rootCauseId: string, recommendationId: string) => void;
  dismissRootCause: (rootCauseId: string) => void;
  rootCauses: RootCause[];
}

const defaultFilters: FilterState = {
  category: 'all',
  sku: '',
  dateRange: {
    start: '2024-01-01',
    end: '2024-02-29',
  },
  region: 'all',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('manager');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [selectedRootCause, setSelectedRootCause] = useState<RootCause | null>(null);
  const [rootCauses, setRootCauses] = useState<RootCause[]>(mockRootCauses);

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const applyFix = (rootCauseId: string, recommendationId: string) => {
    setRootCauses(prev => prev.map(rc => {
      if (rc.id === rootCauseId) {
        return {
          ...rc,
          status: 'applied' as const,
          recommendations: rc.recommendations.map(rec => 
            rec.id === recommendationId 
              ? { ...rec, appliedAt: new Date().toISOString() }
              : rec
          ),
        };
      }
      return rc;
    }));
  };

  const dismissRootCause = (rootCauseId: string) => {
    setRootCauses(prev => prev.map(rc => 
      rc.id === rootCauseId ? { ...rc, status: 'dismissed' as const } : rc
    ));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        isDataLoaded,
        isProcessing,
        filters,
        selectedRootCause,
        rootCauses,
        setRole,
        setIsDataLoaded,
        setIsProcessing,
        setFilters,
        setSelectedRootCause,
        applyFix,
        dismissRootCause,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
