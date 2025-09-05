export interface PickFilesOptions {
  accept: string | Array<string>;
  multiple: boolean;
  /**
   * Max file size in bytes
   * @example
   * ```js
   * 1024 // 1KB
   * 1048576 // 1MB
   * ```
   */
  maxSize?: number;
}

export interface PickFilesResult {
  files: Array<File>;
}

export enum PickFilesError {
  UserCanceledAction,
  NoFileSelected,
  FileSizeTooLarge,
}
