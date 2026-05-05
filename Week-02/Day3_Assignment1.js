// Assignment 1: Daily Temperature Analyzer
// ----------------------------------------
// Scenario : You are analyzing daily temperatures recorded by a weather app.

// Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

// Tasks:

//     1. filter() temperatures above 35
const temp=temperatures.filter(function (element){
    return element>35
})
console.log(temp)

//     2. map() to convert all temperatures from Celsius → Fahrenheit
const Fahrenheit=temperatures.map(tempObj=>{
    return (tempObj*9/5)+32
})
console.log(Fahrenheit)

//     3. reduce() to calculate average temperature
const totalTemp=temperatures.reduce((acc,temp)=>acc+temp)
avgTemp=totalTemp/temperatures.length
console.log(avgTemp)

//     4. find() first temperature above 40
const temp40=temperatures.find(temp=> temp>40)
console.log(temp40)

//     5. findIndex() of temperature 28
console.log(temperatures.findIndex(temp=> temp==28))