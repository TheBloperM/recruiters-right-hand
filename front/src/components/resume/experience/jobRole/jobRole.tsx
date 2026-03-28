import classNames from "classnames";
import style from "./jobRole.module.css";
import experienceStyle from "../experience.module.css";
import type { JobData } from "recruiters-utils";

interface JobRoleProps {
  jobData: JobData;
}

export default function JobRole({ jobData }: JobRoleProps) {
  return (
    <div className={classNames(experienceStyle.flex, style.itemFlexGap)}>
      <div className={experienceStyle.jobTitle}>{jobData.title}</div>
      <div className={style.years}>
        {jobData.startDate} - {jobData.endDate}
      </div>
      <div className={classNames(experienceStyle.flex, style.itemFlexGap)}>
        {jobData.comments.map((comment, index) => (
          <div className={style.comments} key={index}>
            - {comment}
          </div>
        ))}
      </div>
    </div>
  );
}
