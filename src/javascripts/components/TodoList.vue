<template lang="pug">
.todo-list
  h1.title todolist
  transition-group(
    tag="ul",
    class="list",
    name="flip-list",
    appear,
    @before-appear="onBeforeAppear",
    @after-appear="onAfterAppear"
  )
    template(v-for="(todo, index) in todoList")
      li.todo(
        :key="todo.id",
        :class="{ 'todo--done': todo.isDone }",
        :data-index="index"
      )
        .todo__line
          button.todo__status(
            type="button",
            @click="$emit('statusChange', todo.id)"
          )
            | {{ todo.isDone ? 'DONE' : 'DOING' }}
          .todo__deadline 締切：{{ todo.deadline | formatDate }}
          .todo__delete(
            @click="$emit('delete', todo.id)"
          )
        .todo__text {{ todo.text }}
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  filters: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = ('00' + (date.getMonth() + 1)).slice(-2); // eslint-disable-line prefer-template
      const day = ('00' + date.getDate()).slice(-2); // eslint-disable-line prefer-template
      return `${year}-${month}-${day}`;
    }
  },
  props: {
    todoList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    onBeforeAppear(el) {
      // 要素に直接手を加える
      el.style.transitionDelay = `${el.dataset.index * 0.1}s`;
    },
    onAfterAppear(el) {
      el.style.transitionDelay = '';
    }
  }
});
</script>

<style lang="scss" scoped>
.todo-list {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  border: solid 1px #ccc;
}
.title {
  text-align: center;
}

// transition-groupアニメーション
.flip-list {
  // 要素が動くときにtransitionを設定する（.todoでtransitionを設定しているため-moveで書く必要はない）
  // &-move {
  //   transition: transform 0.5s;
  // }

  // 要素が入るときのアニメーション
  &-enter {
    &-active {
      opacity: 0;
      transform: translate3d(0, -30px, 0);
    }
    &-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  // 要素が消える時のアニメーション
  &-leave {
    &-active {
      position: absolute;
    }
    &-to {
      opacity: 0;
      transform: translate3d(0, -30px, 0);
    }
  }
}

.list {
  position: relative;
}

.todo {
  $root: &;
  width: calc(100% - 22px);  // absoluteした時に幅がなくなるので、width指定する
  border: solid 1px #ccc;
  padding: 10px;
  background-color: #fff;
  transition: all 0.5s;

  // flipアニメーションで先頭の要素が消えた後にmarginの値が変わって移動するのが変なので、最初から値は統一する
  margin-top: 10px;
  // & + & {
  //   margin-top: 10px;
  // }

  &__line {
    display: flex;
    justify-content: space-between;
  }

  &__status {
    width: 60px;
    padding: 5px;
    line-height: 1;
    border-radius: 5px;
    background-color: #ccf;
    border: solid 1px #aaf;
    flex: 0 0 auto;
    transition: background-color 0.5s;

    #{$root}--done & {
      background-color: #eee;
      border-color: #ccc;
    }
  }

  &__deadline {
    flex: 1 1 auto;
    padding-right: 10px;
    text-align: right;
  }

  &__delete {
    position: relative;
    width: 30px;
    flex: 0 0 auto;
    &::before, &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 70%;
      height: 2px;
      background-color: #ccc;
      content: ''
    }
    &::before {
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
    }
    &::after {
      transform: translate3d(-50%, -50%, 0) rotate(135deg);
    }
  }

  &__text {
    margin-top: 5px;
  }
}
</style>
