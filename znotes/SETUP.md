# create react app with typescript template
```
npx create-react-app your-app-name --template typescript
```

# bootstrap with icons and sass
```
npm i bootstrap bootstrap-icons sass
```

#### I have a custom.scss file for my custom styles
Put this at the top of that file.
```
@import "~bootstrap/scss/bootstrap.scss";
```

### Change up bootstrap variables (see inside bootstrap in mode_modules) above the import if needed

Example - to change bootstrap primary blue
```
$primary: #6f42c1;
@import "~bootstrap/scss/bootstrap.scss";
```

### Import the bootstrap icons

Example - to change bootstrap primary blue
```
$primary: #6f42c1;
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-icons/font/bootstrap-icons.css";
```

### Load the custom.scss into the index.tsx so its available across the app.

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './custom.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```