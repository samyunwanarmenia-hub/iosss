import { motion } from 'framer-motion';
import { TranslationKeys, StatItem } from '../types/global';

interface HeroStatsProps {
  t: TranslationKeys;
  stats: StatItem[];
  startDelay?: number; // New prop for overall start delay
}

const statItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const HeroStats: React.FC<HeroStatsProps> = ({ t, stats, startDelay = 0 }) => { // Default startDelay to 0
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat: StatItem, index: number) => (
        <motion.div 
          key={stat.key} 
          className="text-center"
          variants={statItemVariants}
          initial="hidden"
          animate="visible" // Directly animate on mount
          transition={{ delay: startDelay + index * 0.1 + 0.2 }} // Add startDelay to existing delay
        >
          <div className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-50"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
            {stat.number}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">{t.stats[stat.key]}</div> {/* Changed text-gray-700 to text-gray-600 for light mode */}
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;
