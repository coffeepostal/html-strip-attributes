const vscode = require('vscode');
const { validateSettings } = require('./utils/settingsValidator');

function activate(context) {
	console.log('HTML Strip Attributes extension is active!');

	const config = vscode.workspace.getConfiguration('htmlAttributeStripper');
	try {
		validateSettings(config);
	} catch (err) {
		vscode.window.showErrorMessage(`HTML Attribute Stripper: ${err.message}`);
		return;
	}

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
		const stripOnlyAttributes = new Set((config.get('stripOnlyAttributes') || []).map(a => a.toLowerCase()));

		const tagRegex = /<(\w+)(\s+[^>]+)>/g;

		const cleanedText = fullText.replace(tagRegex, (match, tag, attrText) => {
			const tagName = tag.toLowerCase();
			if (excludedTags.has(tagName)) return match;

			const globalIgnores = new Set(ignoredAttributesConfig['*'] || []);
			const tagIgnores = new Set(ignoredAttributesConfig[tagName] || []);
			const combinedIgnores = new Set([...globalIgnores, ...tagIgnores]);

			const attrRegex = /\b([\w-]+)="[^"]*"/g;
			const keptAttrs = [];
			let attrMatch;

			while ((attrMatch = attrRegex.exec(attrText)) !== null) {
				const attrName = attrMatch[1];

				// Logic priority: stripOnly mode overrides everything
				if (stripOnlyAttributes.size > 0) {
					if (!stripOnlyAttributes.has(attrName.toLowerCase())) {
						keptAttrs.push(attrMatch[0]); // keep it
					}
				} else {
					if (combinedIgnores.has(attrName)) {
						keptAttrs.push(attrMatch[0]); // keep it
					}
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

		vscode.window.showInformationMessage('Stripped HTML attributes using custom logic.');
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};