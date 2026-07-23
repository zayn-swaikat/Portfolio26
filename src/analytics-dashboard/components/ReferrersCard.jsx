import { motion } from "framer-motion";
import { Link2 } from "lucide-react";


export default function ReferrersCard({
  referrers = []
}) {


  const total =
    referrers.reduce(
      (sum, [, value]) => sum + value,
      0
    );



  return (

    <div className="analytics-card">


      <div className="analytics-card-header">

        <Link2 size={22}/>

        <h3>
          Traffic Sources
        </h3>

      </div>



      <div>


        {
          referrers.map(
            ([source,value]) => {


              const percentage =
                total
                ?
                Math.round(
                  (value / total) * 100
                )
                :
                0;



              return (

                <div
                  key={source}
                  className="device-item"
                >


                  <div className="device-info">


                    <div className="device-name">

                      <span>
                        {source}
                      </span>

                    </div>



                    <strong>
                      {value}
                    </strong>


                  </div>



                  <div className="bar-container">


                    <motion.div

                      className="bar"

                      initial={{
                        width:0
                      }}

                      animate={{
                        width:
                        `${percentage}%`
                      }}

                      transition={{
                        duration:.8
                      }}

                    />

                  </div>



                </div>

              );


            }
          )
        }


      </div>


    </div>

  );

}