var ua = navigator.userAgent.toLowerCase(),
isIOS = false,
isAndroid = false,
osType = getQueryVariable('osType');
if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || osType == "IOS") {
	isIOS = true;
} else {
	isAndroid = true;
}

/**
 * 인앱 로그 함수
 */
var err_cnt = 0;
const logger = (pageId, actionId) => {
	const message = { pageId, actionId };
	try {
		if (isIOS) {
			window.webkit.messageHandlers.tts.postMessage(message);
		} else {
			window.tts.logEvent(pageId, actionId);
		}
	} catch (e) {
		if(err_cnt == 5) return;
		err_cnt++;
		setTimeout(function(){
			logger(pageId, actionId);
		}, 100);
		console.log('logEvent not found');
	}
} 
 
/**
 * 
 * url에서 parameter get
 * @param variable
 * @returns
 */
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}