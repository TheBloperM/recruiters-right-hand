import type { SkillsAndTechnologies } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";
import style from "./skill.module.css";

interface SkillProps {
  skills: SkillsAndTechnologies;
}

export function SkillsAndTechnlogies(props: SkillProps) {
  return (
    <div className={style.container}>
      <SectionTitle text="Skills and Technologies" />

      {Object.keys(props.skills).map((key) => {
        const skillKey = key as keyof SkillsAndTechnologies;
        const skills = props.skills[skillKey];

        return (
          <div className={style.skillBoxContainer} key={key}>
            <span className={style.subTitle}>{skillKey} -</span>

            <div className={style.skillListContainer}>
              {skills.map((skill) => (
                <div className={style.skill}>
                  {skill.name}
                  {` (${skill.level})`}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
