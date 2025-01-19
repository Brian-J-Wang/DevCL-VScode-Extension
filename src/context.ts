import * as vscode from "vscode";



export default function RegisterContexts(context: vscode.ExtensionContext) {
    

    const devcl_addTask = vscode.commands.registerTextEditorCommand('devcl.addTask', (editor, edit) => {
        const textDecoration = vscode.window.createTextEditorDecorationType({
            backgroundColor: "#04342B",
            
        })

        console.log(editor.selections);
        editor.setDecorations(textDecoration, [ new vscode.Range(editor.selection.start, editor.selection.end) ]);
        
        vscode.window.onDidChangeTextEditorSelection((evt) => {
            textDecoration.dispose();
        });
    })
    context.subscriptions.push(devcl_addTask);
}