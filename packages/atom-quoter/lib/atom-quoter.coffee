{CompositeDisposable} = require 'atom'

module.exports = AtomQuoter =
  subscriptions: null

  activate: ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace',
      'atom-quoter:quote': => @quote()

  deactivate: ->
    @subscriptions.dispose()

  quote: ->
    if editor = atom.workspace.getActiveTextEditor()
      selection = editor.getLastSelection()
      newText = "\"#{editor.getSelectedText()}\""
      selection.insertText(newText)
