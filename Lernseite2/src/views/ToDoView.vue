<template>
  <section class="todo-view">
    <h2>📝 Deine To-Dos</h2>

    <!-- Eingabe für neues To-Do -->
    <div class="todo-input">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Neues To-Do hinzufügen..."
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">Hinzufügen</button>
    </div>

    <!-- Aktive To-Dos -->
    <div class="todo-list">
      <h3>🌟 Aktive To-Dos</h3>
      <ul>
        <li v-for="todo in activeTodos" :key="todo.id" class="todo-item">
          <div class="delete-button" @click="confirmDelete(todo.id)">🗑️</div>
          <div class="circle" @click="toggleComplete(todo.id)">
            <span v-if="todo.completed" class="checkmark">✔</span>
          </div>
          <p>{{ todo.text }}</p>
        </li>
      </ul>
    </div>

    <!-- Archivierte To-Dos -->
    <div class="todo-archive">
  <h3 @click="toggleArchive">
    📦 Archiv {{ archiveOpen ? '⯆' : '⯈' }} ({{ archivedTodos.length }})
  </h3>
  <ul v-show="archiveOpen">
    <li
      v-for="todo in archivedTodos"
      :key="todo.id"
      class="todo-item archived"
    >
      <div class="delete-button" @click="confirmDelete(todo.id)">🗑️</div>
      <div class="circle" @click="toggleComplete(todo.id)">
        <span class="checkmark">✔</span>
      </div>
      <p>{{ todo.text }}</p>
    </li>
  </ul>
</div>

  </section>
</template>

<script>
export default {
  name: "ToDoView",
  data() {
    return {
      newTodo: "",
      todos: [], // Alle To-Dos (aktive und archivierte)
      archiveOpen: false, // Steuert das Archiv-Dropdown
    };
  },
  computed: {
    activeTodos() {
      return this.todos.filter((todo) => !todo.completed);
    },
    archivedTodos() {
      return this.todos.filter((todo) => todo.completed);
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== "") {
        const newTask = {
          id: Date.now().toString(),
          text: this.newTodo.trim(),
          completed: false,
        };
        this.todos.push(newTask);
        this.newTodo = "";
        this.saveTodos();
      }
    },
    toggleComplete(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed; // Status umkehren
        this.saveTodos();
      }
    },
    confirmDelete(id) {
      if (confirm("Möchtest du dieses To-Do wirklich löschen?")) {
        this.deleteTodo(id);
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    },
    toggleArchive() {
      this.archiveOpen = !this.archiveOpen;
    },
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    loadTodos() {
      const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      this.todos = savedTodos;
    },
  },
  mounted() {
    this.loadTodos();
  },
};
</script>

<style scoped>
.todo-view {
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  background-color: #fefcfb;
  color: #4a4a4a;
}

.todo-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.todo-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f3f8;
}

.todo-input input::placeholder {
  color: #8c8c8c;
}

.todo-input button {
  padding: 10px 15px;
  background-color: #b9a9e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-input button:hover {
  background-color: #a495d4;
}

.todo-list ul,
.todo-archive ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease;
}

.todo-item p {
  margin: 0;
  font-size: 1rem;
}

.todo-item.archived p {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  font-size: 1.2rem;
  color: #d9534f;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.3s ease;
}

.delete-button:hover {
  transform: scale(1.2);
  color: #c9302c;
}

.circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.circle:hover {
  border-color: #b9a9e8;
  background-color: #edeaff;
}

.circle .checkmark {
  font-size: 1.2rem;
  color: #4caf50;
}

.todo-archive {
  margin-top: 2rem;
}

.todo-archive h3 {
  cursor: pointer;
  color: #555;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .todo-item p {
    font-size: 0.9rem;
  }

  .circle {
    width: 30px;
    height: 30px;
  }
}
</style>
