// models/todo.js
'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");


      console.log("Overdue");
      // FILL IN HERE
      //call overdue function
      //store it in a var
      let s = await this.overdue()
      for (let i = 0; i < s.length; i++) {
        console.log(s[i].displayableString())
      }
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      let DT = await this.dueToday()
      for (let i = 0; i < DT.length; i++) {
        console.log(DT[i].displayableString())
      }
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      let DL = await this.dueLater()
      for (let i = 0; i < DL.length; i++) {
        console.log(DL[i].displayableString())
      }
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      //should return all todos where duedate<todaysdate
      const todo = await Todo.findAll({
        where: {
        dueDate:{
          [Op.lt]:new Date().toLocaleDateString("en-CA")
        }
        }
      })
      return todo
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const todo = await Todo.findAll({
        where: {
        dueDate:{
          [Op.eq]:new Date().toLocaleDateString("en-CA")
        }
        }
      })
      return todo
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const todo = await Todo.findAll({
        where: {
        dueDate:{
          [Op.gt]:new Date().toLocaleDateString("en-CA")
        }
        }
      })
      return todo
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update({completed:true},{
        where:{
          id:id
        }
      });

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dateStr = this.dueDate === new Date().toLocaleDateString('en-CA') ? "" : this.dueDate;
      let str=`${this.id}. ${checkbox} ${this.title} ${dateStr}`;

      return str.trim()
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};