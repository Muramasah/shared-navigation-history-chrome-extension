<h1 align="center">Web Expeditious Retrieval - Chrome Extension</h1>

WER Chrome Extension allows users to search through a shared navigation history.

## Project building philosophy

The project was developed focused on delivery a **_proof of concept_**, because of that, there are no tests and it code is not typed. The philosophy behind this decision is that typing and testing a solution that it was poorly approached, will slowdown the development by adding unknowns and extending the code base that will work with those unknowns.

The next first step to build a scalable solution will be adding tests and implement TypeScript.

## Installation

After clone the repository you must:

1. Install dependencies.

```bash
npm install
```

2. Build the application.

```bash
npm run build
```

3. Load the extension in Chrome.

To load the extension go to chrome://extensions, enable “Developer mode”, click “Load unpacked” and select the “extension” folder.

## Usage

### Indexing websites

The extension will index the textual content of every page provided to the browser with the protocols HTTP and HTTPS.

### Searching over websites

The search functionality is accessible from the Chrome omnibox by typing “wer” as an access shortcut. After submitting a search query, results are shown in a new tab. To perform a new search, this steps must be repeated

## License

[MIT](LICENSE)
