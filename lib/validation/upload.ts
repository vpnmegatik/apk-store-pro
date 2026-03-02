import { z } from "zod";
import { AppError } from "@/lib/errors";

export const uploadPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(20).max(10000)
});

const APK_EXTENSIONS = [".apk", ".xapk"];
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export const MAX_APK_BYTES = 150 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export function assertApkFile(file: File) {
  const lower = file.name.toLowerCase();
  if (!APK_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    throw new AppError(400, "APK file must end with .apk or .xapk");
  }
  if (file.size > MAX_APK_BYTES) {
    throw new AppError(413, "APK file exceeds 150MB limit");
  }
}

export function assertImageFile(file: File) {
  const lower = file.name.toLowerCase();
  if (!IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    throw new AppError(400, "Image must be png, jpg, jpeg, or webp");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new AppError(413, "Image exceeds 10MB limit");
  }
}
