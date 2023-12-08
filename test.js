const taskLog = require('./index');

const timer=setInterval(()=>{
	taskLog.tasks.set('random1','r1:'+Math.random());
	taskLog.tasks.set('random2','r2:'+Math.random());
},100);

taskLog.autoRefreshStart(500);

setTimeout(() => {//break the log at 5s
	console.log('[Im breaking the task log]');
	taskLog.breakLog();
}, 5000);

setTimeout(()=>{//stop refresh after 10s
	taskLog.autoRefreshStop();
	clearInterval(timer);
},10000);