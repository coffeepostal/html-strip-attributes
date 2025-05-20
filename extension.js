// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "html-strip-attributes" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.stripHtmlAttributes', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found.');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// Get excluded tags from settings
		const config = vscode.workspace.getConfiguration('htmlAttributeStripper');
		const excludedTags = config.get('excludedTags') || [];

		// Build dynamic regex from excluded tag list
		const tagPattern = excludedTags.map(tag => `(?!${tag}\\b)`).join('');
		const regex = new RegExp(`(<${tagPattern}\\w+)\\s+[^>]+(>)`, 'g');

		const cleanedText = fullText.replace(regex, '$1$2');

		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(fullText.length)
		);

		editor.edit(editBuilder => {
			editBuilder.replace(fullRange, cleanedText);
		});

		vscode.window.showInformationMessage('Stripped HTML attributes (except excluded tags).');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
