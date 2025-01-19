// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ChecklistViewProvider from './ChecklistViewProvider';
import ChecklistTreeViewProvider from './ChecklistTreeViewProvider';
import * as fs from 'fs';
import * as path from 'path'
import { DirectoryItem } from './interfaces';
import RegisterContexts from './context';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const storagePath = context.storageUri?.fsPath;
	if (storagePath && !fs.existsSync(storagePath)) {
		fs.mkdirSync(storagePath);
	}
	
	const data: DirectoryItem[] = [
		{
			type: "folder",
			name: "src",
			devclItems: [], 
			children: [
				{
					type: "file",
					name: "extension.ts",
					devclItems: [
						{
							title: "Read the book",
							checked: false,
						},
						{
							title: "touch some grass",
							checked: true
						}
					],
					children: []
				}
			]
		}
	]

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const devcl_helloMe = vscode.commands.registerCommand('devcl.helloMe', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Hello world!');
	});
	context.subscriptions.push(devcl_helloMe);

	const devcl_helloWarning = vscode.commands.registerCommand('devcl.helloWarning', () => {
		vscode.window.showErrorMessage("hello world!");
	})
	context.subscriptions.push(devcl_helloWarning);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('devcl.checklist', new ChecklistViewProvider(context.extensionUri))
	);

	const rootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
		? vscode.workspace.workspaceFolders[0].uri.fsPath
		: undefined;
	context.subscriptions.push(
		vscode.window.registerTreeDataProvider('devcl.treeTest', new ChecklistTreeViewProvider(data))
	)

	const devcl_openTaskEditor = vscode.commands.registerCommand('devcl.openTaskEditor', () => {
	})

	RegisterContexts(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
