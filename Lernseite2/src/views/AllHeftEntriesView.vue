<template>
  <div class="heft-view">
    <h2>📘 Hefteinträge</h2>
    <h3>
      Das hier ist eine Baustelle! Aber du kannst gern schon testen :D Da wird
      sich noch viel tun.
    </h3>

    <!-- Formular zum Erstellen eines neuen Eintrags -->
    <form @submit.prevent="addEntry" class="heft-form" ref="formSection">
      <!-- Erster Block: Das Wichtigste -->
      <div class="form-section">
        <h3>Das Wichtigste</h3>

        <!-- Überschrift -->
        <div class="form-group form-group-title">
          <label :for="titleId">📌 Überschrift:</label>
          <div
            class="title-container"
            style="display: flex; align-items: center; gap: 10px;"
          >
            <input
              :id="titleId"
              v-model="newEntry.title"
              type="text"
              placeholder="Hauptüberschrift eingeben"
              required
              style="flex-grow: 1; padding: 8px; font-size: 16px;"
            />
            <select v-model="newEntry.titleFont" id="title-font" class="font-select">
              <option disabled value="">Schriftart auswählen</option>
              <option
                v-for="font in availableFonts"
                :key="font.name"
                :value="font.name"
                :style="{ fontFamily: font.name }"
              >
                {{ font.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Unterüberschrift -->
        <div class="form-group form-group-subtitle">
          <label :for="subtitleId">📋 Unterüberschrift:</label>
          <div
            class="subtitle-container"
            style="display: flex; align-items: center; gap: 10px;"
          >
            <input
              :id="subtitleId"
              v-model="newEntry.subtitle"
              type="text"
              placeholder="Optionale Unterüberschrift eingeben"
            />
            <select
              v-model="newEntry.subtitleFont"
              id="subtitle-font"
              class="font-select"
            >
              <option disabled value="">Schriftart auswählen</option>
              <option
                v-for="font in availableFonts"
                :key="font.name"
                :value="font.name"
                :style="{ fontFamily: font.name }"
              >
                {{ font.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Fach/Emoji-Auswahl -->
        <div class="form-group">
          <label :for="emojiId">📖 Fach oder Farbe wählen:</label>
          <select :id="emojiId" v-model="newEntry.emoji" @change="updateBorderColor">
            <option
              v-for="option in emojiOptions"
              :key="option.emoji"
              :value="option.emoji"
            >
              {{ option.emoji }} {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Button + Dropdown-Menü zum Hinzufügen von Modulen -->
      <div class="module-dropdown-container">
        <button @click="toggleModuleDropdown" type="button" class="export-button">
          ➕ Modul hinzufügen
        </button>
        <transition name="fade">
          <div v-if="showModuleDropdown" class="module-dropdown">
            <ul>
              <li
                v-for="module in availableModules"
                :key="module.id"
                @click="addModule(module.type)"
              >
                <span>{{ module.icon }}</span> {{ module.label }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Dynamische Module (drag-and-drop + Pfeile) -->
      <transition-group
        name="fade"
        tag="div"
        class="dynamic-modules-container"
        @dragover.prevent
      >
        <div
          v-for="(mod, index) in newEntry.modules"
          :key="mod.uniqueId"
          class="form-section draggable-module"
          draggable="true"
          @dragstart="dragStart(index, $event)"
          @dragenter.prevent="dragEnter(index)"
          @dragend="dragEnd"
        >
          <h4>{{ mod.icon }} {{ mod.label }}</h4>

          <!-- Module-Content (Merke, Allgemein, Aufgaben, ...) -->
          <div v-if="mod.type === 'merke'">
            <label :for="'merke-textarea-' + mod.uniqueId">Wichtige Notiz:</label>
            <textarea
              :id="'merke-textarea-' + mod.uniqueId"
              v-model="mod.content"
              placeholder="Was sollte man sich merken..."
              rows="2"
            ></textarea>
          </div>

          <div v-else-if="mod.type === 'allgemein'">
            <label :for="'allgemein-textarea-' + mod.uniqueId"
              >Allgemeine Informationen:</label
            >
            <textarea
              :id="'allgemein-textarea-' + mod.uniqueId"
              v-model="mod.content"
              placeholder="Allgemeine Infos..."
              rows="2"
            ></textarea>
          </div>

          <div v-else-if="mod.type === 'aufgaben'" class="tasks-box">
            <label :for="'aufgaben-textarea-' + mod.uniqueId">Aufgaben:</label>
            <textarea
              :id="'aufgaben-textarea-' + mod.uniqueId"
              v-model="mod.content"
              placeholder="Aufgaben oder Übungen..."
              rows="2"
            ></textarea>
          </div>

          <div v-else-if="mod.type === 'quellen'" class="quellen-box">
            <label :for="'quellen-textarea-' + mod.uniqueId"
              >Quellen/Referenzen:</label
            >
            <textarea
              :id="'quellen-textarea-' + mod.uniqueId"
              v-model="mod.content"
              placeholder="Bücher, Links etc..."
              rows="2"
            ></textarea>
          </div>

          <div v-else-if="mod.type === 'fragen'" class="fragen-box">
            <label :for="'fragen-textarea-' + mod.uniqueId">Offene Fragen:</label>
            <textarea
              :id="'fragen-textarea-' + mod.uniqueId"
              v-model="mod.content"
              placeholder="Was ist noch unklar..."
              rows="2"
            ></textarea>
          </div>

          <!-- Bilder -->
          <div v-else-if="mod.type === 'bilder'">
            <label :for="'bilder-file-' + mod.uniqueId">Bild(er) hochladen:</label>
            <input
              :id="'bilder-file-' + mod.uniqueId"
              type="file"
              multiple
              @change="onFileChange(mod, $event)"
            />
            <div
              v-if="mod.images && mod.images.length"
              class="image-details-container"
            >
              <div
                v-for="(img, i) in mod.images"
                :key="i"
                class="image-details"
              >
                <h4>{{ img.title }}</h4>

                <label :for="'image-title-' + mod.uniqueId + '-' + i">
                  Titel:
                </label>
                <input
                  :id="'image-title-' + mod.uniqueId + '-' + i"
                  type="text"
                  v-model="img.title"
                  placeholder="Titel eingeben"
                />

                <label :for="'image-desc-' + mod.uniqueId + '-' + i">
                  Beschreibung:
                </label>
                <textarea
                  :id="'image-desc-' + mod.uniqueId + '-' + i"
                  rows="2"
                  v-model="img.description"
                  placeholder="Beschreibung eingeben"
                ></textarea>

                <div class="image-wrapper">
                  <img
                    :src="img.src"
                    alt="Hochgeladenes Bild"
                    class="resizable-image"
                    :style="{ width: img.width + 'px' }"
                  />
                  <div
                    class="resize-handle"
                    @mousedown="startResize($event, mod, i)"
                  ></div>
                  <button
                    @click.stop="removeImage(mod, i)"
                    class="delete-image"
                    title="Bild löschen"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modul-Aktionen -->
          <div class="module-actions">
            <div class="arrow-buttons">
              <button
                type="button"
                :disabled="index === 0"
                @click="moveModuleUp(index)"
                title="Nach oben verschieben"
              >
                ⬆️
              </button>
              <button
                type="button"
                :disabled="index === newEntry.modules.length - 1"
                @click="moveModuleDown(index)"
                title="Nach unten verschieben"
              >
                ⬇️
              </button>
            </div>
            <button type="button" @click="removeModule(index)">
              Modul löschen
            </button>
          </div>
        </div>
      </transition-group>

      <!-- GRÜNER, MITTIGER BUTTON für "Eintrag hinzufügen" -->
      <div class="centered-submit-container">
        <button type="submit" class="green-submit-button">
          ✅ Eintrag hinzufügen
        </button>
      </div>
    </form>

    <!-- Überschrift für alle Einträge -->
    <h2>📂 Alle Einträge</h2>

    <!-- Filter unterhalb von "Alle Einträge" -->
    <div class="info-box filter-under-entries">
      <label :for="filterId">🔍 Nach Einträgen filtern:</label>
      <input
        :id="filterId"
        v-model="filter"
        type="text"
        placeholder="Suchbegriff eingeben"
      />
    </div>

    <!-- Einträge anzeigen -->
    <transition-group name="fade" tag="div">
      <div
        v-for="entry in filteredEntries"
        :key="entry.id"
        class="entry-card"
        :class="{ editing: editingEntryId === entry.id }"
        :style="{ borderColor: entry.borderColor }"
      >
        <!-- Titel/Untertitel -->
        <h3 :style="{ fontFamily: entry.titleFont }" class="entry-title">
          <span v-if="entry.emoji">{{ entry.emoji }}</span>
          {{ entry.title }}
          <span v-if="entry.emoji">{{ entry.emoji }}</span>
        </h3>
        <h4 :style="{ fontFamily: entry.subtitleFont }" class="entry-subtitle">
          {{ entry.subtitle }}
        </h4>

        <!-- Dynamisch eingefügte Module -->
        <div v-for="mod in entry.modules" :key="mod.uniqueId">
          <!-- Merke -->
          <div v-if="mod.type === 'merke'" class="important-notes">
            <strong>💡 </strong>
            <span v-html="highlightText(mod.content)"></span>
          </div>

          <!-- Allgemeine Infos -->
          <div v-else-if="mod.type === 'allgemein'" class="general-info">
            <strong> </strong>
            <span v-html="highlightText(mod.content)"></span>
          </div>

          <!-- Aufgaben -->
          <div v-else-if="mod.type === 'aufgaben'" class="tasks-box">
            <strong>📝 </strong>
            <span v-html="highlightText(mod.content)"></span>
          </div>

          <!-- Quellen -->
          <div v-else-if="mod.type === 'quellen'" class="quellen-box">
            <strong>Quellen: </strong>
            <span v-html="highlightText(mod.content)"></span>
          </div>

          <!-- Fragen -->
          <div v-else-if="mod.type === 'fragen'" class="fragen-box">
            <strong>❓ </strong>
            <span v-html="highlightText(mod.content)"></span>
          </div>

          <!-- Bilder -->
          <div
            v-else-if="mod.type === 'bilder'"
            class="image-gallery"
            style="margin-top: 1rem;"
          >
            <div
              v-for="(img, i) in mod.images"
              :key="i"
              class="image-row"
            >
              <div class="image-details">
                <h4>{{ img.title || `Bild ${i + 1}` }}</h4>
                <p>{{ img.description || "Keine Beschreibung verfügbar." }}</p>
              </div>
              <div class="image-wrapper">
                <img
                  :src="img.src"
                  alt="Bild"
                  class="resizable-image"
                  :style="{ width: img.width + 'px' }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Aktionen -->
        <div class="entry-actions">
          <button @click="editEntry(entry)" class="edit-button">✏️ Bearbeiten</button>
          <button @click="promptDelete(entry.id)" class="delete-button">🗑️ Löschen</button>
        </div>
      </div>
    </transition-group>

    <!-- Keine Einträge gefunden -->
    <div v-if="filteredEntries.length === 0" class="info-box2">
      Keine Einträge gefunden.
    </div>

    <!-- Popup-Bestätigung fürs Löschen -->
    <div v-if="showDeleteConfirm" class="delete-confirmation-popup">
      <div class="delete-confirmation-content">
        <p>Möchtest du diesen Eintrag wirklich löschen?</p>
        <div class="popup-actions">
          <button @click="confirmDelete">Ja, löschen</button>
          <button @click="cancelDelete">Abbrechen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useHefteStore } from "../stores/hefteStore.js";

export default defineComponent({
  setup() {
    const store = useHefteStore();

    /* STATES & REFS */
    const showModuleDropdown = ref(false);
    const editingEntryId = ref(null);
    const showDeleteConfirm = ref(false);
    const entryIdToDelete = ref(null);
    const draggedModuleIndex = ref(null);

    const newEntry = ref({
      id: null,
      title: "",
      subtitle: "",
      titleFont: "",
      subtitleFont: "",
      emoji: "",
      borderColor: "#ccc",
      modules: [],
    });

    // IDs
    const titleId = "heft-title-input";
    const subtitleId = "heft-subtitle-input";
    const emojiId = "heft-emoji-select";
    const filterId = "heft-filter-input";

    // Zusätzliche Schriftarten
    const availableFonts = ref([
      { name: "Arial", label: "Arial" },
      { name: "Georgia", label: "Georgia" },
      { name: "Times New Roman", label: "Times New Roman" },
      { name: "Roboto", label: "Roboto" },
      { name: "Courier New", label: "Courier New" },
      { name: "Dancing Script", label: "Dancing Script" },
      { name: "Pacifico", label: "Pacifico" },
      { name: "Lobster", label: "Lobster" },
      { name: "Caveat", label: "Caveat" },
      { name: "Playfair Display", label: "Playfair Display" },
      { name: "Bebas Neue", label: "Bebas Neue" },

      // Neu hinzugefügt:
      { name: "Montserrat", label: "Montserrat" },
      { name: "Open Sans", label: "Open Sans" },
      { name: "Raleway", label: "Raleway" },
      { name: "Poppins", label: "Poppins" },
    ]);

    // Emoji-Fächer & Farboptionen (einfaches Array, kein ref!)
    const emojiOptions = [
      { emoji: "🌌", label: "Astronomie", color: "#d0d0f5" },
      { emoji: "💼", label: "BWL", color: "#f5deb3" },
      { emoji: "🦠", label: "Biologie", color: "#bbf3bb" },
      { emoji: "⚗️", label: "Chemie", color: "#c0ebc0" },
      { emoji: "🇨🇳", label: "Chinesisch", color: "#ffe4e1" },
      { emoji: "📖", label: "Deutsch", color: "#ffcccb" },
      { emoji: "📘", label: "Englisch", color: "#add8e6" },
      { emoji: "🗺️", label: "Erdkunde/Geografie", color: "#bde0fe" },
      { emoji: "⚖️", label: "Ethik", color: "#faf4b7" },
      { emoji: "🇫🇷", label: "Französisch", color: "#fde2e4" },
      { emoji: "🍳", label: "Hauswirtschaft", color: "#fce2c7" },
      { emoji: "🖥️", label: "Informatik", color: "#c0e8f8" },
      { emoji: "🇮🇹", label: "Italienisch", color: "#ffe5b4" },
      { emoji: "👩‍⚖️", label: "Justiz", color: "#ead1dc" },
      { emoji: "🎨", label: "Kunst", color: "#ffb6c1" },
      { emoji: "🔤", label: "Latein", color: "#f8c8dc" },
      { emoji: "📚", label: "Literatur", color: "#eae4e9" },
      { emoji: "➗", label: "Mathematik", color: "#d3d3d3" },
      { emoji: "🎼", label: "Musik", color: "#fff2f2" },
      { emoji: "👩‍🏫", label: "Pädagogik", color: "#e1bee7" },
      { emoji: "🤔", label: "Philosophie", color: "#fdf1e6" },
      { emoji: "🧲", label: "Physik", color: "#e0ffff" },
      { emoji: "💻", label: "Programmierung", color: "#87cefa" },
      { emoji: "🧠", label: "Psychologie", color: "#ffcce6" },
      { emoji: "✝️", label: "Religion", color: "#f0e68c" },
      { emoji: "🇷🇺", label: "Russisch", color: "#ffd1dc" },
      { emoji: "🌍", label: "Sozialkunde", color: "#ffa07a" },
      { emoji: "🇪🇸", label: "Spanisch", color: "#f7c59f" },
      { emoji: "⚽", label: "Sport", color: "#caf0f8" },
      { emoji: "🏛️", label: "Staatsbürgerkunde", color: "#ffeebb" },
      { emoji: "🔧", label: "Technik/Werken", color: "#ced4da" },
      { emoji: "📐", label: "Technisches Zeichnen", color: "#dee2e6" },
      { emoji: "🎭", label: "Theater", color: "#ffd6e0" },
      { emoji: "💲", label: "Wirtschaftskunde", color: "#d2f0cd" },

      // Farbauswahl-Optionen (keine Fächer)
      { emoji: "🍎", label: "Rot", color: "#ff4d4d" },
      { emoji: "🍌", label: "Gelb", color: "#ffd700" },
      { emoji: "🍇", label: "Lila", color: "#dda0dd" },
      { emoji: "🍊", label: "Orange", color: "#ffa500" },
      { emoji: "🍋", label: "Hellgelb", color: "#fffacd" },
      { emoji: "🍉", label: "Pink", color: "#ff69b4" },
      { emoji: "🍒", label: "Kirschrot", color: "#dc143c" },
      { emoji: "🍍", label: "Goldgelb", color: "#ffd700" },
      { emoji: "🥝", label: "Grün", color: "#9acd32" },
    ];

    const availableModules = ref([
      { id: 1, type: "merke", label: "Merke", icon: "📝" },
      { id: 2, type: "allgemein", label: "Allgemein", icon: "📖" },
      { id: 3, type: "aufgaben", label: "Aufgaben", icon: "✅" },
      { id: 4, type: "quellen", label: "Quellen", icon: "📚" },
      { id: 5, type: "fragen", label: "Fragen", icon: "❓" },
      { id: 6, type: "bilder", label: "Bilder", icon: "🖼️" },
    ]);

    // Filter
    const filter = ref("");

    /* BEFOREUNLOAD-WARNUNG */
    const isFormDirty = computed(() => {
      return (
        newEntry.value.title.trim() !== "" ||
        newEntry.value.subtitle.trim() !== "" ||
        newEntry.value.modules.length > 0
      );
    });

    const handleBeforeUnload = (event) => {
      if (isFormDirty.value) {
        event.preventDefault();
        event.returnValue =
          "Achtung! Es befinden sich noch ungespeicherte Inhalte in Ihrem Formular. Ungespeicherte Dateien gehen verloren!";
      }
    };

    onMounted(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });

    /* METHODEN: DROPDOWN, FORMULAR, EDIT, DELETE */
    const toggleModuleDropdown = () => {
      showModuleDropdown.value = !showModuleDropdown.value;
    };

    const addModule = (type) => {
      const moduleData = availableModules.value.find((m) => m.type === type);
      if (!moduleData) return;
      const newModule = {
        ...moduleData,
        uniqueId: Date.now() + "-" + Math.random().toString(36).substr(2, 5),
        content: "",
        images: [],
      };
      newEntry.value.modules.push(newModule);
      showModuleDropdown.value = false;
    };

    const removeModule = (index) => {
      newEntry.value.modules.splice(index, 1);
    };

    /**
     * updateBorderColor
     *  Hier KEIN .value, da emojiOptions ein normales Array ist.
     */
    const updateBorderColor = () => {
      const selectedEmoji = emojiOptions.find(
        (option) => option.emoji === newEntry.value.emoji
      );
      newEntry.value.borderColor = selectedEmoji ? selectedEmoji.color : "#ccc";
    };

    const addEntry = () => {
      if (!newEntry.value.title.trim()) {
        alert("Bitte Titel angeben!");
        return;
      }
      store.addEntry({
        ...newEntry.value,
        id: Date.now(),
      });
      // Reset
      newEntry.value = {
        id: null,
        title: "",
        subtitle: "",
        titleFont: "",
        subtitleFont: "",
        emoji: "",
        borderColor: "#ccc",
        modules: [],
      };
    };

    const resetForm = () => {
      newEntry.value = {
        id: null,
        title: "",
        subtitle: "",
        titleFont: "",
        subtitleFont: "",
        emoji: "",
        borderColor: "#ccc",
        modules: [],
      };
    };

    const editEntry = (entry) => {
      const safeEntry = {
        ...entry,
        modules: entry.modules || [],
      };
      newEntry.value = JSON.parse(JSON.stringify(safeEntry));
      store.deleteEntry(entry.id);
      editingEntryId.value = entry.id;
      scrollToForm();
    };

    const promptDelete = (id) => {
      entryIdToDelete.value = id;
      showDeleteConfirm.value = true;
    };
    const confirmDelete = () => {
      store.deleteEntry(entryIdToDelete.value);
      showDeleteConfirm.value = false;
      entryIdToDelete.value = null;
    };
    const cancelDelete = () => {
      showDeleteConfirm.value = false;
      entryIdToDelete.value = null;
    };

    /* DRAG & DROP + PFEILE */
    const dragStart = (index, event) => {
      draggedModuleIndex.value = index;
      event.dataTransfer.effectAllowed = "move";
    };
    const dragEnter = (index) => {
      if (draggedModuleIndex.value === null) return;
      const draggedItem = newEntry.value.modules[draggedModuleIndex.value];
      newEntry.value.modules.splice(draggedModuleIndex.value, 1);
      newEntry.value.modules.splice(index, 0, draggedItem);
      draggedModuleIndex.value = index;
    };
    const dragEnd = () => {
      draggedModuleIndex.value = null;
    };

    const moveModuleUp = (index) => {
      if (index > 0) {
        const mods = newEntry.value.modules;
        [mods[index - 1], mods[index]] = [mods[index], mods[index - 1]];
      }
    };
    const moveModuleDown = (index) => {
      if (index < newEntry.value.modules.length - 1) {
        const mods = newEntry.value.modules;
        [mods[index], mods[index + 1]] = [mods[index + 1], mods[index]];
      }
    };

    /* BILDER-UPLOAD & RESIZE */
    const onFileChange = (mod, event) => {
      const files = event.target.files;
      if (!mod.images) mod.images = [];
      if (files.length + mod.images.length > 7) {
        alert("Maximal 7 Bilder erlaubt!");
        return;
      }
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          mod.images.push({
            src: reader.result,
            width: 300,
            title: `Titel von ${file.name}`,
            description: `Beschreibung von ${file.name}`,
          });
        };
        reader.readAsDataURL(file);
      });
    };

    const resizing = ref(false);
    const currentModule = ref(null);
    const currentImageIndex = ref(null);
    const startX = ref(0);
    const startWidth = ref(0);

    const startResize = (event, mod, i) => {
      resizing.value = true;
      currentModule.value = mod;
      currentImageIndex.value = i;
      startX.value = event.clientX;
      startWidth.value = mod.images[i].width || 300;
      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    };

    const doResize = (event) => {
      if (!resizing.value || !currentModule.value) return;
      const newWidth = startWidth.value + (event.clientX - startX.value);
      const img = currentModule.value.images[currentImageIndex.value];
      img.width = newWidth > 50 ? newWidth : 50;
    };

    const stopResize = () => {
      resizing.value = false;
      currentModule.value = null;
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };

    const removeImage = (mod, i) => {
      mod.images.splice(i, 1);
    };

    /* FILTER & HIGHLIGHT */
    const filteredEntries = computed(() =>
      store.entries
        .slice()
        .sort((a, b) => b.id - a.id)
        .filter((entry) => {
          const searchTerm = filter.value.toLowerCase();
          const inTitle = entry.title?.toLowerCase().includes(searchTerm);
          const inModules = (entry.modules || []).some((m) =>
            (m.content || "").toLowerCase().includes(searchTerm)
          );
          const inEmoji =
            entry.emoji && entry.emoji.toLowerCase().includes(searchTerm);

          return inTitle || inModules || inEmoji;
        })
    );

    const highlightText = (text) => {
      if (!filter.value) return text;
      const escapedFilter = filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escapedFilter})`, "gi");
      return text.replace(regex, "<mark>$1</mark>");
    };

    const scrollToForm = () => {
      const formSection = document.querySelector(".heft-form");
      formSection?.scrollIntoView({ behavior: "smooth" });
    };

    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });

    return {
      /* States */
      newEntry,
      editingEntryId,
      showDeleteConfirm,
      entryIdToDelete,
      showModuleDropdown,
      draggedModuleIndex,
      resizing,
      filter,

      /* IDs */
      titleId,
      subtitleId,
      emojiId,
      filterId,

      /* Arrays */
      availableFonts,
      emojiOptions,
      availableModules,

      /* Computed */
      filteredEntries,
      isFormDirty,

      /* Methods */
      toggleModuleDropdown,
      addModule,
      removeModule,
      updateBorderColor,
      addEntry,
      resetForm,
      editEntry,
      promptDelete,
      confirmDelete,
      cancelDelete,

      dragStart,
      dragEnter,
      dragEnd,
      moveModuleUp,
      moveModuleDown,

      onFileChange,
      startResize,
      doResize,
      stopResize,
      removeImage,

      highlightText,
      scrollToForm,
      handleBeforeUnload,
    };
  },
});
</script>

<style scoped>
/* Zusätzliche Google Fonts für neue Schriftarten */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Open+Sans:wght@400;600&family=Poppins:wght@400;600&family=Raleway:wght@400;600&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;700&family=Dancing+Script:wght@400;700&family=Lobster&family=Pacifico&family=Playfair+Display:wght@400;700&display=swap");

/* Haupt-Wrapper */
.heft-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: "Roboto", sans-serif;
  background-color: #fefcfb;
  color: #4a4a4a;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
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

/* Eingaben */
textarea,
input,
select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
button:hover {
  transform: translateY(-2px);
}
button:active {
  transform: translateY(0);
}

/* Modul-Button */
.export-button {
  background-color: #b9a9e8;
  color: white;
}
.export-button:hover {
  background-color: #a095d4;
}

/* Zentrierter grüner Button */
.centered-submit-container {
  text-align: center;
  margin-top: 1rem;
}
.green-submit-button {
  background-color: #28a745; /* satter Grünton */
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
}
.green-submit-button:hover {
  background-color: #218838; /* dunkleres Grün */
}

/* Module-Dropdown */
.module-dropdown-container {
  text-align: left;
  margin-bottom: 1rem;
}
.module-dropdown {
  background-color: #f4f3f8;
  border: 1px solid #ccc;
  display: inline-block;
  margin-top: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.module-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.module-dropdown li {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.95rem;
}
.module-dropdown li:hover {
  background-color: #ddd;
}

/* Dynamische Module (drag-and-drop) */
.dynamic-modules-container {
  margin-bottom: 2rem;
}
.draggable-module {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f4f3f8;
  border-radius: 8px;
  border: 2px dashed #ccc;
  cursor: move;
}

/* Pfeile zum Hoch-/Runterverschieben */
.arrow-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-right: 8px;
}
.arrow-buttons button {
  width: 40px;
  height: 30px;
  font-size: 1.2rem;
  line-height: 1;
  background-color: #ddd;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.arrow-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Eintragskarte: dynamische Rahmenfarbe */
.entry-card {
  background-color: #f4f3f8;
  border-width: 3px;
  border-style: solid;
  border-color: transparent;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.entry-card:hover {
  transform: translateY(-5px);
}

/* Lila Glow beim Bearbeiten */
.editing {
  border: 2px solid #b19cd9 !important;
  box-shadow: 0 0 8px rgba(177, 156, 217, 0.8) !important;
}

/* Aktionen (Bearbeiten/Löschen) */
.entry-actions {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center;
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
.filter-under-entries {
  margin-top: -1rem; /* anpassen nach Geschmack */
}
.info-box {
  background-color: #f4f3f8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.info-box2 {
  background-color: #ffdce0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  color: #4a4a4a;
}

/* Fade-Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Titel und Untertitel im Eintrag */
.entry-title {
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
  margin: 0.5rem 0;
  position: relative;
}
.entry-title::after {
  content: "";
  display: block;
  width: 50%;
  height: 2px;
  background-color: #b9a9e8;
  margin: 0.5rem auto;
}
.entry-subtitle {
  font-size: 1.2rem;
  text-align: center;
  font-weight: normal;
  color: #4a4a4a;
}

/* Merke-Kasten (auffällig, nur Markierung links) */
.important-notes {
  background-color: #fdf2e0; /* Pastellgelb */
  border-left: 4px solid #ffc107; /* markanter linker Balken */
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-weight: bold;
  font-size: 1rem;
}

/* Allgemeine Informationen (normaler, dezenter Kasten) */
.general-info {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 0.95rem;
  color: #4a4a4a;
}

/* Aufgaben (zartes, leichtes Blau, umrandet) */
.tasks-box {
  background-color: #eef7fd25; /* sehr dezentes Hellblau */
  border: 1px solid #aadaf7; /* Heller blauer Rand */
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: normal;
  color: #4a4a4a;
}

/* Quellen (zartes, kaum sichtbares Lila) */
.quellen-box {
  background-color: #f8f2ff; /* sehr helles Lila */
  border: 1px solid #e2d5fa; /* passender heller Lilaton */
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 0.8rem;
  font-weight: normal;
  color: #4a4a4a;
}

/* Fragen (zartes Rot/Pink) */
.fragen-box {
  background-color: #fff1f1; /* sehr leichtes Rot */
  border: 1px solid #f7d4d4; /* hellerer Rand */
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: normal;
  color: #4a4a4a;
}

/* Bilder-Galerie und Co (unverändert) */
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 1rem;
}
.image-row {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.image-details {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  text-align: left;
}
.image-details h4 {
  margin: 0;
  font-size: 1rem;
  color: #4a4a4a;
}
.image-details-container {
  margin-top: 10px;
}
.resizable-image {
  max-width: 400%;
  max-height: 400%;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
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
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: transparent;
  color: #f44336;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.delete-image:hover {
  color: #d32f2f;
}

/* Popup fürs Löschen (unverändert) */
.delete-confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-confirmation-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}
.popup-actions {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center;
}
</style>
