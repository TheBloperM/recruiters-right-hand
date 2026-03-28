import { Fragment } from "react";
import classNames from "classnames";
import style from "./experience.module.css";
import type { ProfessionalExperience } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";
import JobRole from "./jobRole/jobRole";

interface ExperienceProps {
  experience: ProfessionalExperience[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <div className={classNames(style.flex, style.containerFlexGap)}>
      <SectionTitle text="Experience" />

      <div className={classNames(style.flex, style.flexGap)}>
        {experience.map(({ workPlace, jobsData, industry }) => (
          <Fragment key={workPlace}>
            <div className={style.jobLocation}>{workPlace}</div>
            <div className={style.jobTitle}>{industry}</div>
            {jobsData.map((jobRole) => (
              <JobRole
                key={`${workPlace}-${jobRole.title}`} // Moved key to the mapping execution
                jobData={jobRole}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
