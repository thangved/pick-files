import { PickFilesError, PickFilesOptions, PickFilesResult } from './types';

const DEFAULT_OPTIONS: PickFilesOptions = {
  accept: '*',
  multiple: false,
};

const normalizeOptions = (
  options: PickFilesOptions,
): {
  accept: string;
} & Pick<PickFilesOptions, 'multiple' | 'maxSize'> => {
  return {
    ...options,
    accept:
      typeof options.accept === 'string'
        ? options.accept
        : options.accept.join(', '),
    multiple: false,
  };
};

/**
 * Pick files
 * @param options - Pick file options
 * @returns Pick files result
 */
export const pickFiles = async (
  options?: Partial<PickFilesOptions>,
): Promise<PickFilesResult> => {
  const { accept, multiple, maxSize } = normalizeOptions({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  return new Promise<PickFilesResult>((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = accept;

    input.addEventListener('input', () => {
      try {
        if (!input.files?.length)
          throw new Error('No file selected', {
            cause: PickFilesError.NoFileSelected,
          });

        const files = Array.from(input.files);

        // Check file size
        if (typeof maxSize === 'number')
          files.forEach((file) => {
            if (maxSize > file.size)
              throw new Error('File size too large', {
                cause: PickFilesError.FileSizeTooLarge,
              });
          });

        resolve({ files });
      } catch (error) {
        reject(error);
      }
    });

    input.addEventListener('cancel', () => {
      reject(
        new Error('User cancel action', {
          cause: PickFilesError.UserCanceledAction,
        }),
      );
    });

    input.click();
    input.remove();
  });
};
