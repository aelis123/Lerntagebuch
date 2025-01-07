<template>
  <section class="dashboard">
    <div class="welcome">
      <h2>Neues Update:</h2>
      <p>Es gab aufgrund der ID-Berechnung einen Bug, der keine Einträge für Januar hinzufügen ließ. Die ID-Berechnung findet nun über eine andere Methode statt und somit sollte das Problem hiermit behoben sein. Die App befindet sich noch in der Test- und Entwicklungsphase. Schon geschriebene Einträge werden nicht mehr im Kalender angezeigt, aber sind weiterhin unter "Einträge" einsehbar.</p>
      <h2>{{ greeting }}</h2>
      <p>{{ currentDate }}</p>
    </div>

    <div class="actions">
      <router-link to="/entry">
        <button>Neuen Eintrag hinzufügen</button>
      </router-link>
    </div>

    <div class="calendar-section">
      <div class="calendar">
        <div class="calendar-header">
          <button @click="changeMonth(-1)">◀</button>
          <span>{{ formattedMonthYear }}</span>
          <button @click="changeMonth(1)">▶</button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in daysOfWeek" :key="day" class="calendar-day-label">{{ day }}</div>
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar-day"
            :style="day.entry ? { backgroundColor: getBackgroundColor(day.entry.mood) } : {}"
          >
            <div v-if="day.date" class="calendar-date">
              <span>{{ day.date }}</span>
              <div
                v-if="day.entry"
                class="emoji-marker"
                @click="goToEntry(day.entry.id)"
              >
                {{ day.entry.mood }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      currentDate: new Date().toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      entries: [],
    };
  },
  computed: {
    formattedMonthYear() {
      const date = new Date(this.currentYear, this.currentMonth);
      return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    },
    daysOfWeek() {
      return ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    },
    calendarDays() {
  const days = [];
  const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
  const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

  // Leere Felder für die erste Woche auffüllen
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    days.push({ date: null });
  }

  // Tage des Monats generieren
  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

    // Suche nach gültigen Einträgen
    const entry = this.entries.find((e) => {
      const entryDate = e.timestamp.split("T")[0]; // Nur Datumsteil vergleichen
      return entryDate === dateString;
    });

    days.push({ date: i, entry });
  }

  return days;
},

    greeting() {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 12) {
        return "Guten Morgen!";
      } else if (hour >= 12 && hour < 14) {
        return "Mahlzeit!";
      } else if (hour >= 14 && hour < 18) {
        return "Guten Nachmittag!";
      } else if (hour >= 18 && hour <= 23) {
        return "Guten Abend!";
      } else {
        return "Hallo Nachteule!";
      }
    },
  },
 methods: {
  loadEntries() {
    const savedEntries = JSON.parse(localStorage.getItem("entries") || "[]");

    // Filtere ungültige Einträge heraus
    this.entries = savedEntries.filter((entry, index, self) => {
      const isValid =
        entry.timestamp &&
        !isNaN(new Date(entry.timestamp)) &&
        typeof entry.id === "number" &&
        entry.id > 0 &&
        self.findIndex((e) => e.id === entry.id) === index; // Verhindere doppelte IDs

      if (!isValid) {
        console.warn("Ungültiger Eintrag entfernt:", entry);
      }
      return isValid;
    });

    console.log("Geladene gültige Einträge:", this.entries); // Debugging
  },
  changeMonth(direction) {
    this.currentMonth += direction;

    // Logik für Monatswechsel
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    console.log(`Monat geändert: ${this.currentMonth + 1}, Jahr: ${this.currentYear}`); // Debugging
  },
  getBackgroundColor(mood) {
    const moodColors = {
      "😊": "#d4f1f4",
      "😐": "#f9f7d9",
      "😢": "#fce4ec",
      "😠": "#ffe5d9",
      "😴": "#e3e4f1",
      "🤔": "#f3e9d2",
      "😌": "#d1f4e6",
      "🤒": "#e8daf9",
    };
    return moodColors[mood] || "#ffffff";
  },
  goToEntry(id) {
    // Überprüfe, ob die ID gültig ist
    const entryExists = this.entries.some((entry) => entry.id === id);
    if (!entryExists) {
      console.warn("Eintrag nicht gefunden:", id);
      return;
    }

    this.$router.push({ path: "/entries", query: { entryId: id } });
  },
},
mounted() {
  this.loadEntries();
},

};
</script>
<style scoped>
.dashboard {
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  background-color: #fefcfb;
  border-radius: 10px;
}

.welcome {
  text-align: center;
  margin-bottom: 1.5rem;
}

.actions {
  text-align: center;
  margin-bottom: 2rem;
}

button {
  background-color: #b9a9e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a095d4;
}

.calendar-section {
  margin-top: 2rem;
}

.calendar {
  background-color: #f5f3f3;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day-label {
  text-align: center;
  font-weight: bold;
  padding: 5px;
  color: #555;

}

.calendar-day {
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  height: 50px;
  font-size: 0.8rem;
  border: 0.002rem solid;
}

.calendar-day:hover {
  background-color: #dfdbdb;
}

.calendar-date {
  position: relative;
}

.emoji-marker {
  margin-top: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.emoji-marker:hover {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .calendar-header {
    font-size: 0.9rem;
  }

  .calendar-day {
    height: 40px;
    font-size: 0.7rem;
  }

  .emoji-marker {
    font-size: 1rem;
  }
}
</style>
