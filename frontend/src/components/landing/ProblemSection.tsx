import { motion } from "framer-motion";
import { AlertCircle, HelpCircle, RefreshCw, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: HelpCircle,
    title: "Generic return reasons",
    description: '"Didn\'t like it", "Not as expected" — vague data that tells you nothing actionable.'
  },
  {
    icon: RefreshCw,
    title: "Teams fix the wrong thing",
    description: "Without root cause clarity, teams waste resources addressing symptoms, not causes."
  },
  {
    icon: TrendingDown,
    title: "Products get redesigned unnecessarily",
    description: "Costly product changes when the real issue is marketing, imagery, or sizing info."
  },
  {
    icon: AlertCircle,
    title: "Marketing & packaging issues go unnoticed",
    description: "Expectation mismatches hide in plain sight while product teams take the blame."
  }
];

export const ProblemSection = () => {
  return (
    <section id="solution" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Retailers track returns. They don't understand them.
          </h2>
          <p className="text-lg text-muted-foreground">
            Returns are treated as a logistics problem — not an intelligence problem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-enterprise-sm hover:shadow-enterprise-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
