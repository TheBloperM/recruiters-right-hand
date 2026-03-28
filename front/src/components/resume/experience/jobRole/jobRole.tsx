import classNames from "classnames";
import style from "./jobRole.module.css";
import experienceStyle from "../experience.module.css";
import type { JobData } from "recruiters-utils";

interface JobRoleProps extends JobData {
  workPlace: string;
}

export default function JobRole(props: JobRoleProps) {
  return (
    <div
      className={classNames(experienceStyle.flex, style.itemFlexGap)}
      key={`${props.workPlace}-${props.title}`}
    >
      <div className={experienceStyle.jobTitle}>{props.title}</div>
      <div className={style.years}>
        {props.startDate}-{props.endDate}
      </div>
      <div className={classNames(experienceStyle.flex, style.itemFlexGap)}>
        {props.comments.map((comment, index) => (
          <div className={style.comments} key={`comment-${index}`}>
            - {comment}
          </div>
        ))}
      </div>
    </div>
  );
}
