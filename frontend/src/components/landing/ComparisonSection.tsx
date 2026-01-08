import { motion } from "framer-motion";
import { BarChart3, Brain, FileQuestion, LineChart, MessageSquare, Target, X, Check } from "lucide-react";

const traditionalItems = [
  { icon: BarChart3, label: "Dashboards & charts" },
  { icon: LineChart, label: "Percentages & trends" },
  { icon: MessageSquare, label: "Surveys (biased, low response)" },
  { icon: FileQuestion, label: "Generic reason codes" },
];

const aiItems = [
  { icon: Target, label: "Root causes identified" },
  { icon: Brain, label: "Human-readable explanations" },
  { icon: Check, label: "Clear, prioritized actions" },
  { icon: Check, label: "Evidence-backed insights" },
];

export const ComparisonSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why existing tools fail
          </h2>
          <p className="text-xl text-muted-foreground">
            They answer <span className="text-foreground font-semibold">how many</span>. We answer{" "}
            <span className="text-primary font-semibold">why</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Traditional Tools</h3>
            </div>
            <div className="space-y-4">
              {traditionalItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                "Shows you data, but doesn't tell you what it means."
              </p>
            </div>
          </motion.div>

          {/* AI Platform */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border-2 border-primary/30 p-8 relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Return-Reason Intelligence</h3>
              </div>
              <div className="space-y-4">
                {aiItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-sm text-primary font-medium">
                  "Tells you exactly what's wrong and how to fix it."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
