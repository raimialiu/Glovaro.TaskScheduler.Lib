let Timespan = {
    FromSeconds: (seconds)=> {
        return `*/${seconds} * * * *`
    },
    FromHours: (hour)=> {
        return `* ${hour} * * * *`
    },

    FromMinutes: (minutes)=> {
        return `${minutes} * * * * *`
    },
    FromCustom: (cronExpression)=>{
        return `${cronExpression}`
    }
}

let Runner = {
    EveryTenMinutes: '10 * * * *',
    EveryMinute: '* * * * *',
    EveryFifteenSeconds: '*/15 * * * *',
    Daily: Timespan.FromCustom('* * * * *'),
    Custom: (interval) => {
        return interval
    }
}


module.exports = {Runner, Timespan}