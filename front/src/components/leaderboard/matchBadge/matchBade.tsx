import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import style from "./matchBadge.module.css";

interface MatchBadgeProps {
  label: string;
  isMatch: boolean;
  icon: React.ElementType;
}

export default function MatchBadge(props: MatchBadgeProps) {
  const { label, isMatch, icon: Icon } = props;

  return (
    <div
      className={`${style.badge} ${isMatch ? style.badgeMatch : style.badgeMiss}`}
    >
      <Icon className={style.badgeIcon} />
      <span>{label}</span>
      {isMatch ? (
        <FaCheckCircle className={style.statusIcon} />
      ) : (
        <FaTimesCircle className={style.statusIcon} />
      )}
    </div>
  );
}
