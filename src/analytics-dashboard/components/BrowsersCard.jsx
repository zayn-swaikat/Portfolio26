import { motion } from "framer-motion";
import { Globe } from "lucide-react";


export default function BrowsersCard({
  browsers = []
}) {


  const total =
    browsers.reduce(
      (sum, [, value]) => sum + value,
      0
    );


  return (

    <div className="analytics-card">


      <div className="analytics-card-header">

        <Globe size={22}/>

        <h3>
          Browsers
        </h3>

      </div>



      <div>


        {
          browsers.map(
            ([browser, value]) => {


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
                  key={browser}
                  className="device-item"
                >


                  <div className="device-info">


                    <div className="device-name">

                      <span>
                        {browser}
                      </span>

                    </div>


                    <strong>
                      {percentage}%
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