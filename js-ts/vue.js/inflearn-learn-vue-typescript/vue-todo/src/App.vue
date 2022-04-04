<template>
  <div>
    <header>
      <h1>Vue todo with typescript</h1>
    </header>
    <main>
      <TodoInput
        :item="todoText"
        @input="updateTodoText"
        @add="addTodoItem"
      ></TodoInput>
      <div>
        <ul>
          <TodoListItem
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :todoItem="todoItem"
          />
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: any[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  },
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const result = JSON.parse(todoItems);
    return result;
  },
};

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as any[],
    };
  },
  methods: {
    addTodoItem() {
      const value = this.todoText;
      this.todoItems.push(value);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    updateTodoText(value: string) {
      this.todoText = value;
    },
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      this.todoText = storage.fetch();
    },
    // created() {},
  },
});
</script>

<style scoped></style>
