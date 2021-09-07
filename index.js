function createEmployeeRecord(array){
    let obj = {}
    obj.firstName = array[0]
    obj.familyName = array[1]
    obj.title = array[2]
    obj.payPerHour = array[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}


function createEmployeeRecords(array){
    let emptyArray = array.map((value => {
        return createEmployeeRecord(value)
    }))
    return emptyArray
}



function createTimeInEvent(object, time){
    let splitTime = time.split(" ")
    let numHour = parseInt(splitTime[1])
    object.timeInEvents = [ {
        type : "TimeIn",
        hour : numHour,
        date : splitTime[0]
    }]
    return object
}

function createTimeOutEvent(object, time){
    let splitTime = time.split(" ")
    let numHour = parseInt(splitTime[1])
    object.timeOutEvents = [ {
        type : "TimeOut",
        hour : numHour,
        date : splitTime[0]
    }]
    return object
}



function hoursWorkedOnDate(object, time){
    let timeIn = object.timeInEvents
    let timeOut = object.timeOutEvents
    let hTimeIn = timeIn[0].date
    let hTimeOut = timeOut[0].date

    let totalIn
    let totalOut

    if( hTimeIn === `${time}`){
        let num = timeIn[0].hour 
        let string = num.toString()
        let arrayIn = [`${string}`]
        let value = `${arrayIn[0]}`
        //for statement gets ['900'] to array of [ "9", "0"
        let arrayValue = []
        for (let i = 0; i < value.length; i++) {
            arrayValue.push(value.charAt(i))
        }
        let arraySingleValue = []
        arrayValue.map((res) => {
            if (res > 0){
            arraySingleValue.push(parseInt(res))}
        })
        totalIn = parseInt(arraySingleValue.join(""))
    } 

    if( hTimeOut === `${time}`){
        let num = timeOut[0].hour 
        let string = num.toString()
        let arrayOut = [`${string}`]
        let value = `${arrayOut[0]}`
        //for statement gets ['900'] to array of [ "9", "0"
        let arrayValue = []
        for (let i = 0; i < value.length; i++) {
            arrayValue.push(value.charAt(i))
        }
        if (arrayValue.length < 4){
         let arraySingleValue = []
         arrayValue.map((res) => {
            if (res > 0){
            arraySingleValue.push(parseInt(res))}
        })}
        else if (arrayValue.length = 4){
            
        }
        totalOut = parseInt(arraySingleValue.join(""))
    } 
    
    if(totalIn < totalOut){
        return totalOut - totalIn
    }else if(totalOut < totalIn){
        return totalIn - totalOut 
    }
}

function wagesEarnedOnDate(object, time){
    let hoursWorked = hoursWorkedOnDate(object, time)
    let payRate = object.payPerHour
    return payRate * hoursWorked
}



function allWagesFor(object){
    let time = object.timeInEvents[0].date
    console.log(object.timeInEvents[0].)
    console.log(wagesEarnedOnDate(object, time))
}