'use babel';
var vm;
vm = require('vm');

import HtmlToJavascriptView from './html-to-javascript-view';
import { CompositeDisposable } from 'atom';

export default {

	htmlEditor: null,
	paneOnWillDestroy: null,
	htmlToJavascriptView: null,
	modalPanel: null,
	subscriptions: null,

	activate(state) {
		this.htmlToJavascriptView = new HtmlToJavascriptView(state.htmlToJavascriptViewState);
		this.modalPanel = atom.workspace.addModalPanel({
			item: this.htmlToJavascriptView.getElement(),
			visible: false
		});

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'html-to-javascript:convert': () => this.convert(),
			'html-to-javascript:js-to-html': () => this.go_edit(),

		}));



	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.htmlToJavascriptView.destroy();
		// this.paneOnWillDestroy.dispose();

	},

	serialize() {
		return {
			htmlToJavascriptViewState: this.htmlToJavascriptView.serialize()
		};
	},

	go_edit(){

		console.log('opening');
		if (this.htmlView) {
			// Already open, close and reopen
			// console.log('already open');
			// this.htmlView.close();
		}

		var editor = atom.workspace.getActiveTextEditor();
		var selection = editor.getSelectedText();
		//this.htmlView = atom.workspace.open('html-to-javascript://'+encodeURI('temp-preview-window')+'.html', {split:'right',searchAllPanes: true});
		var p1 = atom.workspace.open('html-to-javascript://'+encodeURI('temp-preview-window')+'.html', {split:'right',searchAllPanes: true});
		p1.then(function(val) {

			// Editor = returned from promise
			// console.log(val);
			// this.htmlEditor = val;

			// Our selected javascript-string will now be moved to another window for editor as html.

			// If eval of string results in a string then it is assumed to be valid HTML, pass this to the view, remove the start and end characters, beautify (if package available) and let the user edit it.

			// Replace '"' with '\"'
			selection = selection.replace(/"/g , "\\\"").replace(/\t/g, "").replace(/\r\n/g,"");
			// console.log(selection);
			try {
				var input = vm.runInThisContext('"' + selection + '"');

			} catch(err) {
				// console.log(err.message);
			}
			// console.log(input);
			input = input.replace(/\'\+\'/g, "");
			val.insertText(input.substring(1,input.length-1));
			// If atom beautify is installed...
			atom.commands.dispatch(atom.views.getView(editor), 'atom-beautify:beautify-editor');

		}).catch(function(reason) {
			// console.log('Handle rejected promise ('+reason+') here.');
		});

	},

	convert(text) {
		// this.go_edit();
		var editor = atom.workspace.getActiveTextEditor();
		if (editor){
			var selection = (text)?text:editor.getSelectedText();
			if (!!!selection.trim()) return;

			// Replace all ' in file with \'
			selection = selection.replace(/'/g , "\\'");

			// Edit selection:
			var lines = selection.split("\n");

			var js_string = "''+\n";
			// Wrap beginning and end of lines with '
			// (for the beginning of a line, put it at the beginning of the first non space)
			// (for the end of a line, trim the end putting '+ at the end of the line)
			try {
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];

					num_leading_whitespace = line.search(/\S|$/);
					var leading_indent = '';
					if (num_leading_whitespace){
						console.log(num_leading_whitespace);
						for (var j = 0; j < num_leading_whitespace; j++) {
							leading_indent += "\t";
						}
						// for (var i = 0; i < num_leading_whitespace; i++) {
						// 	leading_indent += "\t";
						// }
					}

					js_string += leading_indent + "'" + line.trim() + "'+\n";
				}
			}
			catch(err) {
				console.log(err.message);
			}

			if (text) {
				return js_string.substring(0,js_string.length-2);
			} else {
				editor.insertText(js_string.substring(0,js_string.length-2), {
					select: true
				}); //# Ignores the last 2 symbols "+\n"
			}
		}

	}

};
