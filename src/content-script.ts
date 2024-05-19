import { addPreviewButton } from "./previewButton";
import { convertMarkupToHTML } from "./convertMarkup";

async function convertInfoDivs() {
  const infoDivs = document.querySelectorAll('[data-cwopen="[info]"]');

  for (const div of infoDivs) {
    const spanTags = div.querySelectorAll("span");

    for (const span of spanTags) {
      const text = span.innerText;
      const convertedHTML = await convertMarkupToHTML(text);

      span.innerHTML = convertedHTML;
    }
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      requestAnimationFrame(addPreviewButton);
    }
  });
});

const config = { childList: true, subtree: true };

const headElement = document.querySelector("head");
if (headElement) {
  observer.observe(headElement, config);
}

window.addEventListener("load", () => {
  addPreviewButton();
  convertInfoDivs();
});
