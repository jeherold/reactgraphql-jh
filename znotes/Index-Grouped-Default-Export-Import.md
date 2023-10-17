# Default Export Imports with index to Group

The problem you're encountering arises from a distinction between default exports and named exports in ES6 modules.

When you do `export * from './RepoInfo';`, you're re-exporting all named exports from `RepoInfo`, but not the default export. This is the intended behavior as per the ES6 module specification.

If `RepoInfo` and `SearchBox` have default exports, and you want to re-export them in `index.tsx`, you need to give them names. Here's how you can do it:

```typescript
export { default as RepoInfo } from './RepoInfo';
export { default as SearchBox } from './SearchBox';
```

Now, when you import them, you can use:

```typescript
import { RepoInfo, SearchBox } from './components';
```

The types folder works because types and interfaces don't have the concept of "default" the way that ES6 modules do. They're all named exports, so `export *` works as expected.

# Export Interface (or Type) vs Export Default Const 

In TypeScript, when you declare `export interface` or `export type`, you're creating a named export. Since these are already named, they don't have the notion of a "default export" like ES6 module values/functions/classes do.

So when you use `export * from './SomeTypeFile';` in your index file for types, you're re-exporting all the named exports (which in the case of types and interfaces are all of them). That's why it works seamlessly for your types directory.

To clarify further:

- ES6 module values (like React components, functions, classes, etc.) can have both default exports and named exports.
  
  For example:
  ```javascript
  export default function MyComponent() {...}
  export const someUtilityFunction = () => {...}
  ```

- TypeScript types and interfaces are always named exports. There's no concept of a default export for types and interfaces. 

  For example:
  ```typescript
  export interface SomeInterface {...}
  export type SomeType = ...
  ```

That distinction is why you can easily re-export all types and interfaces with `export *` but run into issues with default exports for ES6 module values.