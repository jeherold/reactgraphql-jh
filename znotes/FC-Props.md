In TypeScript, when defining a functional component's props, you should use the `type` or `interface` keyword. You then use that type or interface to specify the props' types.

Here's how you can type the `SearchBox` function's props:

1. Define a type or interface for the props.
2. Use the defined type or interface to type the props of the functional component.

Here's your code with the correct typing:

```tsx
import React from 'react';

// Define the props type
type SearchBoxProps = {
  totalCount: number;
  pageCount: number;
  queryString: string;
  onTotalChange: (value: string) => void;
  onQueryChange: (value: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({
  totalCount,
  pageCount,
  queryString,
  onTotalChange,
  onQueryChange,
}) => {
  // ... rest of your component logic ...
};

export default SearchBox;
```

Key points:

- `SearchBoxProps` defines the shape and types of the props for the `SearchBox` component.
- We've used `React.FC<SearchBoxProps>` (or `React.FunctionComponent<SearchBoxProps>`) to type the `SearchBox` functional component.
- The callbacks (`onTotalChange` and `onQueryChange`) are typed to expect a single `string` argument and return `void`. Adjust this if your actual function signatures differ.
