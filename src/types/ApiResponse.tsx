import { Viewer } from "./Viewer";

export interface ApiResponse {
  data: {
    viewer: Viewer;
    [key: string]: any;
  };
  [key: string]: any;
}