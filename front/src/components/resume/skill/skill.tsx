import type { SkillsAndTechnologies } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";
import style from "./skill.module.css";
import { camelToTitleCase } from "@/utils/textUtils";

interface SkillProps {
  skills: SkillsAndTechnologies;
}

export function SkillsAndTechnlogies({ skills }: SkillProps) {
  return (
    <div className={style.container}>
      <SectionTitle text="Skills and Technologies" />

      {(Object.keys(skills) as Array<keyof SkillsAndTechnologies>).map(
        (skillKey) => {
          const skillList = skills[skillKey];

          if (!skillList || skillList.length === 0) return null;

          return (
            <div className={style.skillBoxContainer} key={skillKey}>
              <span className={style.subTitle}>
                {camelToTitleCase(skillKey)} -
              </span>

              <div className={style.skillListContainer}>
                {skillList.map((skill) => (
                  <div
                    className={style.skill}
                    key={`${skill.name}-${skill.level}`}
                  >
                    {skill.name} ({skill.level})
                  </div>
                ))}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}
