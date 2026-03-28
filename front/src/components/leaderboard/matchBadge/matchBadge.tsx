import classNames from "classnames";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import style from "./matchBadge.module.css";
import type { ElementType } from "react";

interface MatchBadgeProps {
  label: string;
  isMatch: boolean;
  icon: ElementType;
}

export default function MatchBadge({ label, isMatch, icon }: MatchBadgeProps) {
  const Icon = icon;

  return (
    <div
      className={classNames(style.badge, {
        [style.badgeMatch]: isMatch,
        [style.badgeMiss]: !isMatch,
      })}
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
