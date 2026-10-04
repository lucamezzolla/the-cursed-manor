# The Cursed Manor

**The Cursed Manor** is a browser-based horror adventure game built with pure HTML, CSS and JavaScript.

Explore thirteen locations, collect the three Seals, survive traps and unexpected events, and reach the Crypt before the awakened Skull takes control of the manor.

The game is fully client-side and does not require a backend or installation.

## Current version

**v1.23**

The interface and game content support:

- Italian
- English
- Spanish
- French
- Portuguese

## Run locally

Open `index.html` in a modern browser.

For a more predictable local development environment, you can also serve the folder with a small HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project structure

```text
the-cursed-manor/
├── index.html
├── style.css
├── game.js
├── content-i18n.js
├── assets/
│   ├── audio/
│   ├── portraits/
│   ├── rooms/
│   └── ui/
├── CHANGELOG.md
├── CONTRIBUTING.md
└── VERSION
```

## Main features

- 13 locations including the final Crypt
- Dice-based movement and random events
- Cardinal Traps
- AI-controlled rival explorers
- The Skull awakening and hunt phase
- Shared inventory and ritual items
- 72 esoteric fragments and related tests
- Multiple difficulty levels
- Five interface languages
- Local browser save/settings support
- Music and atmospheric audio

## Contributing

Contributions are welcome. Please create a branch for each change and open a Pull Request instead of pushing directly to `main`.

See `CONTRIBUTING.md` for the suggested workflow.

## Versioning

Stable releases are identified by Git tags such as:

```text
v1.23
v1.24
v2.0
```

The `VERSION` file contains the current project version.

## License and assets

Before applying an open-source license to the whole repository, verify the redistribution terms of every image and audio asset. Code and media can be licensed separately if necessary.
