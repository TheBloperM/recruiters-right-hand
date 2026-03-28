import type { Resume } from "recruiters-utils";
import style from "./title.module.css";

interface TitleProps {
  name: Resume["name"];
  description: Resume["description"];
}

export function Title({ name, description }: TitleProps) {
  return (
    <div className={style.container}>
      <div className={style.name}>{name}</div>
      <div className={style.title}>{description}</div>
    </div>
  );
}
