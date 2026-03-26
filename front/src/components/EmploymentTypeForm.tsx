import type { Dispatch, SetStateAction } from "react";
import { EMPLOYMENT_TYPES, type EmploymentType } from "../types/EmployeeType";
import type { JobDescription } from "../types/JobDescription";

interface EmploymentTypeProps {
  employmentType?: EmploymentType;
  setJobDescription: Dispatch<SetStateAction<JobDescription>>;
}

export default function EmploymentTypeForm(props: EmploymentTypeProps) {
  return (
    <label>
      <span>Employment Type</span>
      <select
        defaultValue={EMPLOYMENT_TYPES[5]}
        onChange={({ target: { value } }) => {
          props.setJobDescription((prev) => ({
            ...prev,
            employmentType: value as EmploymentType,
          }));
        }}
      >
        {EMPLOYMENT_TYPES.map((employmentType) => (
          <option value={employmentType}>{employmentType}</option>
        ))}
      </select>
    </label>
  );
}
