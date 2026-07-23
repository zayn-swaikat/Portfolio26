import useDashboard from "../hooks/useDashboard";


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

    <pre>
      {JSON.stringify(
        data,
        null,
        2
      )}
    </pre>

  );

}