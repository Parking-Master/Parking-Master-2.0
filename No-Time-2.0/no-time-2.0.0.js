(async () => {
  srcf = [];
  txtf = [];
  for (let i = 0; i < document.body.querySelectorAll("script").length; i++) {
    const dscr = document.body.querySelectorAll("script")[i];
    if (!dscr.getAttribute("src")) {
      dscr.src = "";
      txtf.push(dscr.textContent);
    }
    srcf.push(dscr.src);
    !dscr.src.includes("no-time") && dscr.remove();
  }
    txtflength = 0;
    for (let i = 0; i < srcf.length; i++) {
      const dscr = document.createElement("script");
      if (srcf[i].includes("data-refer=true")) {
        dscr.textContent = txtf[txtflength];
        txtflength += 1;
      } else {
        dscr.src = srcf[i];
      }
      document.body.appendChild(dscr);
    }
    window.stop();
})();