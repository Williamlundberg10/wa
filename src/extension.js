const vscode = require("vscode");

function activate(context) {
  console.log("BOX DSL extension is now active!");

  // Components (from default plugin)
  const components = [
    "Html", "Head", "Body", "Title", "Link", "Script",
    "H1", "P", "Button", "Img"
  ];

  // Attributes (common ones)
  const attributes = [
    "text", "id", "class", "onclick", "src", "href", "rel", "type", "alt"
  ];

  // Completion provider
  const provider = vscode.languages.registerCompletionItemProvider(
    { language: "boxdsl" },
    {
      provideCompletionItems(document, position) {
        const completions = [];

        // Add component completions
        for (const c of components) {
          const item = new vscode.CompletionItem(c, vscode.CompletionItemKind.Class);
          item.insertText = c + "()";
          item.detail = "BOX DSL Component";
          completions.push(item);
        }

        // Add attribute completions
        for (const a of attributes) {
          const item = new vscode.CompletionItem(a, vscode.CompletionItemKind.Property);
          item.insertText = a + "(\"\")";
          item.detail = "BOX DSL Attribute";
          completions.push(item);
        }

        return completions;
      }
    },
    "(" // trigger completion after "("
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
