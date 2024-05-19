import { convertMarkupToHTML } from "./convertMarkup";

export function addPreviewButton() {
  const textArea = document.getElementById("_chatText") as HTMLTextAreaElement;
  const existingPreviewButton = document.getElementById("previewButton");

  if (existingPreviewButton) {
    return;
  }

  if (textArea) {
    const previewButton = document.createElement("button");
    previewButton.id = "previewButton";
    previewButton.textContent = "プレビュー";
    previewButton.style.display = "block";
    previewButton.style.marginBottom = "10px";
    previewButton.style.padding = "5px 10px";
    previewButton.style.cursor = "pointer";

    const previewArea = document.createElement("div");
    previewArea.id = "previewArea";
    previewArea.style.display = "none";
    previewArea.style.marginTop = "10px";
    previewArea.style.padding = "10px";
    previewArea.style.border = "1px solid #ccc";
    previewArea.style.backgroundColor = "#f9f9f9";

    const warningMessage = document.createElement("div");
    warningMessage.id = "warningMessage";
    warningMessage.textContent = "[info] 태그를 포함하여 작성해주세요.";
    warningMessage.style.display = "none";
    warningMessage.style.marginTop = "10px";
    warningMessage.style.padding = "10px";
    warningMessage.style.border = "1px solid #ff0000";
    warningMessage.style.backgroundColor = "#ffe6e6";
    warningMessage.style.color = "#ff0000";

    let isPreviewing = false;

    previewButton.addEventListener("click", async () => {
      const markdownText = textArea.value;

      if (
        !markdownText.includes("[info]") ||
        !markdownText.includes("[/info]")
      ) {
        warningMessage.style.display = "block";
        previewArea.style.display = "none";
        textArea.style.display = "block";
        previewButton.textContent = "プレビュー";
        isPreviewing = false;
        return;
      }

      warningMessage.style.display = "none";

      if (isPreviewing) {
        textArea.style.display = "block";
        previewArea.style.display = "none";
        previewButton.textContent = "プレビュー";
      } else {
        const htmlContent = await convertMarkupToHTML(markdownText);
        previewArea.innerHTML = htmlContent;
        textArea.style.display = "none";
        previewArea.style.display = "block";
        previewButton.textContent = "入力";
      }
      isPreviewing = !isPreviewing;
    });

    textArea.parentElement?.insertBefore(previewButton, textArea);
    textArea.parentElement?.appendChild(previewArea);
    textArea.parentElement?.appendChild(warningMessage);
  }
}
