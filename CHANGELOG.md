# Changelog

All notable changes to **HTML Strip Attributes** will be documented here.

---

## [0.0.3] – 2025-05-20

### Added
- 🔧 `ignoredAttributes`: New setting to preserve specific attributes globally or per tag
- 🧼 `stripOnlyAttributes`: Optional mode to **only strip** listed attributes (e.g., `class`, `style`)
- ⚠️ `stripOnlyAttributes` overrides `ignoredAttributes` if set
- 📜 Documentation: Updated README to explain new features and interactions

---

## [0.0.2] – 2025-05-19

### Added
- 🔁 `excludedTags`: Tag names to fully skip when stripping attributes
- 📝 New README with example usage and configuration
- 🧪 Extension command: `Strip HTML Attributes`

---

## [0.0.1] – 2025-05-18

- 🎉 Initial release: strips all attributes from all tags
