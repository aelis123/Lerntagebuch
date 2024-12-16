<template>
  <section class="dictionary-view">
    <h2>📖 IT-Wörterbuch</h2>

    <div class="search">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Nach einem Begriff suchen..."
      />
    </div>

    <div class="controls">
      <button @click="toggleSortOrder">
        {{ sortOrder === 'asc' ? 'Z-A sortieren' : 'A-Z sortieren' }}
      </button>
    </div>

    <ul class="terms">
      <li v-for="term in sortedAndFilteredTerms" :key="term.word">
        <strong>{{ term.word }}</strong>: {{ term.definition }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "DictionaryView",
  data() {
    return {
      searchTerm: "",
      sortOrder: "asc", // Standardmäßig aufsteigend sortiert
      terms: [
      { word: "5G", definition: "Die fünfte Generation der Mobilfunktechnologie, die höhere Geschwindigkeiten, geringere Latenzen und eine größere Kapazität bietet als ihre Vorgänger. 5G ist die Grundlage für viele moderne Anwendungen wie autonomes Fahren, das Internet der Dinge (IoT) und Smart Cities. Es ermöglicht Downloadgeschwindigkeiten von bis zu 10 Gbit/s und unterstützt eine Vielzahl von Geräten gleichzeitig, was es ideal für stark vernetzte Umgebungen macht." },
      { word: "4G", definition: "Die vierte Generation der Mobilfunktechnologie, die im Vergleich zu 3G deutlich schnellere Datenübertragungsraten bietet. Mit Downloadgeschwindigkeiten von bis zu 1 Gbit/s ermöglicht 4G Anwendungen wie HD-Videostreaming, Videotelefonie und schnelle mobile Internetverbindungen." },
{ word: "LTE", definition: "Steht für 'Long Term Evolution' und ist eine Mobilfunktechnologie, die oft als 4G bezeichnet wird. LTE ist jedoch technisch eine Weiterentwicklung von 3G und erreicht nicht die vollständigen Spezifikationen von echtem 4G. Es bietet dennoch Geschwindigkeiten von bis zu 300 Mbit/s und bildet die Grundlage für viele heutige 4G-Netzwerke." }, 
      { word: "Agile", definition: "Ein Ansatz zur Softwareentwicklung, der Flexibilität und Anpassung priorisiert." },
        { word: "Algorithmus", definition: "Eine Reihe von Anweisungen zur Problemlösung." },
        { word: "API", definition: "Eine Schnittstelle, die den Zugriff auf Funktionen und Daten ermöglicht." },
        { word: "Array", definition: "Eine geordnete Sammlung von Daten oder Elementen." },
        { word: "Arrow Function", definition: "Eine verkürzte Syntax für Funktionen in JavaScript." },
        { word: "Authentication", definition: "Der Prozess der Überprüfung der Identität eines Benutzers." },
        { word: "Authorization", definition: "Der Prozess der Zuweisung von Rechten an Benutzer." },
        { word: "Availability", definition: "Die Verfügbarkeit eines Systems oder Dienstes." },
        { word: "Backend", definition: "Der unsichtbare Teil einer Anwendung, der die Logik und Daten verarbeitet." },
        { word: "Babel", definition: "Ein Transpiler für moderne JavaScript-Versionen." },
        { word: "Bandwidth", definition: "Die maximale Datenmenge, die übertragen werden kann." },
        { word: "Big Data", definition: "Verarbeitung und Analyse großer Datenmengen." },
        { word: "Blockchain", definition: "Eine dezentrale Datenbankstruktur für sichere Transaktionen." },
        { word: "Cache", definition: "Ein schneller Speicher, der häufig genutzte Daten speichert." },
        { word: "CAPTCHA", definition: "Ein Test zur Unterscheidung zwischen Menschen und Bots." },
        { word: "CI/CD Pipeline", definition: "Ein Automatisierungsprozess für kontinuierliche Integration und Bereitstellung." },
        { word: "Cloud Computing", definition: "Bereitstellung von IT-Ressourcen über das Internet." },
        { word: "Closure", definition: "Eine Funktion, die auf Variablen in ihrem äußeren Bereich zugreifen kann." },
        { word: "Code Review", definition: "Prüfung von Code durch andere Entwickler zur Qualitätssteigerung." },
        { word: "Compiler", definition: "Ein Programm, das Quellcode in ausführbaren Code übersetzt." },
        { word: "Container", definition: "Eine standardisierte Einheit zur Verpackung von Software und deren Abhängigkeiten." },
        { word: "Continuous Deployment", definition: "Automatische Bereitstellung von Änderungen nach dem Testen." },
        { word: "Continuous Integration", definition: "Ein Entwicklungsprozess, bei dem Änderungen kontinuierlich integriert und getestet werden." },
        { word: "Cookies", definition: "Kleine Daten, die von Websites gespeichert werden, um Benutzerinformationen zu speichern." },
        { word: "Cross-Browser Testing", definition: "Testen einer Website in verschiedenen Browsern." },
        { word: "Cross-Origin Resource Sharing (CORS)", definition: "Eine Sicherheitsfunktion zur Einschränkung von Anfragen zwischen Domänen." },
        { word: "CRUD", definition: "Abkürzung für Create, Read, Update und Delete." },
        { word: "CSS", definition: "Eine Sprache zur Gestaltung von Webinhalten." },
        { word: "Data Lake", definition: "Ein Speicher für unstrukturierte und strukturierte Daten." },
        { word: "Data Mining", definition: "Der Prozess des Extrahierens nützlicher Informationen aus Daten." },
        { word: "Data Warehouse", definition: "Ein System zur Speicherung und Analyse großer Datenmengen." },
        { word: "Datenbank", definition: "Ein organisierter Speicher für Daten." },
        { word: "Debugger", definition: "Ein Werkzeug zum Finden und Beheben von Fehlern im Code." },
        { word: "Dependency", definition: "Eine externe Bibliothek oder Ressource, von der eine Anwendung abhängt." },
        { word: "Destructuring", definition: "Eine Syntax zum Extrahieren von Werten aus Arrays oder Objekten." },
        { word: "DevOps", definition: "Eine Methodik, die Entwicklung und Betrieb integriert." },
        { word: "DNS", definition: "Das System zur Namensauflösung von Domainnamen in IP-Adressen." },
        { word: "Docker", definition: "Ein Tool zur Erstellung und Verwaltung von Containern." },
        { word: "Dynamic Content", definition: "Inhalte, die basierend auf Benutzereingaben generiert werden." },
        { word: "Encryption", definition: "Die Verschlüsselung von Daten für mehr Sicherheit." },
        { word: "Encryption Key", definition: "Ein Schlüssel zur Sicherung und Entschlüsselung von Daten." },
        { word: "End-to-End Testing", definition: "Testen des gesamten Workflows einer Anwendung." },
        { word: "Event Bubbling", definition: "Ein Mechanismus, bei dem Ereignisse von inneren zu äußeren Elementen wandern." },
        { word: "Event Loop", definition: "Ein Mechanismus zur Verwaltung von asynchronem Code." },
        { word: "Failover", definition: "Automatisches Umschalten auf ein Backup-System bei einem Ausfall." },
        { word: "Feature Toggle", definition: "Ein Mechanismus zum Aktivieren oder Deaktivieren von Funktionen in der Produktion." },
        { word: "Firewall", definition: "Eine Sicherheitsbarriere, die unbefugten Zugriff auf ein Netzwerk verhindert." },
        { word: "Framework", definition: "Eine Sammlung von Bibliotheken und Tools für die Entwicklung." },
        { word: "Frontend", definition: "Der sichtbare Teil einer Anwendung." },
        { word: "Garbage Collection", definition: "Automatische Speicherbereinigung in Programmiersprachen." },
        { word: "Git", definition: "Ein System, das dabei hilft, Änderungen an Dateien – vor allem in der Softwareentwicklung – zu verfolgen. Mit Git können Entwickler alte Versionen wiederherstellen, an verschiedenen Teilen eines Projekts gleichzeitig arbeiten und Änderungen von mehreren Personen zusammenführen. Es wird häufig verwendet, um den Überblick über den Code zu behalten und gemeinsam an Projekten zu arbeiten." },
        { word: "GraphQL", definition: "Eine Abfragesprache für APIs, die Daten genau spezifiziert." },
        { word: "Hoisting", definition: "Ein Verhalten, bei dem Deklarationen an den Anfang ihres Bereichs verschoben werden." },
        { word: "Hotfix", definition: "Eine schnelle Lösung für einen kritischen Softwarefehler." },
        { word: "Hypervisor", definition: "Software zur Virtualisierung von Betriebssystemen." },
        { word: "IDE", definition: "Integrierte Entwicklungsumgebung, ein Werkzeug für die Programmierung." },
        { word: "Integration Test", definition: "Testen der Interaktion zwischen mehreren Komponenten." },
        { word: "Internet of Things (IoT)", definition: "Ein Netzwerk von physischen Geräten, die über das Internet miteinander verbunden sind und Daten austauschen können. Dazu gehören alltägliche Objekte wie Smart-TVs, Thermostate, Fitness-Tracker, Lampen oder Haushaltsgeräte. IoT-Geräte sammeln Daten über Sensoren, verarbeiten diese Informationen und kommunizieren miteinander oder mit zentralen Systemen. Ziel des IoT ist es, Prozesse zu automatisieren, die Effizienz zu steigern und das Leben bequemer zu machen, beispielsweise durch intelligente Beleuchtung oder automatische Temperaturregelung. IoT spielt auch eine wichtige Rolle in der Industrie (Industrial IoT) und ermöglicht Anwendungen wie Predictive Maintenance, Smart Cities und vernetzte Fahrzeuge." },
        { word: "IP-Adresse", definition: "Eine eindeutige numerische Adresse für ein Gerät im Netzwerk." },
        { word: "Iterieren", definition: "Das Wiederholen eines Prozesses." },
        { word: "JSON", definition: "Ein Format zum Speichern und Austausch von Daten." },
        { word: "Kubernetes", definition: "Ein System zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von Container-Anwendungen." },
        { word: "Latency", definition: "Die Verzögerung bei der Datenübertragung." },
        { word: "Linting", definition: "Ein Prozess zur Analyse von Code auf potenzielle Fehler." },
        { word: "Load Balancer", definition: "Eine Methode zur Verteilung von Netzwerkverkehr auf mehrere Server." },
        { word: "Machine Learning", definition: "Ein Bereich der KI, der Maschinen das Lernen ohne explizite Programmierung ermöglicht." },
        { word: "Middleware", definition: "Software, die verschiedene Anwendungen miteinander verbindet." },
        { word: "Multi-Tenancy", definition: "Eine Architektur, bei der mehrere Kunden dieselbe Softwareumgebung nutzen." },
        { word: "Namespace", definition: "Ein Bereich zur Organisation von Code und Vermeidung von Namenskonflikten." },
        { word: "NoSQL", definition: "Eine Art von Datenbank, die flexible Datenmodelle unterstützt." },
        { word: "OAuth", definition: "Ein Protokoll zur sicheren Autorisierung." },
        { word: "Open Source", definition: "Software, deren Quellcode öffentlich zugänglich ist. Im Gegensatz zu Closed Source." },
        { word: "ORM", definition: "Object-Relational Mapping, ein Werkzeug zur Arbeit mit Datenbanken." },
        { word: "PaaS", definition: "Platform as a Service, Plattformen für die Entwicklung und Bereitstellung von Software." },
        { word: "Ping", definition: "Ein Netzwerkdienst zur Überprüfung der Erreichbarkeit eines Geräts." },
        { word: "Prettier", definition: "Ein automatisches Codeformatierungstool." },
        { word: "Progressive Web App (PWA)", definition: "Eine Webanwendung mit App-ähnlichem Verhalten." },
        { word: "Provisioning", definition: "Einrichten und Konfigurieren von IT-Ressourcen." },
        { word: "Proxy Server", definition: "Ein Server, der als Vermittler für Anfragen zwischen einem Client und einer Ressource dient." },
        { word: "Refactoring", definition: "Verbessern von Code, ohne die Funktionalität zu ändern." },
        { word: "Regression Testing", definition: "Testen von Änderungen, um sicherzustellen, dass keine neuen Fehler eingeführt wurden." },
        { word: "Repository", definition: "Ein Speicher für Code, oft in Git verwaltet." },
        { word: "Responsive Design", definition: "Design, das sich an verschiedene Bildschirmgrößen anpasst." },
        { word: "REST API", definition: "Eine Architektur für den Austausch von Daten zwischen Systemen." },
        { word: "Rollback", definition: "Das Zurücksetzen auf eine frühere Version eines Systems." },
        { word: "SaaS", definition: "Software as a Service, Anwendungen, die über das Internet bereitgestellt werden." },
        { word: "Scaffolding", definition: "Automatisiertes Generieren von Codevorlagen." },
        { word: "Scalability", definition: "Die Fähigkeit eines Systems, bei steigender Last zu wachsen." },
        { word: "Scrum", definition: "Ein agiles Framework für Projektmanagement." },
        { word: "Session", definition: "Eine begrenzte Interaktion eines Benutzers mit einem System." },
        { word: "Single Sign-On", definition: "Ein Anmeldesystem für mehrere Anwendungen." },
        { word: "SQL", definition: "Structured Query Language, eine Sprache zur Verwaltung von Datenbanken." },
        { word: "SSL/TLS", definition: "Verschlüsselungsprotokolle zur Sicherung von Datenübertragungen." },
        { word: "Static Content", definition: "Unveränderliche Inhalte wie Bilder oder HTML-Dateien." },
        { word: "Static Typing", definition: "Die Deklaration von Datentypen zur Vermeidung von Laufzeitfehlern." },
        { word: "Staging", definition: "Ein Testumgebung, die eine Produktionsumgebung simuliert." },
        { word: "Stress Testing", definition: "Testen der Grenzen eines Systems." },
        { word: "Subnetting", definition: "Das Aufteilen eines Netzwerks in kleinere Teilnetzwerke." },
        { word: "Syntax", definition: "Die Regeln und Struktur einer Programmiersprache." },
        { word: "Template Literal", definition: "Eine Syntax zum Einfügen von Variablen in Strings." },
        { word: "Token", definition: "Ein Sicherheitsmerkmal, oft in der Authentifizierung genutzt." },
        { word: "TypeScript", definition: "Eine JavaScript-Erweiterung mit statischer Typisierung." },
        { word: "Unit Test", definition: "Testen einzelner Komponenten oder Funktionen einer Anwendung." },
        { word: "Usability Testing", definition: "Bewertung der Benutzerfreundlichkeit einer Anwendung." },
        { word: "Uptime", definition: "Die Zeit, während der ein System verfügbar ist." },
        { word: "Variable", definition: "Ein Speicherplatz für Daten in einem Programm." },
        { word: "Version Control", definition: "Die Verwaltung von Änderungen an Code und anderen Dateien." },
        { word: "Virtual Machine", definition: "Eine Softwareumgebung, die wie ein physischer Computer funktioniert." },
        { word: "Virtual Private Network (VPN)", definition: "Ein Netzwerk, das sichere Verbindungen über das Internet ermöglicht." },
        { word: "Predictive Maintenance", definition: "Eine Technologie, die mithilfe von Sensoren und Datenanalysen den Zustand von Maschinen überwacht und Wartungsarbeiten voraussagt, bevor Ausfälle auftreten. Durch Predictive Maintenance können Unternehmen Kosten senken, die Lebensdauer von Geräten verlängern und ungeplante Ausfallzeiten vermeiden." },
        { 
  word: "Smart Cities", 
  definition: "Städte, die moderne Technologien wie IoT nutzen, um die Lebensqualität zu verbessern, Ressourcen effizient zu nutzen und Umweltbelastungen zu reduzieren. Beispiele sind intelligente Verkehrsleitsysteme, vernetzte Straßenbeleuchtung und Müllentsorgung, sowie Anwendungen für Bürger wie Echtzeitinformationen zu öffentlichen Verkehrsmitteln. Bekannte Smart Cities sind beispielsweise: London (ein Technologiezentrum mit 5G-Konnektivität und fahrerlosen Transitsystemen wie den Heathrow Pods), Zürich (nutzt intelligente Straßenbeleuchtung und fördert nachhaltige Bauprojekte), Amsterdam (setzt auf intelligente Beleuchtung und nachhaltige Energie), Barcelona (verwendet vernetzte Verkehrssysteme und Beleuchtung) und Singapur (die 'Smart Nation'-Initiative integriert Technologie in alle Lebensbereiche)." },
        { word: "Vernetzte Fahrzeuge", definition: "Fahrzeuge, die über das Internet oder andere Netzwerke miteinander, mit Infrastruktur oder mit externen Diensten kommunizieren können. Diese Technologie ermöglicht Anwendungen wie Navigationsdienste in Echtzeit, Fahrzeug-zu-Fahrzeug-Kommunikation (V2V), autonome Fahrfunktionen und Fernwartung." },
        { word: "Vite", definition: "Ein schnellerer Entwicklungsserver und Modul-Bundler." },
        { word: "Web Crawler", definition: "Ein Programm, das das Web durchsucht, um Informationen zu sammeln." },
        { word: "Webpack", definition: "Ein Tool zur Bündelung von JavaScript-Modulen." },
        { word: "WebSocket", definition: "Ein Protokoll für die Echtzeitkommunikation zwischen Client und Server." },
        { word: "Yarn", definition: "Eine Alternative zu NPM." },
        { word: "Kanban", definition: "Ein visuelles Projektmanagement-System zur Steuerung von Arbeitsabläufen." },
        { word: "Quality Assurance (QA)", definition: "Ein Prozess, um sicherzustellen, dass Produkte oder Dienstleistungen die festgelegten Qualitätsanforderungen erfüllen." },
        { word: "MVP (Minimum Viable Product)", definition: "Ein Produkt mit den minimalen Funktionen, um Kundenfeedback einzuholen und die Markttauglichkeit zu testen." },
        { word: "Sprint", definition: "Eine festgelegte Zeitspanne im agilen Projektmanagement, in der ein definiertes Arbeitspensum erledigt wird." },
        { word: "Backlog", definition: "Eine priorisierte Liste von Aufgaben oder Anforderungen in einem Projekt." },
        { 
  word: "Stakeholder", 
  definition: "Personen, Gruppen oder Organisationen, die ein Interesse an einem Projekt, einem Produkt oder einer Entscheidung haben und davon direkt oder indirekt betroffen sein können. Dazu gehören beispielsweise Kunden, Mitarbeiter, Investoren, Partner, Lieferanten und Behörden. Stakeholder können Einfluss auf den Verlauf und den Erfolg eines Projekts nehmen und haben unterschiedliche Erwartungen und Anforderungen, die berücksichtigt werden müssen." },
        { word: "Gantt-Chart", definition: "Ein Diagramm zur Darstellung von Projektplänen, das Zeitpläne und Abhängigkeiten visualisiert." },
        { word: "RACI-Matrix", definition: "Ein Werkzeug zur Klärung von Verantwortlichkeiten in einem Projekt (Responsible, Accountable, Consulted, Informed)." },
        { word: "Risk Management", definition: "Der Prozess zur Identifikation, Bewertung und Minimierung von Risiken in einem Projekt." },
        { word: "Change Management", definition: "Ein strukturierter Ansatz, um Änderungen in Projekten effektiv umzusetzen." },
        { word: "KPI (Key Performance Indicator)", definition: "Ein messbarer Wert, der den Erfolg eines Projekts oder Prozesses anzeigt." },
        { word: "Project Charter", definition: "Ein Dokument, das die Ziele, den Umfang und die Teilnehmer eines Projekts definiert." },
        { word: "Milestone", definition: "Ein wichtiger Meilenstein oder Ereignis in einem Projekt, das den Fortschritt markiert." },
        { word: "Arbeitsvertrag", definition: "Ein Vertrag, der die Rechte und Pflichten von Arbeitnehmer und Arbeitgeber regelt." },
{ word: "Arbeitsschutz", definition: "Maßnahmen zur Sicherstellung der Sicherheit und Gesundheit der Arbeitnehmer." },
{ word: "Datenschutz-Grundverordnung (DSGVO)", definition: "Europäische Verordnung zum Schutz personenbezogener Daten." },
{ word: "Bundesdatenschutzgesetz (BDSG)", definition: "Ein deutsches Gesetz zur Ergänzung der DSGVO." },
{ word: "Datensicherung", definition: "Maßnahmen zur Sicherstellung, dass Daten bei Verlust oder Beschädigung wiederhergestellt werden können." },
{ word: "Schutzbedarfsanalyse", definition: "Eine Methode zur Bewertung von Schutzanforderungen für IT-Systeme." },
{ word: "Lizenzierung", definition: "Die rechtliche Erlaubnis zur Nutzung von Software gemäß den Lizenzbedingungen." },
{ word: "Hyper-V", definition: "Eine Virtualisierungsplattform von Microsoft." },

{ word: "DHCP", definition: "Dynamic Host Configuration Protocol, ein Protokoll zur automatischen Zuweisung von IP-Adressen." },
{ word: "VLAN", definition: "Virtual Local Area Network, eine Methode zur logischen Trennung von Netzwerken." },
{ word: "ITIL", definition: "Information Technology Infrastructure Library, ein Framework für IT-Service-Management." },
{ word: "ITSM", definition: "IT Service Management, ein Ansatz zur Verwaltung von IT-Diensten." },
{ word: "Windows Server", definition: "Ein Betriebssystem von Microsoft für Serveranwendungen." },
{ word: "Ubuntu", definition: "Eine Linux-Distribution, die auf Benutzerfreundlichkeit ausgelegt ist." },
{ word: "Visio", definition: "Eine Microsoft-Software zur Erstellung von Diagrammen und technischen Zeichnungen." },
{ word: "Fehleranalyse", definition: "Der Prozess zur Identifikation und Diagnose von Problemen in IT-Systemen." },
{ word: "Fehlerbeseitigung", definition: "Maßnahmen zur Behebung von Problemen in IT-Systemen." },
{ word: "Arduino", definition: "Eine Open-Source-Plattform für Microcontroller-Entwicklung." },
{ word: "Programmierung", definition: "Das Schreiben von Code zur Entwicklung von Software und Anwendungen." },
{ word: "Logische Topologie", definition: "Die Art und Weise, wie Daten innerhalb eines Netzwerks fließen." },
{ word: "Physikalische Topologie", definition: "Die tatsächliche physische Struktur eines Netzwerks." },
{ word: "CU", definition: "Kupferbasierte Netzwerkkabel, z. B. Ethernet-Kabel." },
{ word: "GF", definition: "Glasfaserbasierte Netzwerkkabel für schnelle Datenübertragung." },
{ word: "Technischer Brandschutz", definition: "Maßnahmen zum Schutz von IT-Systemen vor Feuergefahr." },
{ word: "Bit", definition: "Die kleinste Informationseinheit in der Informatik." },
{ word: "Byte", definition: "Eine Einheit aus 8 Bits." },
{ word: "Protokoll", definition: "Ein Satz von Regeln für die Kommunikation in Netzwerken, z. B. TCP/IP." },
{ word: "Netzwerksicherheit", definition: "Schutz von Netzwerken vor unbefugtem Zugriff oder Angriffen." },
{ word: "Datenintegrität", definition: "Die Richtigkeit und Konsistenz von Daten während ihrer Speicherung und Übertragung." },
{ word: "Virtualisierung", definition: "Die Erstellung virtueller Ressourcen wie Maschinen, Netzwerke oder Speicher." },
{ word: "Backup", definition: "Eine Kopie von Daten zur Wiederherstellung bei Verlust oder Beschädigung." },
{ word: "Layer-3-Switch", definition: "Ein Netzwerkgerät, das sowohl Switching als auch Routing-Funktionen bietet." },
{ word: "OSI-Modell", definition: "Ein Referenzmodell für die Kommunikation in Netzwerken." },
{ word: "Microcontroller", definition: "Ein kompakter Computer auf einem Chip, der in eingebetteten Systemen verwendet wird." },
{ word: "Arbeitszeitgesetz (ArbZG)", definition: "Ein Gesetz, das die Höchstarbeitszeiten und Ruhezeiten regelt." },
{ word: "Tarifvertrag", definition: "Ein Vertrag zwischen Arbeitgeberverbänden und Gewerkschaften, der Arbeitsbedingungen regelt." },
{ word: "Jugendarbeitsschutzgesetz (JArbSchG)", definition: "Ein Gesetz zum Schutz von jugendlichen Arbeitnehmern." },
{ word: "Kündigungsschutz", definition: "Rechtliche Regelungen, die Arbeitnehmer vor ungerechtfertigten Kündigungen schützen." },
{ word: "Betriebsrat", definition: "Ein Gremium, das die Interessen der Arbeitnehmer im Betrieb vertritt." },
{ word: "Berufsbildungsgesetz (BBiG)", definition: "Ein Gesetz, das die Berufsausbildung in Deutschland regelt." },
{ word: "Probezeit", definition: "Eine vereinbarte Zeitspanne, in der ein Arbeitsverhältnis auf Probe geführt wird." },
{ word: "Sozialversicherung", definition: "Ein System zur Absicherung von Arbeitnehmern in Fällen wie Krankheit oder Arbeitslosigkeit." },
{ word: "Schlichtung", definition: "Ein Verfahren zur Beilegung von Streitigkeiten zwischen Arbeitgebern und Arbeitnehmern." },
{ word: "Organigramm", definition: "Eine grafische Darstellung der Struktur eines Unternehmens." },
{ word: "Abteilung", definition: "Ein organisatorischer Bereich innerhalb eines Unternehmens." },
{ word: "Leitungsstruktur", definition: "Die Hierarchie eines Unternehmens, z. B. flach oder steil." },
{ word: "Zentralisierung", definition: "Die Konzentration von Entscheidungsbefugnissen an einer Stelle." },
{ word: "Dezentralisierung", definition: "Die Verteilung von Entscheidungsbefugnissen auf verschiedene Ebenen." },
{ word: "Prokura", definition: "Eine handelsrechtliche Vollmacht zur Vertretung eines Unternehmens." },
{ word: "Buchhaltung", definition: "Die Abteilung, die für die Aufzeichnung finanzieller Transaktionen zuständig ist." },
{ word: "PSA (Persönliche Schutzausrüstung)", definition: "Ausrüstung zum Schutz von Arbeitnehmern vor Gefahren." },
{ word: "Gefährdungsbeurteilung", definition: "Eine Analyse potenzieller Gefahren am Arbeitsplatz." },
{ word: "Ergonomie", definition: "Die Anpassung von Arbeitsplätzen an die Bedürfnisse der Arbeitnehmer." },
{ word: "Arbeitsstättenverordnung (ArbStättV)", definition: "Ein Gesetz, das Anforderungen an Arbeitsplätze regelt." },
{ word: "Unterweisung", definition: "Die Schulung von Mitarbeitern zu Sicherheitsmaßnahmen." },
{ word: "Lärmschutz", definition: "Maßnahmen zum Schutz vor gesundheitsschädlichem Lärm." },
{ word: "Brandmeldeanlage", definition: "Ein System zur Erkennung und Meldung von Bränden." },
{ word: "Privacy by Design", definition: "Ein Ansatz, der Datenschutz bereits in der Entwicklung von Systemen berücksichtigt." },
{ word: "Privacy by Default", definition: "Der Grundsatz, dass Systeme standardmäßig datenschutzfreundlich sein sollten." },
{ word: "Data Breach", definition: "Ein Vorfall, bei dem Daten unbefugt offengelegt oder gestohlen werden." },
{ word: "Verarbeitungsverzeichnis", definition: "Eine Dokumentation aller Datenverarbeitungsaktivitäten eines Unternehmens." },
{ word: "Betroffenenrechte", definition: "Die Rechte von Personen gemäß der DSGVO, z. B. das Recht auf Auskunft." },
{ word: "Zwei-Faktor-Authentifizierung (2FA)", definition: "Eine zusätzliche Sicherheitsebene bei der Anmeldung." },
{ word: "End-to-End-Verschlüsselung", definition: "Eine Methode zur Sicherstellung, dass nur Sender und Empfänger Daten lesen können." },
{ word: "CPU (Central Processing Unit)", definition: "Das zentrale Rechenwerk eines Computers." },
{ word: "GPU (Graphics Processing Unit)", definition: "Ein Prozessor für die Berechnung von Grafikdaten." },
{ word: "Motherboard", definition: "Die Hauptplatine, die alle Komponenten eines Computers verbindet." },
{ word: "RAM (Random Access Memory)", definition: "Ein flüchtiger Speicher, der Daten temporär speichert." },
{ word: "SSD (Solid State Drive)", definition: "Ein schneller Speicher ohne bewegliche Teile." },
{ word: "Netzteil", definition: "Ein Gerät, das den Computer mit Strom versorgt." },
{ word: "BIOS", definition: "Die Firmware, die die Hardware eines Computers initialisiert." },
{ word: "MAC-Adresse", definition: "Eine eindeutige Hardware-Adresse eines Netzwerkgeräts." },
{ word: "Subnetzmaske", definition: "Ein Wert, der Netzwerke in Subnetze aufteilt." },
{ word: "Gateway", definition: "Ein Gerät, das Netzwerke miteinander verbindet." },
{ word: "Switch", definition: "Ein Gerät, das Netzwerkgeräte miteinander verbindet." },
{ word: "Router", definition: "Ein Gerät, das Datenpakete zwischen Netzwerken weiterleitet." },
{ word: "Port", definition: "Eine Schnittstelle zur Kommunikation in einem Netzwerk." },
{ word: "Shell", definition: "Eine Befehlszeilenumgebung zur Steuerung des Systems." },
{ word: "Kernel", definition: "Der zentrale Bestandteil eines Betriebssystems." },
{ word: "Package Manager", definition: "Ein Werkzeug zur Verwaltung von Softwarepaketen." },
{ word: "APT", definition: "Ein Tool, das dabei hilft, Software auf Debian-basierten Linux-Systemen zu installieren, zu aktualisieren oder zu entfernen. Mit APT (Advanced Package Tool) können Programme und ihre Abhängigkeiten automatisch heruntergeladen und konfiguriert werden, ohne dass der Nutzer alles manuell erledigen muss. Es macht die Verwaltung von Software einfach und effizient." },
{ word: "Cron Job", definition: "Ein geplantes Skript, das zu bestimmten Zeiten ausgeführt wird." },
{ word: "Bash", definition: "Eine beliebte Linux-Shell zur Ausführung von Befehlen." },
{ word: "Tenant", definition: "Ein Mandant in einer Software- oder Cloud-Umgebung, der als eigenständige, isolierte Einheit betrieben wird. Jeder Tenant verfügt über eigene Daten und Einstellungen, kann jedoch dieselbe Infrastruktur wie andere Tenants nutzen." },
{ word: "Dekonsolidierung", definition: "Das Auflösen einer konsolidierten Struktur, beispielsweise das Trennen von Daten, Diensten oder Infrastrukturen, die zuvor zentral zusammengefasst waren, um sie wieder unabhängig voneinander zu betreiben." },
{ word: "Konsolidierung", definition: "Das Zusammenfassen von Daten, Diensten oder Ressourcen, um Effizienz zu steigern, Redundanz zu reduzieren und eine zentralisierte Verwaltung zu ermöglichen." },
{ word: "Redundanz", definition: "Das Vorhandensein mehrfacher, oft identischer Systeme, Komponenten oder Daten, um die Verfügbarkeit und Ausfallsicherheit zu erhöhen." },
{ word: "Closed Source", definition: "Software, deren Quellcode nicht öffentlich zugänglich ist. Die Nutzung, Änderung und Weitergabe ist in der Regel durch den Hersteller eingeschränkt und an Lizenzen gebunden. Im Gegensatz zu Open Source." },
{ word: "Proprietäre Software", definition: "Software, die von einem Unternehmen oder Entwickler besessen und kontrolliert wird. Der Quellcode ist nicht zugänglich, und die Nutzung unterliegt strengen Lizenzbedingungen." },
{ word: "EVA-Prinzip", definition: "Ein Grundprinzip der Datenverarbeitung, das für Eingabe (E), Verarbeitung (V) und Ausgabe (A) steht. Daten werden zunächst eingegeben, anschließend verarbeitet und das Ergebnis wird ausgegeben. Dieses Prinzip bildet die Grundlage nahezu aller informationsverarbeitenden Systeme." },
{ word: "OSI-Modell - Schicht 1 (Physical Layer)", definition: "Physikalische Schicht – Verantwortlich für die Übertragung von Rohdaten über physikalische Medien wie Kabel oder Funk." },
{ word: "OSI-Modell - Schicht 2 (Data Link Layer)", definition: "Sicherungsschicht – Sorgt für fehlerfreie Übertragung von Datenpaketen zwischen zwei direkt verbundenen Geräten." },
{ word: "OSI-Modell - Schicht 3 (Network Layer)", definition: "Vermittlungsschicht – Verantwortlich für die Weiterleitung und Adressierung von Datenpaketen zwischen Netzwerken (z. B. IP)." },
{ word: "OSI-Modell - Schicht 4 (Transport Layer)", definition: "Transportschicht – Gewährleistet die zuverlässige Datenübertragung zwischen Sender und Empfänger (z. B. TCP, UDP)." },
{ word: "OSI-Modell - Schicht 5 (Session Layer)", definition: "Sitzungsschicht – Baut Sitzungen zwischen Geräten auf, hält sie aufrecht und beendet sie." },
{ word: "OSI-Modell - Schicht 6 (Presentation Layer)", definition: "Darstellungsschicht – Übersetzt Daten in eine für Anwendungen verständliche Form (z. B. Verschlüsselung, Datenkompression)." },
{ word: "OSI-Modell - Schicht 7 (Application Layer)", definition: "Anwendungsschicht – Stellt Dienste für Anwendungen bereit, wie E-Mail, Dateitransfer oder Webzugriff." },
{ word: "Pinia", definition: "Eine moderne State-Management-Bibliothek für Vue.js. Sie hilft Entwicklern, Daten und Zustände zentral zu verwalten, sodass verschiedene Teile einer Anwendung darauf zugreifen können. Pinia ist einfacher zu verwenden und leistungsfähiger als ihr Vorgänger Vuex und macht die Verwaltung komplexer Datenstrukturen in Vue-Projekten effizienter." },
{ word: "Vue.js", definition: "Ein Framework für JavaScript, das bei der Entwicklung moderner Webseiten und Benutzeroberflächen hilft. Vue ist leicht zu lernen, flexibel und wird oft für Projekte genutzt, die eine interaktive und dynamische Nutzererfahrung bieten." },
{ word: "Vue 3", definition: "Die neueste Version von Vue.js, die bessere Leistung, vereinfachten Code und moderne Funktionen wie die Composition API bietet. Sie macht es Entwicklern leichter, größere und komplexere Anwendungen zu erstellen, ohne die Grundprinzipien von Vue zu verlieren." },
{ word: "Requirements (Anforderungen)", definition: "Die Erwartungen, Bedingungen oder Funktionen, die ein Produkt oder Projekt erfüllen muss. Anforderungen können funktional (z. B. bestimmte Features) oder nicht-funktional (z. B. Performance, Sicherheit) sein." },
{ word: "Scope (Projektumfang)", definition: "Der definierte Rahmen eines Projekts, der festlegt, welche Ziele, Ergebnisse und Aufgaben in das Projekt einbezogen werden. Der Projektumfang dient dazu, die Erwartungen aller Beteiligten klar abzustimmen." },
{ word: "Deliverable (Ergebnis/Arbeitsergebnis)", definition: "Ein greifbares oder messbares Produkt, das im Rahmen eines Projekts geliefert wird. Dies kann ein Dokument, ein Software-Feature oder ein physisches Produkt sein, das einen definierten Teil des Projekterfolgs darstellt." },
{ word: "Change Request (Änderungsantrag)", definition: "Eine formelle Anfrage, die eine Änderung des ursprünglichen Projektumfangs, der Anforderungen oder der Zeitpläne vorschlägt. Änderungsanträge werden häufig durch neue Erkenntnisse oder veränderte Bedingungen notwendig." },
{ word: "Risk (Risiko)", definition: "Ein potenzielles Problem oder Ereignis, das den Erfolg eines Projekts beeinträchtigen könnte. Risiken können positiv (Chancen) oder negativ (Gefahren) sein und sollten durch Risikomanagement überwacht und minimiert werden." },


      ],
    };
  },
  
  computed: {
    sortedAndFilteredTerms() {
      // Zuerst filtern, dann sortieren
      const filtered = !this.searchTerm
        ? this.terms
        : this.terms.filter((term) =>
            term.word.toLowerCase().includes(this.searchTerm.toLowerCase())
          );

      return filtered.sort((a, b) => {
        if (this.sortOrder === "asc") {
          return a.word.localeCompare(b.word);
        } else {
          return b.word.localeCompare(a.word);
        }
      });
    },
  },
  methods: {
    toggleSortOrder() {
      // Umschalten zwischen aufsteigend und absteigend
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
  },
};
</script>

<style scoped>
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
</style>