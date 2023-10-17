import React, { useEffect, useState } from 'react';
import github from './db.js';
import query from './QueryAsFuncWithArgs';
import { ApiResponse, Repository, Viewer } from './types';
import { PaginationButtons, RepoInfo, SearchBox } from './components';


const App: React.FC = () => {
  let [userName, setUserName] = useState<string>('');
  let [repoList, setRepoList] = useState<Repository[] | null>(null);
  /** Functionality for controlling our list */
  let [pageCount, setPageCount] = useState<number>(10);
  let [queryString, setQueryString] = useState<string>("");
  let [totalRepoCount, setTotalRepoCount] = useState<number | null>(0);

  /** Pagination */
  let [startCursor, setStartCursor] = useState<string | null>(null);
  let [endCursor, setEndCursor] = useState<string | null>(null);
  let [hasPreviousPage, setHasPreviousPage] = useState<boolean | null>(false);
  let [hasNextPage, setHasNextpage] = useState<boolean | null>(false);
  let [paginationKeyWord, setPaginationKeyWord] = useState<string | null>("first");
  let [paginationString, setPaginationString] = useState<string | null>("");


  useEffect(() => {
    const queryText = query(pageCount, queryString, paginationKeyWord, paginationString)
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(queryText)
    })
      .then(response => response.json())
      .then((data: ApiResponse) => {  // Consider using a stricter type than 'any' if you know the structure of your data
        // data.data because the 1st data is the resp and the 2nd is just the data structure from the server
        console.log(data);
        const viewer: Viewer = data?.data?.viewer;
        const repos: Repository[] = data?.data?.search?.edges;
        const total: number = data?.data?.search?.repositoryCount;
        /** Pagination */
        const start = data?.data?.search?.pageInfo?.startCursor;
        const end = data?.data?.search?.pageInfo?.endCursor;
        const prev = data?.data?.search?.pageInfo?.hasPreviousPage;
        const next = data?.data?.search?.pageInfo?.hasNextPage;

        setUserName(viewer.name);
        setRepoList(repos);
        setTotalRepoCount(total);
        /** pagination sets */
        setStartCursor(start);
        setEndCursor(end);
        setHasPreviousPage(prev);
        setHasNextpage(next)
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [pageCount, queryString, paginationKeyWord, paginationString]); // dependency array grows as you need more dependencies

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <span className="bi bi-diagram-2-fill"> Repos</span>
      </h1>
      <p>Hey There {userName}</p>
      <SearchBox
        totalCount={totalRepoCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(mySearchStr) => { setQueryString(mySearchStr) }}
        onTotalChange={(mySearchMaxCount) => { setPageCount(mySearchMaxCount) }}
      />
      <PaginationButtons
        start={startCursor}
        end={endCursor}
        previous={hasPreviousPage}
        next={hasNextPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyWord(myKeyword);
          setPaginationString(myString);
        }}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo: Repository) => (
            <RepoInfo key={repo.node.id} repo={repo.node} />
          ))}
        </ul>
      )}
      <PaginationButtons
        start={startCursor}
        end={endCursor}
        previous={hasPreviousPage}
        next={hasNextPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyWord(myKeyword);
          setPaginationString(myString);
        }}
      />
    </div>
  );
}

export default App;
