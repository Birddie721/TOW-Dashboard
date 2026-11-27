# TOW Dashboard

A single-page web application for **Warhammer: The Old World (TOW)** players to import **Old World Builder (OWB)** JSON army lists and view a clean, consolidated tactical reference sheet.

---

## Features

* **OWB JSON List Importer:** Upload any Old World Builder `.owb.json` export to dynamically render your army roster grouped by **Characters**, **Core**, **Special**, and **Rare**.
* **Live Rules Index Integration:** Fetches up-to-date unit profiles, troop types, and rule URLs directly from the [Old World Builder Rules Index](https://github.com/nthiebes/old-world-builder).
* **Slide-Over Rules Reference Drawer:** Click on any unit name, special rule badge, magic item, or weapon name to open its corresponding entry from [`tow.whfb.app`](https://tow.whfb.app) in an embedded side drawer without leaving your army list.
* **Automatic Calculations:**
  * **Points Validation:** Totals unit costs (including model counts, command groups, equipment, mounts, and magic items) and highlights the Tactical Summary card if the list exceeds its points limit.
  * **Unit Strength (US):** Automatically calculates Unit Strength based on troop type multipliers and starting Wounds for Behemoths/Monsters.
  * **Armour Save & Parry Detection:** Computes effective Armour Saves (accounting for armour, barding, shields, *Armoured Hide*, and Great Weapon vs. Hand Weapon & Shield loadouts) and displays a clickable **Parry** badge when applicable.
* **Complete Weapon & Mount Breakdowns:**
  * Displays weapon statlines (`R`, `S`, `AP`, and special rules) for standard weapons, multi-profile weapons (e.g., *Brace of Pistols*, *Polearm*, *Mace of Helsturm*), and magic weapons.
  * Renders separate stat blocks, special rules, and natural weapon tables for ridden monsters, chariots, and mounts.

---

## Project Structure

```text
tow-dashboard/
├── index.html      # Main UI layout, Tailwind CSS styling, and slide-over rules drawer
├── style.css       # Custom layout, stat grid, drawer transitions, and card styles
├── script.js       # JSON parsing, points/armour/US calculations, UI rendering, and rules lookup
├── weapons.js      # Weapon statline definitions (standard, faction-specific, and magic weapons)
├── monsters.js     # Monster-to-natural-weapon mappings and monster attack profiles
├── mounts.js       # Special rule patches for mounts and chariots
└── README.md       # Project documentation
```

---

## Getting Started

Because the app runs entirely in the browser using vanilla JavaScript and CDN-hosted Tailwind CSS / Font Awesome, no build step or package installation is required.

1. **Navigate to** [TOW-Dashboard](https://birddie721.github.io/TOW-Dashboard) in any modern web browser.
2. Click **IMPORT OWB JSON** in the top navigation bar and select an exported `.json` army list from Old World Builder.
3. Click any **unit name**, **rule pill**, **magic item**, or **weapon** on a unit card to inspect its rules in the slide-over reference panel.

---

## Data Sources & Acknowledgments

* **Rules & Unit Data:** Powered by the open-source [Old World Builder](https://github.com/nthiebes/old-world-builder) rules index export.
* **Rules Reference Pages:** Embedded via [Warhammer: The Old World Online Rules Index (`tow.whfb.app`)](https://tow.whfb.app).

---

## Disclaimer

This is an unofficial, fan-made utility intended for personal tabletop reference. *Warhammer: The Old World* and all associated names, rules, and factions are trademarks of Games Workshop Ltd.
