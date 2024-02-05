# MaryPoppins or how to search for a nanny with Appsheet

A spoonful of sugar helps the medicine go down for sure but a Nanny helps even more !

That’s why my wife and I, with a baby coming, were in search of a Mary poppins for our newborn.

In France you can ask City Hall to give you the list of nannies in the town. 

So we asked for it and received a list of 200 nannies.
![1](https://github.com/GhislainSanjuan/MaryPoppins/blob/main/docs/NanniesList.png)


We then wanted to know which nannies were the the closest to us.

But we were not enthousiast to go over the 200 rows in the list.

So I created a script to calculate this distance and the time to get there walking using the Google Maps API 

```javascript
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
  return [
    directions.routes[0].legs[0].distance.value,
    directions.routes[0].legs[0].duration.text
    ];
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
```

Once the script was finish running, we had the list completed with the driving distance and time 
![1](https://github.com/GhislainSanjuan/MaryPoppins/blob/main/docs/NanniesListWithDistanceAndTime.png)


However we wanted a map view of all of those addresses…

I jumped on the occasion to use Appsheet by just clicking on Create an app menu inside Google Sheet
![1](https://github.com/GhislainSanjuan/MaryPoppins/blob/main/docs/CreateAppSheetApp.png)

The Appsheet app created the map view automatically. 
I just added some format rules depending on the walking distance and there it was  : the map view with all the informations needed.
![1](https://github.com/GhislainSanjuan/MaryPoppins/blob/main/docs/AppsheetAppDetailView.png)


We then called first the closest to us and add our comments…

At the end, we did not find Mary Poppins but a even better (and real) nanny !


Want to get the supercalifragilisticexpialidocious app or script ?

- [Mary Poppins on Github](https://github.com/GhislainSanjuan/MaryPoppins/)
- [Mary Poppins on Appsheet ](https://www.appsheet.com//templates/A-map-view-to-find-a-nanny-?appGuidString=4669efda-170f-44b2-84e5-aa080b99a79f)

