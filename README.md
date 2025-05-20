# HTML Strip Attributes (VS Code Extension)

**HTML Strip Attributes** is a lightweight VS Code extension that removes all attributes from HTML tags — except for the ones you choose to keep.

By default, it preserves attributes for `<img>` and `<a>` tags, but you can configure which tags to exclude in your VS Code `settings.json`.

---

## ✅ Features

- ✂️ Strips attributes like `class`, `style`, `id`, etc.
- 🛡️ Skips tags you specify (e.g. `<img>`, `<a>`, `<video>`)
- 🧠 Simple regex-based processing — fast and lightweight
- 🛠️ Works on entire files with a single command

---

## 🔧 Example

### Before:
```html
<span class="foo" style="color:red;">Hello</span>
<img src="cat.jpg" alt="cat" class="rounded">
<a href="https://example.com" target="_blank" class="link">Link</a>
<section id="main" class="hero">
```

### After:
```html
<span>Hello</span>
<img src="cat.jpg" alt="cat" class="rounded">
<a href="https://example.com" target="_blank" class="link">Link</a>
<section>
```

---

## ⚙️ User Settings

You can define which tags should keep their attributes by setting the following in your `settings.json`:

```json
"htmlAttributeStripper.excludedTags": ["img", "a", "video"]
```

This makes the extension skip those tags when stripping attributes.

---

## 🚀 Usage

1. Open an HTML file in VS Code.
2. Run the command:
   ```
   Strip HTML Attributes
   ```
   from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).

---

## 🧪 Dev Details

This extension dynamically builds a regex like:

```js
/<(?!img\b)(?!a\b)\w+)\s+[^>]+(>)/g
```

...based on your excluded tags.

---

## 🧑‍💻 Author

Created by **Adam Farnsworth**  
Published under the `farnsco` namespace  
[GitHub Repo](https://github.com/coffeepostal/html-strip-attributes)

---

## 📄 License

MIT — see LICENSE file.
