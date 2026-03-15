
// 1. Find the big number in given two numbers
let a=10,b=20
if(a>b)
    console.log(a)
else 
    console.log(b)

// 2. Find the big number in given three numbers
let c=30
if(a>b){
    if(a>c)
        console.log(a)
    else
        console.log(c)
}
else{
    if(b>c)
        console.log(b)
    else
        console.log(c)
}
// 3. Find the sum of marks in [90,78,65,98]
let arr=[90,78,65,98]
let total=0;
for(let i=0;i<arr.length;i++)
total+=arr[i]
console.log(total)

// 4. Find the smallest element in marks array
let min=99999;
for(let i=0;i<arr.length;i++)
if(min>arr[i])
    min=arr[i]
console.log(min)

// 5. Write a function that receives 3 number 
//     args and  return the big number 
function big(a,b,c){
    if(a>b){
    if(a>c)
        return(a)
    else
        return(c)
}
else{
    if(b>c)
        return(b)
    else
        return(c)
}
}
console.log(big(a,b,c))

// 6. Write a function that receives an 
//     array as arg and return their sum
function sum(arr){
    let sum=0;
    for(let i=0;i<arr.length;i++)
        sum+=arr[i];
    return sum;
}
console.log(sum([a,b,c,40]))

// 7. Write a function that receives an array &
//      search element as args and returns the index of
//      that search element in the array. It should return 
//      "not found" when search element not found.
function search(arr,b){
    
    for(let i=0;i<arr.length;i++)
        if(arr[i]==b)
            return i;
    return "Search elment not found"
}
console.log(search(arr,60))