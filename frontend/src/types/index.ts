// Return Intelligence Platform Types

export type UserRole = 'viewer' | 'manager' | 'admin';

export interface RootCause {
  id: string;
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'high' | 'medium' | 'low';
  category: string;
  affectedProducts: string[];
  evidenceSnippets: string[];
  expectedVsReality?: {
    expected: string;
    reality: string;
    imageExpected?: string;
    imageReality?: string;
  };
  recommendations: Recommendation[];
  detectedAt: string;
  status: 'new' | 'reviewed' | 'applied' | 'dismissed';
}

export interface Recommendation {
  id: string;
  action: string;
  reason: string;
  expectedImpact: string;
  priority: 'high' | 'medium' | 'low';
  appliedAt?: string;
}

export interface ReturnData {
  id: string;
  sku: string;
  productName: string;
  category: string;
  returnReason: string;
  customerFeedback: string;
  returnDate: string;
  region: string;
}

export interface DashboardStats {
  totalReturns: number;
  returnRate: number;
  returnRateTrend: number; // percentage change
  fixesApplied: number;
  returnsAvoided: number;
  topRootCauses: RootCause[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface FilterState {
  category: string;
  sku: string;
  dateRange: {
    start: string;
    end: string;
  };
  region: string;
}

export interface SustainabilityMetrics {
  returnsAvoided: number;
  wasteReduced: number; // kg
  carbonSaved: number; // kg CO2
  shippingAvoided: number; // shipments
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  references?: {
    type: 'rootCause' | 'product' | 'metric';
    id: string;
    label: string;
  }[];
}

export interface AppState {
  role: UserRole;
  isDataLoaded: boolean;
  isProcessing: boolean;
  filters: FilterState;
  selectedRootCause: RootCause | null;
}
