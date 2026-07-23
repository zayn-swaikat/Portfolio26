import StatCard from "./StatCard";

import {
  Users,
  UserRoundCheck,
  CalendarDays,
  CalendarRange
} from "lucide-react";


export default function StatsGrid({
  stats
}) {


  const cards = [

    {
      title:"Total Visitors",
      value:stats.total,
      icon:Users
    },


    {
      title:"Unique Visitors",
      value:stats.unique,
      icon:UserRoundCheck
    },


    {
      title:"Today",
      value:stats.today,
      icon:CalendarDays
    },


    {
      title:"This Month",
      value:stats.month,
      icon:CalendarRange
    }

  ];



  return (

    <div className="stats-grid">

      {
        cards.map((card)=>(
          
          <StatCard
            key={card.title}
            {...card}
          />

        ))
      }

    </div>

  );

}