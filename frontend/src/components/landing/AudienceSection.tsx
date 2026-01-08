import { motion } from "framer-motion";
import { Package, ShoppingBag, LineChart, Award } from "lucide-react";

const audiences = [
  {
    icon: Package,
    title: "Product Teams",
    description: "Understand what's truly driving returns and make data-driven product decisions.",
    benefit: "Fewer returns"
  },
  {
    icon: ShoppingBag,
    title: "Merchandising Teams",
    description: "Optimize product listings, imagery, and descriptions based on actual customer feedback.",
    benefit: "Better decisions"
  },
  {
    icon: LineChart,
    title: "E-commerce Leadership",
    description: "Strategic visibility into return patterns across categories and time periods.",
    benefit: "Clear ROI"
  },
  {
    icon: Award,
    title: "Brand Managers",
    description: "Protect brand reputation by addressing systematic customer experience issues.",
    benefit: "Less waste"
  }
];

export const AudienceSection = () => {
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
            Built for retail decision-makers
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed for the teams who need actionable return insights, not more dashboards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-enterprise-md hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <audience.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{audience.description}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                {audience.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
