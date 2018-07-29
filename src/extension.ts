'use strict';
import * as vscode from 'vscode';
import { CommandHelpers } from './helpers/commandHelpers';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.editorEnhancement', async () => {
        vscode.window.showQuickPick(new CommandHelpers().getAllCommands()).then((reason: any) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selection = editor.selection;
                const resultStr: string = new CommandHelpers().getCommandResult(editor.document.getText(selection), reason.commandName);
                editor.edit(p => p.replace(selection, resultStr));
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}