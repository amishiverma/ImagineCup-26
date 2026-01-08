import { motion } from "framer-motion";
import { Cloud, Database, BarChart3, MessageSquare, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Azure OpenAI",
    description: "Enterprise-grade AI reasoning over return text data"
  },
  {
    icon: Database,
    title: "Microsoft Fabric",
    description: "Unified retail data layer for seamless integration"
  },
  {
    icon: BarChart3,
    title: "Power BI",
    description: "Track root causes and measure improvement over time"
  },
  {
    icon: MessageSquare,
    title: "Copilot Experience",
    description: "Natural language Q&A for instant insights"
  }
];

const queries = [
  "Why is this product being returned?",
  "What should we fix first?",
  "Show me returns related to sizing",
  "Which SKUs have image-related issues?"
];

export const EnterpriseSection = () => {
  return (
    <section id="enterprise" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise Ready</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built on the Microsoft ecosystem
          </h2>
          <p className="text-lg text-muted-foreground">
            Seamlessly integrates with Azure, Fabric, and Power BI for enterprise-grade scale and security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-enterprise-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Copilot-style queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Ask anything</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {queries.map((query, index) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  "{query}"
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
