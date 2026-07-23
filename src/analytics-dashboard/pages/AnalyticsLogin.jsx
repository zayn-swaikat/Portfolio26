import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";


export default function AnalyticsLogin({ onLogin }) {


  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(e){

    e.preventDefault();


    setLoading(true);

    setError("");



    try {


      const res =
        await fetch("/api/auth",{

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            password
          })

        });



      if(!res.ok){

        throw new Error(
          "Wrong password"
        );

      }



      onLogin();



    } catch(err){

      setError(
        err.message
      );


    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="analytics-login">


      <motion.form

        onSubmit={handleSubmit}

        initial={{
          opacity:0,
          y:20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="login-box"

      >


        <div className="login-icon">

          <LockKeyhole size={28}/>

        </div>



        <h1>
          Analytics
        </h1>


        <p>
          Enter dashboard password
        </p>



        <input

          type="password"

          value={password}

          onChange={
            e=>setPassword(
              e.target.value
            )
          }

          placeholder="Password"

        />



        {
          error &&
          <span className="login-error">
            {error}
          </span>
        }



        <button
          disabled={loading}
        >

          {
            loading
            ?
            "Checking..."
            :
            "Enter"
          }


        </button>



      </motion.form>


    </div>

  );

}