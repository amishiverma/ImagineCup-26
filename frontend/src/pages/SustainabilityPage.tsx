import { motion } from 'framer-motion';
import { Leaf, Package, Truck, Wind } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { mockSustainabilityMetrics } from '@/data/mockData';
import { useInView } from '@/hooks/useInView';

export default function SustainabilityPage() {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const metrics = mockSustainabilityMetrics;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success/20 to-accent/10 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sustainability Impact</h1>
        <p className="text-muted-foreground">Environmental benefits from reduced returns</p>
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatCard title="Returns Avoided" value={metrics.returnsAvoided} icon={Package} accentColor="cyan" delay={0} />
        <StatCard title="Waste Reduced" value={metrics.wasteReduced} suffix=" kg" icon={Leaf} accentColor="green" delay={100} />
        <StatCard title="Carbon Saved" value={metrics.carbonSaved} suffix=" kg CO₂" icon={Wind} accentColor="purple" delay={200} />
        <StatCard title="Shipments Avoided" value={metrics.shippingAvoided} icon={Truck} accentColor="warning" delay={300} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Every return avoided makes a difference</h3>
        <p className="text-muted-foreground">By fixing root causes with AI intelligence, you're reducing waste, shipping emissions, and environmental impact.</p>
      </motion.div>
    </div>
  );
}
