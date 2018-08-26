<template lang="pug">
#app
  TodoInputter(
    @submitTodo="onSubmitTodo"
  )
  TodoList(
    :todoList="todoList"
    @statusChange="onTodoStatusChange"
    @delete="onTodoDelete"
  )
</template>

<script lang="ts">
import Vue from 'vue';
import uuid from 'uuid';
import { findIndex } from 'lodash';
import TodoInputter from './components/TodoInputter.vue';
import TodoList from './components/TodoList.vue';

interface Data {
  todoList: any
}

export default Vue.extend({
  name: 'App',
  components: {
    TodoInputter,
    TodoList
  },
  data(): Data {
    const todoList = [
      {
        id: uuid(),
        isDone: true,
        text: 'todo',
        deadline: new Date()
      },
      {
        id: uuid(),
        isDone: false,
        text: 'todo2',
        deadline: new Date()
      },
      {
        id: uuid(),
        isDone: false,
        text: 'todo3',
        deadline: new Date()
      },
      {
        id: uuid(),
        isDone: true,
        text: 'todo4',
        deadline: new Date()
      },
      {
        id: uuid(),
        isDone: false,
        text: 'todo5',
        deadline: new Date()
      }
    ];
    return {
      todoList
    };
  },
  methods: {
    /**
     * todoInputterからのコールバック
     * @param {{ text: string, deadline: Date}} todo - todo情報
     */
    onSubmitTodo(todo) {
      const newTodo = {
        ...todo,
        id: uuid(),
        isDone: false
      };
      this.todoList = [newTodo].concat(this.todoList);
    },
    /**
     * todoStatusの切り替え
     * @param {string} todoId - todoId
     */
    onTodoStatusChange(todoId) {
      console.log(todoId);
      const index = findIndex(this.todoList, { id: todoId });
      this.$set(this.todoList, index, {
        ...this.todoList[index],
        isDone: !this.todoList[index].isDone
      });
    },
    /**
     * todoの削除
     * @param {string} todoId - todoId
     */
    onTodoDelete(todoId) {
      this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
    }
  }
});
</script>

<style scoped lang="scss">
#app {
  margin: 10px;
}
</style>
