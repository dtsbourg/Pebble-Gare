
function fetchMetro() {
  var response;
  var req = new XMLHttpRequest();

  req.open('GET', "http://transport.opendata.ch/v1/stationboard?station=Lausanne,Vigie&limit=1", true);

  req.onload = function (e) {
  		if (req.status == 200) {
  			response=JSON.parse(req.responseText);
  			var departureTime, direction;

  				var stationBoardResult = response.station;

          var d = response.stationboard[0].stop.departure;
          var departureTime = d.substring(11,16);

          direction = response.stationboard[0].to;

  				Pebble.sendAppMessage ({
  					"location":"Vigie",
  					"direction":direction,
            "time":departureTime,
            "timet":"12:20"
          });
  		}
  }
  req.send(null);
}


Pebble.addEventListener("ready",
                        function(e) {
                          console.log("connect! " + e.ready);
                          fetchMetro();
                          console.log(e.type);
                        });

Pebble.addEventListener("appmessage",
                        function(e) {
                          //console.log(e.type);
                          //fetchMetro();
                          console.log("message : " + e.payload.cmd);
                        });

Pebble.addEventListener("webviewclosed",
                                     function(e) {
                                     console.log("webview closed");
                                     console.log(e.type);
                                     console.log(e.response);
                                     });