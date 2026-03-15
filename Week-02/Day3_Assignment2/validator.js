// TODO: Export these validation functions

    // 1. Validate task title (not empty, min 3 chars)
let validateTaskTitle=function(title){
    if(title!=null && title.length>=3)
        return true
    return false
}

    // 2. Validate priority (must be: low, medium, high)
let validatePriority=function(priority){
    if(priority=="low" || priority=="medium" || priority=="high")
       return true
    return false
}
    // 3. Validate due date (must be future date)
let validateDueDate=function(date){
    let today=new Date();
    let due = new Date(date)
if(due>today)
    return true
return false
}


export {validateTaskTitle,validatePriority,validateDueDate}