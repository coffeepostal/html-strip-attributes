# HTML Strip Attributes (VS Code Extension)

**HTML Strip Attributes** is a lightweight and configurable VS Code extension that removes attributes from HTML tags — giving you precise control over what gets nuked and what stays.

You can:
- Completely skip stripping on specific tag names
- Preserve certain attributes (globally or per tag)
- Or go full chaos-mode and strip only a specific set of attributes

---

## ✅ Features

- ✂️ Strip all attributes by default
- 🧩 Use `excludedTags` to completely skip certain tags (e.g., `<img>`)
- 🧠 Use `ignoredAttributes` to preserve certain attributes, globally or per tag
- 🎯 Use `stripOnlyAttributes` to remove *only* a defined set of attributes (e.g., just `class` and `style`)
- 🛠️ Process entire files with one command

---

## 🔧 Example

### Input HTML:
```html
<a href="https://example.com" class="btn" role="link" title="click me">Link</a>
<img src="cat.jpg" alt="A cat" class="img">
<video src="movie.mp4" class="media"></video>
```

---

### Using `ignoredAttributes`:
```json
"htmlAttributeStripper.excludedTags": ["img"],
"htmlAttributeStripper.ignoredAttributes": {
  "*": ["src"],
  "a": ["href", "title"],
  "img": ["alt", "src"]
}
```

**Output:**
```html
<a href="https://example.com" title="click me">Link</a>
<img src="cat.jpg" alt="A cat" class="img">
<video src="movie.mp4"></video>
```

---

### Using `stripOnlyAttributes`:
```json
"htmlAttributeStripper.stripOnlyAttributes": ["class", "style"]
```

**Output:**
```html
<a href="https://example.com" role="link" title="click me">Link</a>
<img src="cat.jpg" alt="A cat">
<video src="movie.mp4"></video>
```

---

### ⚠️ About Conflicts Between Settings

If `stripOnlyAttributes` is used, it takes precedence and **overrides** `ignoredAttributes`.

This means:
- The extension will only remove attributes listed in `stripOnlyAttributes`
- All other attributes will be preserved
- `ignoredAttributes` is ignored in this mode — as expected

---

## ⚙️ Configuration

Add this to your `settings.json`:

```json
"htmlAttributeStripper.excludedTags": ["img"],
"htmlAttributeStripper.ignoredAttributes": {
  "*": ["src"],
  "a": ["href", "title"],
  "img": ["alt", "src"]
},
"htmlAttributeStripper.stripOnlyAttributes": []
```

---

## 🚀 Usage

1. Open any HTML/XML file
2. Run the command:
   ```
   Strip HTML Attributes
   ```
   from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)

---

## 🧑‍💻 Author

Created by **Adam Farnsworth**  
Published under the `farnsco` namespace  
[GitHub Repo](https://github.com/coffeepostal/html-strip-attributes)

---

## 📄 License

MIT — see LICENSE file.
