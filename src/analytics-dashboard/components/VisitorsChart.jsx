import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { TrendingUp } from "lucide-react";

import { motion } from "framer-motion";


export default function VisitorsChart({
  history = []
}) {


  return (

    <motion.div

      className="analytics-card"

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

    >


      <div className="analytics-card-header">

        <TrendingUp size={22}/>

        <h3>
          Visitors Timeline
        </h3>

      </div>



      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={history}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.15}
          />


          <XAxis
            dataKey="date"
          />


          <YAxis
          />


          <Tooltip
          />


          <Line

            type="monotone"

            dataKey="visits"

            strokeWidth={3}

            dot={false}

            animationDuration={1200}

          />


        </LineChart>

      </ResponsiveContainer>


    </motion.div>

  );

}