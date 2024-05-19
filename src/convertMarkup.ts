import { marked } from "marked";

export async function convertMarkupToHTML(markup: string): Promise<string> {
  try {
    return marked.parse(markup);
  } catch (error) {
    console.error("Error converting markup to HTML:", error);
    return markup;
  }
}
