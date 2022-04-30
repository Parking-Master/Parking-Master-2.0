(function() {
  let cursor = document.createElement("div");
  cursor.id = "fake_cursor";
  cursor.style = "position: absolute;z-index: 9999;background: #ddd;border-radius: 100%;width: 10px;height: 10px;outline: 1px solid #ddd;border: 1.5px solid #fff;box-shadow: 0 0 3px #ddd;-moz-box-shadow: 0 0 3px #ddd;-webkit-box-shadow: 0 0 10px 1px #ddd;";
  document.body.appendChild(cursor);
  window.onmousemove = function(e) {
    document.querySelector("#fake_cursor").style.left = e.clientX + "px";
    document.querySelector("#fake_cursor").style.top = e.clientY + "px";
  }
})();
function capture(frames, speed, time) {
  frames = [];
  let start = setInterval(() => html2canvas(document.documentElement).then(function(canvas) {
    let base64image = canvas.toDataURL("image/jpeg");
    frames.push(base64image);
  }), frames);
  setTimeout(() => {
    let framelength = 0;
    clearInterval(start);
    const img = document.createElement("img");
    img.style.width = "80%";
    return img;
    setInterval(function() {
      if (framelength >= frames.length) {
        return
      }
      img.src = frames[framelength];
      framelength += 1;
    }, 80);
  }, (time * 1000));
}
