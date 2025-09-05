export interface PickFilesOptions {
  accept: string;
  multiple: boolean;
}

export interface PickFileResult {
  files: Array<File>;
}
