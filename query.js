const { User, Task } = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Find all users with their associated tasks
// Raw SQL: SELECT * FROM "Users" JOIN tasks ON "Tasks"."userId" = "Users".id;

const findAllWithTasks = async () => {
    const users = await User.findAll({
        include: [{
            model: Task
        }]
    });
    console.log("All users with their associated tasks:", JSON.stringify(users, null, 4));
}

const findSpecicTasks = async () => {
    const users = await User.findAll({
        include: [{
            model: Task,
            where: { title: "Work on Unit 3." }
        }]
    });
    console.log("All users with their associated tasks:", JSON.stringify(users, null, 4));
}


const run = async () => {
    await findAllWithTasks()
    
   
    await process.exit()
}

run()
