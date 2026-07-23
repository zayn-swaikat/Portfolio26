import { motion } from "framer-motion";


export default function StatCard({
  title,
  value,
  icon: Icon
}) {


  return (

    <motion.div

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.5
      }}

      className="stat-card"

    >

      <div className="stat-icon">

        <Icon size={22}/>

      </div>


      <div className="stat-content">

        <span>
          {title}
        </span>


        <strong>
          {value}
        </strong>

      </div>


    </motion.div>

  );

}