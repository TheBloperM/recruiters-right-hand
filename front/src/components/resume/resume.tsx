import { useResumeStore } from "../../store";
import { Title } from "./title/title";
import style from "./resume.module.css";
import Contract from "./contract/contract";
import { SkillsAndTechnlogies } from "./skill/skill";
import Interests from "./interests/Interests";
import Experience from "./experience/experience";

export default function ResumeComponent() {
  const { resume } = useResumeStore();

  return (
    <>
      {resume && (
        <div>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
