<template>
  <section class="flashcards-view">
    <h2>📝 Karteikarten</h2>
    <p>👷 Noch in Arbeit 🚧</p>

    <!-- Container für Filter und Eingabefelder -->
    <div class="top-container">
      <!-- Filterbereich -->
      <div class="filter-options">
        <p>🔍 Wähle, was du wiederholen möchtest:</p>
        <label
          v-for="(color, key) in colors"
          :key="key"
          :style="{ color: color.text }"
        >
          <input type="checkbox" v-model="filters" :value="key" />
          <span class="emoji">{{ color.emoji }} ({{ cardCount[key] }})</span>
        </label>
      </div>

      <!-- Eingabefelder für neue Karten -->
      <div class="flashcards-input">
        <input v-model="newQuestion" type="text" placeholder="Frage eingeben..." />
        <input v-model="newAnswer" type="text" placeholder="Antwort eingeben..." />
        <button @click="addCard">Karte hinzufügen</button>
      </div>
    </div>

    <!-- Kartenanzeige -->
    <div v-if="filteredCards.length" class="flashcard-container">
      <!-- Navigation-Buttons -->
      <div class="navigation-buttons">
        <button @click="prevCard">&#x2039;</button>
        <button @click="nextCard">&#x203A;</button>
      </div>

      <!-- Wrapper für Karte und Buttons -->
      <div class="flashcard-wrapper">
        <!-- Flashcard -->
        <div
          class="flashcard"
          :style="{ backgroundColor: getBackgroundColor(activeCard.color) }"
        >
          <div :class="['flashcard-inner', { flipped: activeCard.flipped }]">
            <div class="flashcard-front" @click="toggleAnswer()">
              <p>{{ activeCard.question }}</p>
            </div>
            <div class="flashcard-back" @click="toggleAnswer()">
              <p>{{ activeCard.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Buttons und Dropdown neben der Flashcard -->
        <div class="flashcard-controls">
          <select v-model="activeCard.color" @change="saveCards">
            <option v-for="(color, key) in colors" :key="key" :value="key">
              {{ colors[key].emoji }} {{ colors[key].description }}
            </option>
          </select>
          <button class="edit" @click="editCard">✏️ Bearbeiten</button>
          <button class="delete" @click="deleteCard">🗑️ Löschen</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Keine Karteikarten vorhanden.</p>
    </div>
  </section>
</template>



<script>
export default {
  name: "FlashcardsView",
  data() {
    return {
      newQuestion: "",
      newAnswer: "",
      cards: [],
      activeIndex: 0, // Index der aktuell angezeigten Karte
      filters: ["red", "yellow", "green", "blue"], // Farbfilter
      colors: {
        red: {
          key: "red",
          background: "#f8d7da",
          text: "#e74c3c",
          emoji: "❗",
          description: "Oft wiederholen",
        },
        yellow: {
          key: "yellow",
          background: "#fff3cd",
          text: "#f39c12",
          emoji: "🤏",
          description: "Teilweise Gemerkt",
        },
        green: {
          key: "green",
          background: "#d4edda",
          text: "#27ae60",
          emoji: "✅",
          description: "Gemerkt",
        },
        blue: {
          key: "blue",
          background: "#d1ecf1",
          text: "#3498db",
          emoji: "📦",
          description: "Gerade unwichtig",
        },
      },
    };
  },
  computed: {
    cardCount() {
      return this.cards.reduce(
        (count, card) => {
          count[card.color]++;
          return count;
        },
        { red: 0, yellow: 0, green: 0, blue: 0 }
      );
    },
    filteredCards() {
      return this.cards.filter((card) => this.filters.includes(card.color));
    },
    activeCard() {
      return this.filteredCards[this.activeIndex] || {};
    },
  },
  methods: {

    addCard() {
      if (this.newQuestion.trim() && this.newAnswer.trim()) {
        this.cards.push({
          question: this.newQuestion.trim(),
          answer: this.newAnswer.trim(),
          flipped: false,
          color: "red", // Standardmäßig ROT
        });
        this.newQuestion = "";
        this.newAnswer = "";
        this.saveCards();
      }
    },
    toggleAnswer() {
      this.activeCard.flipped = !this.activeCard.flipped;
      this.saveCards();
    },
    deleteCard() {
      const filteredIndex = this.filteredCards.indexOf(this.activeCard);
      this.cards.splice(filteredIndex, 1);
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
      this.saveCards();
    },
    editCard() {
      const updatedQuestion = prompt(
        "Neue Frage eingeben:",
        this.activeCard.question
      );
      const updatedAnswer = prompt(
        "Neue Antwort eingeben:",
        this.activeCard.answer
      );
      if (updatedQuestion !== null && updatedAnswer !== null) {
        this.activeCard.question = updatedQuestion.trim();
        this.activeCard.answer = updatedAnswer.trim();
        this.saveCards();
      }
    },
    getBackgroundColor(colorKey) {
      const color = this.colors[colorKey];
      return color ? color.background : "#ffffff";
    },
    prevCard() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    nextCard() {
      if (this.activeIndex < this.filteredCards.length - 1) {
        this.activeIndex++;
      }
    },
    saveCards() {
      localStorage.setItem("flashcards", JSON.stringify(this.cards));
    },
    loadCards() {
      const savedCards = JSON.parse(localStorage.getItem("flashcards") || "[]");
      this.cards = savedCards;
    },
    resetToFirstCard() {
      // Setzt den Index auf die erste Karte nach einem Filterwechsel
      this.activeIndex = 0;
    },
  },
  mounted() {
    this.loadCards();
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap");

.flashcards-view {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #3b3b3b;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.top-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.filter-options {
  flex: 1;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-width: 260px;
}

.filter-options p {
  margin-bottom: 1rem;
  font-weight: bold;
  color: #444;
}

.filter-options label {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  color: #444;
}

.filter-options input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.3);
  cursor: pointer;
}

.flashcards-input {
  flex: 2;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.flashcards-input input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f7f7f7;
}

.flashcards-input input:focus {
  border-color: #4a91e29d;
  outline: none;
}

.flashcards-input button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.flashcards-input button:hover {
  background-color: #45a049a6;
}

.flashcard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.flashcard-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 20px 0;
}

.flashcard {
  width: 350px;
  height: 220px;
  perspective: 1000px;
  position: relative;
  border-radius: 10px;
}





.flashcard-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.flashcard-controls select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.2s ease;
  width: 200px;
}

