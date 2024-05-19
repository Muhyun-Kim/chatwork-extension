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
  let handled = false;

  mutations.forEach((mutation) => {
    if (
      (!handled && mutation.type === "characterData") ||
      mutation.type === "childList"
    ) {
      const target = mutation.target as HTMLElement;
      if (
        target &&
        target.parentElement?.classList.contains("chatRoomHeader__roomTitle")
      ) {
        handled = true;
        requestAnimationFrame(() => {
          convertInfoDivs();
        });
      }
    }
  });
});

const headObserver = new MutationObserver((mutations) => {
  let handled = false;
  mutations.forEach((mutation) => {
    if (!handled && mutation.type === "childList") {
      requestAnimationFrame(() => {
        addPreviewButton();
        handled = true;
      });
    }
  });
});

const config = { characterData: true, subtree: true };

const roomTitleText = document.querySelector("#_roomTitle h1 span");

const headElement = document.querySelector("head");

// 処理開始

window.addEventListener("load", () => {
  addPreviewButton();
  convertInfoDivs();
  const roomTitleSpan = document.querySelector("#_roomTitle h1 span");
  if (roomTitleSpan) {
    observer.observe(roomTitleSpan, config);
  } else {
  }
});

if (roomTitleText) {
  observer.observe(roomTitleText, config);
}

if (headElement) {
  headObserver.observe(headElement, { childList: true, subtree: true });
}
