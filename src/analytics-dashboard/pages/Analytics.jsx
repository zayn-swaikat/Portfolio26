import useDashboard from "../hooks/useDashboard";
import StatsGrid from "../components/StatsGrid";
import CountriesCard from "../components/CountriesCard";

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


    <CountriesCard
      countries={data.countries}
    />


  </div>

  );

}