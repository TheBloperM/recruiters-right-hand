import { Type } from "@google/genai";

const skillSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    level: {
      type: Type.STRING,
      enum: ["1", "2", "3", "4", "5"],
      description: "Proficiency level from 1 (beginner) to 5 (master).",
    },
  },
  required: ["name", "level"],
};

export const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    professionalTitle: {
      type: Type.STRING,
      description:
        "A compelling job title that reflects the candidate's expertise.",
    },
    description: {
      type: Type.STRING,
      description:
        "A highly compelling professional summary for the candidate.",
    },
    contractData: {
      type: Type.OBJECT,
      properties: {
        linkedin: {
          type: Type.STRING,
          description:
            "if given linkedIn URL in the original resume, use it. If not, fabricate a realistic LinkedIn URL based on the candidate's name (e.g., linkedin.com/in/john-doe).",
        },
        email: {
          type: Type.STRING,
          description:
            "if given email in the original resume, use it. If not, fabricate a realistic email address based on the candidate's name (e.g., john.doe@example.com).",
        },
        protofolio: {
          type: Type.STRING,
          description:
            "if given portfolio URL in the original resume, use it. If not, fabricate a realistic portfolio URL based on the candidate's name (e.g., johndoe.dev).",
        },
        github: {
          type: Type.STRING,
          description:
            "if given GitHub URL in the original resume, use it. If not, fabricate a realistic GitHub URL based on the candidate's name (e.g., github.com/johndoe).",
        },
        phoneNumber: {
          type: Type.STRING,
          description:
            "if given phone number in the original resume, use it. If not, fabricate a realistic phone number formatted as (XXX) XXX-XXXX, used for job applications",
        },
        address: { type: Type.STRING, description: "city and country" },
      },
      required: [
        "linkedin",
        "email",
        "protofolio",
        "github",
        "phoneNumber",
        "address",
      ],
    },
    skillsAndTechnologies: {
      type: Type.OBJECT,
      properties: {
        softSkills: { type: Type.ARRAY, items: skillSchema },
        programmingLanguages: { type: Type.ARRAY, items: skillSchema },
        technologies: { type: Type.ARRAY, items: skillSchema },
      },
      required: ["softSkills", "programmingLanguages", "technologies"],
    },
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Candidate's interests and passions, does not need to be work-related.",
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nameOfTitle: { type: Type.STRING },
          educationPlace: { type: Type.STRING },
          mainSubjects: { type: Type.ARRAY, items: { type: Type.STRING } },
          startingYear: { type: Type.INTEGER },
          endingYear: { type: Type.INTEGER },
        },
        required: [
          "nameOfTitle",
          "educationPlace",
          "mainSubjects",
          "startingYear",
          "endingYear",
        ],
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          workPlace: { type: Type.STRING },
          industry: { type: Type.STRING },
          jobsData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                startDate: { type: Type.STRING, description: "e.g., Jan 2020" },
                endDate: {
                  type: Type.STRING,
                  description: "e.g., Present or Dec 2023",
                },
                comments: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description:
                    "Resume bullet points using strong action verbs and quantifiable metrics.",
                },
              },
              required: ["title", "startDate", "endDate", "comments"],
            },
          },
        },
        required: ["workPlace", "jobsData", "industry"],
      },
    },
  },
  required: [
    "name",
    "description",
    "contractData",
    "skillsAndTechnologies",
    "interests",
    "education",
    "experience",
  ],
};
