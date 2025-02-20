<template>
  <section class="dictionary-view">
    <h2>📖 IT-Wörterbuch</h2>

    <div class="search">
      <input v-model="searchTerm" type="text" placeholder="Nach einem Begriff suchen..." />
    </div>

    <div class="controls">
      <button @click="toggleSortOrder">
        {{ sortOrder === 'asc' ? 'Z-A sortieren' : 'A-Z sortieren' }}
      </button>
    </div>

    <ul class="terms">
      <li v-for="term in sortedAndFilteredTerms" :key="term.word">
        <strong v-html="highlightText(term.word)"></strong>:
        <span v-html="highlightText(term.definition)"></span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'DictionaryView',
  data() {
    return {
      searchTerm: '',
      sortOrder: 'asc', // Standardmäßig aufsteigend sortiert
      terms: [
        {
          word: '5G',
          definition:
            'Die fünfte Generation der Mobilfunktechnologie, die höhere Geschwindigkeiten, geringere Latenzen und eine größere Kapazität bietet als ihre Vorgänger. 5G ist die Grundlage für viele moderne Anwendungen wie autonomes Fahren, das Internet der Dinge (IoT) und Smart Cities. Es ermöglicht Downloadgeschwindigkeiten von bis zu 10 Gbit/s und unterstützt eine Vielzahl von Geräten gleichzeitig, was es ideal für stark vernetzte Umgebungen macht.',
        },
        {
          word: '4G',
          definition:
            'Die vierte Generation der Mobilfunktechnologie, die im Vergleich zu 3G deutlich schnellere Datenübertragungsraten bietet. Mit Downloadgeschwindigkeiten von bis zu 1 Gbit/s ermöglicht 4G Anwendungen wie HD-Videostreaming, Videotelefonie und schnelle mobile Internetverbindungen.',
        },
        {
          word: 'LTE',
          definition:
            "Steht für 'Long Term Evolution' und ist eine Mobilfunktechnologie, die oft als 4G bezeichnet wird. LTE ist jedoch technisch eine Weiterentwicklung von 3G und erreicht nicht die vollständigen Spezifikationen von echtem 4G. Es bietet dennoch Geschwindigkeiten von bis zu 300 Mbit/s und bildet die Grundlage für viele heutige 4G-Netzwerke.",
        },

        {
          word: 'C#',
          definition:
            'Eine objektorientierte Programmiersprache, die von Microsoft entwickelt wurde. Häufig für Windows-Anwendungen, Webservices und Spiele (Unity) eingesetzt. C# wird in der .NET-Plattform verwendet und unterstützt moderne Konzepte wie LINQ, asynchrone Programmierung und Generics.\n\n**Beispielcode (C#)**:\n```csharp\nusing System;\n\nclass HelloWorld {\n    static void Main() {\n        Console.WriteLine("Hallo, C#");\n    }\n}\n```\n',
        },
        {
          word: 'Python',
          definition:
            'Eine vielseitige und leicht zu erlernende Programmiersprache, die häufig für Datenanalyse, Webentwicklung, maschinelles Lernen und Automatisierung eingesetzt wird.',
        },
        {
          word: 'Java',
          definition:
            'Eine objektorientierte Programmiersprache, die für plattformunabhängige Anwendungen verwendet wird. Besonders beliebt in der Unternehmenssoftware und bei Android-Apps.',
        },
        {
          word: 'JavaScript',
          definition:
            'Eine Skriptsprache, die vor allem in der Webentwicklung für dynamische und interaktive Inhalte genutzt wird. Sie läuft sowohl im Browser als auch auf Servern (z. B. mit Node.js).',
        },
        {
          word: 'PHP',
          definition:
            'Eine serverseitige Skriptsprache, die häufig für die Entwicklung von Webseiten und Webanwendungen verwendet wird. Sie ist besonders bekannt für Content-Management-Systeme wie WordPress.',
        },
        {
          word: 'Ruby',
          definition:
            'Eine dynamische, objektorientierte Programmiersprache, die vor allem für die Webentwicklung mit dem Framework Ruby on Rails genutzt wird.',
        },
        {
          word: 'Unity',
          definition:
            'Eine plattformübergreifende Spieleentwicklungsplattform, die vor allem für die Entwicklung von 2D- und 3D-Spielen verwendet wird. Unity unterstützt C# als primäre Programmiersprache.',
        },
        {
          word: 'Unreal Engine',
          definition:
            'Eine leistungsstarke Spieleentwicklungsplattform, die vor allem in der Entwicklung von AAA-Spielen verwendet wird. Sie unterstützt C++ und eine eigene visuelle Skriptsprache namens Blueprint.',
        },
        {
          word: 'Godot',
          definition:
            'Ein Open-Source-Game-Engine, die für die Entwicklung von 2D- und 3D-Spielen genutzt wird. Sie unterstützt Sprachen wie GDScript, C#, C++ und VisualScript.',
        },
        {
          word: 'HTML',
          definition:
            'Steht für HyperText Markup Language und ist die Standard-Sprache zur Strukturierung von Webinhalten.',
        },
        {
          word: 'CSS',
          definition:
            'Steht für Cascading Style Sheets und wird verwendet, um das Aussehen und Layout von Webseiten zu gestalten.',
        },
        {
          word: 'SQL',
          definition:
            'Steht für Structured Query Language und ist eine Sprache zur Verwaltung und Abfrage von Datenbanken.',
        },
        {
          word: 'Node.js',
          definition:
            'Eine JavaScript-Laufzeitumgebung, die es ermöglicht, serverseitige Anwendungen mit JavaScript zu schreiben.',
        },
        {
          word: 'React',
          definition:
            'Eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen, insbesondere für Single-Page-Anwendungen. Entwickelt von Facebook.',
        },
        {
          word: 'Angular',
          definition:
            'Ein von Google entwickeltes Framework zur Erstellung von Webanwendungen. Es verwendet TypeScript als Programmiersprache.',
        },
        {
          word: 'TypeScript',
          definition:
            'Eine Erweiterung von JavaScript mit statischer Typisierung, die Fehler in der Entwicklung reduziert und die Lesbarkeit des Codes verbessert.',
        },
        {
          word: 'Dart',
          definition:
            "Eine von Google entwickelte Programmiersprache, die vor allem zusammen mit dem Framework Flutter genutzt wird, um plattformübergreifende Apps (mobil, Web, Desktop) zu entwickeln.\n\n**Beispielcode (Dart)**:\n```dart\nvoid main() {\n  print('Hallo von Dart!');\n}\n```\n",
        },
        {
          word: 'Flutter',
          definition:
            'Ein von Google entwickeltes Framework für die plattformübergreifende Entwicklung von mobilen, Web- und Desktop-Anwendungen. Basierend auf Dart. Durch die Widgets-Architektur lassen sich Oberflächen schnell bauen.',
        },
        {
          word: 'Kotlin',
          definition:
            'Eine moderne Programmiersprache, die vor allem für die Entwicklung von Android-Apps verwendet wird. Sie ist interoperabel mit Java.',
        },
        {
          word: 'Swift',
          definition:
            'Eine Programmiersprache von Apple, die für die Entwicklung von iOS- und macOS-Anwendungen verwendet wird.',
        },
        {
          word: 'Rust',
          definition:
            'Eine Systemsprache, die auf Sicherheit und Leistung ausgelegt ist. Sie wird oft für die Entwicklung von Systemtools, WebAssembly und Serveranwendungen verwendet.',
        },
        {
          word: 'Go (Golang)',
          definition:
            'Eine Programmiersprache, die von Google entwickelt wurde. Sie wird häufig für skalierbare Netzwerk- und Cloud-Anwendungen eingesetzt.',
        },
        {
          word: 'Shell-Skripting',
          definition:
            'Das Schreiben von Skripten für Kommandozeilenumgebungen wie Bash oder PowerShell, um administrative Aufgaben zu automatisieren.',
        },
        {
          word: 'Machine Learning',
          definition:
            'Ein Teilbereich der Künstlichen Intelligenz, bei dem Algorithmen aus Daten lernen, um Vorhersagen zu treffen oder Entscheidungen zu treffen.',
        },
        {
          word: 'Artificial Intelligence (AI)',
          definition:
            'Ein Bereich der Informatik, der sich mit der Entwicklung von Systemen befasst, die menschenähnliche Intelligenz aufweisen.',
        },
        {
          word: 'Big Data',
          definition:
            'Die Verarbeitung und Analyse großer Datenmengen, um Muster und Trends zu erkennen.',
        },
        {
          word: 'Blockchain',
          definition:
            'Eine dezentrale, manipulationsresistente Datenbanktechnologie, in der Datenblöcke kryptografisch verkettet sind. Sie wird oft in Kryptowährungen wie Bitcoin genutzt, kann aber auch für Lieferketten, Smart Contracts und andere Anwendungen verwendet werden, die Vertrauen und Nachvollziehbarkeit erfordern.',
        },
        {
          word: 'Docker',
          definition:
            'Ein Tool zur Erstellung und Verwaltung von Containern, die Anwendungen und deren Abhängigkeiten isoliert bereitstellen.',
        },

        {
          word: 'GitHub',
          definition:
            'Eine Plattform zur Verwaltung von Git-Repositories, die Kollaborations- und Versionskontrollfunktionen bietet.',
        },
        {
          word: 'CI/CD',
          definition:
            "Steht für 'Continuous Integration' und 'Continuous Deployment/Delivery'. Ein Prozess, bei dem Code automatisch getestet, gebaut und bei Erfolg direkt in eine produktionsähnliche Umgebung bereitgestellt wird. Ziel ist, Änderungen schneller und zuverlässiger auszuliefern.",
        },
        {
          word: 'Agile',
          definition:
            'Ein Ansatz für Projektmanagement und Softwareentwicklung, der schnelle Anpassung an Veränderungen und iterative Prozesse priorisiert. Anstelle eines starren Projektplans arbeiten Teams in kurzen Entwicklungszyklen (Sprints), um regelmäßig Feedback einzuholen und Prioritäten neu anzupassen. Bekannte agile Methoden sind Scrum und Kanban.',
        },
        {
          word: 'Scrum',
          definition:
            'Ein agiles Framework zur Verwaltung von Projekten, das in Iterationen (Sprints) arbeitet.',
        },

        {
          word: 'REST',
          definition:
            'Ein Architekturstil für APIs, der auf HTTP-Methoden basiert und eine einfache Kommunikation zwischen Client und Server ermöglicht.',
        },
        {
          word: 'GraphQL',
          definition:
            'Eine Abfragesprache für APIs, die es ermöglicht, genau die benötigten Daten abzufragen.',
        },
        {
          word: 'Virtual Reality (VR)',
          definition:
            'Eine immersive Technologie, die Benutzern eine computergenerierte 3D-Umgebung bietet.',
        },
        {
          word: 'Augmented Reality (AR)',
          definition: 'Eine Technologie, die virtuelle Objekte in die reale Welt integriert.',
        },
        {
          word: 'Cybersecurity',
          definition: 'Der Schutz von Netzwerken, Systemen und Daten vor digitalen Angriffen.',
        },
        {
          word: 'Encryption',
          definition: 'Die Verschlüsselung von Daten, um sie vor unbefugtem Zugriff zu schützen.',
        },
        {
          word: 'Cloud Computing',
          definition:
            'Die Bereitstellung von IT-Ressourcen wie Servern, Speicher und Anwendungen über das Internet.',
        },

        {
          word: 'Algorithmus',
          definition:
            'Eine klar definierte, endliche Abfolge von Anweisungen, die ein Problem Schritt für Schritt lösen sollen. In der Informatik werden Algorithmen genutzt, um Berechnungen durchzuführen, Daten zu verarbeiten oder Aufgaben zu automatisieren. Beispiele sind Sortieralgorithmen (z. B. Quicksort) oder Suchalgorithmen (z. B. Binäre Suche).',
        },
        {
          word: 'API',
          definition:
            "Steht für 'Application Programming Interface' und bezeichnet eine Programmierschnittstelle, über die Softwareanwendungen miteinander kommunizieren können. APIs definieren, welche Methoden, Parameter und Datenstrukturen zugänglich sind. So können externe Programme oder Services Daten abrufen, senden oder Funktionen nutzen, ohne den internen Code kennen zu müssen.",
        },
        {
          word: 'Array',
          definition:
            'Eine geordnete Sammlung von Elementen (z. B. Zahlen oder Strings), die über Indizes angesprochen werden. In vielen Programmiersprachen bildet ein Array die Grundlage für Datenstrukturen wie Listen, Stacks oder Queues.',
        },
        {
          word: 'Arrow Function',
          definition:
            "Eine verkürzte Syntax für Funktionen in JavaScript. Sie bezieht den this-Kontext aus dem umgebenden Scope (Lexical this). Dadurch muss man kein 'function'-Schlüsselwort mehr verwenden.\n\n**Beispielcode (JavaScript)**:\n```js\n// herkömmliche Funktion\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow Function\nconst addArrow = (a, b) => a + b;\n```\n",
        },
        {
          word: 'Authentication',
          definition: 'Der Prozess der Überprüfung der Identität eines Benutzers.',
        },
        { word: 'Authorization', definition: 'Der Prozess der Zuweisung von Rechten an Benutzer.' },
        { word: 'Availability', definition: 'Die Verfügbarkeit eines Systems oder Dienstes.' },
        {
          word: 'Backend',
          definition:
            'Der Teil einer Anwendung, der auf dem Server läuft und Logik, Datenverarbeitung sowie die Kommunikation mit Datenbanken und APIs verwaltet. Das Backend bleibt für Nutzer unsichtbar.',
        },
        {
          word: 'Babel',
          definition:
            "Ein Transpiler (umgangssprachlich ein 'Compiler'), der modernen JavaScript-Code (z. B. ES6+) in abwärtskompatibles JavaScript übersetzt, damit er in älteren Browsern ausgeführt werden kann. Babel wird in vielen Webprojekten eingesetzt, um neue Sprachfeatures nutzen zu können, ohne die Kompatibilität zu verlieren.",
        },

        { word: 'Bandwidth', definition: 'Die maximale Datenmenge, die übertragen werden kann.' },

        {
          word: 'Cache',
          definition: 'Ein schneller Speicher, der häufig genutzte Daten speichert.',
        },
        { word: 'CAPTCHA', definition: 'Ein Test zur Unterscheidung zwischen Menschen und Bots.' },
        {
          word: 'CI/CD Pipeline',
          definition:
            'Ein Ablauf (Pipeline) von Schritten, in dem Codeänderungen integriert (CI), getestet und bei Erfolg automatisiert bereitgestellt (CD) werden. Häufig genutzt in DevOps-Umgebungen, um Regressionsfehler früh zu erkennen und manuelle Deployments zu reduzieren.',
        },

        {
          word: 'Closure',
          definition: 'Eine Funktion, die auf Variablen in ihrem äußeren Bereich zugreifen kann.',
        },
        {
          word: 'Code Review',
          definition: 'Prüfung von Code durch andere Entwickler zur Qualitätssteigerung.',
        },
        {
          word: 'Compiler',
          definition: 'Ein Programm, das Quellcode in ausführbaren Code übersetzt.',
        },
        {
          word: 'Container',
          definition:
            'Eine standardisierte Einheit zur Verpackung von Software und deren Abhängigkeiten.',
        },
        {
          word: 'Continuous Deployment',
          definition: 'Automatische Bereitstellung von Änderungen nach dem Testen.',
        },
        {
          word: 'Deployment',
          definition:
            'Der Prozess, eine Softwareanwendung von der Entwicklungsumgebung auf einen Server oder in die Cloud zu übertragen, damit sie für Nutzer zugänglich wird.',
        },
        {
          word: 'Datenbankindex',
          definition:
            'Ein Mechanismus, der die Geschwindigkeit von Datenbankabfragen erhöht, indem er den Zugriff auf Zeilen beschleunigt. Ein Index funktioniert ähnlich wie ein Inhaltsverzeichnis in einem Buch.',
        },
        {
          word: 'Continuous Integration',
          definition:
            'Ein Entwicklungsprozess, bei dem Änderungen kontinuierlich integriert und getestet werden.',
        },
        {
          word: 'Cookies',
          definition:
            'Kleine Daten, die von Websites gespeichert werden, um Benutzerinformationen zu speichern.',
        },
        {
          word: 'Server',
          definition:
            'Ein Computer oder Programm, das Ressourcen und Dienste wie Webseiten, Datenbanken oder APIs bereitstellt und Anfragen von Clients verarbeitet.',
        },
        {
          word: 'Endpoint',
          definition:
            "Ein spezifischer URL-Pfad in einer API, über den bestimmte Daten oder Funktionen bereitgestellt werden. Beispiel: '/api/v1/users' liefert Benutzerdaten.",
        },
        {
          word: 'Cross-Browser Testing',
          definition: 'Testen einer Website in verschiedenen Browsern.',
        },
        {
          word: 'Primary Key',
          definition:
            'Ein eindeutiges Merkmal oder Feld, das jede Zeile in einer Datenbanktabelle identifiziert. Ein Primary Key verhindert doppelte Einträge.',
        },
        {
          word: 'Quality Control (QC)',
          definition:
            'Ein Prozess, bei dem Produkte oder Dienstleistungen überprüft werden, um sicherzustellen, dass sie bestimmte Qualitätsstandards erfüllen. Quality Control identifiziert Fehler oder Abweichungen und sorgt dafür, dass sie behoben werden, bevor das Produkt den Kunden erreicht. In der Softwareentwicklung bedeutet QC beispielsweise das Testen von Anwendungen, um Bugs zu finden und zu beheben.',
        },
        {
          word: 'Cross-Origin Resource Sharing (CORS)',
          definition: 'Eine Sicherheitsfunktion zur Einschränkung von Anfragen zwischen Domänen.',
        },
        {
          word: 'CRUD',
          definition:
            'Ein Akronym für die grundlegenden Operationen in Datenbanken: Create (Erstellen), Read (Lesen), Update (Aktualisieren) und Delete (Löschen).',
        },

        {
          word: 'Data Lake',
          definition:
            'Ein zentrales Repository, in dem große Mengen unstrukturierter, semistrukturierter und strukturierter Daten gespeichert werden. Anders als in Data Warehouses werden Daten im ursprünglichen Format aufbewahrt, um sie später für Analysen, Machine Learning oder andere Zwecke zu nutzen.',
        },
        {
          word: 'Data Mining',
          definition:
            'Der Prozess des Aufdeckens verborgener Muster und Zusammenhänge in großen Datenmengen. Data Mining-Methoden (z. B. Clustering, Klassifikation) werden eingesetzt, um Erkenntnisse zu gewinnen, Prognosen zu erstellen oder Geschäftsentscheidungen zu verbessern.',
        },
        {
          word: 'Data Warehouse',
          definition:
            'Ein System zur Speicherung und Analyse großer Datenmengen, das Daten aus verschiedenen Quellen zusammenführt und konsolidiert. Anders als ein Data Lake enthält ein Data Warehouse oft bereits strukturierte, bereinigte Daten für bestimmte Analysezwecke.',
        },
        {
          word: 'Datenbank',
          definition:
            'Ein System zur strukturierten Speicherung, Verwaltung und Abfrage von Daten. Datenbanken ermöglichen es, große Datenmengen effizient zu organisieren und zu durchsuchen. Dieses Wörterbuch ist z.B. auch eine kleine Datenbank.',
        },
        {
          word: 'Debugger',
          definition:
            'Ein Werkzeug (z. B. in IDEs) zum Ausführen von Code in Einzelschritten. Man kann Variablen inspizieren, Haltepunkte (Breakpoints) setzen und so Fehlerquellen leichter finden und beheben.',
        },
        {
          word: 'Dependency',
          definition: 'Eine externe Bibliothek oder Ressource, von der eine Anwendung abhängt.',
        },
        {
          word: 'Destructuring',
          definition: 'Eine Syntax zum Extrahieren von Werten aus Arrays oder Objekten.',
        },
        {
          word: 'DevOps',
          definition:
            'Eine Methodik, die Entwicklung (Development) und Betrieb (Operations) eng verzahnt. Ziel ist schnellere, zuverlässigere Softwareauslieferung durch Automatisierung (z. B. CI/CD-Pipelines) und enge Kommunikation zwischen Entwicklern und Administratoren.',
        },
        {
          word: 'DNS',
          definition:
            'Steht für Domain Name System und löst Domainnamen (z. B. www.beispiel.de) in IP-Adressen auf. So müssen sich Benutzer keine komplizierten Zahlen merken, um Websites zu erreichen.',
        },

        {
          word: 'Dynamic Content',
          definition: 'Inhalte, die basierend auf Benutzereingaben generiert werden.',
        },

        {
          word: 'Encryption Key',
          definition: 'Ein Schlüssel zur Sicherung und Entschlüsselung von Daten.',
        },
        {
          word: 'End-to-End Testing',
          definition: 'Testen des gesamten Workflows einer Anwendung.',
        },
        {
          word: 'Event Bubbling',
          definition:
            "Ein Mechanismus im DOM (Document Object Model), bei dem Ereignisse (z. B. Klicks) von dem innersten Element nach außen 'hochwandern'. Man kann Ereignisse abfangen oder stoppen, um das Standardverhalten zu verhindern.",
        },
        {
          word: 'Event Loop',
          definition:
            'Ein Kernkonzept in JavaScript (und anderen Umgebungen), das asynchrone Ereignisse und Funktionen verwaltet. Der Event Loop nimmt Aufgaben aus einer Queue, führt sie aus und ermöglicht dadurch nicht-blockierende Abläufe im Single-Thread.',
        },
        {
          word: 'Failover',
          definition:
            'Ein automatischer Mechanismus zum Umschalten auf ein Redundanz- oder Backupsystem, wenn das primäre System ausfällt. So bleibt die Verfügbarkeit hoch, auch wenn eine Komponente versagt.',
        },
        {
          word: 'Feature Toggle',
          definition:
            'Ein Schalter, mit dem man Funktionen in einer Anwendung aktivieren oder deaktivieren kann, ohne Code auszuliefern. So können neue Features schrittweise oder für bestimmte Nutzergruppen freigeschaltet werden.',
        },
        {
          word: 'Firewall',
          definition:
            'Eine Sicherheitsbarriere zwischen einem internen Netzwerk und dem Internet oder anderen Netzen. Sie filtert ein- und ausgehenden Datenverkehr nach definierten Regeln, um unbefugten Zugriff zu verhindern.',
        },
        {
          word: 'Framework',
          definition:
            'Eine Sammlung von Bibliotheken, Werkzeugen und Konventionen, die Entwicklern eine Struktur und Standardfunktionen für Anwendungen bieten. Beispiele sind Angular, React, Laravel oder Django.',
        },
        {
          word: 'Frontend',
          definition:
            'Der sichtbare Teil einer Anwendung, den Nutzer in Browsern oder Apps sehen und nutzen. Dazu gehören Layout, Buttons, Formulare und Logik zur Interaktion (z. B. in JavaScript).',
        },
        {
          word: 'Garbage Collection',
          definition:
            'Eine automatische Speicherbereinigung in vielen Programmiersprachen (z. B. Java, C#, JavaScript). Nicht mehr referenzierte Objekte werden vom Garbage Collector freigegeben, damit der Speicher erneut verwendet werden kann.',
        },
        {
          word: 'Git',
          definition:
            'Ein System, das dabei hilft, Änderungen an Dateien – vor allem in der Softwareentwicklung – zu verfolgen. Mit Git können Entwickler alte Versionen wiederherstellen, an verschiedenen Teilen eines Projekts gleichzeitig arbeiten und Änderungen von mehreren Personen zusammenführen. Es wird häufig verwendet, um den Überblick über den Code zu behalten und gemeinsam an Projekten zu arbeiten.',
        },

        {
          word: 'Hoisting',
          definition:
            'Ein Verhalten, bei dem Deklarationen an den Anfang ihres Bereichs verschoben werden.',
        },
        { word: 'Hotfix', definition: 'Eine schnelle Lösung für einen kritischen Softwarefehler.' },
        {
          word: 'Hypervisor',
          definition:
            'Eine Software oder Hardware, die virtuelle Maschinen erstellt und verwaltet. Typ-1-Hypervisoren laufen direkt auf der Hardware (z. B. VMware ESXi), während Typ-2-Hypervisoren auf einem Host-Betriebssystem laufen (z. B. VirtualBox).',
        },
        {
          word: 'Snapshot',
          definition:
            'Eine gespeicherte Momentaufnahme des aktuellen Zustands einer virtuellen Maschine. Snapshots ermöglichen es, bei Fehlern oder unerwünschten Änderungen zu einem vorherigen Zustand zurückzukehren.',
        },
        {
          word: 'VirtualBox',
          definition:
            'Eine kostenlose Virtualisierungssoftware von Oracle, die es ermöglicht, mehrere Betriebssysteme gleichzeitig auf einem einzigen Computer in virtuellen Maschinen auszuführen.',
        },
        {
          word: 'UEFI',
          definition:
            "Steht für 'Unified Extensible Firmware Interface'. Eine moderne Alternative zu BIOS mit grafischer Oberfläche, Mausunterstützung, schnelleren Startzeiten und Funktionen wie Secure Boot.",
        },
        {
          word: 'IDE',
          definition: 'Integrierte Entwicklungsumgebung, ein Werkzeug für die Programmierung.',
        },
        {
          word: 'NAT (Network Address Translation)',
          definition:
            'Ein Netzwerkmodus in VirtualBox, der es virtuellen Maschinen erlaubt, das Internet über die IP-Adresse des Hosts zu erreichen.',
        },
        {
          word: 'Bridged Adapter',
          definition:
            'Ein Netzwerkmodus, der der virtuellen Maschine eine eigene IP-Adresse im Netzwerk zuweist, sodass sie wie ein physisches Gerät agieren kann.',
        },
        {
          word: 'Internal Network',
          definition:
            'Ein isoliertes Netzwerk in VirtualBox, das nur die Kommunikation zwischen virtuellen Maschinen ermöglicht, ohne Zugang zum Host oder Internet.',
        },
        {
          word: 'Windows Defender',
          definition:
            'Ein integriertes Sicherheitsprogramm in Windows 10, das das System vor Schadsoftware schützt und grundlegende Sicherheitsfunktionen bereitstellt.',
        },
        {
          word: 'VM (Virtuelle Maschine)',
          definition:
            'Eine emulierte Umgebung, die ein Betriebssystem oder eine Anwendung isoliert ausführt, als ob es sich um einen eigenen Computer handelt. Virtuelle Maschinen teilen sich die Hardware-Ressourcen des Hosts.',
        },
        {
          word: 'Host-only Adapter',
          definition:
            'Ein Netzwerkmodus, bei dem die virtuelle Maschine nur mit dem Host-Computer kommunizieren kann. Es gibt keine Verbindung zum Internet oder zu anderen Geräten.',
        },
        {
          word: 'Port Forwarding',
          definition:
            'Eine Technik im NAT-Netzwerkmodus, die es ermöglicht, den Zugriff auf bestimmte Dienste in einer virtuellen Maschine vom Host aus zu steuern.',
        },
        {
          word: 'VHD (Virtual Hard Disk)',
          definition:
            'Eine Datei, die wie eine Festplatte für virtuelle Maschinen funktioniert. Sie speichert das Betriebssystem, Anwendungen und Daten der VM.',
        },
        {
          word: 'VT-x/AMD-V',
          definition:
            'Hardware-gestützte Virtualisierungstechnologien von Intel (VT-x) und AMD (AMD-V), die die Leistung von virtuellen Maschinen verbessern.',
        },
        {
          word: 'Guest Additions',
          definition:
            'Zusätzliche Software, die in einer virtuellen Maschine installiert wird, um Funktionen wie Drag & Drop, Mauszeiger-Integration und verbesserte Grafikleistung zu ermöglichen.',
        },
        {
          word: 'Host',
          definition:
            'Der physische Computer, auf dem eine Virtualisierungssoftware wie VirtualBox oder VMware ausgeführt wird.',
        },
        {
          word: 'Binärzahl',
          definition:
            'Ein Zahlensystem, das nur die Ziffern 0 und 1 verwendet. Es ist die Grundlage für die Funktionsweise von Computern und digitalen Geräten.',
        },
        {
          word: 'Kompatibilitätsmodus',
          definition:
            'Eine Funktion in Windows 10, die es ermöglicht, ältere Programme auszuführen, indem eine frühere Windows-Version simuliert wird.',
        },
        {
          word: 'Integration Test',
          definition: 'Testen der Interaktion zwischen mehreren Komponenten.',
        },
        {
          word: 'Internet of Things (IoT)',
          definition:
            'Ein Netzwerk von physischen Geräten, die über das Internet miteinander verbunden sind und Daten austauschen können. Dazu gehören alltägliche Objekte wie Smart-TVs, Thermostate, Fitness-Tracker, Lampen oder Haushaltsgeräte. IoT-Geräte sammeln Daten über Sensoren, verarbeiten diese Informationen und kommunizieren miteinander oder mit zentralen Systemen. Ziel des IoT ist es, Prozesse zu automatisieren, die Effizienz zu steigern und das Leben bequemer zu machen, beispielsweise durch intelligente Beleuchtung oder automatische Temperaturregelung. IoT spielt auch eine wichtige Rolle in der Industrie (Industrial IoT) und ermöglicht Anwendungen wie Predictive Maintenance, Smart Cities und vernetzte Fahrzeuge.',
        },
        {
          word: 'IP-Adresse',
          definition:
            'Eine eindeutige Adresse, die Geräten in einem Netzwerk zugewiesen wird, um die Kommunikation zu ermöglichen. Sie kann statisch oder dynamisch sein.',
        },
        { word: 'Iterieren', definition: 'Das Wiederholen eines Prozesses.' },
        { word: 'JSON', definition: 'Ein Format zum Speichern und Austausch von Daten.' },
        {
          word: 'Kubernetes',
          definition:
            'Ein System zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von Container-Anwendungen.',
        },
        {
          word: 'Secure Boot',
          definition:
            'Eine Sicherheitsfunktion von UEFI, die verhindert, dass nicht signierte oder unsichere Betriebssysteme gestartet werden.',
        },
        {
          word: 'Task-Manager',
          definition:
            'Ein Windows-Tool, das Informationen über laufende Programme, Prozesse und die Systemauslastung anzeigt und es ermöglicht, Aufgaben zu beenden.',
        },
        {
          word: 'Hexadezimalsystem',
          definition:
            'Ein Zahlensystem, das die Basis 16 verwendet. Es wird häufig in der Programmierung und bei Speicheradressen genutzt. Beispiel: 0x1A3F.',
        },
        {
          word: 'Oktalsystem',
          definition:
            'Ein Zahlensystem mit der Basis 8, das Zahlen von 0 bis 7 verwendet. Es wird gelegentlich in der Computertechnik eingesetzt.',
        },
        {
          word: 'Systemwiederherstellung',
          definition:
            'Eine Windows-Funktion, die es ermöglicht, das System zu einem früheren Zeitpunkt zurückzusetzen, um Probleme zu beheben.',
        },
        {
          word: 'Eingabeaufforderung (CMD)',
          definition:
            'Ein Kommandozeilen-Tool in Windows, das die manuelle Ausführung von Befehlen zur Systemsteuerung oder Fehlersuche ermöglicht.',
        },
        {
          word: 'Windows Update',
          definition:
            'Ein Dienst, der Aktualisierungen für das Betriebssystem bereitstellt, um Sicherheitslücken zu schließen und die Leistung zu verbessern.',
        },
        {
          word: 'POST (Power-On Self-Test)',
          definition:
            'Ein Test, den der Computer beim Einschalten durchführt, um Hardware-Fehler zu erkennen, bevor das Betriebssystem geladen wird.',
        },
        {
          word: 'Bootloader',
          definition:
            'Ein Programm, das den Startvorgang eines Betriebssystems einleitet. Beispiele sind GRUB (Linux) oder der Windows Boot Manager.',
        },
        {
          word: 'CMOS',
          definition:
            'Ein Speicherchip auf dem Mainboard, der BIOS-Einstellungen und Systemzeit speichert.',
        },
        { word: 'Latency', definition: 'Die Verzögerung bei der Datenübertragung.' },
        { word: 'Linting', definition: 'Ein Prozess zur Analyse von Code auf potenzielle Fehler.' },
        {
          word: 'Load Balancer',
          definition: 'Eine Methode zur Verteilung von Netzwerkverkehr auf mehrere Server.',
        },

        {
          word: 'Middleware',
          definition:
            'Software, die als Vermittler zwischen dem Front-End (Client) und dem Back-End (Server) agiert und dabei hilft, Daten oder Dienste zu verarbeiten und weiterzuleiten.',
        },
        {
          word: 'Multi-Tenancy',
          definition: 'Eine Architektur, bei der mehrere Kunden dieselbe Softwareumgebung nutzen.',
        },
        {
          word: 'Namespace',
          definition: 'Ein Bereich zur Organisation von Code und Vermeidung von Namenskonflikten.',
        },
        {
          word: 'NoSQL',
          definition: 'Eine Art von Datenbank, die flexible Datenmodelle unterstützt.',
        },
        { word: 'OAuth', definition: 'Ein Protokoll zur sicheren Autorisierung.' },
        {
          word: 'Open Source',
          definition:
            'Software, deren Quellcode öffentlich zugänglich ist. Im Gegensatz zu Closed Source.',
        },
        {
          word: 'ORM (Object-Relational Mapping)',
          definition:
            'Ein Konzept, das es ermöglicht, Datenbanken in Programmiersprachen wie JavaScript, Python oder Java zu nutzen, ohne direkt SQL schreiben zu müssen. Beispiele sind Sequelize (Node.js) oder Hibernate (Java).',
        },
        {
          word: 'PaaS',
          definition:
            'Platform as a Service, Plattformen für die Entwicklung und Bereitstellung von Software.',
        },
        {
          word: 'Ping',
          definition: 'Ein Netzwerkdienst zur Überprüfung der Erreichbarkeit eines Geräts.',
        },
        { word: 'Prettier', definition: 'Ein automatisches Codeformatierungstool.' },

        { word: 'Provisioning', definition: 'Einrichten und Konfigurieren von IT-Ressourcen.' },
        {
          word: 'Proxy Server',
          definition:
            'Ein Server, der als Vermittler für Anfragen zwischen einem Client und einer Ressource dient.',
        },
        {
          word: 'Refactoring',
          definition: 'Verbessern von Code, ohne die Funktionalität zu ändern.',
        },

        {
          word: 'Vuetify',
          definition:
            'Vuetify ist ein UI-Framework für Vue.js, das auf Material Design basiert. Es bietet eine große Auswahl an vorgefertigten, responsiven Komponenten wie Buttons, Dialoge, Tabellen und Karten, die sich leicht anpassen lassen. Vuetify erleichtert die Entwicklung moderner, optisch ansprechender Webanwendungen und unterstützt Dark-Mode, Grid-Systeme und Theme-Anpassungen.',
        },
        {
          word: 'VueUse',
          definition:
            'VueUse ist eine Sammlung von nützlichen Composables für Vue 3, die häufig benötigte Funktionen bereitstellen, wie z. B. lokale Speicherung (useLocalStorage), Medienabfragen (useMediaQuery) oder Event-Listener (useEventListener). VueUse erleichtert das Arbeiten mit reaktiven Zuständen und Browser-APIs, indem es wiederverwendbare Hooks für verschiedene Anwendungsfälle bereitstellt.',
        },

        {
          word: 'Regression Testing',
          definition:
            'Testen von Änderungen, um sicherzustellen, dass keine neuen Fehler eingeführt wurden.',
        },
        { word: 'Repository', definition: 'Ein Speicher für Code, oft in Git verwaltet.' },
        {
          word: 'Responsive Design',
          definition: 'Design, das sich an verschiedene Bildschirmgrößen anpasst.',
        },
        {
          word: 'RESTful API',
          definition:
            'Ein Architekturstil für APIs, der auf HTTP basiert und Ressourcen über Endpunkte wie GET, POST, PUT und DELETE zugänglich macht.',
        },
        {
          word: 'Rollback',
          definition: 'Das Zurücksetzen auf eine frühere Version eines Systems.',
        },
        {
          word: 'SaaS',
          definition:
            'Software as a Service, Anwendungen, die über das Internet bereitgestellt werden.',
        },
        { word: 'Scaffolding', definition: 'Automatisiertes Generieren von Codevorlagen.' },
        {
          word: 'Scalability',
          definition: 'Die Fähigkeit eines Systems, bei steigender Last zu wachsen.',
        },

        {
          word: 'Session',
          definition: 'Eine begrenzte Interaktion eines Benutzers mit einem System.',
        },
        { word: 'Single Sign-On', definition: 'Ein Anmeldesystem für mehrere Anwendungen.' },

        {
          word: 'SSL/TLS',
          definition: 'Verschlüsselungsprotokolle zur Sicherung von Datenübertragungen.',
        },
        {
          word: 'Static Content',
          definition: 'Unveränderliche Inhalte wie Bilder oder HTML-Dateien.',
        },
        {
          word: 'Static Typing',
          definition: 'Die Deklaration von Datentypen zur Vermeidung von Laufzeitfehlern.',
        },
        {
          word: 'Staging',
          definition: 'Ein Testumgebung, die eine Produktionsumgebung simuliert.',
        },
        { word: 'Stress Testing', definition: 'Testen der Grenzen eines Systems.' },
        {
          word: 'Subnetting',
          definition: 'Das Aufteilen eines Netzwerks in kleinere Teilnetzwerke.',
        },
        { word: 'Syntax', definition: 'Die Regeln und Struktur einer Programmiersprache.' },
        {
          word: 'Template Literal',
          definition: 'Eine Syntax zum Einfügen von Variablen in Strings.',
        },
        {
          word: 'Token',
          definition: 'Ein Sicherheitsmerkmal, oft in der Authentifizierung genutzt.',
        },

        {
          word: 'Unit Test',
          definition: 'Testen einzelner Komponenten oder Funktionen einer Anwendung.',
        },
        {
          word: 'Usability Testing',
          definition: 'Bewertung der Benutzerfreundlichkeit einer Anwendung.',
        },
        { word: 'Uptime', definition: 'Die Zeit, während der ein System verfügbar ist.' },
        { word: 'Variable', definition: 'Ein Speicherplatz für Daten in einem Programm.' },
        {
          word: 'Version Control',
          definition: 'Die Verwaltung von Änderungen an Code und anderen Dateien.',
        },
        {
          word: 'Virtual Machine',
          definition: 'Eine Softwareumgebung, die wie ein physischer Computer funktioniert.',
        },
        {
          word: 'Virtual Private Network (VPN)',
          definition: 'Ein Netzwerk, das sichere Verbindungen über das Internet ermöglicht.',
        },
        {
          word: 'Predictive Maintenance',
          definition:
            'Eine Technologie, die mithilfe von Sensoren und Datenanalysen den Zustand von Maschinen überwacht und Wartungsarbeiten voraussagt, bevor Ausfälle auftreten. Durch Predictive Maintenance können Unternehmen Kosten senken, die Lebensdauer von Geräten verlängern und ungeplante Ausfallzeiten vermeiden.',
        },
        {
          word: 'Smart Cities',
          definition:
            "Städte, die moderne Technologien wie IoT nutzen, um die Lebensqualität zu verbessern, Ressourcen effizient zu nutzen und Umweltbelastungen zu reduzieren. Beispiele sind intelligente Verkehrsleitsysteme, vernetzte Straßenbeleuchtung und Müllentsorgung, sowie Anwendungen für Bürger wie Echtzeitinformationen zu öffentlichen Verkehrsmitteln. Bekannte Smart Cities sind beispielsweise: London (ein Technologiezentrum mit 5G-Konnektivität und fahrerlosen Transitsystemen wie den Heathrow Pods), Zürich (nutzt intelligente Straßenbeleuchtung und fördert nachhaltige Bauprojekte), Amsterdam (setzt auf intelligente Beleuchtung und nachhaltige Energie), Barcelona (verwendet vernetzte Verkehrssysteme und Beleuchtung) und Singapur (die 'Smart Nation'-Initiative integriert Technologie in alle Lebensbereiche).",
        },
        {
          word: 'Vernetzte Fahrzeuge',
          definition:
            'Fahrzeuge, die über das Internet oder andere Netzwerke miteinander, mit Infrastruktur oder mit externen Diensten kommunizieren können. Diese Technologie ermöglicht Anwendungen wie Navigationsdienste in Echtzeit, Fahrzeug-zu-Fahrzeug-Kommunikation (V2V), autonome Fahrfunktionen und Fernwartung.',
        },
        { word: 'Vite', definition: 'Ein schnellerer Entwicklungsserver und Modul-Bundler.' },
        {
          word: 'Web Crawler',
          definition: 'Ein Programm, das das Web durchsucht, um Informationen zu sammeln.',
        },
        { word: 'Webpack', definition: 'Ein Tool zur Bündelung von JavaScript-Modulen.' },
        {
          word: 'WebSocket',
          definition: 'Ein Protokoll für die Echtzeitkommunikation zwischen Client und Server.',
        },
        { word: 'Yarn', definition: 'Eine Alternative zu NPM.' },
        {
          word: 'Kanban',
          definition: 'Ein visuelles Projektmanagement-System zur Steuerung von Arbeitsabläufen.',
        },
        {
          word: 'Quality Assurance (QA)',
          definition:
            'Ein Prozess, um sicherzustellen, dass Produkte oder Dienstleistungen die festgelegten Qualitätsanforderungen erfüllen.',
        },
        {
          word: 'MVP (Minimum Viable Product)',
          definition:
            'Nicht Most Valuale Player! Ein Produkt mit den minimalen Funktionen, um Kundenfeedback einzuholen und die Markttauglichkeit zu testen.',
        },
        {
          word: 'Sprint',
          definition:
            'Eine festgelegte Zeitspanne im agilen Projektmanagement, in der ein definiertes Arbeitspensum erledigt wird.',
        },
        {
          word: 'Backlog',
          definition:
            'Eine priorisierte Liste von Aufgaben oder Anforderungen in einem Projekt. Oft genutzt in agilen Methoden (z. B. Scrum). Der Product Backlog beschreibt alle Features, Bugfixes und Ideen, die für ein Produkt geplant sind. Die Reihenfolge wird regelmäßig aktualisiert, um den größten Mehrwert zuerst zu liefern.',
        },
        {
          word: 'Stakeholder',
          definition:
            'Personen, Gruppen oder Organisationen, die ein Interesse an einem Projekt, einem Produkt oder einer Entscheidung haben und davon direkt oder indirekt betroffen sein können. Dazu gehören beispielsweise Kunden, Mitarbeiter, Investoren, Partner, Lieferanten und Behörden. Stakeholder können Einfluss auf den Verlauf und den Erfolg eines Projekts nehmen und haben unterschiedliche Erwartungen und Anforderungen, die berücksichtigt werden müssen.',
        },
        {
          word: 'Gantt-Chart',
          definition:
            'Ein Balkendiagramm, das Aufgaben, Zeitpläne und Abhängigkeiten in Projekten visualisiert. Jeder Balken repräsentiert eine Aufgabe und zeigt deren Start-, Enddatum und Dauer.',
        },
        {
          word: 'RACI-Matrix',
          definition:
            'Ein Werkzeug zur Klärung von Verantwortlichkeiten in einem Projekt (Responsible, Accountable, Consulted, Informed).',
        },
        {
          word: 'Risk Management',
          definition:
            'Der Prozess zur Identifikation, Bewertung und Minimierung von Risiken in einem Projekt.',
        },
        {
          word: 'Change Management',
          definition:
            'Ein strukturierter Ansatz, um Veränderungen in Organisationen oder Projekten effektiv umzusetzen. Beinhaltet Planung, Kommunikation und Einbindung der Stakeholder, um Widerstände zu minimieren und neue Prozesse oder Systeme erfolgreich einzuführen.',
        },
        {
          word: 'KPI (Key Performance Indicator)',
          definition: 'Ein messbarer Wert, der den Erfolg eines Projekts oder Prozesses anzeigt.',
        },
        {
          word: 'Project Charter',
          definition:
            'Ein Dokument, das die Ziele, den Umfang und die Teilnehmer eines Projekts definiert.',
        },
        {
          word: 'Milestone',
          definition:
            'Ein wichtiger Meilenstein oder Ereignis in einem Projekt, das den Fortschritt markiert.',
        },
        {
          word: 'Arbeitsvertrag',
          definition:
            'Ein Vertrag, der die Rechte und Pflichten von Arbeitnehmer und Arbeitgeber regelt.',
        },
        {
          word: 'Arbeitsschutz',
          definition:
            'Maßnahmen zur Sicherstellung der Sicherheit und Gesundheit der Arbeitnehmer.',
        },
        {
          word: 'Datenschutz-Grundverordnung (DSGVO)',
          definition: 'Europäische Verordnung zum Schutz personenbezogener Daten.',
        },
        {
          word: 'Bundesdatenschutzgesetz (BDSG)',
          definition: 'Ein deutsches Gesetz zur Ergänzung der DSGVO.',
        },
        {
          word: 'Datensicherung',
          definition:
            'Maßnahmen zur Sicherstellung, dass Daten bei Verlust oder Beschädigung wiederhergestellt werden können.',
        },
        {
          word: 'Schutzbedarfsanalyse',
          definition: 'Eine Methode zur Bewertung von Schutzanforderungen für IT-Systeme.',
        },
        {
          word: 'Lizenzierung',
          definition:
            'Die rechtliche Erlaubnis zur Nutzung von Software gemäß den Lizenzbedingungen.',
        },
        {
          word: 'Hyper-V',
          definition:
            'Hyper-V ist eine Virtualisierungstechnologie von Microsoft, die es ermöglicht, mehrere Betriebssysteme gleichzeitig auf einem einzigen physischen Rechner auszuführen. Es basiert auf einem Hypervisor und wird häufig für Server- und Entwicklungsumgebungen genutzt. Hyper-V unterstützt Funktionen wie Snapshots, Live-Migration und Ressourcenmanagement, um virtuelle Maschinen effizient zu betreiben.',
        },
        {
          word: 'Steakholder',
          definition: 'Ein Scherz, den gerne alte Männer machen, wenn es um Stakeholder geht.',
        },
        {
          word: 'DHCP (Dynamic Host Configuration Protocol)',
          definition:
            'Ein Netzwerkprotokoll, das automatisch IP-Adressen sowie DNS- und Gateway-Einstellungen an Geräte vergibt. In VirtualBox wird DHCP oft im NAT- oder Bridged-Modus verwendet, damit VMs automatisch eine IP-Adresse erhalten, ohne manuelle Konfiguration.',
        },
        {
          word: 'Manifest (Datei)',
          definition:
            'Eine Manifest-Datei ist eine strukturierte Datei (z. B. JSON oder XML), die Metadaten über eine Anwendung enthält. Im Webbereich wird sie oft für Progressive Web Apps (PWAs) verwendet, um Name, Icons, Start-URL und andere Konfigurationsdetails zu definieren. Diese Datei ermöglicht es, eine App wie eine native Anwendung zu installieren und offline-fähig zu machen.',
        },

        {
          word: 'Lazy Loading',
          definition:
            'Lazy Loading ist eine Technik zur Performance-Optimierung, bei der Inhalte oder Ressourcen erst dann geladen werden, wenn sie wirklich benötigt werden. Dies spart Ladezeit und Bandbreite, indem z. B. Bilder erst erscheinen, wenn sie in den sichtbaren Bereich gescrollt werden, oder Module in einer Single Page Application (SPA) erst bei Bedarf nachgeladen werden.',
        },

        {
          word: 'Eager Loading',
          definition:
            'Eager Loading ist das Gegenteil von Lazy Loading. Hier werden alle notwendigen Ressourcen sofort beim Initialisieren der Anwendung geladen, auch wenn sie erst später benötigt werden. Dies kann die Ladezeit der ersten Seite verlängern, sorgt aber dafür, dass beim späteren Navigieren keine zusätzlichen Ladezeiten entstehen.',
        },

        {
          word: 'DOM (Document Object Model)',
          definition:
            'Das Document Object Model (DOM) ist eine baumartige Repräsentation einer HTML- oder XML-Seite. Es ermöglicht Programmen, den Inhalt und die Struktur eines Dokuments zu manipulieren. Mit JavaScript kann das DOM genutzt werden, um Elemente zu erstellen, zu ändern oder zu entfernen, wodurch interaktive Webanwendungen möglich werden.',
        },

        {
          word: 'Service Workers',
          definition:
            'Service Workers sind Skripte, die im Hintergrund des Browsers laufen und unabhängig von der eigentlichen Webseite arbeiten. Sie ermöglichen Funktionen wie Caching, Offline-Funktionalität und Push-Benachrichtigungen. Dadurch können Web-Apps schneller laden und Inhalte auch ohne Internetverbindung bereitstellen.',
        },
        {
          word: 'VLAN',
          definition:
            'Virtual Local Area Network, eine Methode zur logischen Trennung von Netzwerken.',
        },
        {
          word: 'ITIL',
          definition:
            'Information Technology Infrastructure Library, ein Framework für IT-Service-Management.',
        },
        {
          word: 'ITSM',
          definition: 'IT Service Management, ein Ansatz zur Verwaltung von IT-Diensten.',
        },
        {
          word: 'Windows Server',
          definition: 'Ein Betriebssystem von Microsoft für Serveranwendungen.',
        },

        {
          word: 'Visio',
          definition:
            'Eine Microsoft-Software zur Erstellung von Diagrammen und technischen Zeichnungen.',
        },
        {
          word: 'Fehleranalyse',
          definition:
            'Der Prozess zur Identifikation und Diagnose von Problemen oder Bugs in IT-Systemen. Dabei werden Logfiles, Reproduktionen und Analysen durchgeführt, um die Ursache zu finden.',
        },
        {
          word: 'Fehlerbeseitigung',
          definition:
            'Konkrete Maßnahmen, um die identifizierten Probleme zu beheben. Dies umfasst das Patchen von Code, Konfigurationsänderungen oder Updates. Anschließend wird getestet, ob der Fehler tatsächlich behoben ist.',
        },
        {
          word: 'Arduino',
          definition:
            'Eine Open-Source-Plattform für Microcontroller-Entwicklung, bestehend aus Hardware (Arduino-Boards) und einer Entwicklungsumgebung (IDE). Damit kann man schnell Prototypen für Elektronikprojekte entwickeln, Sensoren ansteuern oder Aktoren (z. B. Motoren) kontrollieren.',
        },
        {
          word: 'Programmierung',
          definition: 'Das Schreiben von Code zur Entwicklung von Software und Anwendungen.',
        },
        {
          word: 'Logische Topologie',
          definition: 'Die Art und Weise, wie Daten innerhalb eines Netzwerks fließen.',
        },
        {
          word: 'Physikalische Topologie',
          definition: 'Die tatsächliche physische Struktur eines Netzwerks.',
        },
        {
          word: 'CU',
          definition:
            'Kupferbasierte Netzwerkkabel, z. B. Ethernet-Kabel (Cat5, Cat6, Cat7). Sie dienen zur Datenübertragung in lokalen Netzwerken und sind günstiger, aber in der Länge und Datenrate limitiert im Vergleich zu Glasfaser.',
        },
        {
          word: 'GF',
          definition:
            'Glasfaserbasierte Netzwerkkabel, die besonders hohe Bandbreiten und schnelle Datenübertragung über längere Distanzen ermöglichen. Genutzt in WANs, Rechenzentren oder Hochgeschwindigkeitsnetzen.',
        },
        {
          word: 'Technischer Brandschutz',
          definition: 'Maßnahmen zum Schutz von IT-Systemen vor Feuergefahr.',
        },
        {
          word: 'Bit',
          definition:
            'Die kleinste Einheit von Daten in der Informatik, die nur zwei Werte annehmen kann: 0 oder 1.',
        },
        {
          word: 'Byte',
          definition:
            'Eine Einheit von 8 Bits, die in der Regel ein Zeichen oder eine kleine Datenmenge repräsentiert.',
        },
        {
          word: 'Base64',
          definition:
            'Ein Kodierungsverfahren, das Binärdaten in ASCII-Text umwandelt. Es wird häufig zum Übertragen von Daten in E-Mails oder APIs verwendet.',
        },
        {
          word: 'Protokoll',
          definition: 'Ein Satz von Regeln für die Kommunikation in Netzwerken, z. B. TCP/IP.',
        },
        {
          word: 'Netzwerksicherheit',
          definition: 'Schutz von Netzwerken vor unbefugtem Zugriff oder Angriffen.',
        },
        {
          word: 'Datenintegrität',
          definition:
            'Die Richtigkeit und Konsistenz von Daten während ihrer Speicherung und Übertragung.',
        },
        {
          word: 'Virtualisierung',
          definition:
            'Die Erstellung virtueller Ressourcen wie Maschinen, Netzwerke oder Speicher.',
        },
        {
          word: 'Backup',
          definition: 'Eine Kopie von Daten zur Wiederherstellung bei Verlust oder Beschädigung.',
        },
        {
          word: 'Layer-3-Switch',
          definition: 'Ein Netzwerkgerät, das sowohl Switching als auch Routing-Funktionen bietet.',
        },
        {
          word: 'OSI-Modell',
          definition: 'Ein Referenzmodell für die Kommunikation in Netzwerken.',
        },
        {
          word: 'Microcontroller',
          definition:
            'Ein kompakter Computer auf einem Chip, der in eingebetteten Systemen verwendet wird.',
        },
        {
          word: 'Arbeitszeitgesetz (ArbZG)',
          definition: 'Ein Gesetz, das die Höchstarbeitszeiten und Ruhezeiten regelt.',
        },
        {
          word: 'Tarifvertrag',
          definition:
            'Ein Vertrag zwischen Arbeitgeberverbänden und Gewerkschaften, der Arbeitsbedingungen regelt.',
        },
        {
          word: 'Jugendarbeitsschutzgesetz (JArbSchG)',
          definition: 'Ein Gesetz zum Schutz von jugendlichen Arbeitnehmern.',
        },
        {
          word: 'Kündigungsschutz',
          definition:
            'Rechtliche Regelungen, die Arbeitnehmer vor ungerechtfertigten Kündigungen schützen.',
        },
        {
          word: 'Betriebsrat',
          definition: 'Ein Gremium, das die Interessen der Arbeitnehmer im Betrieb vertritt.',
        },
        {
          word: 'Berufsbildungsgesetz (BBiG)',
          definition: 'Ein Gesetz, das die Berufsausbildung in Deutschland regelt.',
        },
        {
          word: 'Probezeit',
          definition:
            'Eine vereinbarte Zeitspanne, in der ein Arbeitsverhältnis auf Probe geführt wird.',
        },
        {
          word: 'Sozialversicherung',
          definition:
            'Ein System zur Absicherung von Arbeitnehmern in Fällen wie Krankheit oder Arbeitslosigkeit.',
        },
        {
          word: 'Schlichtung',
          definition:
            'Ein Verfahren zur Beilegung von Streitigkeiten zwischen Arbeitgebern und Arbeitnehmern.',
        },
        {
          word: 'Organigramm',
          definition: 'Eine grafische Darstellung der Struktur eines Unternehmens.',
        },
        {
          word: 'Abteilung',
          definition: 'Ein organisatorischer Bereich innerhalb eines Unternehmens.',
        },
        {
          word: 'Leitungsstruktur',
          definition: 'Die Hierarchie eines Unternehmens, z. B. flach oder steil.',
        },
        {
          word: 'Zentralisierung',
          definition: 'Die Konzentration von Entscheidungsbefugnissen an einer Stelle.',
        },
        {
          word: 'Dezentralisierung',
          definition: 'Die Verteilung von Entscheidungsbefugnissen auf verschiedene Ebenen.',
        },
        {
          word: 'Prokura',
          definition: 'Eine handelsrechtliche Vollmacht zur Vertretung eines Unternehmens.',
        },
        {
          word: 'Buchhaltung',
          definition:
            'Die Abteilung, die für die Aufzeichnung finanzieller Transaktionen zuständig ist.',
        },
        {
          word: 'PSA (Persönliche Schutzausrüstung)',
          definition: 'Ausrüstung zum Schutz von Arbeitnehmern vor Gefahren.',
        },
        {
          word: 'Gefährdungsbeurteilung',
          definition:
            'Eine gesetzlich vorgeschriebene Analyse möglicher Risiken am Arbeitsplatz, um Maßnahmen zur Arbeitssicherheit zu planen und umzusetzen (z. B. Brandschutz, ergonomische Einrichtung).',
        },
        {
          word: 'Ergonomie',
          definition: 'Die Anpassung von Arbeitsplätzen an die Bedürfnisse der Arbeitnehmer.',
        },
        {
          word: 'Arbeitsstättenverordnung (ArbStättV)',
          definition: 'Ein Gesetz, das Anforderungen an Arbeitsplätze regelt.',
        },
        {
          word: 'Unterweisung',
          definition: 'Die Schulung von Mitarbeitern zu Sicherheitsmaßnahmen.',
        },
        { word: 'Lärmschutz', definition: 'Maßnahmen zum Schutz vor gesundheitsschädlichem Lärm.' },
        {
          word: 'Brandmeldeanlage',
          definition: 'Ein System zur Erkennung und Meldung von Bränden.',
        },
        {
          word: 'Privacy by Design',
          definition:
            'Ein Ansatz, der Datenschutz bereits in der Entwicklung von Systemen berücksichtigt.',
        },
        {
          word: 'Privacy by Default',
          definition:
            'Der Grundsatz, dass Systeme standardmäßig datenschutzfreundlich sein sollten.',
        },
        {
          word: 'Data Breach',
          definition:
            'Ein Sicherheitsvorfall, bei dem sensible Daten (z. B. personenbezogene Informationen, Passwörter) unerlaubt offengelegt oder gestohlen werden. Data Breaches können Unternehmen großen Schaden zufügen und sind oft meldepflichtig (z. B. nach DSGVO).',
        },
        {
          word: 'Verarbeitungsverzeichnis',
          definition: 'Eine Dokumentation aller Datenverarbeitungsaktivitäten eines Unternehmens.',
        },
        {
          word: 'Betroffenenrechte',
          definition: 'Die Rechte von Personen gemäß der DSGVO, z. B. das Recht auf Auskunft.',
        },
        {
          word: 'Zwei-Faktor-Authentifizierung (2FA)',
          definition: 'Eine zusätzliche Sicherheitsebene bei der Anmeldung.',
        },
        {
          word: 'End-to-End-Verschlüsselung',
          definition:
            'Eine Methode zur Sicherstellung, dass nur Sender und Empfänger Daten lesen können.',
        },
        {
          word: 'CPU (Central Processing Unit)',
          definition: 'Das zentrale Rechenwerk eines Computers.',
        },
        {
          word: 'GPU (Graphics Processing Unit)',
          definition: 'Ein Prozessor für die Berechnung von Grafikdaten.',
        },
        {
          word: 'Motherboard',
          definition: 'Die Hauptplatine, die alle Komponenten eines Computers verbindet.',
        },
        {
          word: 'RAM (Random Access Memory)',
          definition: 'Ein flüchtiger Speicher, der Daten temporär speichert.',
        },
        {
          word: 'SSD (Solid State Drive)',
          definition:
            'Ein Speichermedium, das Daten auf Flash-Speicherchips speichert. SSDs sind schneller, leiser und robuster als HDDs, haben jedoch eine höhere Speicherkosten pro Gigabyte.',
        },
        {
          word: 'RAID',
          definition:
            "Steht für 'Redundant Array of Independent Disks' und bezeichnet verschiedene Methoden zur Kombination mehrerer Festplatten zu einem logischen Laufwerk. RAID verbessert entweder die Datensicherheit (Redundanz) oder die Leistung von Speichersystemen. Beispiele sind RAID 0 (Striping), RAID 1 (Mirroring) und RAID 5 (Parität).",
        },
        {
          word: 'Hybrid Drive (SSHD)',
          definition:
            'Ein Laufwerk, das die Vorteile von HDDs (große Speicherkapazität) und SSDs (schneller Zugriff) kombiniert. Häufig genutzte Daten werden auf dem SSD-Teil gespeichert, während der Rest auf der HDD bleibt.',
        },
        {
          word: 'RAID 0 (Striping)',
          definition:
            'Ein RAID-Level, bei dem Daten in Blöcken auf mehrere Festplatten verteilt werden, um die Lese- und Schreibgeschwindigkeit zu erhöhen. Es bietet jedoch keine Redundanz – ein Ausfall einer Platte führt zum Datenverlust.',
        },
        {
          word: 'RAID 1 (Mirroring)',
          definition:
            'Ein RAID-Level, das die gleichen Daten gleichzeitig auf zwei oder mehr Festplatten speichert. Dadurch wird Redundanz geschaffen, sodass die Daten erhalten bleiben, wenn eine Platte ausfällt.',
        },
        {
          word: 'RAID 5 (Parität)',
          definition:
            'Ein RAID-Level, das Daten über mehrere Festplatten verteilt und zusätzlich Paritätsinformationen speichert. Es bietet Redundanz und verbessert die Leistung, erfordert aber mindestens drei Festplatten.',
        },
        {
          word: 'HDD (Hard Disk Drive)',
          definition:
            'Ein Speichermedium, das Daten magnetisch auf rotierenden Scheiben speichert. HDDs bieten große Speicherkapazität zu niedrigem Preis, sind jedoch langsamer und empfindlicher gegenüber Erschütterungen als SSDs.',
        },
        {
          word: 'NVMe (Non-Volatile Memory Express)',
          definition:
            'Ein Protokoll für SSDs, das die Geschwindigkeit von Speichermedien drastisch erhöht, indem es direkt mit dem PCIe-Bus kommuniziert. NVMe-SSDs sind deutlich schneller als herkömmliche SATA-SSDs.',
        },
        { word: 'Netzteil', definition: 'Ein Gerät, das den Computer mit Strom versorgt.' },
        {
          word: 'BIOS',
          definition: 'Die Firmware, die die Hardware eines Computers initialisiert.',
        },
        {
          word: 'MAC-Adresse',
          definition: 'Eine eindeutige Hardware-Adresse eines Netzwerkgeräts.',
        },
        {
          word: 'Subnetzmaske',
          definition:
            'Eine Zahl, die verwendet wird, um IP-Adressen in Netzwerke und Subnetze zu unterteilen. Sie legt fest, welcher Teil der IP-Adresse das Netzwerk und welcher Teil das Gerät (Host) identifiziert. Beispiel: In der Subnetzmaske 255.255.255.0 gehört der erste Teil der IP-Adresse (die ersten 24 Bits) zum Netzwerk, während die letzten 8 Bits die Hosts im Netzwerk kennzeichnen.',
        },
        {
          word: 'Unterschied zwischen Datenbank und API',
          definition:
            'Eine Datenbank speichert Daten und stellt Funktionen zur Datenverwaltung bereit. Eine API hingegen ist ein Vermittler, der den Zugriff auf Daten oder Dienste der Datenbank für Anwendungen kontrolliert. Während eine Datenbank lokal oder remote direkt angesprochen werden kann, bietet eine API einen standardisierten, sicheren Weg, um Daten zu lesen, zu schreiben oder zu manipulieren, oft über HTTP-Protokolle.',
        },
        {
          word: 'Gateway',
          definition:
            'Ein Gerät oder Dienst, der verschiedene Netzwerke verbindet und Daten zwischen ihnen weiterleitet. Beispielsweise ein Router, der das LAN mit dem Internet verbindet.',
        },

        { word: 'Switch', definition: 'Ein Gerät, das Netzwerkgeräte miteinander verbindet.' },
        {
          word: 'Router',
          definition: 'Ein Gerät, das Datenpakete zwischen Netzwerken weiterleitet.',
        },
        { word: 'Port', definition: 'Eine Schnittstelle zur Kommunikation in einem Netzwerk.' },

        { word: 'Kernel', definition: 'Der zentrale Bestandteil eines Betriebssystems.' },
        { word: 'Package Manager', definition: 'Ein Werkzeug zur Verwaltung von Softwarepaketen.' },
        {
          word: 'APT',
          definition:
            'Ein Tool, das dabei hilft, Software auf Debian-basierten Linux-Systemen zu installieren, zu aktualisieren oder zu entfernen. Mit APT (Advanced Package Tool) können Programme und ihre Abhängigkeiten automatisch heruntergeladen und konfiguriert werden, ohne dass der Nutzer alles manuell erledigen muss. Es macht die Verwaltung von Software einfach und effizient.',
        },
        {
          word: 'Linux',
          definition:
            'Linux ist ein Open-Source-Betriebssystemkern, der von Linus Torvalds 1991 entwickelt wurde. Es bildet die Grundlage für zahlreiche Betriebssysteme (Distributionen) wie Ubuntu, Debian und Fedora. Linux zeichnet sich durch hohe Stabilität, Sicherheit und Flexibilität aus. Es wird in Servern, Desktop-Computern, Embedded-Systemen und sogar mobilen Geräten wie Android eingesetzt. Linux nutzt das GNU-Benutzerland, weshalb es oft als „GNU/Linux“ bezeichnet wird. Es basiert auf einem monolithischen Kernel und unterstützt verschiedene Dateisysteme, Virtualisierung, Containerisierung (z. B. Docker) und Netzwerktechnologien.',
        },

        {
          word: 'Ubuntu',
          definition:
            'Ubuntu ist eine beliebte, benutzerfreundliche Linux-Distribution, die von Canonical Ltd. entwickelt und gepflegt wird. Sie basiert auf Debian und wird mit einem langfristigen Support (LTS) für fünf Jahre veröffentlicht. Ubuntu ist für Desktop- und Server-Anwendungen geeignet und bietet eine intuitive Benutzeroberfläche mit GNOME als Standard-Desktop-Umgebung. Es enthält zahlreiche vorinstallierte Anwendungen wie LibreOffice, Firefox und Snap-Pakete zur einfachen Software-Installation. Ubuntu ist besonders in der Entwickler-Community, bei Cloud-Anwendungen (z. B. mit Ubuntu Server) und im IoT-Bereich beliebt.',
        },

        {
          word: 'Linux Kernel',
          definition:
            'Der Linux-Kernel ist das Herzstück des Linux-Betriebssystems und verwaltet Hardware-Ressourcen wie CPU, Speicher und Peripheriegeräte. Er ist monolithisch, modular erweiterbar und unterstützt verschiedene Architekturen. Der Kernel steuert Prozesse, verwaltet Dateisysteme, ermöglicht Netzwerkkommunikation und bietet Sicherheit durch Mechanismen wie SELinux und AppArmor. Er wird kontinuierlich weiterentwickelt, wobei neue Versionen von der Open-Source-Community unter Leitung von Linus Torvalds veröffentlicht werden.',
        },

        {
          word: 'Linux Distribution (Distro)',
          definition:
            'Eine Linux-Distribution ist ein Betriebssystem, das den Linux-Kernel mit zusätzlichen Softwarepaketen, Benutzeroberflächen und Paketverwaltungswerkzeugen kombiniert. Bekannte Distributionen sind Ubuntu, Debian, Fedora, Arch Linux und openSUSE. Jede Distro hat ihre eigene Paketverwaltung (z. B. APT für Debian/Ubuntu, DNF für Fedora, Pacman für Arch) und kann unterschiedliche Zielgruppen ansprechen, von Anfängern bis hin zu fortgeschrittenen Entwicklern und Server-Administratoren.',
        },

        {
          word: 'Debian',
          definition:
            'Debian ist eine der ältesten und stabilsten Linux-Distributionen, die als Basis für viele andere Distros wie Ubuntu dient. Es wird von einer großen Community gepflegt und verfolgt strikte Open-Source-Richtlinien. Debian verwendet das APT-Paketverwaltungssystem und bietet verschiedene Editionen für Desktop, Server und Embedded-Systeme. Durch den langen Entwicklungszyklus ist Debian besonders für stabile Serverumgebungen geeignet.',
        },

        {
          word: 'Shell (Bash, Zsh, Fish)',
          definition:
            'Die Shell ist eine textbasierte Benutzeroberfläche für das Linux-Betriebssystem, mit der Benutzer Befehle direkt an das System senden können. Die bekannteste Shell ist Bash (Bourne Again Shell), die standardmäßig in vielen Distributionen enthalten ist. Zsh (Z Shell) bietet erweiterte Features wie Auto-Vervollständigung und Themes. Fish (Friendly Interactive Shell) setzt auf Benutzerfreundlichkeit und farbige Hervorhebungen. Shells sind essenziell für Systemadministration, Automatisierung und Skripting.',
        },

        {
          word: 'APT (Advanced Package Tool)',
          definition:
            'APT ist das Paketverwaltungssystem von Debian-basierten Distributionen wie Ubuntu. Es ermöglicht die Installation, Aktualisierung und Entfernung von Softwarepaketen über Repositorys. Häufige Befehle sind `apt update`, `apt upgrade`, `apt install [Paket]` und `apt remove [Paket]`. APT sorgt automatisch für das Auflösen von Abhängigkeiten und vereinfacht das Software-Management in Linux-Systemen.',
        },

        {
          word: 'Snap',
          definition:
            'Snap ist ein von Canonical entwickeltes Paketformat, das eine containerisierte Bereitstellung von Anwendungen ermöglicht. Snaps enthalten alle benötigten Abhängigkeiten und laufen isoliert vom restlichen System. Dies verbessert die Sicherheit und Kompatibilität zwischen verschiedenen Linux-Distributionen. Snaps können über den Snap Store verwaltet werden (`snap install [Paket]`, `snap remove [Paket]`).',
        },

        {
          word: 'Flatpak',
          definition:
            'Flatpak ist eine alternative Paketlösung für Linux, die ähnlich wie Snap funktioniert. Es ermöglicht das Ausführen von Anwendungen in einer Sandbox, unabhängig von der verwendeten Distribution. Flatpak-Pakete werden über Flathub verwaltet und installiert (`flatpak install [Paket]`). Flatpak bietet eine größere App-Kompatibilität, benötigt jedoch mehr Speicherplatz als herkömmliche Paketmanager wie APT oder DNF.',
        },

        {
          word: 'Systemd',
          definition:
            'Systemd ist ein Init-System, das den Boot-Prozess und die Systemdienste verwaltet. Es ersetzt ältere Init-Systeme wie SysVinit und bietet paralleles Starten von Prozessen, Logging über `journalctl` und ein einheitliches Management mit `systemctl`. Beispiele: `systemctl start [Dienst]`, `systemctl enable [Dienst]`, `systemctl status [Dienst]`. Systemd ist in modernen Linux-Distributionen wie Ubuntu, Fedora und Arch Linux Standard.',
        },

        {
          word: 'GRUB (Grand Unified Bootloader)',
          definition:
            'GRUB ist der Standard-Bootloader für Linux-Systeme. Er ermöglicht das Laden mehrerer Betriebssysteme und bietet eine Konfigurationsschnittstelle zur Anpassung von Boot-Optionen. Die Konfigurationsdatei befindet sich in `/etc/default/grub`, und Änderungen werden mit `update-grub` übernommen. GRUB unterstützt UEFI und Legacy-BIOS-Installationen.',
        },

        {
          word: 'LTS (Long Term Support)',
          definition:
            'LTS-Versionen von Ubuntu und anderen Linux-Distributionen bieten längere Support-Zeiträume mit Sicherheits- und Stabilitätsupdates über mehrere Jahre (meist 5 Jahre für Ubuntu). LTS-Versionen eignen sich besonders für Server und Unternehmen, die auf eine langfristig stabile Umgebung angewiesen sind. Beispiel: Ubuntu 22.04 LTS.',
        },

        {
          word: 'LUKS (Linux Unified Key Setup)',
          definition:
            'LUKS ist ein Standard zur Festplattenverschlüsselung in Linux. Es wird verwendet, um Partitionen sicher zu verschlüsseln und mit einem Passwort oder Schlüssel zu schützen. Mit `cryptsetup` lassen sich verschlüsselte Laufwerke einrichten (`cryptsetup luksFormat /dev/sdX`). LUKS wird oft für Laptop-Sicherheitslösungen und Datenschutz verwendet.',
        },

        {
          word: 'ext4 (Extended Filesystem 4)',
          definition:
            'ext4 ist das am häufigsten verwendete Dateisystem in Linux. Es bietet Journaling, große Dateigrößen (bis zu 16 TB) und verbesserte Performance gegenüber seinem Vorgänger ext3. Alternativen sind XFS (für große Dateien) und Btrfs (mit Snapshot-Unterstützung). Ein ext4-Dateisystem kann mit `mkfs.ext4 /dev/sdX` formatiert werden.',
        },

        {
          word: 'SSH (Secure Shell)',
          definition:
            'SSH ist ein Protokoll zur sicheren Fernsteuerung von Linux-Servern. Es ermöglicht verschlüsselte Verbindungen und Dateiübertragungen über Netzwerke. Ein SSH-Server läuft mit `sshd`, während sich Clients mit `ssh user@host` verbinden können. SSH kann mit Schlüsseln (`~/.ssh/id_rsa.pub`) für passwortlose Authentifizierung konfiguriert werden.',
        },

        {
          word: 'Cron Jobs',
          definition:
            'Cron ist ein Linux-Dienst zur automatischen Ausführung von Befehlen zu bestimmten Zeiten. Cron-Jobs werden in der Datei `/etc/crontab` oder mit `crontab -e` verwaltet. Beispiel für einen täglichen Backup-Job: `0 3 * * * /home/user/backup.sh`. Systemadministratoren nutzen Cron für regelmäßige Wartungsaufgaben und Skript-Automatisierung.',
        },

        {
          word: 'Bash',
          definition:
            'Eine beliebte Linux-Shell (Bourne-Again Shell), in der man Befehle tippt, Skripte ausführt und administrative Aufgaben automatisiert. Bash ist in vielen Linux-Distributionen die Standard-Shell.',
        },
        {
          word: 'Tenant',
          definition:
            'Ein Mandant in einer Software- oder Cloud-Umgebung, der als eigenständige, isolierte Einheit betrieben wird. Jeder Tenant verfügt über eigene Daten und Einstellungen, kann jedoch dieselbe Infrastruktur wie andere Tenants nutzen.',
        },
        {
          word: 'Dekonsolidierung',
          definition:
            'Das Auflösen einer konsolidierten Struktur, beispielsweise das Trennen von Daten, Diensten oder Infrastrukturen, die zuvor zentral zusammengefasst waren, um sie wieder unabhängig voneinander zu betreiben.',
        },
        {
          word: 'Konsolidierung',
          definition:
            'Das Zusammenfassen von Daten, Diensten oder Ressourcen, um Effizienz zu steigern, Redundanz zu reduzieren und eine zentralisierte Verwaltung zu ermöglichen.',
        },
        {
          word: 'Redundanz',
          definition:
            'Das Vorhandensein mehrfacher, oft identischer Systeme, Komponenten oder Daten, um die Verfügbarkeit und Ausfallsicherheit zu erhöhen.',
        },
        {
          word: 'Closed Source',
          definition:
            'Software, deren Quellcode nicht öffentlich zugänglich ist. Die Nutzung, Änderung und Weitergabe ist in der Regel durch den Hersteller eingeschränkt und an Lizenzen gebunden. Im Gegensatz zu Open Source.',
        },
        {
          word: 'Proprietäre Software',
          definition:
            'Software, die von einem Unternehmen oder Entwickler besessen und kontrolliert wird. Der Quellcode ist nicht zugänglich, und die Nutzung unterliegt strengen Lizenzbedingungen.',
        },
        {
          word: 'EVA-Prinzip',
          definition:
            'Ein Grundprinzip der Datenverarbeitung, das für Eingabe (E), Verarbeitung (V) und Ausgabe (A) steht. Daten werden zunächst eingegeben, anschließend verarbeitet und das Ergebnis wird ausgegeben. Dieses Prinzip bildet die Grundlage nahezu aller informationsverarbeitenden Systeme.',
        },
        {
          word: 'OSI-Modell - Schicht 1 (Physical Layer)',
          definition:
            'Physikalische Schicht – Verantwortlich für die Übertragung von Rohdaten über physikalische Medien wie Kabel oder Funk.',
        },
        {
          word: 'OSI-Modell - Schicht 2 (Data Link Layer)',
          definition:
            'Sicherungsschicht – Sorgt für fehlerfreie Übertragung von Datenpaketen zwischen zwei direkt verbundenen Geräten.',
        },
        {
          word: 'OSI-Modell - Schicht 3 (Network Layer)',
          definition:
            'Vermittlungsschicht – Verantwortlich für die Weiterleitung und Adressierung von Datenpaketen zwischen Netzwerken (z. B. IP).',
        },
        {
          word: 'OSI-Modell - Schicht 4 (Transport Layer)',
          definition:
            'Transportschicht – Gewährleistet die zuverlässige Datenübertragung zwischen Sender und Empfänger (z. B. TCP, UDP).',
        },
        {
          word: 'OSI-Modell - Schicht 5 (Session Layer)',
          definition:
            'Sitzungsschicht – Baut Sitzungen zwischen Geräten auf, hält sie aufrecht und beendet sie.',
        },
        {
          word: 'OSI-Modell - Schicht 6 (Presentation Layer)',
          definition:
            'Darstellungsschicht – Übersetzt Daten in eine für Anwendungen verständliche Form (z. B. Verschlüsselung, Datenkompression).',
        },
        {
          word: 'OSI-Modell - Schicht 7 (Application Layer)',
          definition:
            'Anwendungsschicht – Stellt Dienste für Anwendungen bereit, wie E-Mail, Dateitransfer oder Webzugriff.',
        },
        {
          word: 'OSI-Modell - Schicht 8 (User Layer)',
          definition:
            'Kein offizieller Layer. Layer 8 wird als Spaßbegriff verwendet, wenn der Fehler beim Nutzenden liegt.',
        },
        {
          word: 'Pinia',
          definition:
            'Eine moderne State-Management-Bibliothek für Vue.js. Sie hilft Entwicklern, Daten und Zustände zentral zu verwalten, sodass verschiedene Teile einer Anwendung darauf zugreifen können. Pinia ist einfacher zu verwenden und leistungsfähiger als ihr Vorgänger Vuex und macht die Verwaltung komplexer Datenstrukturen in Vue-Projekten effizienter.',
        },
        {
          word: 'Vue.js',
          definition:
            'Ein Framework für JavaScript, das bei der Entwicklung moderner Webseiten und Benutzeroberflächen hilft. Vue ist leicht zu lernen, flexibel und wird oft für Projekte genutzt, die eine interaktive und dynamische Nutzererfahrung bieten.',
        },
        {
          word: 'Vue 3',
          definition:
            'Die neueste Version von Vue.js, die bessere Leistung, vereinfachten Code und moderne Funktionen wie die Composition API bietet. Sie macht es Entwicklern leichter, größere und komplexere Anwendungen zu erstellen, ohne die Grundprinzipien von Vue zu verlieren.',
        },
        {
          word: 'Requirements (Anforderungen)',
          definition:
            'Die Erwartungen, Bedingungen oder Funktionen, die ein Produkt oder Projekt erfüllen muss. Anforderungen können funktional (z. B. bestimmte Features) oder nicht-funktional (z. B. Performance, Sicherheit) sein.',
        },
        {
          word: 'Scope (Projektumfang)',
          definition:
            'Der definierte Rahmen eines Projekts, der festlegt, welche Ziele, Ergebnisse und Aufgaben in das Projekt einbezogen werden. Der Projektumfang dient dazu, die Erwartungen aller Beteiligten klar abzustimmen.',
        },
        {
          word: 'Deliverable (Ergebnis/Arbeitsergebnis)',
          definition:
            'Ein greifbares oder messbares Produkt, das im Rahmen eines Projekts geliefert wird. Dies kann ein Dokument, ein Software-Feature oder ein physisches Produkt sein, das einen definierten Teil des Projekterfolgs darstellt.',
        },
        {
          word: 'Change Request (Änderungsantrag)',
          definition:
            'Eine formelle Anfrage, die eine Änderung des ursprünglichen Projektumfangs, der Anforderungen oder der Zeitpläne vorschlägt. Änderungsanträge werden häufig durch neue Erkenntnisse oder veränderte Bedingungen notwendig.',
        },
        {
          word: 'Risk (Risiko)',
          definition:
            'Ein potenzielles Problem oder Ereignis, das den Erfolg eines Projekts beeinträchtigen könnte. Risiken können positiv (Chancen) oder negativ (Gefahren) sein und sollten durch Risikomanagement überwacht und minimiert werden.',
        },
        {
          word: 'Support',
          definition:
            'Unterstützung, die von einer Person oder einem Team bereitgestellt wird, um Probleme zu lösen, Fragen zu beantworten oder Hilfe bei der Nutzung eines Produkts oder einer Dienstleistung zu bieten. Im IT-Bereich umfasst Support häufig technische Hilfe, wie Fehlerbehebung, Software-Updates oder die Einrichtung von Geräten.',
        },
        {
          word: 'Mocking',
          definition:
            'Mocking bezeichnet im Softwareentwicklungs- und Testkontext das Erstellen von simulierten Objekten oder Diensten, die das Verhalten echter Komponenten nachahmen. Es wird häufig verwendet, um isolierte Tests durchzuführen, indem externe Abhängigkeiten ersetzt werden. Mocking hilft dabei, bestimmte Szenarien zu simulieren, Fehler zu reproduzieren oder zu prüfen, wie eine Komponente auf verschiedene Eingaben reagiert, ohne die tatsächliche Infrastruktur zu benötigen. Besonders nützlich ist es bei Unit-Tests, API-Simulationen oder der Validierung komplexer Logiken.',
        },

        {
          word: 'PWA (Progressive Web App)',
          definition:
            'Eine Progressive Web App (PWA) ist eine Webanwendung, die sich wie eine native App verhält. Sie kann auf Smartphones und Computern installiert werden, funktioniert teilweise offline und nutzt moderne Webtechnologien wie Service Worker, Web App Manifest und Push-Benachrichtigungen. PWAs laufen direkt im Browser und benötigen keinen App-Store.',
        },
        {
          word: 'Tauri',
          definition:
            'Tauri ist ein Framework zur Erstellung von Desktop-Apps mit Web-Technologien wie HTML, CSS und JavaScript. Im Gegensatz zu Electron benötigt Tauri kein integriertes Chromium, sondern nutzt das native Webview des Betriebssystems. Dadurch sind Tauri-Apps deutlich kleiner und ressourcenschonender. Der Kern von Tauri ist in Rust geschrieben, was für Sicherheit und hohe Leistung sorgt.',
        },
        {
          word: 'Chromium',
          definition:
            'Chromium ist ein Open-Source-Browserprojekt, das als Basis für viele bekannte Browser wie Google Chrome, Microsoft Edge und Opera dient. Es stellt die Rendering-Engine Blink bereit und bildet die Grundlage für Web-Apps, die auf Browser-Technologien basieren. In Desktop-App-Frameworks wie Electron wird Chromium oft mitgeliefert, um eine konsistente Umgebung zu gewährleisten.',
        },
        {
          word: 'Playwright',
          definition:
            'Playwright ist ein Open-Source-Testframework von Microsoft zur Automatisierung von Webanwendungen. Es ermöglicht das Testen von Webseiten in verschiedenen Browsern (Chromium, Firefox, WebKit) und unterstützt Funktionen wie parallele Tests, Screenshot- und Videoaufzeichnungen sowie das Interagieren mit der Benutzeroberfläche. Playwright eignet sich besonders für End-to-End-Tests und UI-Tests.',
        },
      ],
    }
  },

  computed: {
    sortedAndFilteredTerms() {
      // 1) Filtern
      const lowerSearch = this.searchTerm.toLowerCase()
      const filtered = !this.searchTerm
        ? this.terms
        : this.terms.filter((term) => {
            return (
              term.word.toLowerCase().includes(lowerSearch) ||
              term.definition.toLowerCase().includes(lowerSearch)
            )
          })

      // 2) Sortieren
      return filtered.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.word.localeCompare(b.word)
        } else {
          return b.word.localeCompare(a.word)
        }
      })
    },
  },
  methods: {
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },

    // Methode zum Hervorheben von Ziffern + Suchbegriff
    highlightText(str) {
      if (!str) return ''

      // 1) Erst alle Ziffern farblich hervorheben
      // Du kannst hier z. B. eine CSS-Klasse benutzen
      let result = str.replace(/\d+/g, '<span class="highlight-digit">$&</span>')

      // 2) Optional: Suchbegriff hervorheben, falls searchTerm vorhanden
      if (this.searchTerm) {
        const escapedSearch = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escapedSearch})`, 'gi')
        result = result.replace(regex, '<mark>$1</mark>')
      }

      return result
    },
  },
}
</script>

<style>
/* Kein `scoped` -> Darkmode kann per .dark-mode .dictionary-view greifen */

/* ---- LIGHTMODE (Standard) ---- */
.dictionary-view {
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

.search {
  margin-bottom: 1rem;
}
.search input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.controls {
  margin-bottom: 1.5rem;
}
.controls button {
  padding: 10px 15px;
  border: none;
  background-color: #b9a9e8;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.controls button:hover {
  background-color: #a28cd6;
}

.terms {
  list-style: none;
  padding: 0;
}
.terms li {
  margin-bottom: 1rem;
}
.terms strong {
  color: #333;
}

/* ---- DARKMODE OVERRIDES ---- */
.dark-mode .dictionary-view {
  background-color: #333;
  color: #f5f5f5;
  box-shadow: none; /* Weg oder dunkler Schatten */
}

/* Überschriften, Text etc. */
.dark-mode .dictionary-view h2 {
  color: #ddc3fa; /* Leichter Lilaton, falls gewünscht, sonst #f5f5f5 */
}

.dark-mode .dictionary-view p,
.dark-mode .dictionary-view .terms li {
  color: #f5f5f5;
}

/* Input im Darkmode */
.dark-mode .dictionary-view .search input {
  background-color: #444;
  border: 1px solid #666;
  color: #eee;
}

/* Button im Darkmode */
.dark-mode .dictionary-view .controls button {
  background-color: #666;
  border: 1px solid #555;
  color: #fff;
}
.dark-mode .dictionary-view .controls button:hover {
  background-color: #555;
}

/* Optional: <strong> im Darkmode */
.dark-mode .dictionary-view .terms strong {
  color: #fff;
}
.dictionary-view mark {
  background-color: #ffd8ec;
  color: #000;
}
</style>
