// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const chance = require('chance').Chance();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"tux-vscode-extension" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('tux-vscode-extension.cpp-random-u32-literal', ()=>{
		processSelection(randomCppU32Literal);
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}

function randomCppU32Literal(): string{
  const randomVar:Number = chance.integer({min: 0, max: 0xffffffff});
  let hex = randomVar.toString(16);
  while (hex.length < 8) {
    hex = '0' + hex;
  }

  return '0x' + hex + 'u';
}

// This function takes a callback function for the text formatting 'formatCB'
function processSelection(formatCB: ()=>string) {
  const e = vscode.window.activeTextEditor;
	if (!e) {
		console.warn('No active editor');
		return;
	}

  const d = e.document;
  const sels = e.selections;

  e.edit(function (edit) {
    // iterate through the selections
    for (let isel = 0; isel < sels.length; isel++) {
      const sel = sels[isel];
      let txt: string = d.getText(new vscode.Range(sel.start, sel.end));
      txt = formatCB();
      edit.replace(sel, txt);
    }
  });
}
