<template>
  <section class="documentation-view" ref="documentation">
    <h2>📚 Technische Dokumentation</h2>
    <p>
      Hier ist ein Kompendium der - für mich - relevantesten Informationen und Links zum Thema
      Programmierung. Mit diesen Schritten kannst du theoretisch eine eigene Seite wie diese und
      mehr erstellen.
    </p>

    <div class="info-box2">
      <h2><strong>Linksammlung:</strong></h2>
      <p>
        Die Links sind nach Schwierigkeitslevel sortiert.<br />
        Als Einsteiger kannst du die Liste also von oben nach unten abarbeiten, wenn du das
        Programmieren mit Vue3 lernen möchtest. <br /><br />
        <strong>Basis für fast alle Programmiersprachen:</strong>
      </p>
      <ul>
        <li>
          <a href="https://visualstudio.microsoft.com/de/downloads/" target="_blank"
            >Dowonload für die Entwicklerumgebung Visual Studio Code</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/html/html_intro.asp" target="_blank"
            >HTML Einführung</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML" target="_blank"
            >HTML Quiz</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/css/css_intro.asp" target="_blank">CSS Einführung</a>
        </li>
        <li>
          <a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=CSS" target="_blank"
            >CSS Quiz</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/js/js_intro.asp" target="_blank"
            >JavaScript Einführung</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS" target="_blank"
            >JavaScript Quiz</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/charsets/ref_emoji_office.asp" target="_blank"
            >Nutzbare Emojis</a
          >
        </li>
        <li>
          <a href="https://www.apachefriends.org/download.html" target="_blank"
            >XAMPP für Testserver (nicht für Vue Programmierung erforderlich)</a
          >
        </li>
      </ul>
      <br />
      <p><strong>Einstieg in Vue 3:</strong></p>
      <ul>
        <li>
          <a href="https://nodejs.org/en/download/prebuilt-installer" target="_blank">Node.js</a>
        </li>
        <li>
          <a
            href="https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=de"
            target="_blank"
            >Vue Addon für Chrome</a
          >
        </li>
        <li>
          <a href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/" target="_blank"
            >Vue3.js Einführung</a
          >
        </li>
        <li>
          <a href="https://vuejs.org/examples/#attribute-bindings" target="_blank"
            >Beispiele für Vue-Bausteine</a
          >
        </li>
        <li>
          <a href="https://www.vuemastery.com/" target="_blank"
            >VueMastery - Seite für alle relevanten Vue-Kurse</a
          >
        </li>
        <li><a href="https://vuejs.org/api/" target="_blank">Vue API</a></li>
      </ul>
    </div>

    <div class="info-box2">
      <h2>
        <p><strong>Nützliche Erweiterungen</strong> in Visual Studio Code:</p>
      </h2>
      <ul>
        <li>
          <strong>Prettier</strong>, formatiert den Code automatisch nach einheitlicher Stilvorgabe.
        </li>
        <li>
          <strong>Volar</strong>, unterstützt die Vue Entwicklung mit Syntax-Highlighting,
          IntelliSense und Linterintegration.
        </li>
        <li>
          <strong>ESLint</strong>, verhindert Fehler und hilft dir Best Practices zu befolgen.
        </li>
        <li>
          <strong>Path Intellisense</strong>, Autovervollständigung für Datei- und Pfadangaben ->
          Zeitersparnis und Fehlerreduktion.
        </li>
        <li>
          <strong>Vue VSCode Snippets</strong>, schneller Zugriff auf wiederkehrende Vue-Elemente.
        </li>
        <li>
          <strong>Atom One Dark</strong>, einfach ein Theme für VSCode, das cool und übersichtlich
          aussieht.
        </li>
      </ul>
    </div>

    <div class="info-box">
      <h2><strong>✍️ </strong> Vue 3 Projekt aufsetzen: <br /></h2>
      <small>Bedenke aber: Abläufe können sich mit der Zeit auch verändern!</small>

      <ol>
        <li>Version prüfen</li>
        <div class="info-box2">
          Öffne das Terminal in Visual Studio Code und gib zum Prüfen der Versionen ein:
          <br /><br />
          node -v
          <br />
          npm -v
          <br />
          <br />
          <small>Tritt eine Fehlermeldung auf, installiere zunächst node.</small>
        </div>
        <br />
        <li>Über das Terminal zum Zielordner navigieren</li>
        <div class="info-box2"><strong>cd</strong> C:/Users/...</div>
        <br />
        <li>Projekt erstellen</li>
        <div class="info-box2">
          <ul>
            <li><strong>npm create vue@latest</strong></li>
            <br />
            <li>Projektname eingeben</li>
            <li>TypeScript <strong>Nein</strong></li>
            <li>JSX <strong>Nein</strong></li>
            <li>Vue Router <strong>Ja</strong></li>
            <li>Pinia <strong>Ja</strong></li>
            <li>Vitest <strong>Nein</strong></li>
            <li>Cypress <strong>Nein</strong></li>
            <li>ESLint <strong>Ja</strong></li>
            <li>Prettier <strong>Ja</strong>/optional</li>
            <br />
            <li><strong>cd</strong> zum gerade angelegten Verzeichnis</li>
          </ul>
        </div>
        <br />
        <li>Abhängigkeiten installieren</li>
        <div class="info-box2">
          <strong>npm install</strong>
        </div>
        <br />
        <li>Entwicklerserver starten</li>
        <div class="info-box2">
          <strong>npm run dev</strong>
        </div>
      </ol>
      <p>
        Vue 3 arbeitet mit sogenannten "Single File Components" (SFCs). Diese sind Bausteine, in
        denen HTML, JavaScript und CSS in einer einzigen Datei organisiert sind, typischerweise mit
        der Endung <code>.vue</code>. <br />
        Diese Komponenten werden dann in <span class="highlight-blue">"Views"</span> oder Routen
        integriert, um die verschiedenen Bereiche einer Website zu bilden. <br />
        <br />
        <img
          src="/src/assets/Views.png"
          alt="Views"
          title="Die Views bilden die Zusammensetzung der Website"
          width="auto"
          height="250"
        />
        <br /><br />
        Um die Bausteine korrekt in die Anwendung zu integrieren, müssen sie in der Datei
        <span class="highlight-yellow">index.js</span> registriert und mit den entsprechenden Routen
        verknüpft werden. Dies geschieht typischerweise im Router-Verzeichnis, wo die
        <span class="highlight-blue">"Views"</span> als Komponenten importiert und zugeordnet
        werden. <br /><br />
        <img
          src="/src/assets/Routen.png"
          alt="Routen"
          title="So sollten deine Routen aussehen"
          width="auto"
          height="400"
        />
        <br />
      </p>
    </div>

    <div class="info-box2">
      <h2>
        <strong><a href="https://render.com/" target="_blank">Render</a> Einstellungen </strong>
      </h2>
      <p>Livegang einer statischen Seite:</p>
      <div class="info-box">
        <ol>
          <li>
            Öffne <a href="https://render.com/" target="_blank">Render</a> und logge dich ein. Am
            besten du loggst dich direkt mit deinem Github-Konto ein.
          </li>
          <li>Klicke auf <strong>"New"</strong> und wähle <strong>"Static Site".</strong></li>
          <li>
            Wähle das <strong> Github Repository</strong> von dem Projekt, das du deployen möchtest
            und klicke <strong>"Connect"</strong>.
          </li>
          <li>Gib bei <strong>General</strong> den Namen für deine Website ein.</li>
          <li>
            Bei <strong>Build & Deploy</strong> siehst du eine Vorschau für den Link deiner Seite,
            wähle beim <strong>Branch</strong> den Zweig aus, den du für den Livegang in Github
            vorgesehen hast.
          </li>
          <li>
            Bei <strong>Root Directory</strong> wählst du den Pfad/die Ordnerstruktur, der
            veröffentlicht werden soll, z.B. nur den Frontend-Ordner.
          </li>
          <li>
            <strong>Build Command</strong> ist bei einer Node/Vue Anwendung
            <strong>$ npm run build.</strong>
          </li>
          <li>Bei <strong>Publish Directory</strong> trage <strong>dist</strong> ein.</li>
          <li>
            Klicke auf Deploy, warte kurz und überprüfe dann, ob du die Seite aufrufen kannst.
          </li>
        </ol>
      </div>

      <p>
        <em
          >Wenn du eine statische Seite auf
          <a href="https://render.com/" target="_blank">Render</a> deployst, funktioniert der
          direkte Zugriff auf Links wie
          <code>https://lerntagebuch.onrender.com/dictionary</code> zunächst nicht. Stattdessen
          erscheint ein "Not Found"-Fehler. Das liegt daran, dass statische Seiten bei direktem
          Aufruf der URL keinen Server haben, der alle Anfragen automatisch an die
          <code>index.html</code> weiterleitet. Standardmäßig funktionieren die Verlinkungen nur
          lokal oder über clientseitiges Routing. Um dies zu beheben, müssen in Render ein paar
          Einstellungen vorgenommen werden, um alle Anfragen zur
          <code>index.html</code> umzuleiten.</em
        >
      </p>
      <div class="info-box">
        <ol>
          <li>Öffne dein <strong>Dashboard</strong> auf Render.</li>
          <li>Öffne das <strong>Projekt</strong>, an dem du die Änderung vornehmen möchtest.</li>
          <li>
            Suche nach einem Schalter namens <strong>"Redirects/Rewrites"</strong> im
            Navigationsmenü auf der linken Seite.
          </li>
          <li>
            Füge bei Source <strong><code>/*</code></strong> hinzu.
          </li>
          <li>
            Füge bei Destination <strong><code>/index.html</code></strong> hinzu.
          </li>
          <li>
            Wähle bei Action <strong> <code>Rewrite</code></strong
            >.
          </li>
          <li>Speichere die Einstellungen und teste, ob es funktioniert!</li>
        </ol>
      </div>
    </div>

    <div class="info-box2">
      <h4>Ultimativer Tipp für Gewinner:</h4>
      <p>
        Wenn im Terminal Probleme angezeigt werden oder etwas einfach nicht funktioniert, hab keine
        Scheu davor eine KI wie z.B. ChatGPT zu fragen. Du kannst dir dort auch erklären lassen, was
        das Problem ist. Achte nur bitte immer darauf, nicht nur Copy + Paste zu machen, sondern die
        KI gewissenhaft zu nutzen.
      </p>
    </div>

    <div class="info-box2">
      <h2><a href="https://vuetifyjs.com/en/" target="_blank">Vuetify 3</a></h2>
      <p>Neues Vue-Projekt mit Vuetify 3 erstellen:</p>
      <div class="info-box">
        <h3>1. Projekt erstellen</h3>
        <br />
        <code>npm create vite@latest PROJEKTNAME --template vue</code><br /><br />
        <code
          >cd PROJEKTNAME<br /><br /><br />
          npm install <br /><br />
          npm install vuetify <br /><br />
          npm install @mdi/font //für Icons
        </code>
      </div>

      <h3>2. Vuetify in main.js importieren</h3>
      <div class="info-box">
        <code>
          import { createApp } from 'vue'<br />
          import App from './App.vue'<br />
          import { createVuetify } from 'vuetify'<br />
          import 'vuetify/styles'<br />
          import '@mdi/font/css/materialdesignicons.css' // Falls du Icons nutzt<br /><br />

          const vuetify = createVuetify()<br /><br />

          createApp(App).use(vuetify).mount('#app')<br />
        </code>
      </div>

      <h3>3. In App.vue testen</h3>
      <div class="info-box">
        <pre><code>
&lt;template&gt;
  &lt;v-app&gt;
    &lt;v-container&gt;
      &lt;v-row&gt;
        &lt;v-col cols="12"&gt;
          &lt;v-card class="pa-5" elevation="5"&gt;
            &lt;v-card-title class="text-h5"&gt;Mein erstes Vuetify-Projekt&lt;/v-card-title&gt;
            &lt;v-card-text&gt;Hier lerne ich Vuetify mit Vue 3 🎉&lt;/v-card-text&gt;
            &lt;v-card-actions&gt;
              &lt;v-btn color="primary"&gt;Los geht’s!&lt;/v-btn&gt;
            &lt;/v-card-actions&gt;
          &lt;/v-card&gt;
        &lt;/v-col&gt;
      &lt;/v-row&gt;
    &lt;/v-container&gt;
  &lt;/v-app&gt;
&lt;/template&gt;

&lt;script setup&gt;
&lt;/script&gt;
</code></pre>
      </div>

      <p>
        <em><b>Teste anschließend deinen Code auf dem Developer-Server mit:</b></em>
      </p>
      <div class="info-box"><code>npm run dev</code></div>
      <br />
      <p>Sollte der Code <b>nicht</b> funktionieren, gehe in deine main.js:</p>
      <div class="info-box">
        <code
          >import { createApp } from 'vue'<br />
          import App from './App.vue'<br />
          import { createVuetify } from 'vuetify'<br />
          import * as components from 'vuetify/components'<br />
          import * as directives from 'vuetify/directives'<br />
          import 'vuetify/styles'<br />
          import '@mdi/font/css/materialdesignicons.css'<br /><br />

          const vuetify = createVuetify({<br />
          components, // == Hier wird sichergestellt, dass alle Komponenten registriert sind<br />
          directives<br />
          })<br />

          createApp(App).use(vuetify).mount('#app')
        </code>
      </div>

      <h3>4. Grid-System</h3>

      <p>
        Das <b>Grid-System</b> in Vuetify basiert auf einem <b>12-Spalten-Layout</b>. Jede
        <b>Zeile (<code>v-row</code>)</b> kann bis zu 12 Spalten (<code>v-col</code>) enthalten, die
        den verfügbaren Platz aufteilen.
      </p>
      <p>
        Du gibst einer Spalte mit <code>cols="x"</code> an, wie viele der 12 Spalten sie einnehmen
        soll (z. B. <code>cols="6"</code> für die Hälfte). Wenn die Summe der Spalten in einer Zeile
        <b>12 nicht überschreitet</b>, bleiben die Elemente in einer Reihe, sonst rutschen sie nach
        unten.
      </p>
      <p>
        Vuetify unterstützt <b>responsive Anpassungen</b>, indem du verschiedene Spaltenbreiten für
        unterschiedliche Bildschirmgrößen definieren kannst (z. B.
        <code>xs="12" sm="6" md="4"</code>).
      </p>
      <p>
        Zusätzlich gibt es <b>Offset</b> (Verschiebung), <b>Order</b> (Reihenfolge) und
        <b>Ausrichtungsoptionen</b>, um das Layout flexibel zu gestalten.
      </p>
      <p>
        Damit kannst du einfach <b>responsive, saubere und strukturierte Oberflächen</b> erstellen.
      </p>

      <br />

      <div class="info-box">
        <code
          >App.vue <br />
          <br
        /></code>
        <code
          >&lt;template&gt; <br />
          &lt;v-app&gt; <br />
          &lt;v-container&gt; <br />
          &lt;v-row&gt; <br />
          &lt;v-col cols=&quot;12&quot;&gt; <br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          &lt;v-card-title class=&quot;text-h5&quot;&gt;Vuetify Gridsystem&lt;/v-card-title&gt;
          <br />
          &lt;v-card-text&gt; <br />

          &lt;/v-card-text&gt; <br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          &lt;/v-row&gt; <br />

          &lt;v-row&gt; <br />
          <b> &lt;v-col cols=&quot;7&quot;&gt;</b> <br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          <b> &lt;v-card-title&gt;Box 1 (7 Spalten)&lt;/v-card-title&gt; </b><br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          <b> &lt;v-col cols=&quot;4&quot;&gt; </b><br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          <b> &lt;v-card-title&gt;Box 2 (4 Spalten)&lt;/v-card-title&gt;</b> <br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          <b> &lt;v-col cols=&quot;1&quot;&gt; </b><br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          <b> &lt;v-card-title&gt;Box 3 (1 Spalte)&lt;/v-card-title&gt; </b><br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          &lt;/v-row&gt; <br />

          &lt;v-row&gt; <br />
          &lt;v-col cols=&quot;6&quot;&gt; <br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          &lt;v-card-title&gt;Box 4 (6 Spalten)&lt;/v-card-title&gt; <br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          &lt;v-col cols=&quot;6&quot;&gt; <br />
          &lt;v-card class=&quot;pa-5&quot; elevation=&quot;5&quot;&gt; <br />
          &lt;v-card-title&gt;Box 5 (6 Spalten)&lt;/v-card-title&gt; <br />
          &lt;/v-card&gt; <br />
          &lt;/v-col&gt; <br />
          &lt;/v-row&gt; <br />
          &lt;/v-container&gt; <br />
          &lt;/v-app&gt; <br />
          &lt;/template&gt; <br />

          &lt;script setup&gt; <br />
          &lt;/script&gt; <br />
        </code>
      </div>
      <img src="/src/assets/GridLayout.jpg" alt="Views" title="Grid-System" />

      <h3>5. Buttons</h3>

      <p>
        Vuetify bietet eine Vielzahl von Buttons (<code>v-btn</code>), die sich flexibel anpassen
        lassen.
      </p>
      <ul>
        <li>
          Ein Standard-Button <code>v-btn color="primary"</code> hat eine Grundfarbe und wird für
          normale Aktionen genutzt.
        </li>
        <li>
          Outlined-Buttons (<code>variant="outlined"</code>) haben nur einen Rahmen und sind weniger
          auffällig.
        </li>
        <li>
          Icon-Buttons (<code>icon</code>) enthalten statt Text nur ein Symbol, oft für kompakte
          Bedienelemente.
        </li>
        <li>
          Tooltip-Buttons geben beim Hovern zusätzliche Kontextinformationen (z. B. ein Stern, der
          „Gefällt mir“ anzeigt).
        </li>
      </ul>
      <p>
        Buttons lassen sich mit Icons (z. B. <code>&lt;v-icon&gt;mdi-thumb-up&lt;/v-icon&gt;</code>)
        kombinieren, um ihre Bedeutung zu verdeutlichen.
      </p>
      <p>
        Zusätzlich können Buttons in Tooltips (<code>v-tooltip</code>) eingebettet werden, um
        zusätzliche Informationen beim Hover oder Fokus anzuzeigen.
      </p>
      <p>
        Alle Buttons können mit verschiedenen Farben (<code>color="success"</code>,
        <code>color="warning"</code>, etc.) gestaltet werden, um ihre Funktion visuell
        hervorzuheben.
      </p>

      <div class="info-box">
        <code
          >&lt;template&gt; <br />&lt;v-app&gt; <br />&lt;v-container&gt; <br />&lt;v-row&gt;<br />
          &lt;v-col&gt; &lt;v-btn color=&quot;primary&quot;&gt;Standard-Button&lt;/v-btn&gt;
          &lt;v-btn color=&quot;secondary&quot;
          variant=&quot;outlined&quot;&gt;Outlined&lt;/v-btn&gt; <br />
          &lt;v-btn color=&quot;success&quot; icon&gt; &lt;v-icon&gt;mdi-thumb-up&lt;/v-icon&gt;
          &lt;/v-btn&gt; &lt;v-tooltip text=&quot;Gefällt mir&quot;&gt;<br />
          &lt;template v-slot:activator=&quot;{ props }&quot;&gt; &lt;v-btn v-bind=&quot;props&quot;
          color=&quot;warning&quot; icon&gt; &lt;v-icon&gt;mdi-star&lt;/v-icon&gt; &lt;/v-btn&gt;<br />
          <br />
          &lt;/template&gt;<br />
          &lt;/v-tooltip&gt; &lt;/v-col&gt; &lt;/v-row&gt; &lt;/v-container&gt; &lt;/v-app&gt;<br />
          &lt;/template&gt;<br />
        </code>
      </div>
      <img src="/src/assets/Buttons.png" alt="Buttons" title="Buttons" />

      <h3>6. Formulare</h3>
      <p>
        In Vuetify kannst du Formulare mit <code>v-text-field</code>, <code>v-select</code>,
        <code>v-checkbox</code> und anderen Eingabeelementen erstellen.
      </p>
      <p>
        Die Komponenten sind materialbasiert und lassen sich leicht mit <code>v-model</code> an
        Vue-Daten binden.
      </p>
      <p>
        <code>v-text-field</code> wird für einfache Texteingaben genutzt, <code>v-select</code> für
        Dropdown-Listen und <code>v-checkbox</code> für Optionen, die an- oder abgewählt werden
        können.
      </p>
      <p>
        Formulare können validiert werden, indem man Regeln (<code>rules</code>) definiert, z. B.
        für Pflichtfelder oder E-Mail-Formate.
      </p>
      <p>
        Mit <code>v-card</code> kannst du das Formular stilvoll in eine Box packen, und
        <code>v-btn</code>
        dient zum Absenden.
      </p>
      <p>
        Man kann <code>v-form</code> um alle Felder legen, um eine globale Validierung zu
        aktivieren.
      </p>
      <p>Damit lassen sich schnell interaktive und nutzerfreundliche Formulare erstellen!</p>

      <div class="info-box">
        <code
          >&lt;template&gt; <br />
          &lt;v-app&gt;<br />
          &lt;v-container&gt;<br />
          &lt;v-card class=&quot;pa-5 mx-auto&quot; max-width=&quot;400&quot;&gt;<br />
          &lt;v-card-title class=&quot;text-h5&quot;&gt;Kontaktformular&lt;/v-card-title&gt;<br />
          &lt;v-card-text&gt;<br />
          &lt;v-text-field label=&quot;Name&quot; v-model=&quot;name&quot;
          outlined&gt;&lt;/v-text-field&gt;<br />
          &lt;v-text-field label=&quot;E-Mail&quot; v-model=&quot;email&quot;
          outlined&gt;&lt;/v-text-field&gt;<br />
          &lt;v-select label=&quot;Betreff&quot; :items=&quot;['Support', 'Feedback',
          'Sonstiges']&quot;<br />
          v-model=&quot;betreff&quot; outlined &gt;&lt;/v-select&gt; <br />&lt;v-checkbox
          v-model=&quot;agb&quot; label=&quot;Ich akzeptiere die AGB&quot;&gt;&lt;/v-checkbox&gt;
          &lt;/v-card-text&gt; <br />&lt;v-card-actions&gt; &lt;v-btn color=&quot;primary&quot;
          @click=&quot;absenden&quot;&gt;Absenden&lt;/v-btn&gt;<br />
          &lt;/v-card-actions&gt;<br />
          &lt;/v-card&gt;<br />
          &lt;/v-container&gt; <br />&lt;/v-app&gt;<br />
          &lt;/template&gt; <br />&lt;script setup&gt; import { ref } from 'vue'; const name =
          ref(''); const email = ref(''); const betreff = ref(''); const agb = ref(false); const
          absenden = () =&gt; { alert(`Gesendet: ${name.value}, ${email.value}, ${betreff.value}`);
          }; <br />&lt;/script&gt; <br />&lt;template&gt;<br />
          &lt;v-app&gt;<br />
          &lt;v-container&gt;<br />
          &lt;v-btn color=&quot;primary&quot; @click=&quot;dialog = true&quot;&gt;Mehr
          erfahren&lt;/v-btn&gt;<br />
          &lt;v-dialog v-model=&quot;dialog&quot; max-width=&quot;500&quot;&gt; &lt;v-card&gt;
          &lt;v-card-title class=&quot;text-h5&quot;&gt;Willkommen in Vuetify!&lt;/v-card-title&gt;
          &lt;v-card-text&gt;Dies ist ein modaler Dialog. 🎭<br />&lt;/v-card-text&gt;<br />
          &lt;v-card-actions&gt; <br />&lt;v-btn color=&quot;error&quot; @click=&quot;dialog =
          false&quot;&gt;Schließen&lt;/v-btn&gt;<br />
          &lt;/v-card-actions&gt;<br />
          &lt;/v-card&gt; &lt;/v-dialog&gt;<br />
          &lt;/v-container&gt; <br />&lt;/v-app&gt;<br />
          &lt;/template&gt; <br />&lt;script setup&gt; import { ref } from 'vue'; const dialog =
          ref(false); &lt;/script&gt;
        </code>
      </div>
      <img src="/src/assets/Kontaktformular.png" alt="Formular" title="Formular" />

      <h3>7. Dialogfenster</h3>
      <p>
        Dieser Code erstellt ein modales Dialogfenster mit Vuetify, das sich über einen Button
        öffnen und schließen lässt.
      </p>
      <p>
        Sobald der Nutzer auf den Button mit der Aufschrift "Mehr erfahren" klickt, wird die
        Variable <code>dialog</code> auf <code>true</code> gesetzt, wodurch das
        <code>v-dialog</code>-Element sichtbar wird.
      </p>
      <p>
        Innerhalb des Dialogs befindet sich eine <code>v-card</code>, die eine Begrüßung, eine kurze
        Nachricht und einen Schließen-Button enthält.
      </p>
      <p>
        Durch das Klicken auf den Schließen-Button wird <code>dialog</code> wieder auf
        <code>false</code>
        gesetzt, wodurch sich das Dialogfenster schließt.
      </p>
      <p>
        Die Variable <code>dialog</code> ist als reaktive Referenz (<code>ref</code>) in Vue
        definiert, sodass Änderungen sofort in der Benutzeroberfläche reflektiert werden.
      </p>
      <p>
        Das <code>v-dialog</code>-Element sorgt dafür, dass sich das Modal automatisch an die
        Bildschirmgröße anpasst und auf der Seite zentriert dargestellt wird.
      </p>
      <p>
        Diese Funktionalität eignet sich besonders für Hinweise, Bestätigungsfenster oder
        zusätzliche Informationen in einer Anwendung.
      </p>

      <div class="info-box">
        <code
          >&lt;template&gt;<br />
          &lt;v-app&gt; &lt;v-container&gt;<br />
          &lt;v-btn color=&quot;primary&quot; @click=&quot;dialog = true&quot;&gt;Mehr erfahren<br />&lt;/v-btn&gt;<br />
          &lt;v-dialog v-model=&quot;dialog&quot; max-width=&quot;500&quot;&gt; &lt;v-card&gt;
          &lt;v-card-title class=&quot;text-h5&quot;&gt;Willkommen in Vuetify!<br />&lt;/v-card-title&gt;<br />
          &lt;v-card-text&gt;Dies ist ein modaler Dialog.🎭<br />&lt;/v-card-text&gt;<br />
          &lt;v-card-actions&gt; &lt;v-btn color=&quot;error&quot; @click=&quot;dialog =
          false&quot;&gt;Schließen&lt;/v-btn&gt;<br />
          &lt;/v-card-actions&gt;<br />
          &lt;/v-card&gt; <br />&lt;/v-dialog&gt; <br />&lt;/v-container&gt; <br />&lt;/v-app&gt;
          <br />&lt;/template&gt;<br />
          &lt;script setup&gt; import { ref } from 'vue'; const dialog = ref(false);<br />
          &lt;/script&gt;
        </code>
      </div>
      <img src="/src/assets/Dialog.png" alt="Dialog" title="Dialog" />
      <h3>8. Snackbar</h3>
      <p>
        Eine Snackbar in Vuetify ist eine kleine, temporäre Benachrichtigung, die am unteren
        Bildschirmrand erscheint, um dem Nutzer eine kurze Meldung zu geben.
      </p>
      <p>
        Sie eignet sich perfekt für Statusmeldungen wie "Erfolgreich gespeichert" oder "Aktion
        fehlgeschlagen".
      </p>
      <p>
        Die Snackbar wird mit <code>v-snackbar</code> erstellt und über eine reaktive Variable
        (<code>ref</code>) gesteuert, die festlegt, ob sie sichtbar ist oder nicht.
      </p>
      <p>
        Man kann sie nach einer bestimmten Zeit automatisch ausblenden lassen, indem man die
        <code>timeout</code>-Eigenschaft nutzt.
      </p>
      <p>
        Standardmäßig verschwindet sie nach wenigen Sekunden, aber man kann auch einen
        Schließen-Button (<code>v-btn</code>) hinzufügen, um sie manuell zu schließen.
      </p>
      <p>
        Außerdem lässt sich die Position der Snackbar anpassen, sodass sie nicht nur unten, sondern
        auch oben oder zentriert angezeigt werden kann.
      </p>
      <p>
        Kurz gesagt: Eine Snackbar ist die perfekte Mini-Benachrichtigung, um Nutzern Feedback zu
        geben, ohne den gesamten Bildschirm zu überlagern.
      </p>
      <div class="info-box">
        <code>
          &lt;template&gt;<br />
          &lt;v-app&gt;<br />
          &lt;v-container&gt;<br />
          &lt;v-btn color=&quot;success&quot; @click=&quot;snackbar = true&quot;&gt;Aktion
          ausführen<br />&lt;/v-btn&gt; <br />&lt;v-snackbar v-model=&quot;snackbar&quot;
          timeout=&quot;3000&quot;&gt; Aktion erfolgreich ausgeführt! 🎉 <br />&lt;template
          v-slot:actions&gt; <br />&lt;v-btn color=&quot;white&quot; variant=&quot;text&quot;
          @click=&quot;snackbar = false&quot;&gt;OK<br />&lt;/v-btn&gt;
          <br />&lt;/template&gt;<br />
          &lt;/v-snackbar&gt;<br />
          &lt;/v-container&gt; <br />&lt;/v-app&gt;<br />
          &lt;/template&gt; <br />&lt;script setup&gt; import { ref } from 'vue'; const snackbar =
          ref(false); <br />&lt;/script&gt;
        </code>
      </div>
      <img src="/src/assets/Snackbar.png" alt="Snackbar" title="Snackbar" />
    </div>
  </section>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'DocumentationView',
  methods: {
    async exportAsPDF() {
      const element = this.$refs.documentation

      // Screenshot der gesamten Seite erstellen
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        onclone: (documentClone) => {
          // Links deaktivieren im Snapshot
          const links = documentClone.querySelectorAll('a')
          links.forEach((link) => {
            link.replaceWith(documentClone.createTextNode(link.textContent))
          })
        },
      })

      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png')

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Bild in Seiten aufteilen
      let imgHeight = (canvas.height * pdfWidth) / canvas.width
      let position = 0

      while (position < imgHeight) {
        pdf.addImage(
          imgData,
          'PNG',
          0,
          position ? -position : 0,
          pdfWidth,
          (canvas.height * pdfWidth) / canvas.width,
        )

        position += pdfHeight

        if (position < imgHeight) {
          pdf.addPage()
        }
      }

      pdf.save('Technische_Dokumentation.pdf')
    },
  },
}
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

code {
  word-break: break-word;
  white-space: normal; /* Standardmäßiger Zeilenumbruch */
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
  height: auto; /* Verhältnis bleibt erhalten */
  display: block; /* Verhindert zusätzliche Leerflächen unter Bildern */
  margin: 0 auto; /* Zentriert das Bild horizontal */
}
</style>
