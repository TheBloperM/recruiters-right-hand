import { useAppStore } from "../../store";
import { Title } from "./title/title";
import style from "./resume.module.css";
import Contract from "./contract/contract";
import { SkillsAndTechnlogies } from "./skill/skill";
import Interests from "./interests/Interests";
import Experience from "./experience/experience";
import Education from "./education/education";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export default function ResumeComponent() {
  const resume = useAppStore(useShallow((state) => state.resume));
  const navigate = useNavigate();

  useEffect(() => {
    if (!resume) {
      navigate("/candidate", { replace: true });
    }
  }, [resume, navigate]);

  if (!resume) {
    return null;
  }
  return (
    <div className={style.pageWrapper} id="resume-print-target">
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
  );
}
