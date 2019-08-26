/**
 * Represents an issue item in GitHub's API.
 */
export interface IIssue {
  html_url: string;
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  repo: string;
}

/**
 * Represents a pull request item in GitHub's API.
 */
export interface IPull {
  html_url: string;
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  pull_request: {};
  repo: string;
}
