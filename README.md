**README.md**

# HTML Strip Attributes

**VS Code Extension** – Remove attributes from HTML tags, with smart exclusions.

## Features

* Strip **all** attributes from HTML tags
* Keep attributes on certain tags (e.g., `img[src]`, `a[href]`) via configuration
* Optional: Only strip selected attributes (like `class` and `style`)

## Installation

Install from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).

## Usage

* Open a `.html` file
* Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
* Run the command: `HTML Strip Attributes`

The extension will:

* Remove all attributes from all HTML tags
* Respect exclusions set in your `settings.json`

## Settings

Customize exclusions using VS Code settings:

```json
{
  "htmlStripAttributes.excludeTags": ["img", "a"],
  "htmlStripAttributes.stripOnlyAttributes": ["class", "style"]
}
```

### `excludeTags`

Preserve **all** attributes on the listed tags.

### `stripOnlyAttributes`

If specified, **only** these attributes will be removed from other tags. Other attributes are left alone.

## Example

**Input:**

```html
<div class="foo" style="color:red" data-test="bar">Hello <a href="https://example.com" target="_blank">link</a></div>
```

**Output:** (with default config)

```html
<div>Hello <a href="https://example.com">link</a></div>
```

## Development

To run locally:

```bash
git clone https://github.com/coffeepostal/html-strip-attributes.git
cd html-strip-attributes
npm install
code .
```

Press `F5` to launch the extension in the Extension Development Host.

## Testing

Tests are written in Mocha.

```bash
npm test
```