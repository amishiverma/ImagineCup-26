import { RootCause, ReturnData, DashboardStats, TimeSeriesData, SustainabilityMetrics } from '@/types';

export const mockRootCauses: RootCause[] = [
  {
    id: 'rc-001',
    title: 'Product images suggest thicker fabric than actual',
    description: 'AI analysis reveals that 73% of returns mentioning "thin" or "flimsy" correlate with products where marketing images use heavy lighting that exaggerates fabric thickness.',
    confidence: 94,
    impact: 'high',
    category: 'Apparel',
    affectedProducts: ['SKU-2847', 'SKU-3921', 'SKU-1156'],
    evidenceSnippets: [
      '"The sweater looked much thicker in the pictures..."',
      '"Expected a cozy warm feel but it\'s see-through"',
      '"Nothing like the photo - very thin material"',
      '"Disappointed - photos made it look premium quality"',
    ],
    expectedVsReality: {
      expected: 'Customers expected a thick, cozy sweater with premium knit texture based on product photography showing deep shadows and rich texture.',
      reality: 'Actual product is a lightweight knit suitable for layering, with a thinner gauge than the photography suggested.',
      imageExpected: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      imageReality: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400',
    },
    recommendations: [
      {
        id: 'rec-001-1',
        action: 'Update product images with accurate lighting',
        reason: 'Current images use heavy shadows that make fabric appear 40% thicker than reality',
        expectedImpact: 'Reduce returns by 15-20% for affected SKUs',
        priority: 'high',
      },
      {
        id: 'rec-001-2',
        action: 'Add fabric weight specification prominently',
        reason: 'Customers lack objective data to set expectations',
        expectedImpact: 'Reduce returns by 8-12% through better pre-purchase clarity',
        priority: 'medium',
      },
    ],
    detectedAt: '2024-01-15T10:30:00Z',
    status: 'new',
  },
  {
    id: 'rc-002',
    title: 'Size guide doesn\'t account for stretch fabric',
    description: 'Athletic wear returns spike 3x when customers follow standard size guide. The stretch fabric requires different sizing guidance than rigid materials.',
    confidence: 89,
    impact: 'high',
    category: 'Activewear',
    affectedProducts: ['SKU-8834', 'SKU-9912', 'SKU-7723'],
    evidenceSnippets: [
      '"Followed the size chart exactly but it\'s way too tight"',
      '"Usually a medium, ordered medium, need to return for large"',
      '"Size chart is misleading for this material"',
    ],
    expectedVsReality: {
      expected: 'Standard size guide measurements indicated correct fit for customer body measurements.',
      reality: 'Compression fabric fits differently - requires sizing up for comfort. 68% of returns are one size exchange.',
    },
    recommendations: [
      {
        id: 'rec-002-1',
        action: 'Create stretch-specific size guide',
        reason: 'Current one-size-fits-all guide ignores material properties',
        expectedImpact: 'Reduce size-related returns by 35%',
        priority: 'high',
      },
    ],
    detectedAt: '2024-01-14T14:22:00Z',
    status: 'reviewed',
  },
  {
    id: 'rc-003',
    title: 'Color appears different on mobile vs desktop',
    description: 'Products with specific RGB values render significantly different on mobile screens. 58% of "wrong color" returns ordered via mobile app.',
    confidence: 78,
    impact: 'medium',
    category: 'Home Decor',
    affectedProducts: ['SKU-4455', 'SKU-4456', 'SKU-4457'],
    evidenceSnippets: [
      '"The blue looked teal on my phone but arrived navy"',
      '"Not the color I ordered - this is completely different"',
      '"Color looked great on my screen, not in person"',
    ],
    recommendations: [
      {
        id: 'rec-003-1',
        action: 'Add color calibration warning for mobile users',
        reason: 'Mobile screens vary significantly in color accuracy',
        expectedImpact: 'Reduce color-related returns by 20%',
        priority: 'medium',
      },
      {
        id: 'rec-003-2',
        action: 'Include physical color swatch option',
        reason: 'Allow customers to verify color before large purchases',
        expectedImpact: 'Reduce color-related returns by 40% for opted-in customers',
        priority: 'low',
      },
    ],
    detectedAt: '2024-01-13T09:15:00Z',
    status: 'applied',
  },
  {
    id: 'rc-004',
    title: 'Packaging causes damage during shipping',
    description: 'Fragile items in standard packaging show 4x higher damage-related returns. Correlation between carrier and damage rate identified.',
    confidence: 92,
    impact: 'high',
    category: 'Electronics',
    affectedProducts: ['SKU-1001', 'SKU-1002', 'SKU-1003'],
    evidenceSnippets: [
      '"Arrived broken - box was crushed"',
      '"Screen cracked, packaging was minimal"',
      '"Product damaged in transit, poor packaging"',
    ],
    recommendations: [
      {
        id: 'rec-004-1',
        action: 'Upgrade to reinforced packaging for fragile items',
        reason: 'Current packaging lacks adequate protection',
        expectedImpact: 'Reduce damage returns by 60%',
        priority: 'high',
      },
    ],
    detectedAt: '2024-01-12T16:45:00Z',
    status: 'new',
  },
  {
    id: 'rc-005',
    title: 'Product description omits key limitation',
    description: 'Smart home devices returned when customers discover WiFi 6 requirement not mentioned prominently. Buried in spec sheet line 47.',
    confidence: 85,
    impact: 'medium',
    category: 'Electronics',
    affectedProducts: ['SKU-5501', 'SKU-5502'],
    evidenceSnippets: [
      '"Doesn\'t work with my router - never mentioned this"',
      '"Wish I knew it needed WiFi 6 before buying"',
      '"Incompatible with my setup - not clear in listing"',
    ],
    recommendations: [
      {
        id: 'rec-005-1',
        action: 'Add compatibility checker to product page',
        reason: 'Requirements are hidden in dense specifications',
        expectedImpact: 'Reduce compatibility returns by 45%',
        priority: 'medium',
      },
    ],
    detectedAt: '2024-01-11T11:30:00Z',
    status: 'new',
  },
];

