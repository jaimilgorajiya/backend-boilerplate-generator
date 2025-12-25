import * as vscode from 'vscode';
import { generateCrud } from './commands/generateCrud';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "backend-crud-helper" is now active!');

	let disposable = vscode.commands.registerCommand('backend-crud-helper.generateCrud', async () => {
		await generateCrud();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
