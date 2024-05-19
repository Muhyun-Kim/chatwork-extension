const infoDivs = document.querySelectorAll('[data-cwopen="[info]"]');

infoDivs.forEach((div) => {
  const spanTags = div.querySelectorAll("span");
  console.log("run");

  spanTags.forEach((span) => {
    const text = span.innerText;
    const convertedHTML = convertMarkupToHTML(text);

    span.innerHTML = convertedHTML;
  });
});

function convertMarkupToHTML(markup: string): string {
  const converth1 = markup.replace(/#\s*(.*)/g, "<h1>$1</h1>");
  const converth2 = markup.replace(/##\s*(.*)/g, "<h2>$1</h2>");
  const converth3 = markup.replace(/###\s*(.*)/g, "<h3>$1</h3>");
  const converth4 = markup.replace(/####\s*(.*)/g, "<h4>$1</h4>");
  const converth5 = markup.replace(/#####\s*(.*)/g, "<h5>$1</h5>");
  const converth6 = markup.replace(/######\s*(.*)/g, "<h6>$1</h6>");

  return converth1 + converth2 + converth3 + converth4 + converth5 + converth6;
}
