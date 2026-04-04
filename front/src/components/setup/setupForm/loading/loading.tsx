import classNames from "classnames";
import { IoReload } from "react-icons/io5";
import style from "./loading.module.css";

interface LoadingProps {
  isLoading: boolean;
  isModal?: boolean;
  iconSize?: string | number;
}
export function Loading({ isLoading, iconSize, isModal = true }: LoadingProps) {
  const isModalOpen = isLoading && isModal;
  const defaultIconSize = "20rem";

  return (
    <>
      {isLoading && (
        <div className={classNames({ [style.modal]: isModalOpen })}>
          <IoReload
            size={iconSize ?? defaultIconSize}
            className={style.loader}
          />
        </div>
      )}
    </>
  );
}
