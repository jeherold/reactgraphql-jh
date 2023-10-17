# Fetch GraphQL Data using useCallback vs useEffect

The `useEffect` and `useCallback` hooks serve different purposes in React, and they are often used together for specific reasons, especially when fetching data or managing side effects. Let's break down their primary roles:

### `useEffect`

The `useEffect` hook is designed to perform side effects in function components. "Side effects" can be many things, including:
- Data fetching
- Manual DOM manipulations
- Setting up event listeners or subscriptions
- Cleaning up resources (like unsubscribing)

For fetching data, you'd commonly see `useEffect` in this pattern:

```javascript
useEffect(() => {
    // Fetch data here
}, [dependencies]);
```

### `useCallback`

The `useCallback` hook returns a memoized version of the callback function that only changes if one of the dependencies has changed. It's useful when you have a callback function that you don't want to be recreated every time your component re-renders. 

### When to use both?

Here's a scenario: Suppose you have a callback function (for fetching data) that you also want to pass down to a child component. If you create this callback inside your parent component without memoizing it, the function would be recreated on every render, leading the child component to think that the prop has changed, thus causing unnecessary re-renders. 

In such a case, you'd use `useCallback` to memoize the data-fetching function:

```javascript
const fetchData = useCallback(() => {
    // Fetch data here
}, [dependencies]);

useEffect(() => {
    fetchData();
}, [fetchData]);
```

This ensures that `fetchData` only gets recreated if `[dependencies]` change and not on every render.

### So, which is preferred?

`useEffect` is the primary hook for managing side effects, including data fetching. If you're fetching data in response to a component mounting or some prop/state change, `useEffect` is the tool you'll use.

`useCallback` isn't specifically for data fetching; it's for memoizing functions. However, if you find yourself in situations where you need to optimize performance or avoid unnecessary re-renders by ensuring function stability, that's when you'd combine `useCallback` with `useEffect`.

In summary, you would use `useEffect` for data fetching almost always, and `useCallback` comes into the picture when you want to optimize and prevent unnecessary re-creations of functions or side effects.

## Example setup with useCallback

```
import React, { useCallback, useEffect, useState } from 'react';
import github from './db.js';
import query from './QueryAsFuncWithArgs';
import RepoInfo from './RepoInfo';
import { ApiResponse } from './types/ApiResponse';
import { Repository } from './types/Repository';
import { Viewer } from './types/Viewer';

const App: React.FC = () => {
  let [userName, setUserName] = useState<string>('');
  let [repoList, setRepoList] = useState<Repository[] | null>(null);
  /** Functionality for controlling our list */
  let [pageCount, setPageCount] = useState<number>(10);
  let [queryString, setQueryString] = useState<string>("React");
  let [totalCount, setTotalCount] = useState<number | null>(0);
  

  const fetchData = useCallback(() => {
    const queryText = query(pageCount, queryString)
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(queryText)
    })
    .then(response => response.json())
    .then((data: ApiResponse) => {  // Consider using a stricter type than 'any' if you know the structure of your data
      // data.data because the 1st data is the resp and the 2nd is just the data structure from the server
      console.log(data);
      const viewer: Viewer = data.data.viewer;
      const repos: Repository[] = data.data.search.nodes;
      const total: number = data.data.search.repositoryCount;
      setUserName(viewer.name);
      setRepoList(repos);
      setTotalCount(total);
    })
    .catch((err: Error) => {
      console.log(err);
    });
  }, [pageCount, queryString]); // dependency array grows as you need more dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <span className="bi bi-diagram-2-fill"> Repos</span>
      </h1>
      <p>Hey There {userName}</p>
      <p>
        <strong>Search for:</strong> {queryString} | <strong>Items per page:</strong> {pageCount} | <strong>Total Count:</strong> {totalCount}
      </p>
      { repoList && (
          <ul className="list-group list-group-flush">
            { repoList.map((repo: Repository) => (
               <RepoInfo key={repo.id} repo={repo} />
              ))}
          </ul>
        )}
    </div>
  );
}

export default App;

```