/*********SQLHelper*******/
var RunBotdb = {};
RunBotdb.db = null;
// Función para crear la base de datos
RunBotdb.open = function(options) {
    console.log("openDatabase");
    if (typeof openDatabase == "undefined") return;
    // Opciones por defecto
    var options = options || {};
    options.name = options.name || 'noname';
    options.mb = options.mb || (5 * 1024 * 1024);
    options.description = options.description || 'no description';
    options.version = options.version || '1.0';

    // Definimos el tamaño en MB
    var dbSize = options.mb ;

    try{
        RunBotdb.db = openDatabase(options.name, options.version, options.description, dbSize);

    }catch(e)
    {
        Lungo.Notification.error("Error",e,'remove',2);
    }
};
// ExecuteSql
RunBotdb.executeSql = function(sql, data, onSuccess, onError){
    console.log("executeSql");
    if (!RunBotdb.db) return;
    RunBotdb.db.transaction(function(tx){tx.executeSql(sql, data,onSuccess,onError);});
};
function Initsqlstorage()
{
    console.log("Initsqlstorage");
    var opt = {
        name: "RunnerBotApp",
        mb: 102400,
        description: 'App DB RunnerBotApp',
        version: "1.0"
    };
    RunBotdb.open(opt);
    RunBotdb.executeSql("Select * from Config", [],
        function(tx, r){
            if(r.rows.length==0)
               InitsqlstorageQuerys();
           else
               initViews();
       },
       function(tx, e){
        InitsqlstorageQuerys();
    });
    //

}
function InitsqlstorageQuerys()
{
console.log("InitsqlstorageQuerys");
//  var db = openDatabase('RunnerBotApp', '1.0', 'App DB RunnerBotApp', 200000);
var Profiledb="CREATE TABLE IF NOT EXISTS Profile (Id INTEGER PRIMARY KEY ASC,Name TEXT,SurName TEXT,Age INTEGER,Weight INTEGER,Gender TEXT,Rol TEXT,Email TEXT,Points INTEGER,Win INTEGER,Lose INTEGER)";
var ProfileData='INSERT INTO Profile (Name,SurName,Age,Weight,Gender,Rol,Email,Points,Win,Lose) VALUES ("-","-",0,0,"-","",0,1000,1000,0)';
var Socialdb="CREATE TABLE IF NOT EXISTS SocialMedia (Id INTEGER PRIMARY KEY ASC,Comment TEXT,Social TEXT,Date DATETIME,IdTraining INTEGER)";
var Trainingdb="CREATE TABLE IF NOT EXISTS Training (Id INTEGER PRIMARY KEY ASC,IdUser INTEGER, Date TEXT,IdGame INTEGER,Name TEXT,Description INTEGER, TimeTotal INTEGER,TimeAVG INTEGER,TimeKm INTEGER,TimeBest INTEGER,PointsWin INTEGER,PointsLose INTEGER,Reached INTEGER,Calories INTEGER,Distance REAL)";
var GeoPosdb="CREATE TABLE IF NOT EXISTS Geopos (Id INTEGER PRIMARY KEY ASC,IdTraining INTEGER,Lat TEXT,Long TEXT,VelAVG INTEGER,Velocity INTEGER,Height INTEGER,Time DATETIME,Milestone INTEGER,Distance TEXT)";
var Configdb="CREATE TABLE IF NOT EXISTS Config (Id INTEGER PRIMARY KEY ASC,Param TEXT,Description TEXT,Type INTEGER,ValuesOPT TEXT,ValueSelected TEXT,OrderOPT INTEGER)";
var ConfigData=[
'INSERT INTO Config (Param,Description,Type,ValuesOPT,ValueSelected,OrderOPT) VALUES ("Milestone","lblConfigKm",1,"1/0",1,0)',
'INSERT INTO Config (Param,Description,Type,ValuesOPT,ValueSelected,OrderOPT) VALUES ("Sounds","lblConfigSounds",1,"1/0",1,1)',
'INSERT INTO Config (Param,Description,Type,ValuesOPT,ValueSelected,OrderOPT) VALUES ("Intro","lblConfigIntro",1,"1/0",1,2)',
'INSERT INTO Config (Param,Description,Type,ValuesOPT,ValueSelected,OrderOPT) VALUES ("Language","lblConfigLang",2,"ES|ESPAÑOL/CA|CATALAN/EN|ENGLISH","ES",3)'
];

var Gamesdb="CREATE TABLE IF NOT EXISTS Games (Id INTEGER PRIMARY KEY ASC,Name TEXT,Subtitle TEXT,Description TEXT,Points INTEGER,Duration INTEGER,Difficulty INTEGER, Image TEXT)";
var GamesData=[
'INSERT INTO Games (Name,Subtitle,Description,Points,Duration,Difficulty,Image) VALUES ("lblGameTitleFree","lblGameSubTitleFree","lblGameDescFree",500,0,0,"/free.jpg")',
'INSERT INTO Games (Name,Subtitle,Description,Points,Duration,Difficulty,Image) VALUES ("lblGameTitleRescue","lblGameSubTitleRescue","lblGameDescRescue",700,30,1,"/hostage.jpg")',
'INSERT INTO Games (Name,Subtitle,Description,Points,Duration,Difficulty,Image) VALUES ("lblGameTitleZoo","lblGameSubTitleZoo","lblGameDescZoo",800,30,1,"/zoo.jpg")',
'INSERT INTO Games (Name,Subtitle,Description,Points,Duration,Difficulty,Image) VALUES ("lblGameTitleShadow","lblGameSubTitleShadow","lblGameDescShadow",1500,0,2,"/shadow.jpg")',
'INSERT INTO Games (Name,Subtitle,Description,Points,Duration,Difficulty,Image) VALUES ("lblGameTitleVirus","lblGameSubTitleVirus","lblGameDescVirus",1000,45,3,"/cure.jpg")',
];
//var dpMatrix=[Profiledb,Socialdb,Trainingdb,GeoPosdb,Configdb,Gamesdb];

// Abrimos la base de datos



var totaldbcreated=0;
//for (var i = 0; i <dpMatrix.length ; i++) {
// Creamos la tabla
RunBotdb.executeSql(Profiledb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql(Socialdb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql(Trainingdb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql(GeoPosdb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql(Configdb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql(Gamesdb, [],
    function(tx, r){
        totaldbcreated++;
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
//}

RunBotdb.executeSql("Select * from Config", [],
    function(tx, r){
        if(r.rows.length==0)
            for (var i = 0; i <ConfigData.length ; i++) {
            // Creamos la tabla
            RunBotdb.executeSql(ConfigData[i], [],
                function(tx, r){
                },
                function(tx, e){
                    Lungo.Notification.error(e.message, 'remove');
                });
        }
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql("Select * from Games", [],
    function(tx, r){
        if(r.rows.length==0)
            for (var i = 0; i <GamesData.length ; i++) {
            // Creamos la tabla
            RunBotdb.executeSql(GamesData[i], [],
                function(tx, r){
                },
                function(tx, e){
                    Lungo.Notification.error(e.message, 'remove');
                });
        }
    },
    function(tx, e){
        Lungo.Notification.error(e.message, 'remove');
    });
RunBotdb.executeSql("Select * from Profile", [],
    function(tx, r){
        if(r.rows.length==0)
            RunBotdb.executeSql(ProfileData, [],
                function(tx, r){
                    initViews();
                },
                function(tx, e){
                    Lungo.Notification.error(e.message);
                });
    },
    function(tx, e){
        Lungo.Notification.error(e.message);
    });

//results.rows.item(i).log 
}
/*GEOPOS*/
function InsertGeoPos(ObjGeo)
{
    console.log("InsertGeoPos");
    RunBotdb.executeSql('INSERT INTO Geopos (IdTraining ,Lat ,Long ,VelAVG ,Velocity ,Height ,Time ,Milestone ,Distance ) VALUES (?,?,?,?,?,?,?,?,?)', ObjGeo,
        function(tx, r){
            console.log("ok "+ObjGeo);
        },
        function(tx, e){
            debugger;
            Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
        });

}
function SelectGeoPosByIdTrMi(ObjTr,callbackfn)
{
    console.log("SelectGeoPosByIdTrMi");
// Seleccionamos por training
RunBotdb.executeSql('SELECT * FROM Geopos Where IdTraining=? and Milestone=1', [ObjTr],
    function(tx, r){
        callbackfn(r.rows);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}

function SelectGeoPosByIdTr(ObjTr,callbackfn)
{
    console.log("SelectGeoPosByIdTr");
// Seleccionamos por training
RunBotdb.executeSql('SELECT * FROM Geopos Where IdTraining=?', [ObjTr],
    function(tx, r){
        callbackfn(r.rows);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}
/*History - Training*/
function InsertTraining(ObjTraining,callbackfn)
{
    console.log("InsertTraining");
    var ObjInsTr=[ObjTraining.Usr,new Date(),ObjTraining.IdGame,ObjTraining.Name];
// Insertamos un nuevo elemento
RunBotdb.executeSql('INSERT INTO Training (IdUser, Date,IdGame,Name) VALUES (?,?,?,?)', ObjInsTr,
    function(tx, r){
        RunBotdb.executeSql('SELECT * FROM Training ORDER BY Id Desc', [],
            function(txs, rs){
               if(rs.rows.length>0)
                callbackfn(rs.rows.item(0));
            else
                Lungo.Notification.error("Error","InsertTraining",'remove',2);
        },
        function(txs, es){
            Lungo.Notification.error(CurrentLngObj.Error+" "+es.message);
        });
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}
function UpdateTraining(ObjUpdTra,callbackfn)
{
    console.log("UpdateTraining");
    debugger; 

// Insertamos un nuevo elemento
RunBotdb.executeSql('UPDATE Training SET Description=?, TimeTotal=?,TimeAVG=?,TimeKm=?,TimeBest=?,PointsWin=?,PointsLose=?,Reached=?,Calories=?,Distance=? WHERE Id=?', ObjUpdTra,
    function(tx, r){
        console.log("ok "+ObjUpdTra);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });

}
function SelectTrainigAll(callbackfn)
{
    console.log("SelectTrainigAll");
// Seleccionamos todos los training
RunBotdb.executeSql('SELECT * FROM Training ORDER BY Date Desc', [],
    function(tx, r){
        callbackfn(r.rows);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}
function SelectTrainigById(ObjTr,callbackfn)
{
    console.log("SelectTrainigById");
    var objReturn={History:{},Pos:[],PosMil:[]};
// Seleccionamos por training
RunBotdb.executeSql('SELECT * FROM Training Where Id=?', [ObjTr],
    function(tx, r){
        objReturn.History=r.rows.item(0);
        SelectGeoPosByIdTr(ObjTr,
            function(rx){
                objReturn.Pos=rx;
                SelectGeoPosByIdTrMi(ObjTr,
                    function(rx){
                        objReturn.PosMil=rx;
                        callbackfn(objReturn);
                    });
            });


    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}

/*Games*/
function SelectGames(callbackfn)
{
    console.log("SelectGames");
// Insertamos un nuevo elemento
RunBotdb.executeSql('SELECT * FROM Games ORDER BY Difficulty', [],
    function(tx, r){
        callbackfn(r.rows);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}
function SelectGamesById(ObjGame,callbackfn)
{
    console.log("SelectGamesById");
// Insertamos un nuevo elemento
RunBotdb.executeSql('SELECT * FROM Games WHERE Id=?', [ObjGame],
    function(tx, r){
        if(r.rows.length>0)
            callbackfn(r.rows.item(0));
        else
            Lungo.Notification.error("Error","SelectGamesById",'remove',2);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}

/*SocialMedia*/
function InsertSocial(ObjSocial,callbackfn)
{
    console.log("InsertSocial");
    debugger;
// Insertamos un nuevo elemento
var ObjInsSocial=[ObjSocial.Comment,ObjSocial.IdSocial,new Date(),ObjSocial.IdTraining];
// Insertamos un nuevo elemento
RunBotdb.executeSql('INSERT INTO SocialMedia (Comment,Social,Date,IdTraining) VALUES (?,?,?,?)', ObjInsSocial,
    function(tx, r){
        console.log("ok "+r);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}

/*Profile*/
function SelectProfile(callbackfn)
{
    console.log("SelectProfile");
    RunBotdb.executeSql('SELECT * FROM Profile', [],
        function(tx, r){
            callbackfn(r.rows);
        },
        function(tx, e){
            Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
        });
}

function UpdateProfile(ObjUpdUsr,callbackfn)
{
    console.log("UpdateProfile");
    RunBotdb.executeSql('UPDATE Profile SET Name=?,SurName=?,Age=?,Weight=?,Gender=?,Rol=?,Email=? WHERE Id=?', ObjUpdUsr,
        function(tx, r){
            callbackfn("ok");
        },
        function(tx, e){
            Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
        });
}

function UpdateProfileTraining(ObjUpdUsr,callbackfn)
{
console.log("UpdateProfileTraining");
    RunBotdb.executeSql('UPDATE Profile SET Points=?,Win=?,Lose=? WHERE Id=?', ObjUpdUsr,
        function(tx, r){
            console.log("ok "+ObjUpdUsr);
        },
        function(tx, e){
            Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
        });
}

/*CONFIG*/
function SelectConfigAll(callbackfn)
{
    console.log("SelectConfigAll");
// Seleccionamos todos los training
RunBotdb.executeSql('SELECT * FROM Config', [],
    function(tx, r){
        callbackfn(r.rows);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}

function SelectCurrentLanguage(callbackfn)
{
    console.log("SelectCurrentLanguage");
// Seleccionamos todos los training
RunBotdb.executeSql('SELECT ValueSelected FROM Config Where Param=?', ["Language"],
    function(tx, r){
        if(r.rows.length>0)
            callbackfn(r.rows.item(0));
        else
            Lungo.Notification.error("Error","SelectCurrentLanguage",'remove',2);
    },
    function(tx, e){
        Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
    });
}
function UpdateConfigParam(ObjUpdConf)
{
    console.log("UpdateConfigParam");
    RunBotdb.executeSql('UPDATE Config SET ValueSelected=? WHERE Param=?', ObjUpdConf,
        function(tx, r){
            App.getConfigList();
            Lungo.Notification.success(CurrentLngObj.lblDone,CurrentLngObj.lblChangeDone, 'ok', 2);
            speak(CurrentLngObj.lblChangeDone);
        },
        function(tx, e){
            Lungo.Notification.error("Error",CurrentLngObj.Error+" "+e.message,'remove',2);
        });
}

