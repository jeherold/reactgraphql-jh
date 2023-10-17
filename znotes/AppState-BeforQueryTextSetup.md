# Simple Fetch Data from GraphQL - no query variables - query is just a string in this example

```
import React, { useCallback, useEffect, useState } from 'react';
import github from './db.js';
import query from './Query';
import RepoInfo from './RepoInfo';
import { ApiResponse } from './types/ApiResponse';
import { Repository } from './types/Repository';

const App: React.FC = () => {
  let [userName, setUserName] = useState<string>('');
  let [repoList, setRepoList] = useState<Repository[] | null>(null);


  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then((data: ApiResponse) => {  // Consider using a stricter type than 'any' if you know the structure of your data
      // data.data because the 1st data is the resp and the 2nd is just the data structure from the server
      const viewer = data.data.viewer;
      const repos: Repository[] = data.data.search.nodes;
      setUserName(viewer.name);
      setRepoList(repos);
      console.log(data);
    })
    .catch((err: Error) => {
      console.log(err);
    });
  }, []); // dependency array grows as you need more dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <span className="bi bi-diagram-2-fill"> Repos</span>
      </h1>
      <p>Hey There {userName}</p>

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

# Simple Query object as a string - no variable setup yet

```
const githubQueryAsString = {
  query: `
  {
    viewer {
      name
    }
    search(query: "user:jeherold sort:updated.asc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
          isPrivate
          viewerSubscription
          licenseInfo {
            spdxId
          }
        }
      }
    }
  }
`,
}

export default githubQueryAsString;
```
