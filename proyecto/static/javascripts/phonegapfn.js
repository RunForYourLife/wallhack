
function onVolumeDownKeyDown() {
	Lungo.Notification.success("onVolumeDownKeyDown","onVolumeDownKeyDown", 'ok', 2);
}

function onVolumeUpKeyDown() {
	Lungo.Notification.success("onVolumeUpKeyDown","onVolumeUpKeyDown", 'ok', 2);
}
function menuyourCallbackFunction() {
	Lungo.Notification.success("menuyourCallbackFunction","menuyourCallbackFunction", 'ok', 2);
}
function searchyourCallbackFunction() {
	Lungo.Notification.success("searchyourCallbackFunction","searchyourCallbackFunction", 'ok', 2);
}
function backyourCallbackFunction() {
	console.log("backyourCallbackFunction");
	Lungo.Notification.success("backyourCallbackFunction","backyourCallbackFunction", 'ok', 2);
}
function batteryyourCallbackFunction(info) {
    // Handle the battery critical event
    alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
}
function playBeep() {
	console.log("playBeep");
	navigator.notification.beep(3);
}

function vibrate() {
	console.log("vibrate");
	navigator.notification.vibrate(2000);
}




function startupFail(result) {
	console.log("Startup failure = " + result);
}

function startupWin(result) {
	console.log("startupWin");
	try{
		if (result == TTS.STARTED) {
			window.plugins.tts.getLanguage(win, fail);
			changeLang();
			window.plugins.tts.speak(CurrentLngObj.Title);
			window.plugins.tts.speak(CurrentLngObj.msgMision);
		}
	}catch(error){}
}


function changeLang() {
	console.log("changeLang");
	try{
	window.plugins.tts.setLanguage(CurrentLanguage.toLowerCase(), win, fail);
	}catch(error){}
}

function win(result) {
	console.log("win : " + result);
}

function fail(result) {
	console.log("Error : " + result);
}

function speak(txt) {
	console.log("speak : "+ txt);
	try{
	if(txt==undefined)
		txt=CurrentLngObj.btnPlay;
	window.plugins.tts.speak(txt,win,fail);
	}catch(error){}
}