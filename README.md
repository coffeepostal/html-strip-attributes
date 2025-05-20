# HTML Attribute Stripper

This simple VS Code extension removes all attributes from HTML opening tags — **except** for `<img>` and `<a>` tags, whose attributes are preserved by default.

---

## ✅ What It Does

- Keeps tag names and structure intact
- Removes attributes like `class`, `style`, `id`, `data-*`, etc.
- Skips over selected tags (`<img>` and `<a>` by default), leaving their attributes untouched

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

## 💡 Usage

1. Open any HTML or mixed-language file (like JSX, Vue, etc.)
2. Run the command from the Command Palette:
   ```
   Strip HTML Attributes
   ```
   (`Cmd+Shift+P` or `Ctrl+Shift+P`)

---

## ⚙️ Coming Soon

- Customizable list of tag names to preserve (via settings)
- Option to strip only specific attributes (e.g., `style` or `class`)
- Support for self-closing and void tags

---

## 🛠️ Developer Note

This extension uses a simple regex replacement under the hood:

```js
const cleanedText = fullText.replace(/(<(?!img\b)(?!a\b)\w+)\s+[^>]+(>)/g, '$1$2');
```

---

## 📣 Feedback / Contributions

If you have feature requests or want to contribute, open an issue or PR.  
Built by someone who hates bloated HTML as much as you do.
