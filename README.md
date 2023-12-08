# node-cli-multitask-log
refresh log in situ for multi tasks

## Usage
```javascript
const taskLog = require('cli-multitask-log');

//'tasks' is just a Map object, it saves the log content for the tasks
//so you can set any key that can be a key for a Map object
taskLog.tasks.set('task1','log content here');//'task1' is just a key, it won't be displayed
taskLog.tasks.set('task2',()=>'random:'+Math.random());//set function as the value for generating log content before refresh
//IMPORTANT: order of the tasks is the same as the order of the keys in the Map object


//to delete a task
taskLog.tasks.delete('task1');
//to clear all tasks
taskLog.tasks.clear();


//manual refresh
taskLog.refreshLogs();
//NOTICE: This method will not output anything in none TTY environments
//to force output the last result, use
taskLog.refreshLogs(true);


//or start an auto refresh task
taskLog.autoRefreshStart(1000);//set auto refresh interval to 1000ms
//then stop it when you want
taskLog.autoRefreshStop();
//it will clear tasks by default, if you want to keep tasks,use
taskLog.autoRefreshStop(false);


//normally you shoud not log other things when logging task logs
//but if you do, you must call breakLog() after your log to prevent it from being overwritten
taskLog.breakLog();
```

Here are all the usages above, just a simple log tool.

This lib also contaions a simple progress bar:
```javascript
taskLog.tasks.set('any name',
	taskLog.simpleProgress('>', () => [process.uptime() * 1000, 100000])
);
```