const readline = require('readline');

const taskLogs = new Map();//cmd => logStr
let logBreak = false,
	lastLogLines = 0,
	refreshTimer;

function refreshLogs() {
	if (!taskLogs.size) return;
	if (!logBreak) {
		readline.moveCursor(process.stdout, -999, -lastLogLines);
		readline.clearScreenDown(process.stdout);
	}
	const content = [...taskLogs].map(i => i[1]).join('\n');
	console.log(content);
	lastLogLines = [...content.matchAll(/\n/g)].length + 1;//+one return from above log
	logBreak = false;
}
/**
 * After you do other console.log|error|... operations, 
 * you must call this method to prevent your log from being overwritten
 */
function breakLog() {
	logBreak = true;
}
function autoRefreshStart(msInterval) {
	if (refreshTimer) {
		clearInterval(refreshTimer);
	}
	refreshTimer = setInterval(refreshLogs, msInterval);
}
function autoRefreshStop() {
	clearInterval(refreshTimer);
	refreshTimer = null;
}

exports.tasks = taskLogs;
exports.refreshLogs = refreshLogs;
exports.breakLog = breakLog;
exports.autoRefreshStart = autoRefreshStart;
exports.autoRefreshStop = autoRefreshStop;