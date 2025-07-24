# Pokédex

Pokédex je jednoduchá webová aplikace pro vyhledávání Pokémonů podle jména nebo ID. Využívá údojů z øešení [PokeAPI](https://pokeapi.co/) a zobrazuje detaily o Pokémonovi, včetně jeho typů, výšky, váhy a evolučního řetězce.

---

## 🌐 Live demo

[https://tomasulman-pokedex.netlify.app/](https://tomasulman-pokedex.netlify.app/)

---

## 📚 Funkce

- Vyhledávání Pokémonů podle jména nebo ID
- Zobrazení detailů Pokémona (obrazek, typy, ID, váha, výška)
- Evoluční strom (včetně proklikání mezi evolucemi)
- Seznam Pokémonů s funkcí "Load more"
- Video pozadí, animovaný loader

---

## ⚙️ Tech stack

- React (Create React App)
- Vlastní CSS (bez frameworků)
- Žádné API klíče

---

## 🚀 Lokální spuštění

```bash
npm install
npm start
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Poznámky

- Evoluce se tahá z API pouze pokud se řetězec změní (kvůli optimalizaci)
- Stylování probíhá přes klasické CSS selektory
- Není potřeba backend nebo databáze

---

> © 2025 Tomáš Ulman
> Osobní projekt pro procvičení práce s API a Reactem
