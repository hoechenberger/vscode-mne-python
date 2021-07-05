import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let version = vscode.commands.registerCommand('mne-python-extension.version', () => {
		// vscode.window.showInformationMessage('Hello World from MNE-Python!');

		let terminal = vscode.window.activeTerminal;
		if (terminal === undefined) {
			terminal = vscode.window.createTerminal('MNE-Python');
		} 

    	terminal.sendText("python -c 'import mne; print(mne.__version__)'");
	});
	context.subscriptions.push(version);

	let viewRaw = vscode.commands.registerCommand('mne-python-extension.viewRaw', (item: any) => {
		if (item.path === undefined) {
			return;
		}

		let terminal = vscode.window.activeTerminal;
		if (terminal === undefined) {
			terminal = vscode.window.createTerminal('MNE-Python');
		} 

    	terminal.sendText(
			`python -ic 'import matplotlib; matplotlib.use("Qt5Agg");` +
			`import mne; mne.io.read_raw("${item.path}").plot();'`);
	});
	context.subscriptions.push(viewRaw);

	let sysInfo = vscode.commands.registerCommand('mne-python-extension.sysInfo', () => {
		let terminal = vscode.window.activeTerminal;
		if (terminal === undefined) {
			terminal = vscode.window.createTerminal('MNE-Python');
		} 

    	terminal.sendText("mne sys_info");
	});
	context.subscriptions.push(sysInfo);
};

// this method is called when your extension is deactivated
export const deactivate = () => {};

