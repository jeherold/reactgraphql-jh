# Building a GraphQL Project with React & Typescript

## Installing

1. To use these exercise files, you must have the following installed:
   - [Node.js](https://nodejs.org/)
   - [Git](https://git-scm.com/)
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Setup a src/db.js file with your github token - make sure this file path is in the .gitignore.

```js
const github = {
  baseURL: 'https://api.github.com/graphql',
  username: 'your-username',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'bearer yourauthtokenfromgithub',
  },
};

export default github;
```

4. In the query files - update the hardcoded usernames to the username you want to query

```tsx
src\QueryAsFuncWithArgs.tsx:
  17        }
  18:       search(query: "${queryString} user:jeanieherold sort:updated.asc", type: REPOSITORY, ${paginationKeyWord}: ${pageCount}, ${paginationString}) {
  19          repositoryCount

src\QueryAsString.tsx:
  6      }
  7:     search(query: "user:jeanieherold sort:updated.asc", type: REPOSITORY, first: 10) {
  8        nodes {

znotes\AppState-BeforQueryTextSetup.md:
  68      }
  69:     search(query: "user:jeanieherold sort:updated.asc", type: REPOSITORY, first: 10) {
  70        nodes {

```
