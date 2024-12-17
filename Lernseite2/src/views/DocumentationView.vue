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

      <div class="info-box2"> 
        <strong><a href="https://render.com/" target="_blank">Render</a> Einstellungen </strong> 
<p>Livegang einer statischen Seite:</p>
<div class="info-box">
<ol>
<li>Öffne <a href="https://render.com/" target="_blank">Render</a> und logge dich ein. Am besten du loggst dich direkt mit deinem Github-Konto ein.</li>
<li>Klicke auf <strong>"New"</strong> und wähle <strong>"Static Site".</strong></li>
<li>Wähle das <strong> Github Repository</strong> von dem Projekt, das du deployen möchtest und klicke <strong>"Connect"</strong>.</li>
<li>Gib bei <strong>General</strong> den Namen für deine Website ein.</li>
<li>Bei <strong>Build & Deploy</strong> siehst du eine Vorschau für den Link deiner Seite, wähle beim <strong>Branch</strong> den Zweig aus, den du für den Livegang in Github vorgesehen hast.</li>
<li>Bei <strong>Root Directory</strong> wählst du den Pfad/die Ordnerstruktur, der veröffentlicht werden soll, z.B. nur den Frontend-Ordner. </li>
<li><strong>Build Command</strong> ist bei einer Node/Vue Anwendung <strong>$ npm run build.</strong></li>
<li>Bei <strong>Publish Directory</strong> trage <strong>dist</strong> ein.</li>
<li>Klicke auf Deploy, warte kurz und überprüfe dann, ob du die Seite aufrufen kannst.</li>
</ol>



</div>
        


        <p><em>Wenn du eine statische Seite auf <a href="https://render.com/" target="_blank">Render</a>
          deployst, funktioniert der direkte Zugriff auf Links wie <code>https://lerntagebuch.onrender.com/dictionary</code> zunächst nicht. Stattdessen erscheint ein "Not Found"-Fehler. Das liegt daran, dass statische Seiten bei direktem Aufruf der URL keinen Server haben, der alle Anfragen automatisch an die <code>index.html</code> weiterleitet. Standardmäßig funktionieren die Verlinkungen nur lokal oder über clientseitiges Routing. Um dies zu beheben, müssen in Render ein paar Einstellungen vorgenommen werden, um alle Anfragen zur <code>index.html</code> umzuleiten.</em></p>
      <div class="info-box">
      <ol>
          <li>Öffne dein <strong>Dashboard</strong> auf Render.</li>
          <li>Öffne das <strong>Projekt</strong>, an dem du die Änderung vornehmen möchtest.</li>
          <li>Suche nach einem Schalter namens <strong>"Redirects/Rewrites"</strong> im Navigationsmenü auf der linken Seite. </li>
          <li>Füge bei Source <strong><code>/*</code></strong> hinzu.</li>
          <li>Füge bei Destination <strong><code>/index.html</code></strong> hinzu.</li>
          <li>Wähle bei Action <strong> <code>Rewrite</code></strong>.</li>
          <li>Speichere die Einstellungen und teste, ob es funktioniert!</li>
        </ol>
    

      </div>
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
  
        // Screenshot der gesamten Seite erstellen
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          onclone: (documentClone) => {
            // Links deaktivieren im Snapshot
            const links = documentClone.querySelectorAll("a");
            links.forEach((link) => {
              link.replaceWith(documentClone.createTextNode(link.textContent));
            });
          },
        });
  
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        // Bild in Seiten aufteilen
        let imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let position = 0;
  
        while (position < imgHeight) {
          pdf.addImage(
            imgData,
            "PNG",
            0,
            position ? -position : 0,
            pdfWidth,
            (canvas.height * pdfWidth) / canvas.width
          );
  
          position += pdfHeight;
  
          if (position < imgHeight) {
            pdf.addPage();
          }
        }
  
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
img {
  max-width: 100%; /* Bild bleibt innerhalb der Elternelemente */
  height: auto;    /* Verhältnis bleibt erhalten */
  display: block;  /* Verhindert zusätzliche Leerflächen unter Bildern */
  margin: 0 auto;  /* Zentriert das Bild horizontal */
}

  </style>
  