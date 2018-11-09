'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  config: {
    removeNewlines: {
      title: 'Remove line breaks',
      description: 'Replace line breaks with spaces in clipboard text during paste-from-PDF',
      type: 'boolean',
      default: true
    },

    removeHyphenations: {
      title: 'Repair line-break hyphenations',
      description: 'Remove the sequence "- " from clipboard text during paste-from-PDF',
      type: 'boolean',
      default: true
    },

    trimWhitespace: {
      title: 'Trim whitespace',
      description: 'Remove whitespace at start and end of clipboard text during paste-from-PDF',
      type: 'boolean',
      default: true
    },

    adjustQuoteChars: {
      title: 'Adjust quote characters',
      description: 'Replace typographers\' quotes/apostrophes and change double quotes to single in clipboard text during paste-from-PDF',
      type: 'boolean',
      default: true
    },

    addPageNumbers: {
      title: 'Add page numbers',
      description: 'Automatically copy the page number at the start of list item text from the previous line, if one is present',
      type: 'boolean',
      default: true
    }
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'notes-from-pdf:paste': () => this.pdfPaste()
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      editor.onDidInsertText(event => {
        if (!atom.config.get('notes-from-pdf.addPageNumbers')) return;
        const grammar = editor.getGrammar();

        if (grammar.name !== 'Markdown') return;
        if (!atom.config.get('language-markdown.addListItems')) return;
        if (event.text !== '\n') return;

        const previousRowNumber = event.range.start.row;
        const previousRowRange = editor.buffer.rangeForRow(previousRowNumber);
        const previousLine = editor.getTextInRange(previousRowRange);
        let { tokens } = grammar.tokenizeLine(previousLine);
        if (tokens.length > 1) {
          let pageNumberMatch = tokens[1].value.match(/^p*[\.\- ]*\d+\S* /);
          if (pageNumberMatch && pageNumberMatch.length > 0)
            editor.insertText(pageNumberMatch[0]);
        }
      })
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  pdfPaste() {
    console.log('pdfPaste');
    var text = atom.clipboard.read();

    // replace newlines with spaces
    if (atom.config.get('notes-from-pdf.removeNewlines'))
      text = text.replace(/[\n\r]/g, ' ');

    // remove line-break hyphenations
    if (atom.config.get('notes-from-pdf.removeHyphenations'))
      text = text.replace(/- /g, '');

    // trim whitespace from start and end
    if (atom.config.get('notes-from-pdf.trimWhitespace'))
    {
      var inner = text.match(/\S(.*\S)?/);
      if (inner.length > 0) text = inner[0];
    }

    // change quotes and apostrophes
    if (atom.config.get('notes-from-pdf.adjustQuoteChars'))
      text = text.replace(/"|’+|‘+/g, '\'');

    atom.workspace.getActiveTextEditor().insertText(text);
  }

  // incrementNumber() {
  //    const editor = atom.workspace.getActiveTextEditor();
  //    const
  // }

};
