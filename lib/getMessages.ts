import fs from "fs";
import path from "path";

export const getMessages = (locale: string) => {
  try {
    const filePath = path.resolve(process.cwd(), "messages", `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return null;
  }
}