import {addTask,getAllTasks,completeTask} from './task.js'

         // Test your module system
// 1. Add some tasks
addTask("navi","high",'2026-03-05')
addTask("harish","low",'2026-03-15')
addTask("vishnu","medium",'2026-03-25')
addTask("pavan","super",'2026-03-05')

// 2. Display all tasks
getAllTasks()

// 3. Complete a task
completeTask(0)

// 4. Display all tasks again
getAllTasks()