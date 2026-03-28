import classNames from "classnames";
import style from "./sectionTitle.module.css";

interface SectionTitleProps {
  text: string;
  className?: string;
}

export default function SectionTitle({ text, className }: SectionTitleProps) {
  return <div className={classNames(style.title, className)}>{text}</div>;
}
