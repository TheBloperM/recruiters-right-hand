import { Type, Schema } from "@google/genai";

export const generateSchema = (template: any): Schema => {
  if (Array.isArray(template)) {
    return {
      type: Type.ARRAY,
      items: generateSchema(template[0]), // Recursive call for array items
    };
  }

  if (typeof template === "object" && template !== null) {
    const properties: Record<string, Schema> = {};
    const keys = Object.keys(template);

    for (const key of keys) {
      properties[key] = generateSchema(template[key]);
    }

    return {
      type: Type.OBJECT,
      properties,
      required: keys,
    };
  }

  if (typeof template === "number") return { type: Type.NUMBER };
  if (typeof template === "boolean") return { type: Type.BOOLEAN };

  return { type: Type.STRING };
};
