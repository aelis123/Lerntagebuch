import { defineStore } from 'pinia';

export const useHefteStore = defineStore('hefteStore', {
  state: () => ({
    entries: [], // Deine Einträge
  }),
  actions: {
    addEntry(entry) {
      this.entries.push(entry);
    },
    deleteEntry(id) {
      this.entries = this.entries.filter((entry) => entry.id !== id);
    },
  },
  persist: {
    enabled: true, // Persistenz aktivieren
    strategies: [
      {
        key: 'hefteEntries', // Der Schlüssel im Local Storage
        storage: localStorage, // Speicherort (localStorage oder sessionStorage)
      },
    ],
  },
});
