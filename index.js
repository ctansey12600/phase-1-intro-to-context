//Returns
// JavaScript Object with keys:
// firstName
// familyName
// title
// payPerHour
// timeInEvents
// timeOutEvents

const { template } = require("babel-core")

function createEmployeeRecord(arrayOfRecords){
    const employeeRecords = {
        firstName: `${arrayOfRecords[0]}`,
        familyName: `${arrayOfRecords[1]}`,
        title: `${arrayOfRecords[2]}`,
        payPerHour: arrayOfRecords[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecords
}

//Converts each nested Array into an employee record using 
//createEmployeeRecord and accumulates it to a new Array

function createEmployeeRecords(arrayOfRecord){
   const arrayOfRecords = []
    arrayOfRecord.map(res => {
        arrayOfRecords.push(createEmployeeRecord(res))
    })
    return arrayOfRecords
}

//Returns The employee record

function createTimeInEvent(recordObj, inDate){
    const splitDate = inDate.split(" ")
    const date = splitDate[0]
    const time = splitDate[1]
    const timeInObj = {
         type: "TimeIn",
         hour: parseInt(time),
         date: `${date}`
     }
     recordObj.timeInEvents.push(timeInObj)
     return recordObj
}

function createTimeOutEvent(recordObj, outDate){
    const splitDate = outDate.split(" ")
    const date = splitDate[0]
    const time = splitDate[1]
    const timeOutObj = {
         type: "TimeOut",
         hour: parseInt(time),
         date: `${date}`
     }
     recordObj.timeOutEvents.push(timeOutObj)
     return recordObj
}

//Returns Hours worked, an Integer

function hoursWorkedOnDate(recordObj, date){
    const timeIn = recordObj.timeInEvents
    const hourIn = []
    timeIn.filter((obj) => {
        if(obj.date === date){
            hourIn.push(obj.hour)
        }
    })
    
    const timeOut = recordObj.timeOutEvents
    const hourOut = []
    timeOut.filter((obj) => {
        if(obj.date === date){
            hourOut.push(obj.hour)
        }
    })

    const reducer = (previousValue, currentValue) => previousValue + currentValue

    const totalHourIn = hourIn.reduce(reducer)
    const totalHourOut = hourOut.reduce(reducer)

    const absoluteTotal = Math.abs(totalHourIn - totalHourOut)

    if(absoluteTotal < 1000){
        const string = absoluteTotal.toString().split(0,1)
        return parseInt(string)
    }else if(absoluteTotal > 999){
        const string = absoluteTotal.toString()
        const totalhour = string.charAt(0) + string.charAt(1)
        return parseInt(totalhour)
    }
}

// Behavior
// Using hoursWorkedOnDate, multiply the hours by the 
// record's payRate to determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(recordObj, date){
    const payRate = recordObj.payPerHour
    const hoursWorked = hoursWorkedOnDate(recordObj, date)
    return payRate * hoursWorked
}

// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked 
// by the employee in the record used as context. Amount 
// should be returned as a number. HINT: You will need to find the 
// available dates somehow...

function allWagesFor(recordObj){
    const inArray = recordObj.timeInEvents
    const totalArray = []
    inArray.map(res => {
        const inDate = res.date
        totalArray.push(wagesEarnedOnDate(recordObj, inDate))
    })

    const reducer = (previousValue, currentValue) => previousValue + currentValue

    const totalWages = totalArray.reduce(reducer)
    
    return totalWages
}

// Behavior
// Using wagesEarnedOnDate, accumulate the value of all 
// dates worked by the employee in the record used as 
// context. Amount should be returned as a number.

function calculatePayroll(recordArray){
    const totalPayrollArray = []
    recordArray.map(singleObj => {
        const recordObj = singleObj
        const  totalTimeIn = recordObj.timeInEvents
         totalTimeIn.map(singleTimeIn => {
             const inDate = singleTimeIn.date
            totalPayrollArray.push(wagesEarnedOnDate(recordObj, inDate))
         })
     })
    
     const reducer = (previousValue, currentValue) => previousValue + currentValue

     const totalPayout = totalPayrollArray.reduce(reducer)
    
     return totalPayout
 }