/**
 * Calculate the distance between two
 * locations on Google Maps.
 *
 * =GOOGLEMAPS_DISTANCE("NY 10005", "Hoboken NJ", "walking")
 *
 * @param {String} origin The address of starting point
 * @param {String} destination The address of destination
 * @param {String} mode The mode of travel (driving, walking, bicycling or transit)
 * @return {String} The distance in miles
 * @customFunction
 */
const GOOGLEMAPS_DISTANCE = (origin, destination, mode) => {
  const { routes: [data] = [] } = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  if (!data) {
    throw new Error('No route found!');
  }
  const { legs: [{ distance: { text: distance } } = {}] = [] } = data;
  return distance;
};
/**
 * Go over the data to add the distance 
 *
 * @return {}
 * @customFunction
 */
function getDrivingDistances(){
  let NANNIES=SpreadsheetApp.getActive().getSheetByName("NANNIES")
  let data=NANNIES.getDataRange().getValues().slice(1)
  let dist=[]
  data.forEach(function(t){
    let d=GOOGLEMAPS_DISTANCE(t[1],"1 rue rené Goscinny 33320 Eysines","driving")
    dist.push([d])
  })
  MAM.getRange(2,7,dist.length,1).setValues(dist)
}
