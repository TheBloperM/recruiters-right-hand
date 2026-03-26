import type { Resume } from "recruiters-utils";
import SectionTitle from "../sectionTitle/sectionTitle";
import style from "./interests.module.css";

interface InterestsProps {
  interests: Resume["interests"];
}

export default function Interests(props: InterestsProps) {
  return (
    <div className={style.container}>
      <SectionTitle text={"Interests"} />

      <div className={style.interestsContainer}>
        {props.interests.map((interest) => (
          <div className={style.interest} key={interest}>
            {interest}
          </div>
        ))}
      </div>
    </div>
  );
}
