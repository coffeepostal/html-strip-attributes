function transformHtml(html, config) {
  const {
    excludedTags = [],
    ignoredAttributes = {},
    stripOnlyAttributes = []
  } = config;

  const excludedSet = new Set(excludedTags.map(t => t.toLowerCase()));
  const globalIgnores = new Set(ignoredAttributes['*'] || []);
  const tagRegex = /<(\w+)(\s+[^>]+)>/g;

  return html.replace(tagRegex, (match, tag, attrText) => {
    const tagName = tag.toLowerCase();
    if (excludedSet.has(tagName)) return match;

    const tagIgnores = new Set(ignoredAttributes[tagName] || []);
    const combinedIgnores = new Set([...globalIgnores, ...tagIgnores]);
    const stripOnlySet = new Set(stripOnlyAttributes.map(a => a.toLowerCase()));

    const attrRegex = /\b([\w-]+)="[^"]*"/g;
    const keptAttrs = [];
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attrText)) !== null) {
      const attrName = attrMatch[1];
      if (stripOnlySet.size > 0) {
        if (!stripOnlySet.has(attrName.toLowerCase())) {
          keptAttrs.push(attrMatch[0]);
        }
      } else {
        if (combinedIgnores.has(attrName)) {
          keptAttrs.push(attrMatch[0]);
        }
      }
    }

    const newAttrs = keptAttrs.length > 0 ? ' ' + keptAttrs.join(' ') : '';
    return `<${tag}${newAttrs}>`;
  });
}

module.exports = { transformHtml };