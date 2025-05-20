const assert = require('assert');
const { transformHtml } = require('../extension-testable'); // extract logic here

describe('HTML Strip Attributes', () => {
  it('should remove all attributes by default', () => {
    const input = '<div class="foo" id="main">Hi</div>';
    const result = transformHtml(input, { excludedTags: [], ignoredAttributes: {}, stripOnlyAttributes: [] });
    assert.strictEqual(result, '<div>Hi</div>');
  });

  it('should ignore specified attributes on specified tags', () => {
    const input = '<a href="url" class="link">Click</a>';
    const result = transformHtml(input, {
      excludedTags: [],
      ignoredAttributes: { a: ['href'] },
      stripOnlyAttributes: []
    });
    assert.strictEqual(result, '<a href="url">Click</a>');
  });

  it('should strip only class and style when stripOnlyAttributes is set', () => {
    const input = '<div class="foo" id="main" style="color:red">Test</div>';
    const result = transformHtml(input, {
      excludedTags: [],
      ignoredAttributes: {},
      stripOnlyAttributes: ['class', 'style']
    });
    assert.strictEqual(result, '<div id="main">Test</div>');
  });
});