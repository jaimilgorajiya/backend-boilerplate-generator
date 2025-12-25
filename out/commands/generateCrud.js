"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCrud = void 0;
const vscode = require("vscode");
const path = require("path");
const db_1 = require("../templates/db");
const model_1 = require("../templates/model");
const controller_1 = require("../templates/controller");
const route_1 = require("../templates/route");
const server_1 = require("../templates/server");
const generateCrud = async () => {
    // 1. Get Workspace Root
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('Please open a workspace folder to generate the backend.');
        return;
    }
    const rootPath = workspaceFolders[0].uri;
    // 2. Get Entity Name
    let entityNameInput = await vscode.window.showInputBox({
        placeHolder: 'Entity Name (e.g. Product)',
        prompt: 'Enter the name of the entity (PascalCase)',
        validateInput: (text) => {
            if (!text)
                return 'Entity name is required';
            if (!/^[a-zA-Z]+$/.test(text))
                return 'Entity name must contain only letters';
            return null;
        }
    });
    if (!entityNameInput)
        return;
    // Force PascalCase (e.g. product -> Product)
    const entityName = entityNameInput.charAt(0).toUpperCase() + entityNameInput.slice(1).toLowerCase();
    // 3. Get Fields
    const fieldsInput = await vscode.window.showInputBox({
        placeHolder: 'Fields (e.g. name:string price:number)',
        prompt: 'Enter fields in key:type format separated by space or newline'
    });
    if (!fieldsInput)
        return;
    // Parse Fields (Sanitized)
    const fields = fieldsInput.split(/[\s,]+/)
        .filter((f) => f.includes(':'))
        .map((f) => {
        const [key, type] = f.split(':');
        return { key: key.trim(), type: type.trim().toLowerCase() };
    });
    if (fields.length === 0) {
        vscode.window.showErrorMessage('Invalid fields format. Use key:type.');
        return;
    }
    try {
        const backendPath = vscode.Uri.joinPath(rootPath, 'backend');
        const configPath = vscode.Uri.joinPath(backendPath, 'config');
        const modelsPath = vscode.Uri.joinPath(backendPath, 'models');
        const controllersPath = vscode.Uri.joinPath(backendPath, 'controllers');
        const routesPath = vscode.Uri.joinPath(backendPath, 'routes');
        // Create directories safely
        await vscode.workspace.fs.createDirectory(backendPath);
        await vscode.workspace.fs.createDirectory(configPath);
        await vscode.workspace.fs.createDirectory(modelsPath);
        await vscode.workspace.fs.createDirectory(controllersPath);
        await vscode.workspace.fs.createDirectory(routesPath);
        const textEncoder = new TextEncoder();
        // Helper to write file if not exists
        const writeFileSafely = async (uri, content) => {
            try {
                await vscode.workspace.fs.stat(uri);
                vscode.window.showWarningMessage(`Skipped: ${path.basename(uri.fsPath)} already exists.`);
            }
            catch {
                await vscode.workspace.fs.writeFile(uri, textEncoder.encode(content));
            }
        };
        // 4. Generate Files
        // config/db.js
        await writeFileSafely(vscode.Uri.joinPath(configPath, 'db.js'), db_1.dbTemplate);
        // models/<Name>.Models.js
        await writeFileSafely(vscode.Uri.joinPath(modelsPath, `${entityName}.Models.js`), (0, model_1.modelTemplate)(entityName, fields));
        // controllers/<Name>.Controller.js
        const controllerUri = vscode.Uri.joinPath(controllersPath, `${entityName}.Controller.js`);
        await writeFileSafely(controllerUri, (0, controller_1.controllerTemplate)(entityName));
        // routes/<Name>.Routes.js
        await writeFileSafely(vscode.Uri.joinPath(routesPath, `${entityName}.Routes.js`), (0, route_1.routeTemplate)(entityName));
        // server.js - Smart Update
        const serverUri = vscode.Uri.joinPath(backendPath, 'server.js');
        try {
            // Check if server.js exists
            const existingServerBytes = await vscode.workspace.fs.readFile(serverUri);
            const existingServerContent = new TextDecoder().decode(existingServerBytes);
            // If it exists, we append the new route if it's not already there
            if (!existingServerContent.includes(`${entityName}.Routes.js`)) {
                let updatedContent = existingServerContent;
                // 1. Inject Import
                // Find the last import line
                const importRegex = /import .* from .*/g;
                const matches = [...existingServerContent.matchAll(importRegex)];
                if (matches.length > 0) {
                    const lastImport = matches[matches.length - 1];
                    const insertionIndex = lastImport.index + lastImport[0].length;
                    updatedContent = updatedContent.slice(0, insertionIndex) + `\nimport ${entityName.toLowerCase()}Routes from './routes/${entityName}.Routes.js';` + updatedContent.slice(insertionIndex);
                }
                // 2. Inject Route Usage
                // Find where routes are typically used or before app.listen
                const routeUsageRegex = /app\.use\('\/api\/.*', .*\);/g;
                const routeMatches = [...updatedContent.matchAll(routeUsageRegex)];
                if (routeMatches.length > 0) {
                    // Add after the last route
                    const lastRoute = routeMatches[routeMatches.length - 1];
                    const insertionIndex = lastRoute.index + lastRoute[0].length;
                    updatedContent = updatedContent.slice(0, insertionIndex) + `\napp.use('/api/${entityName.toLowerCase()}', ${entityName.toLowerCase()}Routes);` + updatedContent.slice(insertionIndex);
                }
                else {
                    // Fallback: Add before app.listen if no routes exist yet
                    const listenRegex = /app\.listen/;
                    const listenMatch = updatedContent.match(listenRegex);
                    if (listenMatch) {
                        updatedContent = updatedContent.slice(0, listenMatch.index) + `app.use('/api/${entityName.toLowerCase()}', ${entityName.toLowerCase()}Routes);\n\n` + updatedContent.slice(listenMatch.index);
                    }
                }
                await vscode.workspace.fs.writeFile(serverUri, textEncoder.encode(updatedContent));
                vscode.window.showInformationMessage(`Updated server.js with ${entityName} routes.`);
            }
        }
        catch {
            // If server.js doesn't exist, create it from template
            await writeFileSafely(serverUri, (0, server_1.serverTemplate)(entityName));
        }
        // package.json (Important for ESM)
        const packageJsonContent = `{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.3.1"
  }
}`;
        await writeFileSafely(vscode.Uri.joinPath(backendPath, 'package.json'), packageJsonContent);
        vscode.window.showInformationMessage(`Backend CRUD for ${entityName} generated successfully!`);
        // 5. Open Controller for Editing
        const doc = await vscode.workspace.openTextDocument(controllerUri);
        await vscode.window.showTextDocument(doc);
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error generating backend: ${error.message}`);
    }
};
exports.generateCrud = generateCrud;
//# sourceMappingURL=generateCrud.js.map