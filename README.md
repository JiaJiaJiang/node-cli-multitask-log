# node-cli-multitask-log
refresh log in situ for multi tasks

## Usage
```javascript
const taskLog = require('cli-multitask-log');

//'tasks' is just a Map object, it saves the log content for the tasks
//so you can set any key that can be a key for a Map object
taskLog.tasks.set('task1','log content here');//'task1' is just a key, it won't be displayed
taskLog.tasks.set('task2','log content here');
//to delete a task
taskLog.tasks.delete('task1');


//manual refresh
taskLog.refreshLogs();


//or start an auto refresh task
taskLog.autoRefreshStart(1000);//set auto refresh interval to 1000ms
//then stop it when you want
taskLog.autoRefreshStop();


//normally you shoud not log other things when logging task logs
//but if you do, you must call breakLog() after your log to prevent your log from being overwritten
taskLog.breakLog();
```

It's all the usages above, just a simple log tool.