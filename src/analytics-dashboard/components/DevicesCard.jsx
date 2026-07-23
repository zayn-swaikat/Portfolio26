import { motion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";


export default function DevicesCard({
  devices = []
}) {


  const total =
    devices.reduce(
      (sum,[,value]) => sum + value,
      0
    );


  const icons = {

    Desktop: Monitor,

    Mobile: Smartphone,

    Tablet: Smartphone

  };



  return (

    <div className="analytics-card">


      <div className="analytics-card-header">

        <Monitor size={22}/>

        <h3>
          Devices
        </h3>

      </div>



      <div className="device-list">


        {
          devices.map(
            ([device,value])=>{


              const Icon =
                icons[device] || Monitor;


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
                  key={device}
                  className="device-item"
                >


                  <div className="device-info">


                    <div className="device-name">

                      <Icon size={18}/>

                      <span>
                        {device}
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