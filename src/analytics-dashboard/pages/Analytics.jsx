import { useState } from "react";

import useDashboard from "../hooks/useDashboard";
import StatsGrid from "../components/StatsGrid";
import CountriesCard from "../components/CountriesCard";
import DevicesCard from "../components/DevicesCard";
import BrowsersCard from "../components/BrowsersCard";
import ReferrersCard from "../components/ReferrersCard";
import VisitorsChart from "../components/VisitorsChart";

import AnalyticsLogin from "./AnalyticsLogin";

import "../../styles/Analytics.css";


export default function Analytics(){


  const [authenticated,setAuthenticated] = useState(false);

  if(!authenticated){

    return (

      <AnalyticsLogin
        onLogin={()=>{
          setAuthenticated(true)
        }}
      />

    );

  }

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

    <DevicesCard
      devices={data.devices}
    />

    <BrowsersCard
      browsers={data.browsers}
    />

    <ReferrersCard
      referrers={data.referrers}
    />

    <VisitorsChart
      history={data.history}
    />

  </div>

  );

}