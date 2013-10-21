Lungo.ready(function() {
     Lungo.Aside.show();
    // Lungo.Router.section("training");
  //   Initsqlstorage();
     //Lungo.Notification.show();
     //Lungo.Notification.show("home", "Please wait...");
     //Lungo.Notification.show("magic");

     //Lungo.Notification.show("Please wait", "user", 2, function(){  });
/*
     Lungo.Notification.error('Lorem ipsum dolor sit amet', "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veritatis similique sed qui doloribus inventore doloremque temporibus ab totam...", 'remove');
     Lungo.Notification.success('Lorem ipsum dolor sit amet', "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veritatis similique sed qui doloribus inventore doloremque temporibus ab totam...", 'ok');*/
     /*Lungo.Notification.confirm({
         icon: 'user',
         title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
         accept: {
             icon: 'checkmark',
             label: 'Accept',
             callback: function(){ alert("Yes!"); }
         },
         cancel: {
             icon: 'close',
             label: 'Cancel',
             callback: function(){ alert("No!"); }
         }
     });*/
    // Lungo.Notification.html("<h1 class='title'>Title</h1><article>aslkdkals</article><a href='#' class='button large anchor' >Seleccionar</a>", "Cancelar");
      //Lungo.Notification.push("Lorem ipsum dolor sit amet", "home");
});

function Initsqlstorage()
{
var db = openDatabase('RunnerBotApp', '1.0', 'App DB', 5 * 1024 * 1024);
var msg;
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS POS (id unique, lat, lon, date, usr)');
  tx.executeSql('INSERT INTO POS (id, log) VALUES (1 , "0","0",'+new Date()+',"root")');
  msg = '<p>Log message created and row inserted.</p>';
  document.querySelector('#status').innerHTML =  msg;
});
var len=0;
db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM POS', [], function (tx, results) {
   len = results.rows.length;
   msg = "<p>Found rows: " + len + "</p>";
   document.querySelector('#status').innerHTML +=  msg;
   for (i = 0; i < len; i++){
     msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
     document.querySelector('#status').innerHTML +=  msg;
   }
 }, null);
});
}

function exampleDBSQL()
{


// Ejemplo
var opt = {
    name: "ejemplo",
    mb: 1,
    description: "Base de datos de ejemplo",
    version: "1.0"
};

// Abrimos la base de datos
webdb.open(opt);

// Creamos la tabla
webdb.executeSql('CREATE TABLE IF NOT EXISTS ejemplo (ID INTEGER PRIMARY KEY ASC, texto TEXT, added_on DATETIME"', [],
            function(tx, r){
                alert("Tabla creada");
            },
            function(tx, e){
                alert("Se ha producido un error: "+e.message);
            });

// Insertamos un nuevo elemento
webdb.executeSql('INSERT INTO ejemplo (texto, added_on) VALUES (?,?)', ['Mensaje de ejemplo', new Date()],
            function(tx, r){
                alert("Elemento introducido");
            },
            function(tx, e){
                alert("Se ha producido un error: "+e.message);
            });
}

/*********SQLHelper*******/
var webdb = {};
webdb.db = null;

// Función para crear la base de datos
webdb.open = function(options) {
    if (typeof openDatabase == "undefined") return;

    // Opciones por defecto
    var options = options || {};
    options.name = options.name || 'noname';
    options.mb = options.mb || 5;
    options.description = options.description || 'no description';
    options.version = options.version || '1.0';

    // Definimos el tamaño en MB
    var dbSize = options.mb * 1024 * 1024;

    // Cargamos la base de datos
    webdb.db = openDatabase(options.name, options.version, options.description, dbSize);
}
// ExecuteSql
webdb.executeSql = function(sql, data, onSuccess, onError){
    if (!webdb.db) return;
    webdb.db.transaction(function(tx){tx.executeSql(sql, data,onSuccess,onError);});
}

function obtenerUbicacion() { 
        if (navigator.geolocation) { 
        //navigator.geolocation.watchPosition(mostrarUbicacion,onError,{timeout: 1000});
        navigator.geolocation.getCurrentPosition(mostrarUbicacion,onError);
        } else { 
            alert("Error! El navegador no soporta Geolocalizacion.");
        } 
    }
     function mostrarUbicacion(posicion){ 
     var latitud = posicion.coords.latitude; 
     var longitud = posicion.coords.longitude; 
     var altitude = posicion.coords.altitude;//: devuelve la altura de la posición
     var altitudeAccuracy = posicion.coords.altitudeAccuracy;//: precision de la altura de la posición
     var accurancy = posicion.coords.accurancy;//: precisión de la altura, en metros
     var heading = posicion.coords.heading;//: dirección y recorrido, medidos en grados alrededor de un círculo
     var speed = posicion.coords.speed;//: la velocidad de desplazamiento en metros por segundo
     var timestamp = posicion.timestamp;//: fecha y hora en que se detectó la ubicación
     }
     function showPosition(position)
{
var latlon=position.coords.latitude+","+position.coords.longitude;

var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
+latlon+"&zoom=14&size=400x300&sensor=false";

document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
}
function onError(err) {
alert();
}
function stop_watchlocation() {
    if (watchProcess != null)
    {
        navigator.geolocation.clearWatch(watchProcess);
        watchProcess = null;
    }
}