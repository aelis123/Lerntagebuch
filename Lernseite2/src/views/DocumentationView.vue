<template>
    <section class="documentation-view" ref="documentation">
      <button @click="exportAsPDF" class="export-button">
        📤 Als PDF exportieren
      </button>
      <h2>📚 Technische Dokumentation</h2>
      <p>
        Hier ist ein Kompendium der - für mich - relevantesten Informationen und Links zum Thema Programmierung.
      </p>
  
      <div class="info-box">
        <p>
          ✍️ <strong>Tipp:</strong> Exportiere gerne die Seite und speichere sie dir ab.
        </p>
      </div>
  
      <div class="info-box2">
        <p>
          <strong>Linksammlung:</strong> Die Links sind nach Schwierigkeitslevel sortiert.<br />
          Als Einsteiger kannst du die Liste also von oben nach unten abarbeiten, wenn du das Programmieren mit Vue3 lernen möchtest. <br /><br />
          <strong>Basis für fast alle Programmiersprachen:</strong></p>
<ul>
    <li><a href="https://visualstudio.microsoft.com/de/downloads/" target="_blank">Dowonload für die Entwicklerumgebung Visual Studio Code</a></li>
  <li><a href="https://www.w3schools.com/html/html_intro.asp" target="_blank">HTML Einführung</a></li>
  <li><a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML" target="_blank">HTML Quiz</a></li>
  <li><a href="https://www.w3schools.com/css/css_intro.asp" target="_blank">CSS Einführung</a></li>
  <li><a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=CSS" target="_blank">CSS Quiz</a></li>
  <li><a href="https://www.w3schools.com/js/js_intro.asp" target="_blank">JavaScript Einführung</a></li>
  <li><a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS" target="_blank">JavaScript Quiz</a></li>
  <li><a href="https://www.w3schools.com/charsets/ref_emoji_office.asp" target="_blank">Nutzbare Emojis</a></li>
  <li><a href="https://www.apachefriends.org/download.html" target="_blank">XAMPP für Testserver (nicht für Vue Programmierung erforderlich)</a></li>
</ul>
<br>
<p><strong>Einstieg in Vue 3:</strong> </p>
<ul>
  <li><a href="https://nodejs.org/en/download/prebuilt-installer" target="_blank">Node.js</a></li>
<li><a href= "https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=de" target="_blank">Vue Addon für Chrome</a></li>
  <li><a href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/" target="_blank">Vue3.js Einführung</a></li>
  <li><a href="https://vuejs.org/examples/#attribute-bindings" target="_blank">Beispiele für Vue-Bausteine</a></li>
  <li><a href="https://www.vuemastery.com/" target="_blank">VueMastery - Seite für alle relevanten Vue-Kurse</a></li>
  <li><a href="https://vuejs.org/api/" target="_blank">Vue API</a></li>
  
</ul>
 

      </div>

      
      <div class="info-box2">

        <p><strong>Nützliche Erweiterungen</strong> in Visual Studio Code:</p>
        <ul>
            <li><strong>Prettier</strong>, formatiert den Code automatisch nach einheitlicher Stilvorgabe.</li>
            <li><strong>Volar</strong>, unterstützt die Vue Entwicklung mit Syntax-Highlighting, IntelliSense und Linterintegration.</li>
            <li><strong>ESLint</strong>, verhindert Fehler und hilft dir Best Practices zu befolgen.</li>
            <li><strong>Path Intellisense</strong>, Autovervollständigung für Datei- und Pfadangaben -> Zeitersparnis und Fehlerreduktion.</li>
            <li><strong>Vue VSCode Snippets</strong>, schneller Zugriff auf wiederkehrende Vue-Elemente.</li>
            <li><strong>Atom One Dark</strong>, einfach ein Theme für VSCode, das cool und übersichtlich aussieht.</li>
        </ul>
      </div>

      <div class="info-box">
        <p><strong>✍️ Merke:</strong> Vue 3 Projekt aufsetzen: <br>
        <small>Bedenke aber: Abläufe können sich mit der Zeit auch verändern!</small></p>
        <ol>
          <li>Version prüfen</li>  
          <div class="info-box2">
            Öffne das Terminal in Visual Studio Code und gib zum Prüfen der Versionen ein: <br><br>
            node -v 
            <br>
            npm -v
            <br>
            <br>
        <small>Tritt eine Fehlermeldung auf, installiere zunächst node.</small>
          </div>
          <br>
          <li> Über das Terminal zum Zielordner navigieren</li>
          <div class="info-box2">
          <strong>cd</strong> C:/Users/...

          </div> <br>
      <li>Projekt erstellen</li>
