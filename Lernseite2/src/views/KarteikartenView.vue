<template>
  <section class="flashcards-view">
    <h2>📝 Karteikarten</h2>


    <!-- Container für Filter und Eingabefelder -->
    <div class="top-container">
      <!-- Filterbereich -->
      <div class="filter-options">
        <p>🔍 Wähle, was du wiederholen möchtest:</p>
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
      <div class="navigation-buttons">
        <button @click="prevCard">&#x2039;</button>
      </div>
      <div class="flashcard" :style="{ backgroundColor: getBackgroundColor(activeCard.color) }">
        <div :class="['flashcard-inner', { flipped: activeCard.flipped }]">
          <div class="flashcard-front" @click="toggleAnswer()">
            <p>{{ activeCard.question }}</p>
          </div>
          <div class="flashcard-back" @click="toggleAnswer()">
            <p>{{ activeCard.answer }}</p>
          </div>
        </div>

        <!-- Dropdown-Menü zur Farbaktualisierung und Buttons -->
        <div class="color-controls">
          <select v-model="activeCard.color" @change="saveCards">
            <option v-for="(color, key) in colors" :key="key" :value="key">
              {{ colors[key].emoji }} {{ colors[key].description }}
            </option>
          </select>
          <button @click="editCard()">✏️</button>
          <button @click="deleteCard()">🗑️</button>
        </div>
      </div>
      <div class="navigation-buttons">
        <button @click="nextCard">    &#x203A;    </button>
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
  },
  mounted() {
    this.loadCards();
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap");

.flashcards-view {
  padding: 3rem;
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
  gap: 0.5rem; /* Abstand zwischen Checkbox und Emoji */
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
  gap: 1rem;
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
  margin: 2.5rem;
}

.flashcards-input input {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.flashcard-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem; /* Nach oben schieben angepasst */
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem; /* Abstand zur Karte */
}

.navigation-buttons button {
  background-color: #b9a9e8af;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
}

.navigation-buttons button:hover {
  background-color: #b9a9e8e8;
}

.top-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0;
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

.flashcard {
  width: 300px; /* Einheitliche Breite */
  height: auto; /* Automatische Höhe, um Text und Inhalte anzupassen */
  perspective: 1000px;
  font-family: "Annie Use Your Telescope", Arial, Helvetica, sans-serif;
  background-color: #ffffff; /* Weißer Hintergrund für bessere Lesbarkeit */
  border-radius: 10px; /* Abgerundete Ecken */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Schatten für visuelle Trennung */
  padding: 10px; /* Innenabstand für Inhalte */
  display: flex;
  flex-direction: column; /* Elemente untereinander anordnen */
  align-items: center; /* Zentriert ausrichten */
}

.flashcard-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flashcard-inner.flipped {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  backface-visibility: hidden;
  border: 1px solid #b9a9e8;
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: auto; /* Scrollbars aktivieren */
  padding: 10px; /* Abstand zwischen Text und Rand */
  box-sizing: border-box; /* Bezieht Padding in die Gesamtgröße ein */
}

.flashcard-front p,
.flashcard-back p {
  max-height: 100%; /* Begrenzung auf die Kartenhöhe */
  overflow-y: auto; /* Vertikales Scrollen, wenn nötig */
  margin: 0; /* Abstand entfernen */
}

.flashcard-back {
  transform: rotateY(180deg);
  background-color: #f4f3f8;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 1rem; /* Abstand zwischen Buttons */
  margin-top: 10px; /* Abstand nach oben */
}

.card-actions button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.card-actions button:hover {
  background-color: #5a6268;
}

.color-controls {
  display: flex;
  justify-content: center; /* Zentriert unter der Karte */
  align-items: center;
  gap: 0.5rem; /* Abstand zwischen Dropdown und Buttons */
  margin-top: 10px;
}

.color-controls select {
  background-color: #f4f3f8;
  border: 1px solid #b9a9e8;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  font-family: "Annie Use Your Telescope", Arial, Helvetica, sans-serif;
}

.color-controls select:hover {
  background-color: #eae9f2;
}

.color-controls button {
  background-color: #b9a9e8;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Annie Use Your Telescope", Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.color-controls button:hover {
  background-color: #8a7cb7;
}

.color-controls button:active {
  transform: translateY(2px);
}

@media (max-width: 768px) {
  .top-container {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin-top: 0;
  }

  .flashcards-input {
    flex-direction: column;
    gap: 10px;
    margin-left: 0;
  }

  .flashcards-input input {
    width: 100%;
    font-size: 1rem;
  }

  .flashcards-input button {
    width: 100%;
    padding: 12px;
  }

  .flashcard-container {
    display: flex;
    flex-direction: column; /* Alle Karten übereinander für mobile Geräte */
    align-items: center; /* Karten zentrieren */
    gap: 1rem;
    margin-top: 1rem;
  }

  .flashcard {
    width: 90%;
    height: auto; /* Automatische Höhe */
  }

  .flashcard-inner {
    font-size: 1rem;
  }

  .navigation-buttons {
    flex-direction: row; /* Buttons nebeneinander */
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .color-controls {
    flex-direction: column;
    gap: 5px;
  }

  .color-controls select,
  .color-controls button {
    width: 100%;
    font-size: 0.9rem;
  }
}

</style>
