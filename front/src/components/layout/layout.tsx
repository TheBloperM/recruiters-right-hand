import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useResumeStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { Toaster } from "react-hot-toast";
import style from "./layout.module.css";
import classNames from "classnames";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasResume } = useResumeStore(
    useShallow((state) => ({ hasResume: !!state.resume })),
  );

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
            // Dynamic class combining stepBtn and potentially active
            className={classNames(style.stepBtn, {
              [style.active]: location.pathname === "/",
            })}
          >
            <span className={style.stepNum}>1</span> Upload & Setup
          </button>

          <span className={style.stepDivider}></span>

          <button
            onClick={() => navigate("/output")}
            disabled={!hasResume}
            className={classNames(style.stepBtn, {
              [style.active]: location.pathname === "/output",
            })}
          >
            <span className={style.stepNum}>2</span> Tailored Output
          </button>
        </div>

        <div className={style.toolbarActions}>
          {/* Perfect spot for the Print button later! */}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
