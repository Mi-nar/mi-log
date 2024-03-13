import { ExtensionContext, Range, commands, window } from "vscode";


/**
 * HELP Setup all variables we need.
 */
let _logs = {
    javascript: "console.log('__text__: ', __text__);",
    typescript: "console.log('__text__: ', __text__);",
    python: "print('__text__: ', __text__)",
    php: "print('__text__: '. __text__);",
    java: "System.out.println('__text__:' + __text__);",
    c: "std::cout << '__text__: ' << __text__ << std::endl;",
    cpp: "std::cout << '__text__: ' << __text__ << std::endl;",
    ruby: "puts '__text__: #{__text__}'",
    swift: "print('__text__: \(__text__)')",
    kotlin: "println('__text__: $__text__')",
    go: "fmt.Println('__text__:', __text__)",
    rust: "println!('__text__: {}', __text__);",
    csharp: "Console.WriteLine('__text__: ' + __text__);",
    lua: "print('__text__: ' .. __text__)",
    bash: "echo '__text__: $__text__'",
    shellscript: "echo '__text__: $__text__'",
    matlab: "disp(['__text__: ', num2str(__text__)])",
    r: "cat('__text__:', __text__, '\n')"
};


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
                let text: string = editor.document.getText(editor.selection);

                // INFO Check if there is an text.
                if (text) {
                    // INFO Insert the log statement.
                    commands.executeCommand('editor.action.insertLineAfter').then(() => {
                        // INFO Create all variables we need.
                        let type: string = editor!.document.languageId;

                        // INFO Check the language type.
                        if (_logs[type as keyof typeof _logs]) {
                            // INFO Create all variables we need.
                            let range = new Range(editor!.selection.start, editor!.selection.end);

                            // INFO Update the text.
                            text = _logs[type as keyof typeof _logs].replace(/__text__/g, text);

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