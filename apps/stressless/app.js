
var  on = false;
E.showMessage("recording heart rate");
setInterval(function() {
  on = !on;
  LED2.write(on);
}, 1000);

Bangle.setHRMPower(1);

var heartData = require("Storage").open("stresslessheartratelog.csv","a");


Bangle.on('HRM',function(hrm) {
    var d = [
      "HeartRate",
       0|getTime(), // Time to the nearest second
      hrm.bpm,
      hrm.confidence
      ];
   // Write data here
  heartData.write(d.join(",")+"\n");
  Bluetooth.println(d.join(","));
});
