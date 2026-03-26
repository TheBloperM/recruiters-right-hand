import style from "./contract.module.css";
import { MdContactPhone, MdEditLocation, MdEmail } from "react-icons/md";
import { IoLogoLinkedin, IoLogoGithub, IoPersonOutline } from "react-icons/io5";
import type { ContractData } from "recruiters-utils";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";

interface ContractProps {
  contractData: ContractData;
}

export default function Contract(props: ContractProps) {
  const size = "1.5rem";
  const color = "#4459a2";

  const keyToIcon: Record<
    keyof ContractData,
    { icon: IconType; linkPrefix?: string }
  > = {
    email: { icon: MdEmail, linkPrefix: "mailto:" },
    phoneNumber: { icon: MdContactPhone, linkPrefix: "tel:" },
    address: { icon: MdEditLocation },
    linkedin: { icon: IoLogoLinkedin, linkPrefix: "https://" },
    github: { icon: IoLogoGithub, linkPrefix: "https://" },
    protofolio: { icon: IoPersonOutline, linkPrefix: "https://" },
  };

  return (
    <div className={style.container}>
      {Object.keys(props.contractData).map((key) => {
        const contractKey = key as keyof ContractData;
        const { icon: Icon, linkPrefix } = keyToIcon[contractKey];
        let value: string | ReactNode = props.contractData[contractKey];

        if (linkPrefix) {
          value = (
            <a href={`${linkPrefix}${value}`} target="_blank">
              {value}
            </a>
          );
        }
        return (
          <div className={style.infoSet} key={key}>
            <Icon size={size} color={color} />
            {value}
          </div>
        );
      })}
    </div>
  );
}
