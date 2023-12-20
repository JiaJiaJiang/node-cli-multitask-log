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
async function refreshLogs(forceOutput = false) {
	if (!process.stdout.isTTY && !forceOutput) return;
	if (!taskLogs.size) return;
	if (!logBreak) {
		readline.moveCursor(process.stdout, -999, -lastLogLines);
		readline.clearScreenDown(process.stdout);
	}
	const content = (await Promise.all([...taskLogs].map(i => {
		if (i[1] instanceof Function) {
			return i[1]();
		} else {
			return i[1];
		}
	}))).join('\n');
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
 * @param {boolean} [clearTasks=true] clear tasks after stopped
 */
async function autoRefreshStop(clearTasks = true) {
	clearInterval(refreshTimer);
	await refreshLogs(true);
	refreshTimer = null;
	if (clearTasks) taskLogs.clear();
}
/**
 *A simple progress demo
 *
 * @param {string} [barChar='>'] character to fill the done part
 * @param {Function} dataFunc a function return an Array of number: [done,total]
 * @returns {Function} return a function that generate the progress bar
 */
function simpleProgress(barChar = '>', dataFunc) {
	return () => {
		const data = dataFunc();
		return barChar.repeat(Math.min(process.stdout.columns, Math.round(process.stdout.columns * (data[0] / data[1]))));
	};
}

exports.tasks = taskLogs;
exports.refreshLogs = refreshLogs;
exports.breakLog = breakLog;
exports.autoRefreshStart = autoRefreshStart;
exports.autoRefreshStop = autoRefreshStop;
exports.simpleProgress = simpleProgress;