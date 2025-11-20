import fs from "fs";
import path from "path";
import {Task }from "./types"

const DATA_FILE = path.join(__dirname, "../tasks.json")

export class TaskManager{

    private getAllTasks():Task[] {
        if(!fs.existsSync(DATA_FILE)){
            return [];
        }
        const data = fs.readFileSync(DATA_FILE,'utf-8')
        return JSON.parse(data) as Task[]
    }
    private saveTasks(tasks: Task[]): void {
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
    }
   public addTask(title: string): void {
        const tasks = this.getAllTasks();
        const newTask: Task = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: title,
            completed: false
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        console.log(`✅ Task added: "${title}"`);
    }
    public listTasks(): void {
        const tasks = this.getAllTasks();
        console.log("\nYour Tasks:");
        tasks.forEach(task => {
            const status = task.completed ? "[✔]" : "[ ]";
            console.log(`${task.id}. ${status} ${task.title}`);
        });
    }
    public completeTask(id: number): void {
        const tasks = this.getAllTasks();
        const taskIndex = tasks.findIndex(t => t.id === id);
        
        if (taskIndex > -1) {
            tasks[taskIndex].completed = true;
            this.saveTasks(tasks);
            console.log(`🎉 Task ${id} marked as completed!`);
        } else {
            console.log(`❌ Task with ID ${id} not found.`);
        }
    }
}