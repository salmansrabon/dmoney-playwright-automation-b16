import fs from "fs";
import path from "path";
import { UserModel } from "../models/user.model.ts";
export function genearateRandomNumber(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber);
}

export function saveJsonData(jsonObjet: object, fileUrl: string): void {
  let dataArray: object[] = [];
  if (fs.existsSync(fileUrl)) {
    const fileContent = fs.readFileSync(fileUrl, "utf-8"); //readJSON
    dataArray = JSON.parse(fileContent);
  }
  dataArray.push(jsonObjet);
  fs.writeFileSync(fileUrl, JSON.stringify(dataArray, null, 2));
}
export function getLastUser(fileUrl: string): UserModel {
  const fileContent = fs.readFileSync(fileUrl, "utf-8");
  let dataArray = JSON.parse(fileContent);
  return dataArray[dataArray.length - 1];
}
export function saveEnvVar(
  key: string,
  value: string,
  envFilePath?: string
): void {
  const envPath = envFilePath || path.resolve(__dirname, "..", ".env");
  const newLine = `${key}=${value}`;
  const exists = fs.existsSync(envPath);

  let content = exists ? fs.readFileSync(envPath, "utf-8") : "";

  // Replace existing key or append if missing
  content = content.match(new RegExp(`^${key}=`, "m"))
    ? content.replace(new RegExp(`^${key}=.*`, "m"), newLine)
    : `${content.trim()}\n${newLine}\n`;

  fs.writeFileSync(envPath, content.trim() + "\n", "utf-8");
  console.log(`✅ Saved ${key} to ${envPath}`);
}
