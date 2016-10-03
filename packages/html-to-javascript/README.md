# html-to-javascript

This converts text string to a javascript variable or javascript ready code.
This package is intended to be used for the conversion of HTML code in to a javascript variable for later use.

The package is meant to help transition between JS and HTML code efficiently whilst keeping a degree of structure with existing code. If you prefer the lines to be indented the way that is done via "auto-indent" then use the command afterwards. I may add an option for that in the future.

The tools for this particular process online I've found to be quite limiting in that the code never comes out indented, or is indented within the javascript string, which means after minification, the spaces will still be there. (**quite _wasteful_**)




## Example of the conversion to a javascript string
![Example of the conversion to a javascript string](https://puu.sh/qhoQV/3b18444414.gif)

This package's goal is also intended to be used to convert javascript HTML strings (generated from HTML-to-JS function) to plain HTML and vice versa the section is *selected*.

If the change to go from javascript string to html functional, any javascript variables inside this will probably be ignored because they aren't actually computed during conversion.


> This is my first atom package. <em>Please bear with me :D</em>

## Current Hotkeys:
<b>ctrl+shift+j</b> (default) : Converts HTML to Javascript string.
You should be able to change this in the keymap file of atom, using the command 'atom-html-to-javascript:convert'

## TODO:
- Convert Javascript string of HTML back in to HTML form for easy manipulation.
- Optionally get ignore empty lines (by default)
- Detect what state it is in and toggle between the two. (rather than just having a key to convert forward, and one backwards)
- Remove unneeded package generator generated code.
- There will be a hotkey for HTML-to-Javascript and one for Javascript-to-HTML.
