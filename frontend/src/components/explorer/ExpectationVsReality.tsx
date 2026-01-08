import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpectationVsRealityProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    expected: string;
    reality: string;
    imageExpected?: string;
    imageReality?: string;
  };
}

export function ExpectationVsReality({ isOpen, onClose, data }: ExpectationVsRealityProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isCompareMode, setIsCompareMode] = useState(false);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl glass-card rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Expectation vs Reality</h2>
                <p className="text-sm text-muted-foreground">The gap that drives returns</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsCompareMode(!isCompareMode)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    isCompareMode 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  Compare Mode
                </button>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {data.imageExpected && data.imageReality && (
                <div className="mb-6">
                  {isCompareMode ? (
                    /* Slider comparison */
                    <div className="relative h-80 rounded-xl overflow-hidden">
                      {/* Reality (bottom layer) */}
                      <img
                        src={data.imageReality}
                        alt="Reality"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Expected (top layer with clip) */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <img
                          src={data.imageExpected}
                          alt="Expected"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      {/* Slider handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-glow-cyan">
                          <ArrowLeftRight className="w-4 h-4 text-accent-foreground" />
                        </div>
                      </div>
                      {/* Slider input */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                      />
                      {/* Labels */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-card/80 backdrop-blur rounded-lg text-sm font-medium text-foreground">
                        Expected
                      </div>
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-card/80 backdrop-blur rounded-lg text-sm font-medium text-foreground">
                        Reality
                      </div>
                    </div>
                  ) : (
                    /* Side by side */
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img
                          src={data.imageExpected}
                          alt="Expected"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <p className="text-center text-sm text-muted-foreground mt-2">
                          What customers expected
                        </p>
                      </div>
                      <div>
                        <img
                          src={data.imageReality}
                          alt="Reality"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <p className="text-center text-sm text-muted-foreground mt-2">
                          What they received
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text comparison */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-success/5 border border-success/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm font-semibold text-success">Customer Expected</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{data.expected}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-sm font-semibold text-destructive">Reality Experienced</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{data.reality}</p>
                </motion.div>
              </div>

              {/* Insight callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-xl"
              >
                <p className="text-sm text-accent font-medium">
                  💡 Key Insight: The gap between expectation and reality is the primary driver of returns.
                  Closing this gap through accurate representation can significantly reduce return rates.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
