# Strict Mode can cause double invoked renders

 <React.StrictMode> is a useful tool during development as it helps detect potential problems in an application. However, its behavior, like double-invoking render methods and effects, can sometimes be surprising if you're not expecting it.

It's always a good idea to be aware of how StrictMode affects the app during development, so you can make informed decisions about its use.

If you're seeing the data logged twice in the console with a `useEffect` that only has an empty dependency array (`[]`), it's not directly related to the `useEffect` itself. Here are some common reasons this might occur:

1. **Strict Mode**: If your app is wrapped in `<React.StrictMode>` (common in the default setup of `create-react-app`), it might intentionally double-invoke some render methods and effects to help detect side-effects. If you remove the `<React.StrictMode>` wrapper from `index.tsx` (or `index.js`), you should see the effect run only once.

2. **Component Re-render**: Ensure that the component containing the `useEffect` isn't being rendered twice for some reason. Maybe a parent component is causing the child (this component) to re-render.

3. **Hot Module Replacement**: If you're using a development server with hot module replacement (HMR), sometimes it can cause components to re-render unexpectedly, which may result in effects running more than once.

4. **Other Middlewares or Extensions**: Ensure that no browser extensions, especially those related to React or GraphQL, are causing additional logs. For example, some extensions might log network requests.

To diagnose the exact reason:

- First, check if you're in `<React.StrictMode>` and try removing it to see if the double log persists.
- Inspect the parent components and the entire render flow to see if any unnecessary re-renders are occurring.
- Disable any potential browser extensions one by one and see if the behavior changes.
- Check your development server settings or any other middleware settings.

If none of these seem to be the cause, further investigation would be needed based on the specific setup and context of your application.