import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../store";
import { Toaster } from "react-hot-toast";
import style from "./layout.module.css";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef } from "react";
import ToolbarStep from "./toolbarStep/toolbarStep";
import { useShallow } from "zustand/shallow";
import { NAVIGATION_CONFIG } from "@/utils/navigationUtils";
import { ViewMode } from "@/types/viewMode";
import { FaChevronDown } from "react-icons/fa";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeName, setViewMode, viewMode, hasLeaderboard } = useAppStore(
    useShallow((state) => ({
      resumeName: state.resume?.name,
      hasLeaderboard: !!state.leaderboard?.length,
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
    })),
  );
  const printTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isRecruiterPath =
      location.pathname.includes("recruiter") ||
      location.pathname.includes("leaderboard");
    const expectedMode = isRecruiterPath
      ? ViewMode.Recruiter
      : ViewMode.Candidate;

    if (viewMode !== expectedMode) {
      setViewMode(expectedMode);
    }
  }, [location.pathname, viewMode, setViewMode]);

  const handleExport = useReactToPrint({
    contentRef: printTargetRef,
    documentTitle: resumeName
      ? `${resumeName.replace(/\s+/g, "_")}_Resume`
      : "Tailored_Resume",
  });

  const onExportClick = (): boolean => {
    printTargetRef.current = document.getElementById("resume-print-target");
    handleExport();

    return true;
  };

  return (
    <div className={style.appContainer}>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 7000, className: style.toast }}
      />
      <nav className={style.toolbarContainer}>
        <div className={style.toolbarFlexContainer}>
          <span>
            <strong>ATS</strong> Optimizer
          </span>
          <div className={style.selectContainer}>
            <label htmlFor="mode-select" className={style.selectLabel}>
              Who Are You?:
            </label>
            <select
              id="mode-select"
              value={viewMode}
              className={style.selectViewMode}
              onChange={(e) => {
                setViewMode(e.target.value as "Candidate" | "Recruiter");
                navigate(`/${e.target.value.toLocaleLowerCase()}`);
              }}
            >
              {Object.values(ViewMode).map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            <FaChevronDown className={style.selectIcon} />
          </div>
        </div>

        <div className={style.toolbarFlexContainer}>
          {NAVIGATION_CONFIG[viewMode].map((step, index) => (
            <ToolbarStep
              key={step.label}
              index={index}
              step={step}
              navigate={navigate}
              currentPath={location.pathname}
              onExportClick={step.isExport ? onExportClick : undefined}
              showDivider={index < NAVIGATION_CONFIG[viewMode].length - 1}
              isNextStepReady={
                viewMode === ViewMode.Candidate ? !!resumeName : hasLeaderboard
              }
            />
          ))}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
