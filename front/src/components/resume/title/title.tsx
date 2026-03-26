import type { Resume } from "recruiters-utils";
import style from "./title.module.css";

interface TitleProps {
  name: Resume["name"];
  description: Resume["description"];
}

export function Title(props: TitleProps) {
  return (
    <div className={style.container}>
      <div className={style.name}>{props.name}</div>
      <div className={style.title}>{props.description}</div>
    </div>
  );
}
