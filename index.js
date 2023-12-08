const readline = require('readline');

const taskLogs = new Map();//cmd => logStr
let logBreak = false,
	lastLogLines = 0,
	refreshTimer;

/**
 *Refresh logs to cli
 *
 * @param {boolean} [forceOutput=false] if not in TTY, this method will not output by default, set to true to force output when it's the last task log
 */
function refreshLogs(forceOutput=false) {
	if(!process.stdout.isTTY&&!forceOutput)return;
	if (!taskLogs.size) return;
	if (!logBreak) {
		readline.moveCursor(process.stdout, -999, -lastLogLines);
		readline.clearScreenDown(process.stdout);
	}
	const content = [...taskLogs].map(i => {
		if (i[1] instanceof Function) {
			return i[1]();
		} else {
			return i[1];
		}
	}).join('\n');
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
/**
 *Strat auto refresh
 *
 * @param {*} msInterval
 */
function autoRefreshStart(msInterval) {
	if (refreshTimer) {
		clearInterval(refreshTimer);
	}
	refreshTimer = setInterval(refreshLogs, msInterval);
}
/**
 *Stop auto refresh
 *Notice: this method will do an extra refreshing
 *
 */
function autoRefreshStop() {
	clearInterval(refreshTimer);
	refreshLogs(true);
	refreshTimer = null;
}

exports.tasks = taskLogs;
exports.refreshLogs = refreshLogs;
exports.breakLog = breakLog;
exports.autoRefreshStart = autoRefreshStart;
exports.autoRefreshStop = autoRefreshStop;