const {Timespan, Runner} = require("./Runner")
const Queue = require("bull")

class GlovaroTaskScheduler {
    constructor(options) {
        this.options = options
        this._queue = new Queue('default', '', this.options)
        this._queueOptions = {}
        this.tasks = []
        this._currentTask = null
    }

   start(cb=null) {
       //console.log(this._queue)
      // console.log(this.tasks)
       for(let k of this.tasks) {
           this._queue.add(k["Name"], k["data"], k["options"])
           this._queue.process(k["Name"], 2,cb)

       }
        
        return this;
   }

   async CountTask() {
    return await this._queue.count()
   }
   AddTask(data, Name=null, options=null) {
         
       //this._queue.add(Name, data, options)
       const task_data = {Name:Name, data:data, options:options, added:true}
       this.tasks.push(task_data)
       this._currentTask = task_data;
        
        return this;
   }

   Run(cb) {
       let that = this
       if(this._queueOptions && Array.from(Object.keys(this._queueOptions)).length > 0) {
           //this._queue = new Queue('default', '', this.options)
            let newTask = []
            for(let k of this.tasks) {
                newTask.push({Name:k["Name"], data:k["data"], options:that._queueOptions})
            }
            this.tasks = newTask;
            console.log("tt", this.tasks)
       }
       //console.log("func", cb)
        this.start(cb)
   }

   daily() {
       const string ='* * * * *'
       const options = {repeat:{cron:Runner.Daily()}}
       this._queueOptions = options
   }
   every() {
       const opts = this._queueOptions;
       this._queueOptions = opts
       return this;
   }

   OneSeconds() {
       let options = {...this._queueOptions}
       options["repeat"]= {cron:Timespan.FromSeconds(1)}
       this._queueOptions = options
       return this;
   }
    
   CreateSchedule(Name, options) {
        this._queue = new Queue(Name, {red})
    }

    static instance(options) {
        return new GlovaroTaskScheduler(options)
    }
}

module.exports = {GlovaroTaskScheduler}