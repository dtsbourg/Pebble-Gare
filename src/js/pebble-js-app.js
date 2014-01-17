
function fetchMetroFlon() {
  var response;
  var req = new XMLHttpRequest();

  req.open('GET', "http://transport.opendata.ch/v1/stationboard?station=Lausanne,Vigie&limit=4", true);

  req.onload = function (e) {
  		if (req.status == 200) {
  			response=JSON.parse(req.responseText);
  			var departureTime, direction;

  				var stationBoardResult = response.station;
          var d = new Array(); var j=0;
          var departureTime = new Array();

          for (var i=0; i<4; i++)
          {
            if (response.stationboard[i].to.match("Flon")) {

            d[j] = response.stationboard[i].stop.departure;
            departureTime[j] = d[j].substring(11,16); 
            j++;
            }
          }
          direction = "Lausanne-Flon";

  				Pebble.sendAppMessage ({
  					"location":"Vigie",
  					"direction":direction,
            "time":departureTime[1],
            "timet":departureTime[0]
          });
  		}
  }
  req.send(null);
}

function fetchMetroRenens() {
  var response;
  var req = new XMLHttpRequest();

  req.open('GET', "http://transport.opendata.ch/v1/stationboard?station=Lausanne,Vigie&limit=4", true);

  req.onload = function (e) {
      if (req.status == 200) {
        response=JSON.parse(req.responseText);
        var departureTime, direction;

          var stationBoardResult = response.station;
          var d = new Array(); var j=0;
          var departureTime = new Array();

          for (var i=0; i<4; i++)
          {
            if (response.stationboard[i].to.match("Renens")) {

            d[j] = response.stationboard[i].stop.departure;
            departureTime[j] = d[j].substring(11,16); 
            j++;
            }
          }
          direction = "Renens-Gare";

          Pebble.sendAppMessage ({
            "location":"Vigie",
            "direction":direction,
            "time":departureTime[1],
            "timet":departureTime[0]
          });
      }
  }
  req.send(null);
}

Pebble.addEventListener("ready",
                        function(e) {
                          console.log("connect! " + e.ready);
                          fetchMetroFlon();
                          console.log(e.type);
                        });

Pebble.addEventListener("appmessage",
                        function(e) {
                          console.log("message : " + e.payload.cmd);

                          if (e.payload.cmd === 1)
                          {
                            fetchMetroFlon();
                          }

                          else if (e.payload.cmd === 2) {
                            fetchMetroRenens();
                          }
                        });

Pebble.addEventListener("webviewclosed",
                                     function(e) {
                                     console.log("webview closed");
                                     console.log(e.type);
                                     console.log(e.response);
                                     });