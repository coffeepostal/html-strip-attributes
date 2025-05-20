const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('HTML Strip Attributes extension is active!');

	const disposable = vscode.commands.registerCommand('extension.stripHtmlAttributes', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found.');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		const config = vscode.workspace.getConfiguration('htmlAttributeStripper');
		const excludedTags = new Set((config.get('excludedTags') || []).map(t => t.toLowerCase()));
		const ignoredAttributesConfig = config.get('ignoredAttributes') || {};

		// Regex to find all tags with attributes (tag name and attr block)
		const tagRegex = /<(\w+)(\s+[^>]+)>/g;

		const cleanedText = fullText.replace(tagRegex, (match, tag, attrText) => {
			const tagName = tag.toLowerCase();

			// Skip stripping for excluded tags
			if (excludedTags.has(tagName)) return match;

			// Determine ignored attributes for this tag
			const globalIgnores = new Set(ignoredAttributesConfig['*'] || []);
			const tagIgnores = new Set(ignoredAttributesConfig[tagName] || []);
			const combinedIgnores = new Set([...globalIgnores, ...tagIgnores]);

			// Match all attributes in the tag
			const attrRegex = /\b([\w-]+)="[^"]*"/g;
			const keptAttrs = [];
			let attrMatch;
			while ((attrMatch = attrRegex.exec(attrText)) !== null) {
				const attrName = attrMatch[1];
				if (combinedIgnores.has(attrName)) {
					keptAttrs.push(attrMatch[0]);
				}
			}

			const newAttrs = keptAttrs.length > 0 ? ' ' + keptAttrs.join(' ') : '';
			return `<${tag}${newAttrs}>`;
		});

		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(fullText.length)
		);

		editor.edit(editBuilder => {
			editBuilder.replace(fullRange, cleanedText);
		});

		vscode.window.showInformationMessage('Stripped HTML attributes (with tag/attribute exceptions applied).');
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};