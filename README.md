# Notes from PDF package

This package for the [Atom text editor](https://atom.io/) adds an alternative paste command that may be accessed via:
- `notes-from-pdf:paste` in the command palette
- keybinding `ctrl-alt-v`
- Packages → Notes from PDF → Paste from PDF (in the menu bar)

This paste mode is designed to facilitate copying text from a PDF document as a quotation. It performs the following steps on incoming text, each enabled via settings:
- Replace line breaks with spaces
- Repair line-break hyphenations
- Trim whitespace from start and end
- Change typographers' quotes/apostrophes to regular ones and replace double-quotes with single-quotes

When used in combination with the [language-markdown package](https://github.com/burodepeper/language-markdown), it will copy a page number from the start of the previous list item when a new line is added, e.g.:
```
- p.1 "My first point is such and such."
- p.2 "This becomes more complex when we consider blah."
- p.2
```

## Background

These features were designed to save time and effort in a markdown-based notetaking and writing system inspired by Scott Selisker's ["A Plain Text Workflow for Academic Writing with Atom"](http://u.arizona.edu/~selisker/post/workflow/) and [The Archive](https://zettelkasten.de/the-archive/). The main idea was to reduce the amount of time spent manually deleting line breaks, etc. when pasting text from a PDF document into a notes file. If there are other features that you think would serve a similar purpose in this kind of workflow, please feel free to suggest them via issues in this repository.
