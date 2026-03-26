import { useState } from "react";
import type { JobDescription } from "../types/JobDescription";
import EmploymentTypeForm from "./EmploymentTypeForm";
import type { RemoteDays } from "../types/WeeklyTimeAtOffice";
import GenericInput from "./GenericInput";
import GenericArrayInput from "./ArrayInput";

export default function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState<JobDescription>({
    companyName: "",
    employmentType: "Full-Time",
    location: {},
    remoteDays: 5,
    responsibilities: [],
    title: "",
  });
  return (
    <form>
      <GenericInput
        label="Company Name"
        value={jobDescription.companyName}
        onChange={(value) => {
          setJobDescription((prev) => ({ ...prev, companyName: value }));
        }}
      />

      <GenericInput
        label="Job Title"
        value={jobDescription.title}
        onChange={(value) => {
          setJobDescription((prev) => ({ ...prev, title: value }));
        }}
      />
      <EmploymentTypeForm
        employmentType={jobDescription.employmentType}
        setJobDescription={setJobDescription}
      />

      <GenericInput
        label="Job Title"
        value={jobDescription.title}
        onChange={(value) => {
          setJobDescription((prev) => ({ ...prev, title: value }));
        }}
      />

      <GenericInput
        label="Remote Days"
        value={jobDescription.remoteDays}
        isValid={(value) =>
          !Number.isNaN(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 7
        }
        onChange={(value) => {
          setJobDescription((prev) => ({
            ...prev,
            remoteDays: value as unknown as RemoteDays,
          }));
        }}
      />
    </form>
  );
}
