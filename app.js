const {GlovaroTaskScheduler} = require("./GlovaroSchedulingService")
const { Runner, Timespan } = require("./Runner")
const TaskScheduler =  GlovaroTaskScheduler


const app = TaskScheduler.instance({redis:{port:6379, host:'localhost'}})

app.AddTask({name:"olatunde", city:'lagos'}, 'FirstTask', 
{repeat:{every:1000}})
.AddTask({name:'abiodun', city:'Abuja'}, 'second task')
.every().OneSeconds().Run((job, dt)=>{
    console.log("curent Data" + job.data)
})
//app.CountTask().then(res=>console.log(res)).catch(er=>console.log(er))