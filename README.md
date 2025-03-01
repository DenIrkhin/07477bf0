# React + TypeScript + Vite

![Check](https://github.com/[owner]/451speer-fe-aircall/actions/workflows/check.yml/badge.svg)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules with Prettier integration for consistent code formatting.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Code Formatting with Prettier

This project uses Prettier for code formatting. Prettier is configured to work with ESLint to ensure consistent code style.

### Configuration

- `.prettierrc` - Contains Prettier configuration
- `.prettierignore` - Lists files that should be ignored by Prettier
- ESLint is configured to use `eslint-config-prettier` to avoid conflicts with Prettier rules

### Available Scripts

- `bun run format` - Format all files with Prettier
- `bun run format:check` - Check if files are properly formatted
- `bun run lint:fix` - Run ESLint with automatic fixes

### VS Code Integration

For the best development experience, install the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and enable format on save in your settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Continuous Integration with GitHub Actions

This project includes GitHub Actions workflows to automatically check code quality on pull requests:

- **Code Quality Checks**: Runs on all pull requests to main branch
  - Formatting verification with Prettier
  - Linting with ESLint
  - Type checking with TypeScript

The workflow configuration is located in `.github/workflows/check.yml`.

### Dependabot

This project uses Dependabot to keep dependencies up-to-date. Dependabot is configured to:

- Check for npm package updates daily
- Check for GitHub Actions updates daily
- Group related dependencies for more efficient updates
- Label PRs appropriately

The configuration is located in `.github/dependabot.yml`.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
