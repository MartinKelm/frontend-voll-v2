# 📁 SMK Authentication - Datei-Struktur Übersicht

## 🆕 Neue Dateien (komplett neu):

### `src/components/Auth/AuthModal.jsx`
- Modal-Wrapper für Login/Register
- Wechsel zwischen Login und Registrierung
- Responsive Design

### `src/components/Auth/LoginForm.jsx`
- Professionelles Login-Formular
- Email/Passwort-Validierung
- Show/Hide Passwort-Funktion
- Fehlerbehandlung

### `src/components/Auth/RegisterForm.jsx`
- Vollständiges Registrierungsformular
- Alle Felder: Vorname, Nachname, Email, Firma, Passwort
- Starke Passwort-Validierung
- Terms & Conditions Checkbox

### `src/utils/token.js`
- JWT Token-Management
- Token-Dekodierung und Validierung
- Ablaufzeit-Prüfung
- Storage-Management

### `src/components/ProtectedRoute.jsx`
- Route-Schutz für authentifizierte Benutzer
- Rollenbasierte Zugriffskontrolle
- AuthGuard-Komponente
- useCanAccess Hook

## 🔄 Aktualisierte Dateien (ersetzen):

### `src/App.jsx`
- Komplette Neugestaltung mit Authentication
- Dashboard für angemeldete Benutzer
- Landing Page für Gäste
- Header mit Benutzermenü
- Kampagnen-Statistiken
- Admin-Bereich

### `src/contexts/AuthContext.jsx`
- Vollständiges Authentication State Management
- Login/Logout/Register Funktionen
- Benutzer-Session Persistierung
- Rollenbasierte Funktionen

### `src/lib/api.js`
- API-Konfiguration für Backend
- JWT Token-Handling
- Alle Authentication-Endpunkte
- Fehlerbehandlung

## 📦 Ordnerstruktur nach Deployment:

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthModal.jsx          🆕
│   │   ├── LoginForm.jsx          🆕
│   │   └── RegisterForm.jsx       🆕
│   ├── ui/                        (bereits vorhanden)
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── ... (alle anderen UI-Komponenten)
│   └── ProtectedRoute.jsx         🆕
├── contexts/
│   └── AuthContext.jsx            🔄 AKTUALISIERT
├── lib/
│   └── api.js                     🔄 AKTUALISIERT
├── utils/
│   └── token.js                   🆕
└── App.jsx                        🔄 KOMPLETT NEU
```

## 🎯 Funktionen pro Datei:

### **AuthModal.jsx**
- Modal-Dialog für Authentication
- Wechsel zwischen Login/Register
- Automatisches Schließen nach Erfolg

### **LoginForm.jsx**
- Email/Passwort-Eingabe
- Client-seitige Validierung
- API-Integration
- Loading-States

### **RegisterForm.jsx**
- Vollständige Benutzerregistrierung
- Passwort-Bestätigung
- Terms & Conditions
- Umfassende Validierung

### **token.js**
- JWT-Dekodierung
- Ablaufzeit-Management
- Benutzer-Rolle-Extraktion
- Storage-Utilities

### **ProtectedRoute.jsx**
- Route-Authentifizierung
- Rollenbasierte Zugriffskontrolle
- Redirect-Logik
- Permission-Checks

### **App.jsx**
- Hauptanwendung mit Authentication
- Dashboard und Landing Page
- Header mit Benutzermenü
- Responsive Layout

## 🔧 Integration:

Alle Dateien sind bereits vollständig miteinander verbunden:
- ✅ Import/Export-Statements korrekt
- ✅ API-Endpunkte konfiguriert
- ✅ State-Management implementiert
- ✅ UI-Komponenten verknüpft

**Einfach alle Dateien kopieren und deployen!**