.flashcard-controls select:focus {
  border-color: #4a90e2;
  outline: none;
}

.flashcard-controls button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 200px;
}

.flashcard-controls button.edit {
  background-color: #4caf50;
  color: white;
}

.flashcard-controls button.edit:hover {
  background-color: #45a049;
}

.flashcard-controls button.delete {
  background-color: #e74c3c;
  color: white;
}

.flashcard-controls button.delete:hover {
  background-color: #c0392b;
}


.flashcard-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  position: relative;
  border-radius: 10px;
}

.flashcard-inner.flipped {
  transform: rotateY(180deg);
}
.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 90%;
  height: 82%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  overflow-y: auto; /* Ermöglicht Scrollen bei langem Text */
  word-wrap: break-word; /* Lässt Wörter umbrechen */
}
.flashcard-front {
  transition: background-color 0.3s ease;
}


.flashcard-back {
  background-color: #f0f2f5; /* Neutrale Farbe */
  color: #333; /* Textfarbe der Antwort */
  transform: rotateY(180deg);
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 0.1rem; /* Abstand zur Flashcard */
}

.navigation-buttons button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navigation-buttons button:hover {
  background-color: #357abd;
}
.color-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.color-controls select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.color-controls select:focus {
  border-color: #4a90e2;
  outline: none;
}

.color-controls button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.color-controls button:hover {
  background-color: #357abd;
  color: #ffffff;
}

.color-controls button:active {
  transform: scale(0.95);
}

.color-controls button.edit {
  background-color: #4caf50;
  color: white;
}

.color-controls button.delete {
  background-color: #e74c3c;
  color: white;
}


</style>
