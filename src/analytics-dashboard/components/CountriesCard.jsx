import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";


export default function CountriesCard({
  countries = []
}) {


  const max =
    Math.max(
      ...countries.map(
        ([,value]) => value
      ),
      1
    );



  return (

    <div className="analytics-card">


      <div className="analytics-card-header">

        <Globe2 size={22}/>

        <h3>
          Top Countries
        </h3>

      </div>



      <div className="countries-list">


        {
          countries.map(
            ([country,value])=>(


            <div
              className="country-item"
              key={country}
            >


              <div className="country-info">

                <span>
                  {country}
                </span>


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
                    `${(value/max)*100}%`
                  }}

                  transition={{
                    duration:0.8,
                    ease:"easeOut"
                  }}

                />

              </div>


            </div>


          ))
        }


      </div>


    </div>

  );

}