# HTML Strip Attributes (VS Code Extension)

**HTML Strip Attributes** is a lightweight VS Code extension that removes all attributes from HTML tags — unless you tell it not to.

It supports two layers of control:
- **Excluded tags**: Tags that are completely ignored (e.g., `<img>`, `<a>`)
- **Ignored attributes**: Specific attributes to preserve, either globally or per tag

---

## ✅ Features

- ✂️ Strips attributes like `class`, `style`, `id`, `data-*`, etc.
- 🛡️ Skips entire tags from stripping (`excludedTags`)
- 🧠 Preserves specific attributes globally or by tag (`ignoredAttributes`)
- 🧩 Works on any HTML/XML-like file
- 🛠️ Processes full documents in one click

---

## 🔧 Example

### Input:

```html
<a href="https://example.com" class="btn" role="link" title="click me">Link</a>
<img src="cat.jpg" alt="A cat" class="img">
<video src="movie.mp4" class="media"></video>
```

### With settings:
```json
"htmlAttributeStripper.excludedTags": ["img"],
"htmlAttributeStripper.ignoredAttributes": {
  "*": ["src"],
  "a": ["href", "title"],
  "video": ["src"]
}
```

### Output:
```html
<a href="https://example.com" title="click me">Link</a>
<img src="cat.jpg" alt="A cat" class="img">
<video src="movie.mp4"></video>
```

---

## ⚙️ Settings

In your `settings.json`, configure:

```json
"htmlAttributeStripper.excludedTags": ["img"],
"htmlAttributeStripper.ignoredAttributes": {
  "*": ["src"],
  "a": ["href", "title"],
  "img": ["alt", "src"]
}
```

- `excludedTags`: skips tags completely from being modified
- `ignoredAttributes`: lists attributes to **preserve**
  - Use `"*"` for global attributes
  - Use tag names (like `"a"` or `"video"`) for tag-specific rules

---

## 🚀 Usage

1. Open any HTML or XML file in VS Code
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run:
   ```
   Strip HTML Attributes
   ```

---

## 🧑‍💻 Author

Created by **Adam Farnsworth**  
Published under the `farnsco` namespace  
[GitHub Repo](https://github.com/coffeepostal/html-strip-attributes)

---

## 📄 License

MIT — see LICENSE file.
