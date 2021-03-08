# React Vite Template

This is a template aiming to be an easy drop-in for `create-react-app`.

### Features
- Hot module replacement
- Support for [svgr](#svgr)
- Eslint with `react-app` config
- Jest pre-configured with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- Support for automatic [aliases](#aliases)
- Build options to support old browsers and generate polyfills
- No need to import `React` in components and test files
- Similiar folder structure to `create-react-app`

### To install:

```bash
npx degit pooryaj/react-vite-template my-project
```

---

### Svgr

[Svgr](https://github.com/gregberge/svgr) is a tool that generates react components from svg files. With svgr support you can import svg files like this:

```javascript
import { ReactComponent as Logo } from './logo.svg;
```

### Aliases

With support for aliases, any folder inside `src` is automatically setup as an alias and it works like this:

folder sctructure:
```
src
    components
```

that generates this automatically:

```
{
  '@components': '${project_path}/src/components'
}
```
and enables you to import like this:

```javascript
import SomeThing from '@components/SomeThing';
```

## Adding Typescript

Vite supports typescript out of the box and you can use it without a change. First read more about typescript in the vite [docs](https://vitejs.dev/guide/features.html#typescript) for some caveats, but for better editor integration, using types, and building for production you should do this:

install types:
```bash
npm install @types/react @types/react-dom @types/jest --save-dev
```
Add this `tsconfig` or one of your own to the project root:
```javascript
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["./src"]
}
```

rename your files to use `tsx` extension and change your `index.html` with the renamed file name:

```diff
- <script type="module" src="/src/index.jsx">
+ <script type="module" src="/src/index.tsx">
```

And lastly update the build script:
```javascript
"scripts": {
  "build": "tsc && vite build",
}
```
