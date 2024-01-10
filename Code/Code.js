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
  let directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  Logger.log(directions.routes[0].legs[0].distance.value);
  if (!directions) {
    throw new Error('No route found!');
  }
  return [directions.routes[0].legs[0].distance.value,directions.routes[0].legs[0].duration.text];
};
/**
 * Go over the data to add the distance 
 *
 * @return {}
 * @customFunction
 */
function getDrivingDistances() {
  let NANNIES = SpreadsheetApp.getActive().getSheetByName("NANNIES")
  let data = NANNIES.getDataRange().getValues().slice(1)
  let dist = []
  data.forEach(function (t) {
    let d = GOOGLEMAPS_DISTANCE( "1 rue rené Goscinny 33320 Eysines",t[1], Maps.DirectionFinder.Mode.WALKING)
    dist.push([d[0]/1000,d[1]])
  })
  NANNIES.getRange(2, 5, dist.length, 2).setValues(dist)
}


