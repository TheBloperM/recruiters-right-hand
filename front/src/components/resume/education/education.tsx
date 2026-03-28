import classNames from "classnames";
import style from "./education.module.css";
import type { EducationData } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";

interface EducationProps {
  education: EducationData[];
}

export default function Education({ education }: EducationProps) {
  return (
    <div className={style.infoContainer}>
      <SectionTitle text="Education" />
      <div className={classNames(style.infoContainer, style.flexGap)}>
        {education.map((item) => (
          <div
            key={`${item.educationPlace}-${item.nameOfTitle}`}
            className={style.infoContainer}
          >
            <div className={style.educationTitle}>{item.nameOfTitle}</div>
            <div className={style.educationPlace}>
              {item.educationPlace}
              <div className={style.educationInfo}>
                {item.mainSubjects.join(", ")}
              </div>
              <span className={style.educationInfo}>
                ({item.startingYear} - {item.endingYear})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
