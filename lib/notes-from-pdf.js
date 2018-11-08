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
    }
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'notes-from-pdf:paste': () => this.pdfPaste()
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

};
