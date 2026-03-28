import classNames from "classnames";
import style from "./toolbarStep.module.css";
import type { NavigateFunction } from "react-router-dom";
import type { NavigationStep } from "@/types/navigationStep";

interface ToolbarStepProps {
  step: NavigationStep;
  index: number;
  onExportClick?: () => boolean;
  navigate: NavigateFunction;
  currentPath?: string;
  isNextStepReady?: boolean;
  showDivider?: boolean;
}

export default function ToolbarStep(props: ToolbarStepProps) {
  const { step, index } = props;

  return (
    <>
      <button
        key={`${step.label}-button`}
        onClick={() => props.onExportClick?.() ?? props.navigate(step.path)}
        disabled={step.isDisabled(props.isNextStepReady, props.currentPath)}
        className={classNames(style.stepBtn, {
          [style.active]:
            props.currentPath === step.path &&
            props.onExportClick === undefined,
          [style.exportBtn]:
            props.currentPath === step.path &&
            props.onExportClick !== undefined,
        })}
      >
        <span className={style.stepNum}>{index + 1}</span> {step.label}
      </button>
      {props.showDivider && <span className={style.stepDivider}></span>}
    </>
  );
}
