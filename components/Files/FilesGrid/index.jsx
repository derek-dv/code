import FileItem from "./item";

const FileGrid = ({ files }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files && files.map((file) => <FileItem file={file} key={file.id} />)}
    </div>
  );
};

export default FileGrid;
