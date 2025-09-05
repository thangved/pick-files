# @thangved/pick-files

> A simple and efficient file picker library for web applications.

## Features

- [x] Supports multiple file selection.
- [x] Customizable file types
- [x] Customizable file size limits
- [x] Easy to integrate and use.
- [ ] Validation file types

## Installation

You can install the package via npm:

```bash
npm install @thangved/pick-files
```

Or via yarn:

```bash
yarn add @thangved/pick-files
```

## Usage

Here's a basic example of how to use the `@thangved/pick-files` library in your project:

```javascript
import { pickFiles } from '@thangved/pick-files';

const handleFileSelection = async () => {
  try {
    const { files } = await pickFiles({
      multiple: true,
      accept: '*', // Accept all file types

      //Or specify file types
      // accept: ['image/*', '.pdf', '.docx'],

      maxSize: 5 * 1024 * 1024, // 5MB
    });
    console.log('Selected files:', files);
  } catch (error) {
    console.error('File selection error:', error);
  }
};
```

## API

### `pickFiles(options): Promise<{ files: File[] }>`

- `options` (Object): Configuration options for file selection.

  - `multiple` (Boolean): Allow multiple file selection. Default is `false`.
  - `accept` (String): Comma-separated list of accepted file types. Default is `'*'`.

- Returns: A promise that resolves to an object containing the selected files.

## License

MIT License. See the [LICENSE](./LICENSE) file for details.
