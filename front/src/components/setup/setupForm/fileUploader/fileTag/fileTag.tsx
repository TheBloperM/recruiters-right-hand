import style from "./fileTag.module.css";

interface FileTagProps {
  fileName: string;
  onRemove: () => void;
  disabled?: boolean;
}

export default function FileTag({
  fileName,
  onRemove,
  disabled,
}: FileTagProps) {
  return (
    <div className={style.fileTag}>
      <span className={style.fileName}>{fileName}</span>
      <button
        type="button"
        className={style.removeBtn}
        disabled={disabled}
        onClick={(e) => {
          if (!disabled) {
            e.stopPropagation();
            onRemove();
          }
        }}
      >
        ×
      </button>
    </div>
  );
}
