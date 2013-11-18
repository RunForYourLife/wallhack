var CurrentTraining={};
var CurrentTrainingPaused=false;
var CurrentUser={};
var CurrentGame={};
var CurrentLanguage="ES";
var CurrentLngObj=null;
var App = (function(lng, undefined) {

    startRun = function(event) {
        console.log("startRun");
        if(!CurrentTrainingPaused)
        {
            InsertTraining({Usr:CurrentUser.Id,IdGame:CurrentGame.Id,Name:CurrentGame.Name},App.setTraining);
        }
        else{
            getGeoLocation();
        }
        $$("#Runstartbtn").hide();
        $$("#Runpausebtn").show();
        $$("#Runstopbtn").show();
    };
    setTraining= function(training) {
        console.log("setTraining");
        CurrentTraining=training;
        getGeoLocation();
        
    };
    stopRun= function(event) {
        console.log("stopRun");
        stop_watchlocation();
        App.calculateAVGTraining();
        $$("#Runstartbtn").show();
        $$("#Runpausebtn").hide();
        $$("#Runstopbtn").hide();

    };
    pauseRun= function(event)
    {
        console.log("pauseRun");
        pausegetGeoLocation();
        $$("#Runstartbtn").show();
        $$("#Runpausebtn").hide();
        $$("#Runstopbtn").show();
    };

    
    getConfigList= function(event) {
console.log("getConfigList");


        SelectConfigAll(App.showConfigList);
        setHeaderFooter(CurrentLngObj.btnConfig);
    };
    showTraining=function(event)
    {
        console.log("showTraining");
        $$("article#run").html("");
        var template = $$('#TrainningTpl').html();
        var obj={
            GameName:getTxtLang(CurrentGame.Name),
            GameSubtitle:getTxtLang(CurrentGame.Subtitle),
            btnStart:CurrentLngObj.btnStart,
            btnPause:CurrentLngObj.btnPause,
            btnStop:CurrentLngObj.btnStop,
            btnChange:CurrentLngObj.btnChange,
            lblTime:CurrentLngObj.lblTime,
            lblRecord:CurrentLngObj.lblRecord,
            lblDistance:CurrentLngObj.lblDistance,
            lblSpeed:CurrentLngObj.lblSpeed
        };
        var html = Mustache.to_html(template, obj);
        $$("article#run").html(html);
        setHeaderFooter(CurrentLngObj.btnTraining);

        $$("#Runstartbtn").show();
        $$("#Runpausebtn").hide();
        $$("#Runstopbtn").hide();
    };
    showConfigList= function(response) {
        console.log("showConfigList");
        //todo:cambiar textos por bbdd
        var content="<form><ul class='list' id='configlistul'>";
        for (var i = 0; i < response.length; i++)
        {
            content+="<li class='' id='"+response.item(i).Id+"'><strong>"+getTxtLang(response.item(i).Description)+"</strong>";
            switch(response.item(i).Type)
            {
                case 1:
                content+="<label class='checkbox'><input type='checkbox' id='"+response.item(i).Param+"' ";
                if(response.item(i).ValueSelected==1)
                    content+="checked";
                content+="></label>";
                break;
                case 2:
                content+="<select id='"+response.item(i).Param+"' onchange='App.setLanguage(this)' >";
                var values=response.item(i).ValuesOPT;
                var opts=values.split("/");
                for (var j = 0; j < opts.length; j++) {
                    var obj=opts[j].split("|");
                    content+="<option value='"+obj[0]+"' ";
                    if(response.item(i).ValueSelected==obj[0])
                        {content+="selected";}
                    content+=" >"+obj[1]+"</option>";
                };
                content+="></select>";
                break;
            }

            content+="</li>";
        };
        content+="</ul></form>";
       // $$("#configlist li input").touch(App.setConfig);
        $$("article#configlist").html(content);
    };
    setLanguage=function(obj)
    {
        console.log("setLanguage");
     var objConf=[$$(obj).val(),obj.id];

     UpdateConfigParam(objConf);

     setObjLang($$(obj).val());
 },
 getCurrentLang=function(){
console.log("getCurrentLang");
    SelectCurrentLanguage(function(r){setObjLang(r.ValueSelected);App.setInitLayer();});
};
setConfig=function(event)
{
    console.log("setConfig");
    var value=$$("#"+event.currentTarget.id).val();
    if(event.currentTarget.type=="checkbox")
        value=$$("#"+event.currentTarget.id)[0].checked?"1":"0";

    var objConf=[value,event.currentTarget.id];

    UpdateConfigParam(objConf);
};
getGamesList= function(getGamesList) {
    console.log("setInitLayer");
    SelectGames(showGamesList);
    setHeaderFooter(CurrentLngObj.btnGames);
};
getGame= function(event) {
    console.log("getGame");
    SelectGamesById(event.currentTarget.id,App.showGamesId);
};
showGamesId= function(response) {
    console.log("showGamesId");
    $$("article#gameslist").removeClass("active");
    $$("article#gamesId").addClass("active");
    var template = $$('#GamesIdTpl').html();
    var obj={
        Id:response.Id,
        Name:getTxtLang(response.Name),
        Subtitle:getTxtLang(response.Subtitle),
        Description:getTxtLang(response.Description),
        btnPlay:CurrentLngObj.btnPlay
    };
    var html = Mustache.to_html(template, obj);
    $$("article#gamesId").html(html);
    //$$("#dvgame a").tap(App.setGameById);
};
showGamesList= function(response) {
    console.log("showGamesList");
    $$("article#gameslist").addClass("active");
    $$("article#gamesId").removeClass("active");
    var template = $$('#GamesListTpl').html();
    var data={data:[]};
    for (var i = 0; i < response.length; i++) 
    {
        var obj={
            Id:response.item(i).Id,
            Name:getTxtLang(response.item(i).Name),
            Subtitle:getTxtLang(response.item(i).Subtitle),
            Description:getTxtLang(response.item(i).Description)
        };
        data.data.push(obj);
    };

    var html = Mustache.to_html(template, data);
    $$("ul#gameslistul").html(html);
};
getGamesInit= function() {
    console.log("getGamesInit");
    SelectGames(App.setFirstGame);
};
setFirstGame= function(games) {
    console.log("setInitLayer");
    App.setGame(games.item(0));
},
setGame= function(game) {
    console.log("setGame");
    CurrentGame=game;
};
setGameById= function(game) {
    console.log("setGameById");
    SelectGamesById(game.currentTarget.id,function(game){
        App.setGame(game);
        Lungo.Router.section("training");
    });

};
getHistoryList= function(event) {
    console.log("getHistoryList");
    SelectTrainigAll(App.showHistoryList);
    setHeaderFooter(CurrentLngObj.btnHistory);
};
getShareList= function(event) {
    console.log("getShareList");
    setHeaderFooter(CurrentLngObj.btnShare);
};
showHistoryList= function(response) {
    console.log("showHistoryList");
    $$("article#historylist").addClass("active");
    $$("article#historyId").removeClass("active");
    var template = $$('#HistoryListTpl').html();
    var data={data:[]};
    for (var i = 0; i < response.length; i++) 
    {
        var obj={
            Id:response.item(i).Id,
            Name:getTxtLang(response.item(i).Name),
            DateTime:getDate(response.item(i).Date)

        };
        data.data.push(obj);
    };
    var html = Mustache.to_html(template, data);

    $$("ul#ulhistorylist").html(html);
};
getHistory= function(event) {
    console.log("getHistory");
    SelectTrainigById(event.currentTarget.id,App.showHistoryId);
};
showHistoryId= function(response) {
    console.log("showHistoryId");
    $$("article#historylist").removeClass("active");
    $$("article#historyId").addClass("active");
    var template = $$('#HistoryIdTpl').html();
    var obj={
        Id:response.History.Id,
        Name:getTxtLang(response.History.Name),
        DateTime:getDate(response.History.Date),
        Milestones:response.PosMil.length,
        Geopos:response.Pos.length,
    };
    var html = Mustache.to_html(template, obj);
    $$("article#historyId").html(html);
}; 
setInitLayer= function() {
console.log("setInitLayer");
   var template = $$('#PrincipalTpl').html();
   var html = Mustache.to_html(template, CurrentLngObj);
   $$("article#principal").html(html);
   App.setHeaderFooter(CurrentLngObj.Title);
   App.setAsideContent();
};    
setAsideContent= function() {
    console.log("setAsideContent");
   var template = $$('#AsideTpl').html();
   var html = Mustache.to_html(template, CurrentLngObj);
   $$("article#asidePrincipal").html(html);
    console.log("$$('article#asidePrincipal').html(html);");
   Lungo.Aside.show();
};
getProfile= function() {
    console.log("getProfile");
    SelectProfile(App.setUser);
};
setUser= function(user) {
    console.log("setUser");
    CurrentUser=user.item(0);
};
setHeaderFooter= function(title) {
    console.log("setHeaderFooter" + title);
    App.setHeader(title);
    App.setFooter();
};
setHeader= function(title) {
    console.log("setHeader"+title);
   var template = $$('#HeaderTpl').html();
   var html = Mustache.to_html(template, {Title:title});
   $$("section.show header").html(html);
};

setFooter= function(obj) {
    console.log("setFooter");
   var template = $$('#FooterTpl').html();
   var html = Mustache.to_html(template, CurrentLngObj);
   $$("section.show footer").html(html);
};
updateUser=function(event){
    console.log("updateUser");
    var objprofile=[
    $$("#regUsername").val(),
    $$("#regFirstName").val(),
    $$("#regAge").val(),
    $$("#regPeso").val(),
    $$("#regGenero").val(),
    $$("#regRol").val(),
    $$("#regEmail").val(),
    CurrentUser.Id
    ];
    UpdateProfile(objprofile,function(result){
        App.getProfile();
        Lungo.Notification.success(CurrentLngObj.lblDone,CurrentLngObj.msgProfileSucces, 'ok', 2);
        speak(CurrentLngObj.msgProfileSucces);
    });
};
viewProfile= function(event) {
    console.log("viewProfile");
    $$("#regUsername").val(CurrentUser.Name);
    $$("#regFirstName").val(CurrentUser.SurName);
    $$("#regPeso").val(""+CurrentUser.Weight);
    $$("#regAge").val(""+CurrentUser.Age);
    $$("#regEmail").val(CurrentUser.Email);
    $$("#regGenero").val(CurrentUser.Gender);
    $$("#regRol").val(CurrentUser.Rol);
    $$("#regPoints").html(CurrentUser.Points);
    $$("#regPointsWin").html(CurrentUser.Win);
    $$("#regPointsLose").html(CurrentUser.Lose);
};
getDate=function(obj) {
    console.log("getDate");
    try {
        var value=new Date(obj);
        var month=value.getMonth()+1;
        return (value.getDate()<10?'0' +value.getDate():value.getDate())+ "/" + (month<10?'0' +month:month) + "/" + value.getFullYear() + " - " + getHour(value);
    } catch (error) {
        return "-";
    }
};
getHour=function (date) {
    console.log("getHour");
    try {
        return '' + ('0' + ((date.getHours() % 24) || 12)).replace(/.*(\d\d)$/, '$1') + ':' + ('0' + date.getMinutes()).replace(/.*(\d\d)$/, '$1');
    } catch (error) {
        return "-";
    }
};
getDistance=function (lat1,lon1,lat2,lon2) {
    console.log("getDistance");
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad(); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};
return {
    startRun: startRun,
    stopRun: stopRun,
    setTraining: setTraining,
    getGamesList: getGamesList,
    showGamesList: showGamesList,
    getHistoryList: getHistoryList,
    showHistoryList: showHistoryList,
    getHistory: getHistory,
    showHistoryId: showHistoryId,
    getProfile: getProfile,
    setUser: setUser,
    viewProfile: viewProfile,
    updateUser: updateUser,
    getGame: getGame,
    showGamesId: showGamesId,
    getGamesInit: getGamesInit,
    setFirstGame: setFirstGame,
    setGame: setGame,
    getConfigList: getConfigList,
    showConfigList: showConfigList,
    setConfig: setConfig,
    setLanguage: setLanguage,
    getCurrentLang: getCurrentLang,
    setInitLayer: setInitLayer,
    setAsideContent: setAsideContent,
    getDate: getDate,
    getHour: getHour,
    setHeader: setHeader,
    setFooter: setFooter,
    setHeaderFooter: setHeaderFooter,
    getShareList: getShareList,
    getDistance: getDistance,
    pauseRun: pauseRun,
    showTraining: showTraining,
    setGameById: setGameById,
};

})(Lungo);

