import style from "./fileTag.module.css";

interface FileTagProps {
  fileName: string;
  onRemove: () => void;
}

export default function FileTag({ fileName, onRemove }: FileTagProps) {
  return (
    <div className={style.fileTag}>
      <span className={style.fileName}>{fileName}</span>
      <button
        type="button"
        className={style.removeBtn}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </button>
    </div>
  );
}
