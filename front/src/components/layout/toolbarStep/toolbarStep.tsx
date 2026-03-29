import classNames from "classnames";
import style from "./toolbarStep.module.css";
import type { NavigateFunction } from "react-router-dom";
import type { NavigationStep } from "@/types/navigationStep";

interface ToolbarStepProps {
  step: NavigationStep;
  index: number;
  currentPath: string;
  navigate: NavigateFunction;
  onExportClick?: () => boolean;
  isNextStepReady?: boolean;
  showDivider?: boolean;
}

export default function ToolbarStep({
  step,
  index,
  onExportClick,
  navigate,
  currentPath,
  isNextStepReady,
  showDivider,
}: ToolbarStepProps) {
  const isCurrentPath = Array.isArray(step.path)
    ? step.path.includes(currentPath)
    : currentPath === step.path;
  const isExportAction = onExportClick !== undefined;

  const handleClick = () => {
    if (onExportClick) {
      onExportClick();
    } else {
      navigate(Array.isArray(step.path) ? step.path[0] : step.path);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={step.isDisabled(isNextStepReady, currentPath)}
        className={classNames(style.stepBtn, {
          [style.active]: isCurrentPath && !isExportAction,
          [style.exportBtn]: isCurrentPath && isExportAction,
        })}
      >
        <span className={style.stepNum}>{index + 1}</span> {step.label}
      </button>

      {showDivider && <span className={style.stepDivider}></span>}
    </>
  );
}
