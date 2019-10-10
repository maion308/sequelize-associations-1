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

// Find all users
// Raw SQL: SELECT * FROM "Users";

const findAll = async () => {
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 4));
}

// Create a new user
// Raw SQL: INSERT INTO users (id, firstName, lastName, email, password) VALUES (DEFAULT, 'Jane', 'Doe', 'jane@jane.com', '321cba')
const createUser = async () => {
    const jane = await User.create({ firstName: "Jane", lastName: "Doe", email: "jane@jane.com" })
    console.log("Jane's auto-generated ID:", jane.id)
}


// Delete everyone named "Jane"
// Raw SQL: DELETE FROM users WHERE firstName = 'Jane'
const destroyUser = async () => {
    const destroyed = await User.destroy({
        where: {
            firstName: "Jane"
        }
    })
    console.log("Destroyed:", destroyed);
}

// Change lastname "Doe" to "Smith"
// UPDATE users SET lastName='Smith' WHERE lastName = 'Doe'
const updateUser = async () => {
    const updated = await User.update({ lastName: "Smith" }, {
        where: {
            lastName: "Doe"
        }
    })
    console.log("Updated:", updated);
}

// Find all users and only show their email
// Raw SQL: SELECT email FROM users;
const findAllEmails = async () => {
    const emails = await User.findAll({
        attributes: ['email']
    })
    console.log("All user emails:", JSON.stringify(emails, null, 4));
}

// Find all users where firstname is John
// Raw SQL: SELECT * FROM users WHERE firstName = "John";
const findAllJohns = async () => {
    const johns = await User.findAll({
        where: {
            firstName: "John"
        }
    })
    console.log("All users with first name John:", JSON.stringify(johns, null, 4));
}

// Find all users where firstname is either John or Jane
// Raw SQL: SELECT * FROM user WHERE firstName = "John" OR firstName = "Jane";
const findAllJohnsOrJanes = async () => {
    const johnOrJanes = await User.findAll({
        where: {
            [Op.or]: [{ firstName: "John" }, { firstName: "Jane" }]
        }
    })
    console.log("All users with first name John or Jane:", JSON.stringify(johnOrJanes, null, 4));
}

const run = async () => {
    await findAllWithTasks()
    // await findAllJohnsWithTasks()
    // await findAll()
    // await createUser()
    // await destroyUser()
    // await updateUser()
    // await findAllEmails()
    // await findAllJohns()
    // await findAllJohnsOrJanes()
    await process.exit()
}

run()
