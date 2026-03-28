import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useResumeStore } from "../../store";
import { Toaster } from "react-hot-toast";
import style from "./layout.module.css";
import classNames from "classnames";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resume } = useResumeStore();
  const printTargetRef = useRef<HTMLElement | null>(null);

  const handleExport = useReactToPrint({
    contentRef: printTargetRef,
    documentTitle: resume
      ? `${resume.name.replace(/\s+/g, "_")}_Resume`
      : "Tailored_Resume",
  });

  const onExportClick = () => {
    printTargetRef.current = document.getElementById("resume-print-target");
    handleExport();
  };
  return (
    <div className={style.appContainer}>
      <Toaster position="top-right" toastOptions={{ duration: 7000 }} />
      <nav className={style.toolbarContainer}>
        <div>
          <strong>ATS</strong> Optimizer
        </div>

        <div className={style.toolbarStepper}>
          <button
            onClick={() => navigate("/")}
            className={classNames(style.stepBtn, {
              [style.active]: location.pathname === "/",
            })}
          >
            <span className={style.stepNum}>1</span> Upload & Setup
          </button>

          <span className={style.stepDivider}></span>

          <button
            onClick={() => navigate("/output")}
            disabled={!resume}
            className={classNames(style.stepBtn, {
              [style.active]: location.pathname === "/output",
            })}
          >
            <span className={style.stepNum}>2</span> Tailored Output
          </button>

          <span className={style.stepDivider}></span>

          <button
            onClick={onExportClick}
            disabled={location.pathname !== "/output"}
            className={classNames(style.stepBtn, {
              [style.exportBtn]: location.pathname === "/output",
            })}
          >
            <span className={style.stepNum}>3</span> Export PDF
          </button>
        </div>

        <div className={style.toolbarActions}></div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
