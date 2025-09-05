import { pickFiles, type PickFilesOptions } from '@thangved/pick-files';
import { useCallback, useState } from 'react';

function App() {
  const [error, setError] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [options, setOptions] = useState<PickFilesOptions>({
    accept: '*',
    multiple: false,
  });

  const handlePick = useCallback(async () => {
    try {
      const { files } = await pickFiles(options);
      setSelectedFiles(files);
      setError('');
    } catch (error) {
      setSelectedFiles([]);
      if (error instanceof Error) setError(error.message);
    }
  }, [options]);

  return (
    <div className="w-full max-w-[1024px] mx-auto">
      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-[18px] font-semibold text-2xl">
          @thangved/pick-files example
        </h2>

        <div className="flex flex-col">
          <div>
            <label>
              Multiple{' '}
              <input
                type="checkbox"
                checked={options.multiple}
                onChange={(event) =>
                  setOptions((prev) => ({
                    ...prev,
                    multiple: event.target.checked,
                  }))
                }
              />
            </label>
          </div>

          <div>
            <label>
              Accept{' '}
              <div>
                <textarea
                  rows={2}
                  className="w-full bg-slate-200 p-2"
                  value={options.accept}
                  onChange={(event) =>
                    setOptions((prev) => ({
                      ...prev,
                      accept: event.target.value,
                    }))
                  }
                />
              </div>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-primary bg-black text-white py-2 px-4 cursor-pointer rounded-md"
              onClick={handlePick}
            >
              Select
            </button>
          </div>
        </div>

        {error ? (
          <div className="card">
            <div className="card-body">
              <p className="text-red-400">Error: {error}</p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-medium text-md">Selected files</h3>

            <div className="bg-slate-200 p-2 rounded-md font-mono">
              <textarea
                className="size-full"
                rows={selectedFiles.length * 5 + 2}
                readOnly
                value={JSON.stringify(
                  selectedFiles.map((file) => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                  })),
                  null,
                  2
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
