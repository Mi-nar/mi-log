import { ExtensionContext, Range, commands, window } from "vscode";


/**
 * HELP Setup all variables we need.
 */
let _types:Array<string>=["javascript", "typescript", "python", "php"];
let _logs:Array<string>=["console.log('__text__: ', __text__);", "console.log('__text__: ', __text__);", "print('__text__: ', __text__)", "print('__text__: '. __text__);"];


/**
 * FUN activate
 * DESC This method is called when your extension is activated
 */
export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('mi-log', () => {
            // INFO Create all variables we need.
            let editor = window.activeTextEditor;

            // INFO Check if there is an editor.
            if (editor) {
                // INFO Create all variables we need.
                let text = editor.document.getText(editor.selection);

                // INFO Check if there is an text.
                if (text) {
                    // INFO Insert the log statement.
                    commands.executeCommand('editor.action.insertLineAfter').then(() => {
                        // INFO Create all variables we need.
                        let type = editor!.document.languageId;

                        // INFO Check the language type.
                        if (_types.includes(type)) {
                            // INFO Create all variables we need.
                            let range = new Range(editor!.selection.start, editor!.selection.end);

                            // INFO Update the text.
                            text = _logs[_types.indexOf(type)].replace(/__text__/g, text);

                            // INFO Insert the text.
                            editor!.edit((editBuilder) => {
                                editBuilder.replace(range, text);
                            });
                            return;
                        }
                        // INFO Show error message.
                        window.showErrorMessage('Can\'t insert the log because document type is not supported.');
                    });
                    return;
                }
                // INFO Show error message.
                window.showErrorMessage('Can\'t insert the log because no text is selected.');
                return;
            }
            // INFO Show error message.
            window.showErrorMessage('Can\'t insert the log because no document is open.');
            return;
        })
    );
}