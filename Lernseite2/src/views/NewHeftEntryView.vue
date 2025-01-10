<template>
  <div class="heft-view">
    <h2>📘 Hefteinträge</h2>
<h3>Das hier ist eine Baustelle! Aber du kannst gern schon testen :D Da wird sich noch viel tun.</h3>
    <!-- Formular zum Erstellen -->
    <form @submit.prevent="addEntry" class="heft-form">
      <div class="form-section">
        <h3>Allgemeine Informationen</h3>
        <div class="form-group">
          <label for="title">📌 Überschrift:</label>
          <input
            v-model="newEntry.title"
            id="title"
            type="text"
            placeholder="Hauptüberschrift eingeben"
            required
          />
        </div>

        <div class="form-group">
          <label for="subtitle">📋 Unterüberschrift:</label>
          <input
            v-model="newEntry.subtitle"
            id="subtitle"
            type="text"
            placeholder="Optionale Unterüberschrift eingeben"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>Details</h3>
        <div class="form-group">
          <label for="general-info">ℹ️ Allgemeine Informationen:</label>
          <textarea
            v-model="newEntry.generalInfo"
            id="general-info"
            placeholder="Allgemeine Details eintragen..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="notes">📝 Das ist wichtig zu merken:</label>
          <textarea
            v-model="newEntry.notes"
            id="notes"
            placeholder="Wichtige Notizen hier eingeben..."
            rows="3"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3>Zusätzliche Informationen</h3>
        <div class="form-group">
          <label for="tasks">✅ Aufgaben dazu bearbeiten:</label>
          <textarea
            v-model="newEntry.tasks"
            id="tasks"
            placeholder="Aufgaben oder Übungen notieren..."
            rows="2"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="sources">📚 Quellen/Referenzen:</label>
          <textarea
            v-model="newEntry.sources"
            id="sources"
            placeholder="Links, Bücher oder andere Materialien angeben..."
            rows="2"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="questions">❓ Fragen, die noch offen sind:</label>
          <textarea
            v-model="newEntry.questions"
            id="questions"
            placeholder="Noch offene Fragen eintragen..."
            rows="2"
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3>Einstellungen</h3>
        <div class="form-group">
          <label for="emoji-select">🎨 Wähle ein Symbol/Farbe:</label>
          <select
            id="emoji-select"
            v-model="newEntry.emoji"
            @change="updateBorderColor"
          >
            <option v-for="option in emojiOptions" :key="option.emoji" :value="option.emoji">
              {{ option.emoji }} {{ option.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="image-upload">🖼️ Bild hinzufügen:</label>
          <input type="file" id="image-upload" multiple @change="handleImageUpload" />

        </div>
      </div>

      <button type="submit" class="export-button">✅ Eintrag hinzufügen</button>
    </form>

    <!-- Filter -->
    <div class="info-box">
      <label for="filter">🔍 Nach Einträgen filtern:</label>
      <input
        v-model="filter"
        id="filter"
        type="text"
        placeholder="Suchbegriff eingeben"
      />
    </div>

    <!-- Einträge anzeigen -->
    <div>
      <h2>🗂️ Alle Einträge</h2>
      <div v-if="filteredEntries.length === 0" class="info-box2">
        Keine Einträge gefunden.
      </div>
      <div
        v-for="entry in filteredEntries"
        :key="entry.id"
        class="entry-card"
        :style="{ borderColor: entry.borderColor }"
      >
        <h3 v-html="highlightText(entry.title)"></h3>
        <h4 v-html="highlightText(entry.subtitle)"></h4>
        <p><strong>Allgemeine Informationen:</strong> <span v-html="highlightText(entry.generalInfo)"></span></p>
        <p><strong>Wichtig:</strong> <span v-html="highlightText(entry.notes)"></span></p>
        <p><strong>Aufgaben:</strong> <span v-html="highlightText(entry.tasks)"></span></p>
        <p><strong>Quellen:</strong> <span v-html="highlightText(entry.sources)"></span></p>
        <p><strong>Fragen:</strong> <span v-html="highlightText(entry.questions)"></span></p>

      <!-- Bilder anzeigen mit Größenanpassung -->
      <div v-if="entry.images && entry.images.length" class="image-gallery">
  <div
    v-for="(image, index) in entry.images"
    :key="index"
    class="resize-container"
  >
    <img
      :src="image.src"
      alt="Hochgeladenes Bild"
      class="resizable-image"
      :style="{ width: image.width + 'px' }"
    />
    <div
      class="resize-handle"
      @mousedown="startResize($event, entry, index)"
    ></div>
    <button
      @click.stop="removeImage(entry.id, index)"
      class="delete-image"
      title="Bild löschen"
    >
      🗑️
    </button>
  </div>
</div>



<!-- Eintragsaktionen -->
<div class="entry-actions">
  <button @click="editEntry(entry.id)" class="edit-button">
    ✏️ Bearbeiten
  </button>
  <button @click="deleteEntry(entry.id)" class="delete-button">
    🗑️ Löschen
  </button>
</div>

      </div>
    </div>
  </div>
</template>




<script>
import { defineComponent, ref, computed, onBeforeUnmount } from "vue";
import { useHefteStore } from "../stores/hefteStore.js";

export default defineComponent({
  setup() {
    const store = useHefteStore();

    const resizing = ref(false);
    const currentEntry = ref(null);
    const startX = ref(0);
    const startWidth = ref(0);

    const newEntry = ref({
  id: null,
  title: "",
  subtitle: "",
  generalInfo: "",
  notes: "",
  tasks: "",
  sources: "",
  questions: "",
  emoji: "",
  borderColor: "#ccc",
  images: [], // Array für mehrere Bilder
});



    const filter = ref("");

    const emojiOptions = ref([
      { emoji: "📖", label: "Deutsch", color: "#ffcccb" },
      { emoji: "📘", label: "Englisch", color: "#add8e6" },
      { emoji: "➗", label: "Mathematik", color: "#d3d3d3" },
      { emoji: "🧪", label: "Naturwissenschaften", color: "#98fb98" },
      { emoji: "✝️", label: "Religion", color: "#f0e68c" },
      { emoji: "🌍", label: "Sozialkunde", color: "#ffa07a" },
      { emoji: "⚖️", label: "Justiz", color: "#d8bfd8" },
      { emoji: "💼", label: "BWL", color: "#f5deb3" },
      { emoji: "💻", label: "Programmierung", color: "#87cefa" },
      { emoji: "🎨", label: "Kunst", color: "#ffb6c1" },
      { emoji: "🌎", label: "Sprachen", color: "#b0e0e6" },
      { emoji: "🍎", label: "Rot", color: "#ff4d4d" },
      { emoji: "🍌", label: "Gelb", color: "#ffd700" },
      { emoji: "🍇", label: "Lila", color: "#dda0dd" },
      { emoji: "🍊", label: "Orange", color: "#ffa500" },
      { emoji: "🍋", label: "Hellgelb", color: "#fffacd" },
      { emoji: "🍉", label: "Pink", color: "#ff69b4" },
      { emoji: "🍒", label: "Kirschrot", color: "#dc143c" },
      { emoji: "🍍", label: "Goldgelb", color: "#ffd700" },
      { emoji: "🥝", label: "Grün", color: "#9acd32" },
    ]);

    const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files.length + newEntry.value.images.length > 7) {
    alert("Maximal 7 Bilder erlaubt!");
    return;
  }
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      newEntry.value.images.push({
        src: reader.result,
        width: 300, // Standardbreite
      });
    };
    reader.readAsDataURL(file);
  });
};

    const updateBorderColor = () => {
      const selectedEmoji = emojiOptions.value.find(
        (option) => option.emoji === newEntry.value.emoji
      );
      newEntry.value.borderColor = selectedEmoji ? selectedEmoji.color : "#ccc";
    };

    const startResize = (event, entry, imageIndex) => {
  resizing.value = true;
  currentEntry.value = entry;
  currentEntryImageIndex.value = imageIndex;
  startX.value = event.clientX;
  startWidth.value = entry.images[imageIndex].width || 300;

  document.addEventListener("mousemove", doResize);
  document.addEventListener("mouseup", stopResize);
};