export const mockReturnTrendData: TimeSeriesData[] = [
  { date: '2024-01-01', value: 245, label: 'Week 1' },
  { date: '2024-01-08', value: 232, label: 'Week 2' },
  { date: '2024-01-15', value: 218, label: 'Week 3' },
  { date: '2024-01-22', value: 195, label: 'Week 4 (Fix Applied)' },
  { date: '2024-01-29', value: 178, label: 'Week 5' },
  { date: '2024-02-05', value: 162, label: 'Week 6' },
  { date: '2024-02-12', value: 151, label: 'Week 7' },
  { date: '2024-02-19', value: 148, label: 'Week 8' },
];

export const mockReturnsByCategory: { category: string; returns: number; percentage: number }[] = [
  { category: 'Apparel', returns: 1245, percentage: 35 },
  { category: 'Electronics', returns: 892, percentage: 25 },
  { category: 'Home Decor', returns: 534, percentage: 15 },
  { category: 'Activewear', returns: 445, percentage: 12.5 },
  { category: 'Accessories', returns: 445, percentage: 12.5 },
];

export const mockDashboardStats: DashboardStats = {
  totalReturns: 3561,
  returnRate: 8.4,
  returnRateTrend: -2.3,
  fixesApplied: 12,
  returnsAvoided: 847,
  topRootCauses: mockRootCauses.slice(0, 5),
};

export const mockSustainabilityMetrics: SustainabilityMetrics = {
  returnsAvoided: 847,
  wasteReduced: 2541, // kg
  carbonSaved: 4235, // kg CO2
  shippingAvoided: 1694, // shipments (round trip)
};

export const mockRegions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
export const mockCategories = ['Apparel', 'Electronics', 'Home Decor', 'Activewear', 'Accessories'];

export const mockReturn: ReturnData[] = [
  {
    id: 'ret-001',
    sku: 'SKU-2847',
    productName: 'Cozy Knit Sweater',
    category: 'Apparel',
    returnReason: 'Not as described',
    customerFeedback: 'The sweater looked much thicker in the pictures, very disappointed with the thin material.',
    returnDate: '2024-01-18',
    region: 'North America',
  },
  {
    id: 'ret-002',
    sku: 'SKU-8834',
    productName: 'Performance Leggings',
    category: 'Activewear',
    returnReason: 'Wrong size',
    customerFeedback: 'Followed the size chart exactly but it\'s way too tight. Need to exchange for a larger size.',
    returnDate: '2024-01-17',
    region: 'Europe',
  },
  // More would be added for a full demo
];

export const mockChatResponses: { [key: string]: string } = {
  'why is sku-104 being returned': 'Based on my analysis of SKU-104 returns, the primary root cause (89% confidence) is **fabric thickness perception**. Customers expected a heavier material based on product images. I recommend updating photography to show accurate fabric weight.',
  'what should we fix first': 'I recommend prioritizing **Product Image Accuracy** (RC-001). It affects 3 SKUs with a 94% confidence score and could reduce returns by 15-20%. This has the highest impact-to-effort ratio.',
  'show top causes in apparel': 'Top root causes in Apparel category:\n\n1. **Fabric thickness mismatch** (94% confidence) - 847 returns\n2. **Color accuracy issues** (78% confidence) - 234 returns\n3. **Size guide discrepancies** (72% confidence) - 189 returns',
  default: 'I can help you understand return patterns and root causes. Try asking:\n• "Why is [SKU] being returned?"\n• "What should we fix first?"\n• "Show top causes in [category]"',
};

export const mockReturns = [
  {
    order_id: "ORD-001",
    sku: "SKU-2847",
    reason: "Fabric felt thinner than expected",
    category: "Apparel",
  },
  {
    order_id: "ORD-002",
    sku: "SKU-3921",
    reason: "Size chart inaccurate",
    category: "Activewear",
  },
  {
    order_id: "ORD-003",
    sku: "SKU-1156",
    reason: "Color looked different in real life",
    category: "Home Decor",
  }
];

