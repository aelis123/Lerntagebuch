import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import EntryView from '../views/EntryView.vue';
import EntriesView from '../views/EntriesView.vue';
import ToDoView from '../views/ToDoView.vue';
import DocumentationView from '../views/DocumentationView.vue';
import DictionaryView from '../views/DictionaryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // BASE_URL für korrektes Routing
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/entry',
      name: 'entry',
      component: EntryView,
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: DocumentationView
    },
    {
      path: '/entries',
      name: 'entries',
      component: EntriesView,


    },
    {
      path: '/ToDos',
      name: 'todos',
      component: ToDoView,

    },
    {
    path: '/dictionary',
    name: 'dictionary',
    component: DictionaryView,
  }
  ],
});

export default router;
