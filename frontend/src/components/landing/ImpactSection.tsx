import { motion } from "framer-motion";
import { TrendingDown, Leaf, Package } from "lucide-react";

const metrics = [
  {
    icon: TrendingDown,
    value: "5-15%",
    label: "Reduction in preventable returns",
    description: "Even modest improvements translate to significant savings at scale."
  },
  {
    icon: Package,
    value: "$M+",
    label: "Annual savings potential",
    description: "Lower return costs, reduced reverse logistics, better margins."
  },
  {
    icon: Leaf,
    value: "↓ CO₂",
    label: "Environmental impact",
    description: "Less waste, fewer shipments, lower carbon footprint."
  }
];

export const ImpactSection = () => {
  return (
    <section id="case-studies" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The impact of understanding returns
          </h2>
          <p className="text-lg text-muted-foreground">
            Conservative estimates show significant returns for retailers who invest in return intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <metric.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">{metric.value}</p>
              <p className="text-lg font-semibold text-foreground mb-2">{metric.label}</p>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">Why AI is essential</h3>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>Return data is vague, emotional, and unstructured</li>
              <li>Meaning is implicit, not explicit</li>
              <li>Root cause only emerges at scale through pattern recognition</li>
            </ul>
            <p className="text-primary font-semibold">
              "If AI is removed, the product does not work."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
