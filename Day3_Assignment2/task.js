// TODO: Import validator functions
import {validateTaskTitle,validatePriority,validateDueDate} from './validator.js'

const tasks = [];
                    
      // 1. Add new task
function addTask(title, priority, dueDate) {
     if(validateDueDate(dueDate) && validatePriority(priority) && validateTaskTitle(title)){
        tasks.push({title,priority,dueDate})
        console.log("success")
    }else
        console.log("invalid title")
}
                    // 2. Get all tasks
 function getAllTasks() {
    console.log(tasks)
 }

        // 3. Mark task as complete
function completeTask(taskId) {
    tasks[taskId].mark="complete"
}

export {addTask,getAllTasks,completeTask}