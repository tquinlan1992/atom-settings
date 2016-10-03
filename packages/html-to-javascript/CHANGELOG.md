## 0.2.0 - Added JS-to-HTML, changed source language.
* Added feature to convert the JS back to HTML for editing purposes. Relies on the atom-beautify package to make things pretty after outputting to another panel. (hotkey is ```alt-shift-j```)
* Converted package to use javascript instead of coffeescript.
* Due to changes above, the hotkey is now namespaced with html-to-javascript instead of atom-html-to-javascript.

Todo: Fix indenting on first line (second line of output). Properly manage errors and clean up code. Make the second window closable without save prompt (if possible).

## 0.1.0 - Initial Release
* Added feature to convert HTML to JS with indenting.
