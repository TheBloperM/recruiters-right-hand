import classNames from "classnames";
import style from "./education.module.css";
import type { EducationData } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";

interface EducationProps {
  education: EducationData[];
}
const Education = (props: EducationProps) => {
  return (
    <div className={style.infoContainer}>
      <SectionTitle text={"Education"} />

      <div className={classNames(style.infoContainer, style.flexGap)}>
        {props.education.map(
          ({
            educationPlace,
            nameOfTitle,
            startingYear,
            endingYear,
            mainSubjects,
          }) => (
            <div className={style.infoContainer}>
              <div className={style.educationTitle}>{nameOfTitle}</div>
              <div className={style.educationPlace}>
                {educationPlace}{" "}
                <div className={style.mainSubjects}>
                  {mainSubjects.join(", ")}
                </div>
                <span className={style.years}>
                  ({startingYear}-{endingYear})
                </span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Education;
