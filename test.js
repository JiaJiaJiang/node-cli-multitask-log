const taskLog = require('./index');
const endTime=10000;

taskLog.tasks.set('log1',()=>'random:'+Math.random());//pass a function to generate log
taskLog.tasks.set('log2','fixed random:'+Math.random());//this is a text log, you can change the content anytime

//progress demo
taskLog.tasks.set('log3',()=>'>'.repeat(Math.min(process.stdout.columns,Math.round(process.stdout.columns*(process.uptime()*1000/endTime)))));

taskLog.autoRefreshStart(500);

setTimeout(() => {//break the log at 5s
	console.log('[Im breaking the task log]');
	taskLog.breakLog();
}, 5000);

setTimeout(()=>{//stop refresh after endTime
	taskLog.autoRefreshStop();
},endTime);