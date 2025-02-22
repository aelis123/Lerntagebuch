<template>
  <section class="entries">
    <h2>Deine Einträge</h2>
    <div v-if="entries.length === 0">Keine Einträge vorhanden.</div>
    <div class="controls">
      <button @click="sortEntries">Sortieren: {{ sortOrder }}</button>


      <label for="emoji">Filter nach Stimmung:</label>
      <select id="emoji" v-model="filterEmoji">
        <option value="">Alle</option>
        <option v-for="emoji in emojis" :key="emoji" :value="emoji">{{ emoji }}</option>
      </select>
    </div>
    <div class="export">
      <button @click="exportToPDF">📄 Als PDF exportieren</button>
    </div>
    <ul ref="entryList">
      <li
        v-for="entry in filteredEntries"
        :key="entry.id"
        :style="{ backgroundColor: getBackgroundColor(entry.mood) }"
        class="entry-card"
      >
        <div class="entry-header">
          <span class="emoji">{{ entry.mood }}</span>
          <span class="timestamp">{{ entry.timestamp }}</span>
        </div>
        <p><strong>Gelernt:</strong> {{ entry.whatLearned }}</p>
        <p><strong>Herausforderungen:</strong> {{ entry.challenges }}</p>
        <p><strong>Erfolg des Tages:</strong> {{ entry.success }}</p>
        <p><strong>Stolz-Moment:</strong> {{ entry.proudMoment }}</p>
        <p><strong>Entdeckungen:</strong> {{ entry.discoveries }}</p>
        <p><strong>Verbesserungen für morgen:</strong> {{ entry.improvement }}</p>
        <button @click="deleteEntry(entry.id)">Löschen</button>
      </li>
    </ul>
  </section>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "EntriesView",
  data() {
    return {
      entries: [],
      sortOrder: "Älteste zuerst",

      filterEmoji: "",

      emojis: ["😊", "😢", "😠", "😴", "🤔", "😌", "🤒"],
    };
  },
  computed: {
    filteredEntries() {
      let result = [...this.entries];

      if (this.filterMonth) {
        result = result.filter((entry) => entry.timestamp.includes(`-${this.filterMonth}-`));
      }

      if (this.filterEmoji) {
        result = result.filter((entry) => entry.mood === this.filterEmoji);
      }

      if (this.sortOrder === "Neueste zuerst") {
        result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } else {
        result.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      }

      return result;
    },
  },
  methods: {
    loadEntries() {
      const savedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
      this.entries = savedEntries;
    },
    deleteEntry(id) {
      this.entries = this.entries.filter((entry) => entry.id !== id);
      localStorage.setItem("entries", JSON.stringify(this.entries));
    },
    getBackgroundColor(mood) {
      const moodColors = {
        "😊": "#d4f1f4", // Glücklich
        "😐": "#f9f7d9", // Neutral
        "😢": "#fce4ec", // Traurig
        "😠": "#ffe5d9", // Wütend
        "😴": "#e3e4f1", // Müde
        "🤔": "#f3e9d2", // Nachdenklich
        "😌": "#d1f4e6", // Erleichtert
        "🤒": "#e8daf9", // Krank
      };
      return moodColors[mood] || "#ffffff";
    },
    sortEntries() {
      this.sortOrder = this.sortOrder === "Älteste zuerst" ? "Neueste zuerst" : "Älteste zuerst";
    },
    async exportToPDF() {
  const pdf = new jsPDF("p", "mm", "a4");
  const element = this.$refs.entryList;

  // Überschrift für die PDF
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Meine Skillville Tagebucheinträge", 10, 20);

  let yOffset = 30; // Startposition nach Überschrift

  // Alle Einträge durchgehen
  for (const entry of element.children) {
    const canvas = await html2canvas(entry, {
      scale: 1.5, // Niedrigere Skalierung, um Dateigröße zu verringern
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.6); // JPEG statt PNG + 60% Qualität
    const imgWidth = 180; // A4 Breite in mm mit Rand
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Falls der Eintrag nicht mehr auf die aktuelle Seite passt, neue Seite hinzufügen
    if (yOffset + imgHeight > 270) {
      pdf.addPage();
      yOffset = 20; // Neue Seite beginnt weiter oben
    }

    pdf.addImage(imgData, "JPEG", 10, yOffset, imgWidth, imgHeight);
    yOffset += imgHeight + 10; // Platz zwischen den Einträgen
  }

  pdf.save("entries.pdf");
}

  },
  mounted() {
    this.loadEntries();
  },
};
</script>

<style scoped>
.entries {
  padding: 1.5rem;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.export {
  text-align: right;
  margin-bottom: 1rem;
}

.export button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.export button:hover {
  background-color: #45a049;
}

.entry-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.emoji {
  font-size: 2rem;
}

.timestamp {
  font-size: 0.9rem;
  color: #666;
}

button {
  background-color: #e09393;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.controls button {
  background-color: #cfaad3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
.controls button:hover {
  background-color: rgb(214, 148, 214);
}

</style>
