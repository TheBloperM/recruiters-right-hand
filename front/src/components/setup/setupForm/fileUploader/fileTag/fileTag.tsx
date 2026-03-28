import style from "./fileTag.module.css";

interface FileTagProps {
  fileName: string;
  index: number;
  onRemove: () => void;
}

export default function FileTag(props: FileTagProps) {
  return (
    <div key={`${props.fileName}-${props.index}`} className={style.fileTag}>
      <span className={style.fileName}>{props.fileName}</span>
      <button
        type="button"
        className={style.removeBtn}
        onClick={(e) => {
          e.stopPropagation();
          props.onRemove();
        }}
      >
        ×
      </button>
    </div>
  );
}
