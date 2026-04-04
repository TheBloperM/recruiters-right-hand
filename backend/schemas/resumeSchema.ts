import { Schema } from "@google/genai";
import { Resume, SkillLevelType } from "recruiters-utils";
import { generateSchema } from "#utils/schemasFactory.util.js";

const resumeTemplate: Resume = {
  name: "",
  professionalTitle: "",
  description: "",
  contractData: {
    linkedin: "",
    email: "",
    protofolio: "",
    github: "",
    phoneNumber: "",
    address: "",
  },
  skillsAndTechnologies: {
    softSkills: [{ name: "", level: "1" as SkillLevelType }],
    programmingLanguages: [{ name: "", level: "1" as SkillLevelType }],
    technologies: [{ name: "", level: "1" as SkillLevelType }],
    spokenLanguages: [{ name: "", level: "1" as SkillLevelType }],
  },
  interests: [""],
  education: [
    {
      nameOfTitle: "",
      educationPlace: "",
      mainSubjects: [""],
      startingYear: 0,
      endingYear: 0,
    },
  ],
  experience: [
    {
      workPlace: "",
      industry: "",
      jobsData: [
        {
          title: "",
          startDate: "",
          endDate: "",
          comments: [""],
        },
      ],
    },
  ],
};

export const resumeSchema: Schema = generateSchema(resumeTemplate);

const skillTypes = ["softSkills", "programmingLanguages", "technologies"];
skillTypes.forEach((key) => {
  const itemSchema = (resumeSchema.properties!.skillsAndTechnologies as any)
    .properties[key].items;
  itemSchema.properties.level.enum = ["1", "2", "3", "4", "5"];
});
