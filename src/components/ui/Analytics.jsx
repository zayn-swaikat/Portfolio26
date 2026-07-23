import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Eye,
  CalendarDays,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { getStats } from '../../analytics/stats.js'

import "../../styles/Analytics.css";

import VisitorChart from "../analytics/VisitorChart.jsx"

export default function Analytics() {

  const [stats, setStats] = useState(null);
  const [history,setHistory] = useState([]);


  useEffect(() => {

    Promise.all([

    getStats(),

    fetch("/api/history")
    .then(res=>res.json())

    ])

    .then(([stats,history])=>{

    setStats(stats);

    setHistory(history);

    });

  }, []);



  if (!stats) {
    return (
      <div className="analytics-loading">
        Loading analytics...
      </div>
    );
  }



  const cards = [
    {
      title: "All Time",
      value: stats.total,
      icon: Eye,
    },

    {
      title: "Today",
      value: stats.today,
      icon: Clock3,
    },

    {
      title: "This Week",
      value: stats.week,
      icon: TrendingUp,
    },

    {
      title: "This Month",
      value: stats.month,
      icon: CalendarDays,
    },
  ];



  return (

    <main className="analytics-page">


      <motion.header
        initial={{
          opacity:0,
          y:-20
        }}

        animate={{
          opacity:1,
          y:0
        }}
      >

        <h1>
          Portfolio Analytics
        </h1>


        <p>
          Visitor activity overview
        </p>


      </motion.header>



      <section className="stats-grid">


        {cards.map((card,index)=>{

          const Icon = card.icon;


          return (

            <motion.div

              key={card.title}

              className="stat-card"

              initial={{
                opacity:0,
                y:30
              }}

              animate={{
                opacity:1,
                y:0
              }}

              transition={{
                delay:index*0.1
              }}

            >

              <Icon size={24}/>


              <span>
                {card.title}
              </span>


              <strong>
                {card.value}
              </strong>


            </motion.div>

          );

        })}


      </section>

      <VisitorChart data={history}/>

      <section className="analytics-panel">


        <h2>
          System Status
        </h2>


        <div>

          Last updated:

          {" "}

          {new Date(
            stats.updatedAt
          ).toLocaleString()}


        </div>


      </section>


    </main>

  );
}