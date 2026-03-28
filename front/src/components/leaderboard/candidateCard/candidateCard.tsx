import classNames from "classnames";
import type { LeaderboardEntry } from "recruiters-utils";
import style from "./candidateCard.module.css";
import MatchBadge from "../matchBadge/matchBadge";
import {
  FaUserTie,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

interface CandidateCardProps {
  entry: LeaderboardEntry;
  rank: number;
}

export default function CandidateCard({ entry, rank }: CandidateCardProps) {
  const getScoreClass = (score: number) => {
    if (score >= 85) return style.scoreHigh;
    if (score >= 60) return style.scoreMedium;
    return style.scoreLow;
  };

  return (
    <article className={style.card}>
      <header className={style.cardHeader}>
        <div className={style.headerTitle}>
          <span className={style.rank}>#{rank}</span>
          <h2>{entry.candidateName}</h2>
        </div>
        <div
          className={classNames(style.scoreBadge, getScoreClass(entry.score))}
        >
          {entry.score}
        </div>
      </header>

      <div className={style.matchBadges}>
        <MatchBadge
          label="Seniority"
          isMatch={entry.isSeniorityMatching}
          icon={FaUserTie}
        />
        <MatchBadge
          label="Education"
          isMatch={entry.isEducationMatcing}
          icon={FaGraduationCap}
        />
        <MatchBadge
          label="Location"
          isMatch={entry.isLocationAccessibleToWorkplace}
          icon={FaMapMarkerAlt}
        />
        <MatchBadge
          label="Salary"
          isMatch={entry.approximateSalaryMatch}
          icon={FaMoneyBillWave}
        />
      </div>

      <div className={style.cardBody}>
        <div className={style.textSection}>
          <h3>Summary</h3>
          <p>{entry.summary}</p>
        </div>

        <div className={style.textSection}>
          <h3>AI Reasoning</h3>
          <p>{entry.scoreReasoning}</p>
        </div>

        <div className={style.skillsGrid}>
          <div className={style.skillsList}>
            <h3>Key Skills</h3>
            <ul>
              {entry.keySkills.map((skill) => (
                <li key={skill} className={style.skillPill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className={style.skillsList}>
            <h3>Key Gaps</h3>
            <ul>
              {entry.keyGaps.map((gap) => (
                <li key={gap} className={style.gapPill}>
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
