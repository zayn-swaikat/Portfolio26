import { useEffect, useState } from "react";


export default function useDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  async function fetchDashboard(){

    try {

      setError(null);


      const response =
        await fetch("/api/dashboard");


      if(!response.ok){
        throw new Error(
          "Failed fetching dashboard"
        );
      }


      const result =
        await response.json();


      setData(result);


    } catch(err){

      console.error(err);

      setError(err.message);


    } finally {

      setLoading(false);

    }

  }



  useEffect(()=>{


    fetchDashboard();


    const interval =
      setInterval(
        fetchDashboard,
        10000
      );


    return ()=>clearInterval(interval);


  },[]);



  return {
    data,
    loading,
    error,
    refresh: fetchDashboard
  };

}