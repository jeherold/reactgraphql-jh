export interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  [key: string]: any;  // This allows the object to have any other properties
}

