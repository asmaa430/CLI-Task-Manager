import { TaskManager } from './TaskManager';

const manager = new TaskManager();
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
    case 'add':
        manager.addTask(argument);
        break;
    case 'list':
        manager.listTasks();
        break;
    case 'done':
        manager.completeTask(parseInt(argument));
        break;
    default:
        console.log("Commands: add <title>, list, done <id>");
}
