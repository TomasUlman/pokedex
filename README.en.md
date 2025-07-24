# Pokédex

Pokédex is a simple web application for searching Pokémon by name or ID. It uses data from the public [PokeAPI](https://pokeapi.co/) and displays details such as type, height, weight, and evolution chain.

---

## 🌐 Live demo

[https://tomasulman-pokedex.netlify.app/](https://tomasulman-pokedex.netlify.app/)

---

## 📚 Features

- Search Pokémon by name or ID
- Display detailed info (image, type, height, weight, ID)
- Evolution tree with clickable evolutions
- Pokémon list with "Load more" button
- Animated loader and video background

---

## ⚙️ Tech stack

- React (Create React App)
- Custom CSS (no frameworks)
- No API keys required (uses free public API)

---

## 🚀 Running locally

```bash
npm install
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Notes

- Evolution chain is only re-fetched if it has changed (performance)
- Styling is handled with basic CSS selectors
- No backend or database required

---

> © 2025 Tomáš Ulman
> Personal project built to practice React and working with external APIs
