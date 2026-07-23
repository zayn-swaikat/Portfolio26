const START_TIME = Date.now();


export function getTimeOnSite() {

  const seconds = Math.floor(
    (Date.now() - START_TIME) / 1000
  );


  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}