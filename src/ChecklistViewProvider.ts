import * as vscode from 'vscode';

class ChecklistViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly extensionUri: vscode.Uri) {}

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
      console.log("resolving");
      
      this._view = webviewView;

      webviewView.webview.options = {
          enableScripts: true, // Allow running scripts in the Webview
          localResourceRoots: [this.extensionUri], // Allow accessing local resources
      };
  
      // Set the initial HTML content
      webviewView.webview.html = this.getHtmlContent(webviewView.webview);
    }

    private getHtmlContent(webview: vscode.Webview): string {
    
        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Custom View</title>
          </head>
          <body>
            <h1>Welcome to My Custom View</h1>
            <p>This is an HTML-based view in VS Code! Tester Tester</p>
            <button id="actionButton">Click Me</button>
    
            <script>
              const button = document.getElementById('actionButton');
              button.addEventListener('click', () => {
                alert('Button clicked!');
              });
            </script>
          </body>
          </html>
        `;
    }
}

export default ChecklistViewProvider;
