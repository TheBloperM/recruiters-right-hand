import type { ChangeEvent } from "react";
import style from "./fileUploader.module.css";
import FileTag from "./fileTag/fileTag";

interface FileUploaderProps {
  files: File[];
  allowMultiple?: boolean;
  onAdd: (newFiles: File[]) => void;
  onRemove: (index: number) => void;
}

export default function FileUploader({
  files,
  allowMultiple,
  onAdd,
  onRemove,
}: FileUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAdd(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const getPlaceholderText = () => {
    if (files.length === 0)
      return "Click to upload or drag and drop your PDF(s) here";
    if (files.length === 1 && !allowMultiple) return files[0].name;
    return `${files.length} files selected`;
  };

  return (
    <div className={style.uploaderContainer}>
      <div className={style.dropzoneWrapper}>
        <input
          type="file"
          multiple={allowMultiple}
          accept=".pdf"
          onChange={handleFileChange}
          className={style.hiddenFileInput}
        />
        <div className={style.dropzoneContent}>
          <span className={style.uploadIcon}>
            {allowMultiple ? "📚" : "📄"}
          </span>
          <p className={style.dropzoneText}>{getPlaceholderText()}</p>
        </div>
      </div>

      <div className={style.fileList}>
        {files.map((file, index) => (
          <FileTag
            key={index}
            fileName={file.name}
            index={index}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
