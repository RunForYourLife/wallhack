var watchProcess=null;
var LastGeoPos=null;
var TimeRunning=0;
var DistanceRunning=0;
var IntervalTime=null;
var KilometersMilestone=[];
function pausegetGeoLocation(){
    console.log("pausegetGeoLocation");
    CurrentTrainingPaused=true;
    stop_watchlocation();
    clearInterval(IntervalTime);
}
function getGeoLocation(){
    console.log("getGeoLocation");
    if(!CurrentTrainingPaused)
    {
        TimeRunning=0;
        KilometersMilestone=[]
        clearInterval(IntervalTime);
    }
    else
        CurrentTrainingPaused=false;
    stop_watchlocation();
    if (navigator.geolocation) {
        LastGeoPos=null;
        watchProcess=navigator.geolocation.watchPosition(setDataGeo,onError,{timeout:3000,enableHighAccuracy:true});
        IntervalTime = setInterval("TimeRuns()",1000);
        //watchProcess=navigator.geolocation.getCurrentPosition(setDataGeo,onError);
    } else {
        Lungo.Notification.error("Error! El navegador no soporta Geolocalizacion.", 'error');
    }
}
function setDataGeo(pos){
    console.log("setDataGeo");
    var objGeo;
    if(LastGeoPos==null)
    {
        objGeo=[CurrentTraining.Id ,""+pos.coords.latitude+"" ,""+pos.coords.longitude +"",0 ,pos.coords.speed ,pos.coords.altitude ,new Date(pos.timestamp) ,0 ,0];
        InsertGeoPos(objGeo);
    }
    else
    {
        //si no es la mateixa posicio
        if(LastGeoPos.coords.latitude!=pos.coords.latitude && LastGeoPos.coords.longitude!=pos.coords.longitude)
        {

            DistanceRunning+=getDistance(LastGeoPos.coords.latitude,LastGeoPos.coords.longitude, pos.coords.latitude,pos.coords.longitude);
            $$("#txtDistance").html(DistanceRunning.toFixed(3) +" km");
            
            var milestone=0;
            if(DistanceRunning>KilometersMilestone.length && DistanceRunning>1)
            {
                milestone=1;
            }
            objGeo=[CurrentTraining.Id ,""+pos.coords.latitude+"" ,""+pos.coords.longitude +"",0 ,pos.coords.speed ,pos.coords.altitude ,new Date(pos.timestamp) ,milestone ,DistanceRunning];
            var kmperMin=getKmperMin(pos);

            if(milestone)
            {
                KilometersMilestone.push(objGeo);
                var spkm=KilometersMilestone.length+" "+CurrentLngObj.lblkilometer + " "+ kmperMin;
                speak(spkm);
            }
            //objGeo=[CurrentTraining.Id ,""+pos.coords.latitude+"" ,""+pos.coords.longitude +"",0 ,pos.coords.speed  ,pos.coords.altitude ,new Date(pos.timestamp) ,milestone ,DistanceRunning];
            
            $$("#txtSpeedGlobal").html(kmperMin.TimeGlobal.toFixed(2) + " min/km" );
           // $$("#txtSpeedkm").html(kmperMin.TimeperKm.toFixed(2) + " min/km" );
            InsertGeoPos(objGeo);
        }

    }
    LastGeoPos=pos;
    
}

function getKmperMin(pos)
{
    console.log("getKmperMin");
    var Time={
        TimeGlobal:0,
        TimeperKm:0};
        var ctime=getTimeinMin(TimeRunning);
        Time.TimeGlobal=ctime/DistanceRunning;
        /*if(KilometersMilestone.length==0)
        {
            Time.TimeperKm=Time.TimeGlobal;
        }
        else
        {
        */
//            var laskm=KilometersMilestone[KilometersMilestone.length-1];
  //          var kmSincelastKm=DistanceRunning-laskm[8];
    //        var now=new Date();
           // Time.TimeperKm=((1/((pos.coords.speed/1000)/0,01666666666667))*1000000000000);
            //if(kmSincelastKm!=0)
              //  Time.TimeperKm=getTimeinMin(timeSincelastKm)/kmSincelastKm;
          //  else
            //    Time.TimeperKm=Time.TimeGlobal;
        //}
        return Time;

    }
    function getTimeinMin(timeinSeconds)
    {
        console.log("getTimeinMin");
        var t=getTimeobj(timeinSeconds);
        return  (((t.hours*60)+t.minutes)+"."+t.seconds)*1;

    }

    function getTimeobj(time)
    {
        console.log("getTimeobj");
        var hours = 0; var minutes = 0;var seconds = 0;
        var time_temp = 0.0;

        time_temp = time/3600;
        hours = Math.floor(time_temp);
        time_temp = time_temp - hours;
        time_temp = time_temp*60;
        minutes = Math.floor(time_temp);
        time_temp = (time_temp - minutes)*60;
        seconds = Math.floor(time_temp);

        return {hours:hours,minutes:minutes,seconds:seconds};
    }
    function TimeRuns()
    {
        console.log("TimeRuns");
        TimeRunning++;

        var t=getTimeobj(TimeRunning);
        var h = (t.hours < 10) ? "0" + t.hours : t.hours;
        var m = (t.minutes < 10) ? "0" + t.minutes : t.minutes;
        var s = (t.seconds < 10) ? "0" + t.seconds : t.seconds;

        $$("#txtTime").html(h+":"+m+":"+s);
    }

    function showPosition(position)
    {
        debugger;
        var latlon=position.coords.latitude+","+position.coords.longitude;

        var img_url="http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";

        document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
    }
    function onError(e) {
        console.log("onError");
        Lungo.Notification.error(e.message, 'error');
    }
    function stop_watchlocation(){
        console.log("stop_watchlocation");
        if(watchProcess!= null)
        {
            navigator.geolocation.clearWatch(watchProcess);
            watchProcess = null;
            DistanceRunning=0;
            clearInterval(IntervalTime);
        }
    }