<div class="info-box2">

<ul>
  <li><strong>npm create vue@latest</strong></li> <br>
  <li>Projektname eingeben</li>
  <li>TypeScript <strong>Nein</strong></li>
  <li>JSX <strong>Nein</strong></li>
  <li>Vue Router <strong>Ja</strong></li>
  <li>Pinia <strong>Ja</strong></li>
  <li>Vitest <strong>Nein</strong></li>
  <li>Cypress <strong>Nein</strong></li>
  <li>ESLint <strong>Ja</strong></li>
  <li>Prettier <strong>Ja</strong>/optional</li>
  <br>
  <li><strong>cd</strong> zum gerade angelegten Verzeichnis</li>
</ul>

</div>
 <br>
<li>Abhängigkeiten installieren</li>
<div class="info-box2">
<strong>npm install</strong>

</div>
<br>
<li>Entwicklerserver starten</li>
<div class="info-box2">
  <strong>npm run dev</strong>
</div>

        </ol>
 <p>      
  Vue 3 arbeitet mit sogenannten "Single File Components" (SFCs). Diese sind Bausteine, in denen HTML, JavaScript und CSS in einer einzigen Datei organisiert sind, typischerweise mit der Endung <code>.vue</code>. <br>
  Diese Komponenten werden dann in <span class="highlight-blue">"Views"</span> oder Routen integriert, um die verschiedenen Bereiche einer Website zu bilden. <br>
<br>
  <img src="/src/assets/Views.png" alt="Views" title="Die Views bilden die Zusammensetzung der Website" width="auto" height="250">
 <br><br>
 Um die Bausteine korrekt in die Anwendung zu integrieren, müssen sie in der Datei  <span class="highlight-yellow">index.js</span> registriert und mit den entsprechenden Routen verknüpft werden. Dies geschieht typischerweise im Router-Verzeichnis, wo die <span class="highlight-blue">"Views"</span> als Komponenten importiert und zugeordnet werden.
 <br><br>
 <img src="/src/assets/Routen.png" alt="Routen" title="So sollten deine Routen aussehen" width="auto" height="400">
 <br>
</p>

      </div>
     
    </section>
  </template>
  
  <script>
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  
  export default {
    name: "DocumentationView",
    methods: {
      async exportAsPDF() {
        const element = this.$refs.documentation;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
        });
  
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
  
        // DIN A4 Maße berechnen
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
        // Klickbare Links hinzufügen
        const links = [
          { url: "https://visualstudio.microsoft.com/de/downloads/", x: 10, y: 50 },
          { url: "https://www.w3schools.com/html/html_intro.asp", x: 10, y: 60 },
          { url: "https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML", x: 10, y: 70 },
        ];
  
        links.forEach((link) => {
          pdf.link(link.x, link.y - 4, pdfWidth - 20, 10, { url: link.url });
        });
  
        pdf.save("Technische_Dokumentation.pdf");
      },
    },
  };
  </script>
  
  <style scoped>
  .documentation-view {
    padding: 1.5rem;
    font-family: 'Roboto', sans-serif;
    background-color: #fefcfb;
    color: #4a4a4a;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 1.8rem;
    color: #b9a9e8;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
  }
  
  a {
    color: #b9a9e8;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #8274b2;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 1rem;
  }
  
  .info-box {
    background-color: #f4f3f8;
    border-left: 4px solid #b9a9e8;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1.5rem;
    font-size: 0.95rem;
  }
  
  .info-box2 {
    background-color: #f4f3f8;
    border: 1px solid #b9a9e8;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1.5rem;
    font-size: 0.95rem;
  }
  
  .export-button {
    margin-top: 1rem;
    padding: 10px 15px;
    background-color: #b9a9e8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .export-button:hover {
    background-color: #a495d4;
  }
  .highlight-yellow {
  color: #ffcc00; /* Highlight color for index.js */
  font-weight: bold;
}

.highlight-blue {
  color: #00ccff; /* Highlight color for views */
  font-weight: bold;
}
  </style>
  