const removeImage = (entryId, imageIndex) => {
  const confirmation = window.confirm("Möchtest du das Bild wirklich löschen?");
  if (!confirmation) return; // Abbrechen, wenn der Benutzer "Nein" auswählt

  // Finde den Eintrag anhand der ID
  const entry = store.entries.find((e) => e.id === entryId);
  if (entry && entry.images) {
    // Entferne das Bild an der angegebenen Position
    entry.images.splice(imageIndex, 1);
  }
};




const currentEntryImageIndex = ref(null);




const doResize = (event) => {
  if (!resizing.value || currentEntry.value === null || currentEntryImageIndex.value === null) return;
  const newWidth = startWidth.value + (event.clientX - startX.value);
  const image = currentEntry.value.images[currentEntryImageIndex.value];
  image.width = newWidth > 50 ? newWidth : 50; // Mindestbreite setzen
};



    const stopResize = () => {
      resizing.value = false;
      currentEntry.value = null;
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };

    const addEntry = () => {
  store.addEntry({
    ...newEntry.value,
    id: Date.now(),
    images: newEntry.value.images || [], // Stelle sicher, dass images ein Array ist
  });

  // Reset des Formulars
  newEntry.value = {
    id: null,
    title: "",
    subtitle: "",
    generalInfo: "",
    notes: "",
    tasks: "",
    sources: "",
    questions: "",
    emoji: "",
    borderColor: "#ccc",
    images: [], // Initialisiere images als leeres Array
  };
};





    const editEntry = (id) => {
      const entry = store.entries.find((e) => e.id === id);
      if (entry) {
        newEntry.value = { ...entry };
        deleteEntry(id); // Entferne das alte Element, bevor es erneut hinzugefügt wird
      }
    };

    const deleteEntry = (id) => {
      store.deleteEntry(id);
    };

    const filteredEntries = computed(() =>
      store.entries.filter((entry) => {
        const searchTerm = filter.value.toLowerCase();
        return (
          entry.title.toLowerCase().includes(searchTerm) ||
          entry.notes.toLowerCase().includes(searchTerm) ||
          entry.emoji.toLowerCase().includes(searchTerm)
        );
      })
    );

    const highlightText = (text) => {
      if (!filter.value) return text;
      const searchTerm = filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${searchTerm})`, "gi");
      return text.replace(regex, "<mark>$1</mark>");
    };

    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    });

    return {
  newEntry,
  filter,
  emojiOptions,
  addEntry,
  editEntry,
  deleteEntry,
  handleImageUpload,
  updateBorderColor,
  startResize,
  stopResize,
  doResize,
  removeImage, // Hier hinzufügen
  filteredEntries,
  highlightText,
};

  },
});
</script>
<style scoped>
/* Allgemeiner Wrapper */
.heft-view {
  max-width: 600px; /* Maximale Breite */
  margin: 0 auto; /* Zentriert */
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  background-color: #fefcfb;
  color: #4a4a4a;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Überschrift */
h2 {
  text-align: center;
  color: #b9a9e8;
  margin-bottom: 1.5rem;
}

/* Formular-Abschnitte */
.form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f4f3f8;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #4a4a4a;
}

/* Formular-Eingaben */
textarea,
input,
select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 1rem; /* Abstand zwischen Feldern */
  font-family: 'Roboto', sans-serif;
}

textarea:focus,
input:focus,
select:focus {
  border-color: #b9a9e8;
  outline: none;
  box-shadow: 0px 0px 6px rgba(185, 169, 232, 0.5);
}

/* Buttons */
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
  width: 100%; /* Breite für mobile Geräte */
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

/* Eintragskarten */
.entry-card {
  background-color: #f4f3f8;
  border: 3px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.entry-card:hover {
  transform: translateY(-5px);
}

/* Bilder in Einträgen */
.entry-image {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 5px;
}

/* Aktionen (Bearbeiten/Löschen) */
.entry-actions {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center; /* Zentriert */
}

.edit-button,
.delete-button {
  background-color: #b9a9e8;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #a495d4;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #d32f2f;
}

/* Filterbox */
.info-box {
  background-color: #f4f3f8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.info-box input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}






.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.resize-container {
  position: relative;
  display: inline-block;
}

.resizable-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: #b9a9e8;
  cursor: nwse-resize;
  border-radius: 50%;
}

.delete-image {
  position: absolute; /* Absolut positioniert relativ zum Container */
  bottom: 5px; /* Abstand von unten */
  left: 5px; /* Abstand von links */
  background-color: transparent; /* Transparent */
  color: #f44336; /* Farbe des Mülleimer-Icons */
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* Größe des Emojis */
  padding: 0; /* Kein Padding */
  width: auto; /* Breite nur basierend auf dem Inhalt */
  height: auto; /* Höhe nur basierend auf dem Inhalt */
  line-height: 1; /* Kein zusätzlicher Platz durch Zeilenhöhe */
  display: inline-flex; /* Verhindert, dass der Button zu breit wird */
  align-items: center; /* Zentriert das Emoji innerhalb des Buttons */
  justify-content: center; /* Zentriert das Emoji innerhalb des Buttons */
}

.delete-image:hover {
  color: #d32f2f; /* Etwas dunklerer Rotton beim Hover */
}




</style>

