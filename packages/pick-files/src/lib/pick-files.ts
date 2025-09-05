import { PickFileResult, PickFilesOptions } from './types';

const DEFAULT_OPTIONS: PickFilesOptions = {
  accept: '*',
  multiple: false,
};

/**
 * Pick files
 * @param options - Pick file options
 * @returns Pick files result
 */
export const pickFiles = async (
  options?: Partial<PickFilesOptions>
): Promise<PickFileResult> => {
  const { accept, multiple } = { ...DEFAULT_OPTIONS, ...options };
  return new Promise<PickFileResult>((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = accept;

    input.addEventListener('input', () => {
      try {
        if (!input.files?.length) throw new Error('No file selected');
        resolve({ files: Array.from(input.files) });
      } catch (error) {
        reject(error);
      }
    });

    input.addEventListener('cancel', () => {
      reject(new Error('User cancel action'));
    });

    input.click();
    input.remove();
  });
};
