import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Lightbulb, CheckCircle2, Image, FileText, DollarSign } from "lucide-react";

export const AhaMomentSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The "Aha" moment
          </h2>
          <p className="text-lg text-muted-foreground">
            See how AI transforms vague return reasons into actionable business intelligence.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 lg:gap-4 items-stretch">
            {/* Before Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border p-6 lg:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                </div>
                <span className="text-sm font-semibold text-warning uppercase tracking-wide">Before</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                    Return Reason
                  </label>
                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <p className="text-foreground font-medium">"Didn't like the product"</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                    Team Assumption
                  </label>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <p className="text-destructive text-sm">Product quality issue — initiate redesign?</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Result:</span> Costly investigation, potential unnecessary product changes
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </motion.div>

            {/* After Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl border-2 border-primary/30 p-6 lg:p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">After (AI Insight)</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                      Root Cause Identified
                    </label>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-foreground font-medium text-sm leading-relaxed">
                        "Customers expected a matte finish due to product images, but received a glossy product."
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                      Suggested Fixes
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <Image className="w-3 h-3 text-success" />
                        </div>
                        <span>Update product images</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <FileText className="w-3 h-3 text-success" />
                        </div>
                        <span>Add finish description</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-success">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                        </div>
                        <span className="font-medium">No product redesign needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-success/10 border border-success/20 rounded-full px-6 py-3">
              <DollarSign className="w-5 h-5 text-success" />
              <p className="text-sm font-medium text-success">
                Same product. Fewer returns. Zero manufacturing cost.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
