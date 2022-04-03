<template>
  <div>
    <h1>Vue todo with typescript</h1>
    <TodoInput
      :item="todoText"
      @input="updateTodoText"
      @add="addTodo"
    ></TodoInput>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";

export default Vue.extend({
  components: { TodoInput },
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    addTodo() {
      const value = this.todoText;
      localStorage.setItem(value, value);
      this.initTodoText();
    },
    updateTodoText(value: string) {
      this.todoText = value;
    },
    initTodoText() {
      this.todoText = "";
    },
  },
});
</script>

<style scoped></style>
