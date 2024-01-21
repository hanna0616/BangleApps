
var  on = false;
E.showMessage("recording heart rate");
setInterval(function() {
  on = !on;
  LED2.write(on);
}, 1000);

Bangle.setHRMPower(1);

var heartData = require("Storage").open("stresslessheartratelog.csv","a");




function timeConverter(UNIX_timestamp){
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds
var date = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();
  
// Hours part from the timestamp
var hours = date.getHours();

// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();

// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

var formattedTime = year + month+ day + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
Bangle.on('HRM',function(hrm) {
    var d = [
      "HeartRate",
       0|timeConverter(getTime()), // Time to the nearest second
      hrm.bpm,
      hrm.confidence
      ];
   // Write data here
  heartData.write(d.join(",")+"\n");
  Bluetooth.println(d.join(","));
});
