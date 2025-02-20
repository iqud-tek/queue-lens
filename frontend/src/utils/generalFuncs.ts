import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top

export const pageCount = (totalCount: number, pageSize: number) => {
  return Math.ceil(totalCount / pageSize);
};

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | string | undefined,
): string {
  if (!error) return "An unexpected error occurred.";

  if (typeof error === "string") return error; // Handle custom error messages

  if ("status" in error) {
    return `Error ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return error.message || "An unexpected error occurred.";
}
