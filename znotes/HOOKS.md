# React Hooks

React Hooks are functions that let developers "hook into" React state and lifecycle features from function components. They were introduced in React 16.8. Here, we'll briefly describe and provide examples for a few common hooks.

## useState

`useState` is a hook that lets you add React state to function components.

### Definition

```javascript
const [state, setState] = useState(initialState);
```

### Example

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## useEffect

`useEffect` lets you perform side effects in function components. It can mimic lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

### Definition

```javascript
useEffect(() => {
  // Code to run on component mount or update
  return () => {
    // Cleanup code (similar to componentWillUnmount)
  };
}, [dependencies]);
```

### Example

```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);  // Cleanup on unmount
  }, []);  // Empty dependency array means this effect runs once when component mounts

  return <div>Elapsed time: {seconds} seconds</div>;
}
```

## useCallback

`useCallback` returns a memoized version of the callback that only changes if one of the dependencies has changed.
- can use to optimize how and when items are re-rendered in our app
- can prevent the double api calls that useEffect creates
- this is called memoization - its going to remember our data and not update it unless we need it to

### Definition

```javascript
const memoizedCallback = useCallback(() => {
  // Function body
}, [dependencies]);
```

### Example

```javascript
import React, { useState, useCallback } from 'react';

function CounterWithCallback() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);  // Since setCount doesn't change, we can leave the dependency array empty

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}
```