import useDashboard from "../hooks/useDashboard";
import StatsGrid from "../components/StatsGrid";

import "../../styles/Analytics.css";


export default function Analytics(){

  const {
    data,
    loading,
    error
  } = useDashboard();



  if(loading){

    return (
      <div>
        Loading analytics...
      </div>
    );

  }



  if(error){

    return (
      <div>
        {error}
      </div>
    );

  }



  return (

  <div>

    <StatsGrid
      stats={data.stats}
    />

  </div>

  );

}