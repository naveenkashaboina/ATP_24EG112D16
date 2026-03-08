
//write a fn that recieves any no of args
function sum(...a){
    let s=a.reduce((acc,e)=>acc+e)
    return s
}

console.log(sum(10,20,30,40))