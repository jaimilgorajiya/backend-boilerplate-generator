"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const generateCrud_1 = require("./commands/generateCrud");
function activate(context) {
    console.log('Congratulations, your extension "backend-crud-helper" is now active!');
    let disposable = vscode.commands.registerCommand('backend-crud-helper.generateCrud', async () => {
        await (0, generateCrud_1.generateCrud)();
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map