<template>
  <section class="entry">
    <h2>🌟 Neues Tagebuch-Eintrag 🌟</h2>
    <form @submit.prevent="saveEntry">
      <div class="form-group">
        <label for="what-learned">📚 Was habe ich gelernt?</label>
        <textarea
          id="what-learned"
          v-model="entry.whatLearned"
          placeholder="Teile deine Lernerfahrungen..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="challenges">🧗 Herausforderungen</label>
        <textarea
          id="challenges"
          v-model="entry.challenges"
          placeholder="Welche Hürden hattest du heute?"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="success">🏆 Größter Erfolg des Tages</label>
        <textarea
          id="success"
          v-model="entry.success"
          placeholder="Was lief besonders gut?"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="proud-moment">🌟 Momente, in denen ich stolz war</label>
        <textarea
          id="proud-moment"
          v-model="entry.proudMoment"
          placeholder="Gab es etwas, das dich stolz gemacht hat?"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="discoveries">🔍 Neue Entdeckungen</label>
        <textarea
          id="discoveries"
          v-model="entry.discoveries"
          placeholder="Was hast du heute gelernt oder entdeckt, das du behalten möchtest?"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="improvement">🌱 Verbesserung für morgen</label>
        <textarea
          id="improvement"
          v-model="entry.improvement"
          placeholder="Wie kannst du morgen besser werden?"
        ></textarea>
      </div>

      <div class="form-group mood">
  <label>🌀 Wie fühlst du dich?</label>
  <div class="mood-selector">
    <span
      v-for="mood in moods"
      :key="mood.emoji"
      :class="{ selected: entry.mood === mood.emoji }"
      @click="selectMood(mood.emoji)"
    >
      {{ mood.emoji }}
    </span>
  </div>
</div>


      <div class="form-actions">
        <button type="submit">💾 Eintrag speichern</button>
      </div>
    </form>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EntryView",
  data() {
    return {
      entry: {
        id: "",
        whatLearned: "",
        challenges: "",
        success: "",
        proudMoment: "",
        discoveries: "",
        improvement: "",
        mood: "",
        timestamp: "",
      },
      moods: [
  { emoji: "😊", label: "Glücklich" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Traurig" },
  { emoji: "😠", label: "Wütend" },
  { emoji: "😴", label: "Müde" },
  { emoji: "🤔", label: "Nachdenklich" },
  { emoji: "😎", label: "Cool" },
  { emoji: "😇", label: "Zufrieden" },
],

    };
  },
  methods: {
    saveEntry() {
      this.entry.id = uuidv4();
      this.entry.timestamp = new Date().toLocaleString("de-DE");
      const entries = JSON.parse(localStorage.getItem("entries") || "[]");
      entries.push(this.entry);
      localStorage.setItem("entries", JSON.stringify(entries));
      alert("Eintrag gespeichert!");
      this.entry = {
        id: "",
        whatLearned: "",
        challenges: "",
        success: "",
        proudMoment: "",
        discoveries: "",
        improvement: "",
        mood: "",
        timestamp: "",
      };
    },
    selectMood(mood) {
      this.entry.mood = mood;
    },
  },
};
</script>

<style scoped>
.entry {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fdfcff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h2 {
  text-align: center;
  color: #b9a9e8;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

textarea {
  width: 100%;
  height: 120px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  resize: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

textarea:focus {
  border-color: #b9a9e8;
  outline: none;
}

.mood {
  text-align: center;
}

.mood-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}

.mood-selector span {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mood-selector .selected {
  transform: scale(1.2);
  box-shadow: 0px 0px 10px rgba(185, 169, 232, 0.5);
  border-radius: 50%;
}

button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #b9a9e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #a095d4;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.form-actions {
  text-align: center;
}
</style>
