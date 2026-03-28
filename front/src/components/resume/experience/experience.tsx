import classNames from "classnames";
import style from "./experience.module.css";
import type { ProfessionalExperience } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";

interface ExperienceProps {
  experience: ProfessionalExperience[];
}

export default function Experience(props: ExperienceProps) {
  return (
    <div className={classNames(style.flex, style.containerFlexGap)}>
      <SectionTitle text={"Experience"} />

      <div className={classNames(style.flex, style.flexGap)}>
        {props.experience.map(({ workPlace, jobsData, industry }) => (
          <>
            <div className={style.jobLocation}>{workPlace}</div>
            <div className={style.jobTitle}>{industry}</div>
            {jobsData.map(({ title, startDate, endDate, comments }) => (
              <div
                className={classNames(style.flex, style.itemFlexGap)}
                key={`${workPlace}-${title}`}
              >
                <div className={style.jobTitle}>{title}</div>
                <div className={style.years}>
                  {startDate}-{endDate}
                </div>
                <div className={classNames(style.flex, style.itemFlexGap)}>
                  {comments.map((comment, cindex) => (
                    <div className={style.comments} key={`comment-${cindex}`}>
                      - {comment}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
