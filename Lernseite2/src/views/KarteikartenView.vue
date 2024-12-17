<template>
  <section class="flashcards-view">
    <h2>📝 Karteikarten</h2>

    <!-- Container für Filter und Eingabefelder -->
    <div class="top-container">
      <!-- Filterbereich -->
      <div class="filter-options">
        <p>🔍 Anzeigen nach Farbe:</p>
        <label v-for="(color, key) in colors" :key="key" :style="{ color: color.text }">
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
      <div
        v-for="(card, index) in filteredCards"
        :key="index"
        class="flashcard"
        :style="{ backgroundColor: getBackgroundColor(card.color) }"
      >
        <div :class="['flashcard-inner', { flipped: card.flipped }]">
          <div class="flashcard-front" @click="toggleAnswer(index)">
            <p>{{ card.question }}</p>
          </div>
          <div class="flashcard-back" @click="toggleAnswer(index)">
            <p>{{ card.answer }}</p>
          </div>
        </div>

        <!-- Farbampel zur Aktualisierung -->
        <div class="color-controls">
          <button
            v-for="(color, key) in colors"
            :key="key"
            :style="{ backgroundColor: color.background }"
            @click="updateCardColor(index, color.key)"
          ></button>
        </div>

        <!-- Bearbeiten und Löschen Buttons -->
        <div class="card-actions">
          <button @click="editCard(index)">✏️ Bearbeiten</button>
          <button @click="deleteCard(index)">🗑️ Löschen</button>
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
          description: "Teilweise Ahnung",
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
          description: "Irrelevant",
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
    toggleAnswer(index) {
      this.cards[index].flipped = !this.cards[index].flipped;
    },
    updateCardColor(index, color) {
      this.cards[index].color = color;
      this.saveCards();
    },
    deleteCard(index) {
      this.cards.splice(index, 1);
      this.saveCards();
    },
    editCard(index) {
      const updatedQuestion = prompt(
        "Neue Frage eingeben:",
        this.cards[index].question
      );
      const updatedAnswer = prompt(
        "Neue Antwort eingeben:",
        this.cards[index].answer
      );
      if (updatedQuestion !== null && updatedAnswer !== null) {
        this.cards[index].question = updatedQuestion.trim();
        this.cards[index].answer = updatedAnswer.trim();
        this.saveCards();
      }
    },
    getBackgroundColor(colorKey) {
      const color = this.colors[colorKey];
      return color ? color.background : "#ffffff";
    },
    saveCards() {
      localStorage.setItem("flashcards", JSON.stringify(this.cards));
    },
    loadCards() {
      const savedCards = JSON.parse(localStorage.getItem("flashcards") || "[]");
      this.cards = savedCards;
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
  padding: 1.5rem;
  background-color: #fefcfb;
  border-radius: 10px;
}
.filter-options {
  flex: 1;
  min-width: 250px;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 10px; /* Abstand zwischen Checkbox und Emoji */
  cursor: pointer;
  font-size: 1.2rem; /* Größere Schrift für bessere Lesbarkeit */
  margin-bottom: 0.5rem;
}

.filter-options input[type="checkbox"] {
  width: 20px; /* Breite der Checkbox */
  height: 20px; /* Höhe der Checkbox */
  transform: scale(1.5); /* Checkbox vergrößern */
  cursor: pointer; /* Zeiger anzeigen */
}


h2 {
  text-align: center;
  color: #b9a9e8;
}

.card-summary {
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-summary-container {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.emoji {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #333;
}

.summary-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  color: #4a4a4a;
  font-weight: bold;
}

.summary-item.red {
  background-color: #f8d7da;
}

.summary-item.yellow {
  background-color: #fff3cd;
}

.summary-item.green {
  background-color: #d4edda;
}

.summary-item.blue {
  background-color: #d1ecf1;
}

.flashcards-input {
  flex: 2;
  display: flex;
  gap: 10px;
}

.flashcards-input input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.top-container {
  display: flex;
  gap: 20px; /* Abstand zwischen Filter und Eingabefeldern */
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.flashcards-input input::placeholder {
  color: #aaa;
  font-style: italic;
}

.flashcards-input input:focus {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flashcards-input button {
  background-color: #b9a9e8;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.flashcards-input button:hover {
  background-color: #8a7cb7;
}

.flashcards-input button:active {
  transform: translateY(0);
  box-shadow: none;
}


.flashcard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.flashcard {
  width: 200px;
  height: 150px;
  perspective: 1000px;
  font-family: "Annie Use Your Telescope", Arial, Helvetica, sans-serif;
}

.flashcard-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  width: 100%;
  height: 100%;
  position: relative;
}

.flashcard-inner.flipped {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  backface-visibility: hidden;
  border: 1px solid #b9a9e8;
  border-radius: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.flashcard-back {
  transform: rotateY(180deg);
  background-color: #f4f3f8;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.card-actions button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
}
</style>
