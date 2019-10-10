# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Sequelize Associations

> Take five minutes and read the Sequelize docs on associations: 
>
> [Sequelize Association Docs](https://sequelize.org/master/class/lib/associations/base.js~Association.html)

##

Let's go into the repo:

```sh
cd sequelize-associations
npm install
```

Create your database:

```sh
npx sequelize-cli db:create
```

Let's create a task model:

```sh
npx sequelize-cli model:generate --name Task --attributes title:string,userId:integer
```

Now let's set up our association:

task.js
```js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Task;
};
```

user.js
```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: 'userId',
    })
  };
  return User;
};
```

migrations/<timestamp>-create-task.js
```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};  
```

Run our migrations:

```sh
npx sequelize-cli db:migrate
```

Create a task seed:

```sh
npx sequelize-cli seed:generate --name task
```

Create a task:
```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      title: 'Build an App.',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});

  }
};
```

Populate the database with seed data:

```sh
npx sequelize-cli db:seed:all
```

Test the database:

```sh
psql sequelize_associations_development
SELECT * FROM "Users" JOIN "Tasks" ON "Tasks"."userId" = "Users".id;
```

## Querying

```sh
node query.js
```

```js
// Find all users with their associated tasks
// Raw SQL: SELECT * FROM "Users" JOIN tasks ON "Tasks"."userId" = "Users".id;

const findAllWithTasks = async () => {
    
}

const findSpecicTasks = async () => {
    
}
```

## Resources

- https://sequelize.org/master/manual/associations.html
- https://sequelize.org/master/manual/querying.html
