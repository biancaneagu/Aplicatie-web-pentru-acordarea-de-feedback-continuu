# Feedback Continuu – Aplicatie Web

## Descriere generala
Aplicatia **Feedback Continuu** este o aplicatie web care permite colectarea de feedback anonim in timp real in cadrul unei activitati.  
Profesorul creeaza o activitate si primeste un cod unic, iar studentii folosesc acest cod pentru a trimite feedback.

Scopul aplicatiei este de a oferi profesorului o imagine rapida asupra modului in care este perceputa activitatea, fara a dezvalui identitatea studentilor.

## Roluri in aplicatie

### Profesor
- creeaza activitati
- primeste un cod unic pentru fiecare activitate
- vizualizeaza feedback-ul primit
- vede sumarul feedback-ului
- urmareste feedback-ul in ordine cronologica

### Student
- introduce codul primit de la profesor
- intra intr-o activitate valida
- trimite feedback anonim
- poate trimite feedback de mai multe ori

## Functionalitati principale
- creare activitate
- generare cod unic
- acces la activitate pe baza de cod
- trimitere feedback anonim
- afisare sumar feedback
- afisare feedback cronologic
- interfata responsive
- validari si mesaje de eroare

## Tehnologii utilizate

### Frontend
- React
- React Router
- CSS
- Fetch API

### Backend
- Node.js
- Express
- API REST

## Structura aplicatiei (frontend)
- Home – pagina principala
- Student – introducere cod activitate
- StudentFeedback – trimitere feedback
- Profesor – dashboard profesor
- fisiere CSS separate pentru fiecare componenta

## Fluxul aplicatiei
1. Profesorul creeaza o activitate
2. Aplicatia genereaza un cod unic
3. Profesorul transmite codul studentilor
4. Studentii introduc codul in aplicatie
5. Studentii trimit feedback
6. Profesorul vizualizeaza feedback-ul in timp real

## Responsive Design
Aplicatia este adaptata pentru ecrane de diferite dimensiuni.  
Pe dispozitive mobile, layout-ul se ajusteaza astfel incat interfata sa ramana usor de folosit.

## Rulare proiect

### Frontend

npm install
npm run dev

### Backend

npm install
npm start



##Specificatii:

Aplicatia este pe live https://aplicatie-web-pentru-acordarea-de-f.vercel.app/ 
dar avem niste erori la comunicarea dintre frontend si backend.
Forma perfect functionala a aplicatiei este cea de la commitul de pe 10 ianuarie
