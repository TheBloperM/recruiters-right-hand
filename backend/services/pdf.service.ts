import { PDFParse } from "pdf-parse";

const defaultMaxFiles = 20;

export async function extractTextFromFiles(
  file: Express.Multer.File,
): Promise<string>;
export async function extractTextFromFiles(
  files: Express.Multer.File[],
): Promise<string[]>;
export async function extractTextFromFiles(
  input: Express.Multer.File[] | Express.Multer.File,
): Promise<string[]>;

export async function extractTextFromFiles(
  input: Express.Multer.File | Express.Multer.File[],
): Promise<string | string[]> {
  if (!input || (Array.isArray(input) && input.length === 0)) {
    throw new Error("No files provided for parsing.");
  }

  const parseSingleFile = async (file: Express.Multer.File) => {
    const pdfData = new PDFParse(new Uint8Array(file.buffer));
    const result = await pdfData.getText();
    return result.text;
  };

  if (Array.isArray(input)) {
    console.log(`Parsing ${input.length} files`);

    const maxFiles = process.env.MAX_FILES ?? defaultMaxFiles;

    if (input.length > +maxFiles) {
      throw new Error("Please upload at most 20 files.");
    }
    return Promise.all(input.map(parseSingleFile));
  }

  console.log(`Parsing a single file`);

  return parseSingleFile(input);
}
