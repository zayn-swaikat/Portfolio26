import StatCard from "./StatCard";
import {
  Users,
  UserRoundCheck,
  CalendarDays,
  CalendarRange
} from "lucide-react";
import { motion } from "framer-motion";
import "./StatsGrid.css";

export default function StatsGrid({ stats = {} }) {
  const cards = [
    {
      id: "total",
      title: "Total Visitors",
      value: stats?.total ?? 0,
      icon: Users,
      trend: "+12.4%",
      isPositive: true
    },
    {
      id: "unique",
      title: "Unique Visitors",
      value: stats?.unique ?? 0,
      icon: UserRoundCheck,
      trend: "+8.1%",
      isPositive: true
    },
    {
      id: "today",
      title: "Today",
      value: stats?.today ?? 0,
      icon: CalendarDays,
      trend: "-2.3%",
      isPositive: false
    },
    {
      id: "month",
      title: "This Month",
      value: stats?.month ?? 0,
      icon: CalendarRange,
      trend: "+24.5%",
      isPositive: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  return (
    <motion.div
      className="stats-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </motion.div>
  );
}