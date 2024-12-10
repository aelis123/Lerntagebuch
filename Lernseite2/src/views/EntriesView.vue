<template>
  <section class="entries">
    <h2>Deine Einträge</h2>
    <div v-if="entries.length === 0">Keine Einträge vorhanden.</div>
    <div class="export">
      <button @click="exportToPDF">📄 Als PDF exportieren</button>
    </div>
    <ul ref="entryList">
      <li
        v-for="entry in entries"
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
    };
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
        "😎": "#d1f4e6", // Cool
        "😇": "#e8daf9", // Zufrieden
      };
      return moodColors[mood] || "#ffffff";
    },
    async exportToPDF() {
      const element = this.$refs.entryList;
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save("entries.pdf");
    },
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
  background-color: #e57373;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
