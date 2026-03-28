import { useResumeStore } from "../../store";
import { Title } from "./title/title";
import style from "./resume.module.css";
import Contract from "./contract/contract";
import { SkillsAndTechnlogies } from "./skill/skill";
import Interests from "./interests/Interests";
import Experience from "./experience/experience";
import Education from "./education/education";

export default function ResumeComponent() {
  const { resume } = useResumeStore();

  return (
    <>
      {resume && (
        <div className={style.pageWrapper}>
          <Title
            name={`${resume.name} - ${resume.professionalTitle}`}
            description={resume.description}
          />
          <div className={style.resumeContainer}>
            <div className={style.generalSide}>
              <Contract contractData={resume.contractData} />
              <SkillsAndTechnlogies skills={resume.skillsAndTechnologies} />
              <Interests interests={resume.interests} />
            </div>
            <div className={style.workSide}>
              <Experience experience={resume.experience} />
              <Education education={resume.education} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
