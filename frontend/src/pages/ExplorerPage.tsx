import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  ChevronRight,
  Lightbulb,
  Eye,
  X,
  CheckCircle,
  XCircle,
  Send
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RootCause } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExpectationVsReality } from '@/components/explorer/ExpectationVsReality';
import { ExplainabilityPanel } from '@/components/explorer/ExplainabilityPanel';

const impactConfig = {
  high: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  low: { color: 'text-info', bg: 'bg-info/10', border: 'border-info/30' },
};

export default function ExplorerPage() {
  const { rootCauses, selectedRootCause, setSelectedRootCause, role, applyFix, dismissRootCause } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterImpact, setFilterImpact] = useState<string>('all');
  const [showExpectationView, setShowExpectationView] = useState(false);
  const [showExplainPanel, setShowExplainPanel] = useState(false);

  const filteredCauses = rootCauses.filter(cause => {
    const matchesSearch = cause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesImpact = filterImpact === 'all' || cause.impact === filterImpact;
    return matchesSearch && matchesImpact;
  });

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-8rem)]">
      {/* Role-based banner for viewers */}
      {role === 'viewer' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-lg p-3 border border-warning/30"
        >
          <div className="flex items-center gap-2 text-warning">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Viewing in read-only mode. Switch to Manager or Admin role to apply fixes.</span>
          </div>
        </motion.div>
      )}

      <div className="flex gap-6 flex-1 overflow-hidden">"
      {/* Left Panel - Root Cause List */}
      <div className="w-96 flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">Root Cause Explorer</h1>
          <p className="text-muted-foreground">AI-detected patterns from return data</p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search root causes..."
              className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'high', 'medium', 'low'].map((impact) => (
              <button
                key={impact}
                onClick={() => setFilterImpact(impact)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  filterImpact === impact
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {impact === 'all' ? 'All' : impact.charAt(0).toUpperCase() + impact.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Root Cause List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {filteredCauses.map((cause, index) => {
            const styles = impactConfig[cause.impact];
            const isSelected = selectedRootCause?.id === cause.id;

            return (
              <motion.button
                key={cause.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedRootCause(cause)}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all duration-300",
                  isSelected
                    ? "border-accent bg-accent/10 shadow-glow-cyan"
                    : "border-border bg-card/50 hover:border-accent/30 hover:bg-card"
                )}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={cn("w-5 h-5 mt-0.5 flex-shrink-0", styles.color)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", styles.bg, styles.color)}>
                        {cause.impact.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {cause.confidence}%
                      </span>
                      {cause.status === 'applied' && (
                        <CheckCircle className="w-3 h-3 text-success ml-auto" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {cause.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cause.affectedProducts.length} products • {cause.category}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Detail View */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedRootCause ? (
            <motion.div
              key={selectedRootCause.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col glass-card rounded-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        impactConfig[selectedRootCause.impact].bg,
                        impactConfig[selectedRootCause.impact].color
                      )}>
                        {selectedRootCause.impact.toUpperCase()} IMPACT
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
                            style={{ width: `${selectedRootCause.confidence}%` }}
                          />
                        </div>
                        {selectedRootCause.confidence}% confidence
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {selectedRootCause.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedRootCause.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRootCause(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  {selectedRootCause.expectedVsReality && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExpectationView(true)}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Expectation vs Reality
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExplainPanel(true)}
                    className="gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Why AI Said This
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Evidence */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent rounded-full" />
                    Customer Evidence
                  </h3>
                  <div className="space-y-2">
                    {selectedRootCause.evidenceSnippets.map((snippet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-secondary/30 border border-border/50 rounded-lg text-sm text-muted-foreground italic"
                      >
                        {snippet}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Affected Products */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-purple rounded-full" />
                    Affected Products
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRootCause.affectedProducts.map((sku) => (
                      <span
                        key={sku}
                        className="px-3 py-1.5 bg-secondary/50 border border-border rounded-lg text-xs font-mono text-foreground"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-success rounded-full" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {selectedRootCause.recommendations.map((rec, i) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="p-4 bg-card border border-border rounded-xl"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full",
                                rec.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                                rec.priority === 'medium' ? 'bg-warning/10 text-warning' :
                                'bg-info/10 text-info'
                              )}>
                                {rec.priority.toUpperCase()}
                              </span>
                              {rec.appliedAt && (
                                <span className="text-xs text-success flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Applied
                                </span>
                              )}
                            </div>
                            <p className="font-medium text-foreground">{rec.action}</p>
                            <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                            <p className="text-xs text-accent mt-2">{rec.expectedImpact}</p>
                          </div>
                          {!rec.appliedAt && (
                            role !== 'viewer' ? (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => applyFix(selectedRootCause.id, rec.id)}
                                  className="bg-success hover:bg-success/90"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Apply
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground" title="Upgrade to Manager or Admin role to apply fixes">
                                <Eye className="w-4 h-4" />
                                <span>View only</span>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              {role !== 'viewer' && selectedRootCause.status !== 'dismissed' && (
                <div className="p-4 border-t border-border flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => dismissRootCause(selectedRootCause.id)}
                    className="text-muted-foreground"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Dismiss
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center glass-card rounded-2xl"
            >
              <div className="text-center">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Select a Root Cause
                </h3>
                <p className="text-muted-foreground text-sm">
                  Click on any item to view details and recommendations
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>

      {/* Modals */}
      <ExpectationVsReality 
        isOpen={showExpectationView} 
        onClose={() => setShowExpectationView(false)}
        data={selectedRootCause?.expectedVsReality}
      />
      <ExplainabilityPanel
        isOpen={showExplainPanel}
        onClose={() => setShowExplainPanel(false)}
        rootCause={selectedRootCause}
      />
    </div>
  );
}