Lungo.Events.init({
   'load section#games': function(event) {
    console.log("load section#games");
    App.getGamesList();
   // $$("#gameslistul li").tap(App.getGame);

},
'tap #gameslistul li':App.getGame,
'tap #dvgame a':App.setGameById,
'load section#history':function(event) {
    console.log("load section#history");
    App.getHistoryList();
//    $$("#historylist li").tap(App.historylist);
},
'tap #historylist li':App.getHistory,
'load section#profile': function(event) {
    console.log("load section#profile");
    App.viewProfile();
    setHeaderFooter(CurrentLngObj.btnProfile);
    
},
'touch #configlist li input':App.setConfig,
'tap #btnSaveProfile':App.updateUser,
'tap #Runstartbtn':App.startRun,
'tap #Runpausebtn':App.pauseRun,
'tap #Runstopbtn':App.stopRun,
'load section#training': function(event) {
  console.log("load section#training");
  App.showTraining();
},
'load article#configlist': function(event) {
    console.log("load article#configlist");
    App.getConfigList();
},
'load section#share': function(event) {
    console.log("load section#share");
    App.getShareList();
},
'load section#main': function(event) {
    console.log("load section#main");
    App.setInitLayer();
},
'tap a[data-view-aside=menuoptions]':function(event) {
    console.log("tap a[data-view-aside=menuoptions]");
    App.setAsideContent();
}
});

Lungo.ready(function() {
    console.log("Lungo.ready");
    init();
});
var initDone=false;
function initViews()
{
    console.log("initViews");
    App.getCurrentLang();
    App.getProfile();
    App.getGamesInit();
}

function init()
{
    console.log("init");
    if(!initDone){
        console.log(initDone);
     //Lungo.Aside.show();
     Initsqlstorage();
     
     initDone=true;
 }
}
devidereadyfn= function(event)
{
    console.log("devidereadyfn");
    init();
try{
     window.plugins.tts.startup(startupWin, startupFail);
 }catch(error){}
};

document.addEventListener("deviceready", devidereadyfn, false);
/*document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
document.addEventListener("menubutton", menuyourCallbackFunction, false);
document.addEventListener("searchbutton", searchyourCallbackFunction, false);
window.addEventListener("batterycritical", batteryyourCallbackFunction, false);
*/
document.addEventListener("backbutton", backyourCallbackFunction, false);

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}}
