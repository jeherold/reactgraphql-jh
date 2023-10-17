# GraphQL Queries 

## Regular version of GraphQL
https://graphql.org/

## Github GraphQL API Explorer
https://docs.github.com/en/graphql/overview/explorer

### Course Instructor Ray Villalobos
https://raybo.org

## Building 

### Schema 
- **Definition**: The structure of all the data in your queries.
- **Usage in Databases**: It's a common term in databases.
- **Purpose**: It dictates how your data is going to be structured when you ask for it.

**Example**:

```graphql
type Author {
  id: ID!
  name: String!
  books: [Book]
}

type Book {
  id: ID!
  title: String!
  author: Author!
}
```

### Fields 
- **Definition**: Searches in GraphQL are done by looking through different fields and subfields.
- **Naming**: These fields are often called "query fields."
- **Types**: Fields can be of various types including string, integer, boolean, and custom DTOs (Data Transfer Objects).

**Example**:

Querying the name of an author and the titles of their books:

```graphql
{
  author(id: 1) {
    name
    books {
      title
    }
  }
}
```

---

# GraphQL Requests

## Types of Requests

With GraphQL, there are mainly two types of requests you can make:

### 1. Queries
- **Definition**: Simple requests for information from the server.
- **Structure**: The query type has a number of subfields you can request.

**Example**:

Fetching the name and books of an author:

```graphql
{
  author(id: 1) {
    name
    books {
      title
    }
  }
}
```

### 2. Mutations
- **Definition**: A request to modify data on the server.

**Example**:

Adding a new book:

```graphql
mutation {
  addBook(title: "New Book", authorId: 1) {
    id
    title
  }
}
```

# Example Requests

## 1. Lists
- **Definition**: In GraphQL, fields that are lists can have qualifiers which help refine the data being fetched.
- **Qualifying Arguments**: (sometimes called 'qualifiers' or 'arguments')
  - `first`: Limit the number of items to retrieve.
  - `orderBy`: Order the list based on a particular field.
  - `direction`: Specify the direction of sorting (e.g., ascending or descending).

**Example**:

Fetching the first 5 authors ordered by name in ascending direction:

```graphql
{
  authors(first: 5, orderBy: "name", direction: ASC) {
    name
  }
}
```

## 2. Nodes
- **Definition**: When a field represents a list in GraphQL, you can use the `nodes` keyword to access the individual items within that list.

**Example**:

Accessing individual books from an author:

```graphql
{
  author(id: 1) {
    books {
      nodes {
        title
      }
    }
  }
}
```

## 3. Pagination
- **Definition**: Pagination refers to the process of dividing the results into manageable portions, especially useful when dealing with large lists.
- **Usage**: When you paginate items, although you're looking to receive a list, you're interested in receiving a subset of that list. This is where the concept of `edges` and `nodes` becomes particularly important.

### Edges
- **Definition**: In the context of GraphQL pagination, `edges` represent the connection between data sets. Each edge houses a node, and this structure allows for easy pagination.
- **Purpose**: Edges are utilized to paginate and provide meta-information about the paginated results.

**Example**:

Paginating through books and retrieving them as a list of edges:

```graphql
{
  books(first: 5) {
    edges {
      node {
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
}
```

### Cursors in GraphQL

Cursors are a powerful feature in GraphQL that aids in pagination, especially when working with connections and edges.

#### What are Cursors?

- **Unique Pointers**: Unlike traditional IDs which identify resources, cursors are more like pointers that mark a specific position in a dataset.
- **Relevance to Edges**: While IDs are typically relevant to specific entities (like a user or a book), cursors are tied to the position of an item within a list or a connection. They're especially crucial when the order of data matters.
- **Usage in Pagination**: Cursors are instrumental in "cursor-based pagination". Instead of fetching data based on page numbers (like in traditional pagination), cursor-based pagination uses these cursors as markers to fetch data before or after them.

#### How to Use Cursors?

1. **Fetching a Cursor**: When you query items along with their edges in GraphQL, you can typically ask for a `cursor` for each item.

   ```graphql
   {
     books(first: 2) {
       edges {
         cursor
         node {
           title
         }
       }
     }
   }
   ```

2. **Using a Cursor for Pagination**: Once you have a cursor from a previous query, you can use it to paginate and fetch items after (or before) that cursor.

   ```graphql
   {
     books(first: 2, after: "Y3Vyc29yOnYyOpK5MjAyMy0wOS0xMlQxMDozNzozNS0wNDowMM4pKgFQ") {
       edges {
         cursor
         node {
           title
         }
       }
     }
   }
   ```

In the above example, the `after` argument tells GraphQL to fetch the first two books that come after the provided cursor.


### `pageInfo` in GraphQL

In the realm of GraphQL, when you're dealing with connections and pagination, the `pageInfo` object is crucial. It provides meta-information about the paginated results and helps guide further pagination actions.

#### Structure of `pageInfo`

- **hasNextPage**: A boolean that indicates whether there are more items after the items that were returned in the current query. If `true`, you can use cursor-based pagination to request more items after the last item in the current set.

#### How to Use `pageInfo`?

When querying a connection or a list in GraphQL, you can ask for `pageInfo` to understand the context of your pagination:

```graphql
{
  books(first: 2) {
    edges {
      node {
        title
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
```

From the above query:

1. We're fetching the first two books.
2. For each book, we're retrieving its title.
3. We're also asking for `pageInfo` to see if there are more books available after these two.

If the `hasNextPage` field in the returned `pageInfo` is `true`, you know you can make another query with a cursor to retrieve more books after the currently fetched ones.

# Exampl db that the above would use

A `db.json` file would typically be a representation of a database in JSON format. It's commonly used with tools like [json-server](https://github.com/typicode/json-server) to quickly set up a mock REST API based on the JSON file.

For the GraphQL examples we've been discussing (around books and authors), a simple `db.json` file could look like this:

```json
{
  "authors": [
    {
      "id": 1,
      "name": "J.K. Rowling"
    },
    {
      "id": 2,
      "name": "George Orwell"
    }
  ],
  "books": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "authorId": 1
    },
    {
      "id": 2,
      "title": "1984",
      "authorId": 2
    },
    {
      "id": 3,
      "title": "Harry Potter and the Chamber of Secrets",
      "authorId": 1
    }
  ]
}
```

Here's a quick breakdown:

- We have two main entities: `authors` and `books`.
- Each `author` has an `id` and a `name`.
- Each `book` has an `id`, a `title`, and an `authorId` that links it to an author.

If you were to use `json-server` with this `db.json`, it would automatically create routes for each entity. Then, if you wanted to build a GraphQL server, you would define your GraphQL schema based on these entities and resolve the fields by querying this JSON structure.