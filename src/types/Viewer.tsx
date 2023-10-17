import { Repository } from "./Repository";

export interface Viewer {
  name: string;
  repositories: {
    nodes: Repository[];
    [key: string]: any;
  };
  [key: string]: any;
}