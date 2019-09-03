/**
 * Represents a Gist item in GitHub's API.
 */
export interface IGist {
  /** ID of the gist. */
  id?: string;
  /** Owner of the gist. */
  owner?: {
    /** Owner's username. */
    login: string;
  };
  /** Description of the gist. */
  description: string;
  /** Whether the gist is public or private. */
  public: boolean;
  /** Files contained in the gist. */
  files: {
    /** Name of the file. */
    [key: string]: {
      /** File contents. */
      content: string;
    };
  };
}

/**
 * Represents an issue item in GitHub's API.
 */
export interface IIssue {
  html_url: string;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  repository_url: string;
  user: {
    login: string;
  };
  labels: ILabel[];
  assignees: [{ login: string }];
}

/**
 * Represents a pull request item in GitHub's API.
 */
export interface IPull {
  html_url: string;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  pull_request: {};
  repository_url: string;
  user: {
    login: string;
  };
  labels: ILabel[];
  assignees: [{ login: string }];
}
