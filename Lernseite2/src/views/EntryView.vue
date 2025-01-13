<template>
  <section class="entry">
    <h2>🌟 Neuer Tagebuch-Eintrag 🌟</h2>
    <form @submit.prevent="saveEntry">
      <div class="form-group date-picker">
  <label for="entry-date">📅 Für welchen Tag ist dieser Eintrag?</label>
  <input
    id="entry-date"
    type="date"
    v-model="entry.date"
    :max="today"
    class="date-input"
  />
</div>

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
        <label for="mood">🌀 Wie fühlst du dich?</label>
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
export default {
  name: "EntryView",
  data() {
    return {
      entry: {
        id: null,
        date: "",
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
        { emoji: "😌", label: "Erleichtert" },
        { emoji: "🤒", label: "Krank" },
      ],
      today: new Date().toISOString().split("T")[0], // Aktuelles Datum für die Maximalgrenze
    };
  },
  methods: {
    saveEntry() {
      const entries = JSON.parse(localStorage.getItem("entries") || "[]");

      const newId = entries.length + 1;
      this.entry.id = newId;

      // Standarddatum verwenden, falls kein Datum ausgewählt wurde
      if (!this.entry.date) {
        this.entry.date = this.today;
      }

      // Uhrzeit für den Eintrag speichern
      const now = new Date();
      this.entry.timestamp = `${this.entry.date}T${now.toTimeString().split(" ")[0]}`;

      entries.push(this.entry);
      localStorage.setItem("entries", JSON.stringify(entries));

      alert("Eintrag gespeichert!");

      this.resetEntry();
    },
    selectMood(mood) {
      this.entry.mood = mood;
    },
    resetEntry() {
      this.entry = {
        id: null,
        date: "",
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
  },
};
</script>

<style scoped>

.date-picker {
  margin-bottom: 1.5rem;
}

.date-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fdfcff;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.date-input:focus {
  border-color: #b9a9e8;
  outline: none;
  box-shadow: 0px 0px 6px rgba(185, 169, 232, 0.5);
}

.date-input:hover {
  border-color: #b9a9e8;
}

.form-group label {
  color: #333;
  margin-bottom: 0.5rem;
}


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
