export default function SelectedFileList({
  files,
}: {
  files: FileList | null | undefined;
}) {
  if (!files?.length) return;

  const list = [];
  for (const file of files) {
    list.push(
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="font-medium text-sm text-gray-700">
          {file.name.slice(0, 35)}
          {file.name.length > 35 ? '...' : ''}
        </span>
        <span className=" text-xs text-gray-600">PDF</span>
      </div>
    );
  }

  return <div className="mt-4 w-full">{list}</div>;
}
