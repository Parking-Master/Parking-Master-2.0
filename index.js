Parse.initialize("n7dcRgc7NMmI9SZtVOIRVif1ZsbzNVZVHIt0UoCZ", "uUO6Phxaq7AKU5rSbPYLJDU1N93yI63BazkMKbee");
Parse.serverURL = "https://parseapi.back4app.com/";
function getCookie(e){let t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}
(function() {
  if (localStorage["p"]) {
    let pts = parseFloat(localStorage["p"], 0);
    localStorage.removeItem("p");
    if (getCookie("username") && getCookie("password")) {
      (async () => {
        const User = Parse.Object.extend("User");
        const userQuery = new Parse.Query(User);
        const userPreResult = await userQuery.find();
        for (let i = 0; i < userPreResult.length; i++) {
          const User2 = Parse.Object.extend("User");
          const userPreResult2 = new Parse.Query(User2);
          userPreResult2.get(userPreResult[i].id).then((user) => {
            if (user.get("username") == getCookie("username") && user.get("password") == getCookie("password")) {
              user.set("points", (parseFloat(user.get("points"), 0) + pts).toString());
            }
          });
        }
      })();
    } else {
      localStorage.setItem("current_pts", (parseFloat(localStorage["current_pts"], 0) + pts).toString());
    }
  }
})();
window.opened = false;
function getMonthFromString(mon) {
  return new Date(Date.parse(mon +" 1, 2012")).getMonth() +1;
}
tippy('[data-tippy-content]');
tippy('[data-tippy-arrow]');
tippy('[data-tippy-theme]');
!localStorage["current_lvl"] && (localStorage["current_lvl"] = "lvl0");
!localStorage["current_pts"] && (localStorage["current_pts"] = "0");
!localStorage["owned_cars"] && (localStorage["owned_cars"] = "0");
let pts = 0;
if (document.cookie.indexOf("username=") > -1) {
  pts = getCookie("points");
  document.querySelectorAll(".learn-more")[1].remove();
  document.querySelector(".learn-more").querySelector("a span").textContent = "log out";
  document.querySelector(".learn-more").querySelector("a").href = "login.html?logout=1";
}
setInterval(() => (((getCookie("username") ? getCookie("points") : localStorage["current_pts"]) != pts && (pts += 1)), document.querySelector("#points").textContent = pts), 10);
(async () => {
  const AllLobbies = Parse.Object.extend("Lobby");
  const activeLobbies = new Parse.Query(AllLobbies);
  const lobbyResults = await activeLobbies.find();
  for (let i = 0; i < lobbyResults.length; i++) {
    const ActiveLobbies = Parse.Object.extend("Lobby");
    const lobbies = new Parse.Query(ActiveLobbies);
    lobbies.get(lobbyResults[i].id).then((lobbyName) => {
      const lobby = { name: lobbyName.get("lobbyName"), time: lobbyName.get("createdAt") };
      let month = (getMonthFromString(lobby.time.toString().split(" ").splice(1)[0]));
      let currentMonth = (new Date()).getMonth() +1;
      let compareMonth = currentMonth - month;
      let date = ((lobby.time.toString().split(" ").splice(2)[0]));
      let currentDate = (new Date()).getDate();
      let compareDate = currentDate - date;
      let time = parseFloat((lobby.time.toString().split(" ").splice(4)[0]).split(":")[0]);
      let currentTime = (new Date()).getHours();
      let dateList = {};
      dateList.months = compareMonth;
      dateList.days = compareDate;
      if (dateList.months >= 0 && (dateList.days >= 1 || (dateList.days == 1 && currentTime > time))) {
        lobbies.get(lobbyResults[i].id).then((data) => {
          data.destroy().then((data) => {
          }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
          })
        }, (error) => {
          // The object was not retrieved successfully.
        });

      }
      document.querySelector(".currentLobbies").innerHTML += `
        <a href="multiplayer.html?channel=${lobby.name}">&quot;${lobby.name}&quot;&nbsp;&nbsp;:&nbsp;&nbsp;${lobby.time.toString().split(" ").reverse().splice(4).reverse().splice(1).join(" ").split(":").reverse().splice(1).reverse().join(":")}</a>
        <br>
      `;
    }, (error) => {
      // The object was not retrieved successfully.
    });
  }
})();
function multiplayer() {
  simple.prompt("Enter lobby name (at least 2 characters):", "", (name) => {
    if (name.length >= 2 && name.length <= 10) {
      simple.confirm("Parking Master 2.0 Multiplayer involves interacting with players via chat. You can block another player by clicking the menu and selecting \"Block Player\". If you prefer to not play against real players, you can play against a bot by clicking the \"Start bot\" link on the start dialog. By creating a lobby, I agree to Parking Master 2.0's Terms of Service & Privacy Policy", () => {
        const Lobbies = Parse.Object.extend("Lobby");
        const lobby = new Lobbies();
        
        lobby.set("lobbyName", name);
        lobby.set("createdAt", ((new Date).toString().split(" ").reverse().splice(4).reverse().join(" ").split(" ")[0] + ", ") + (new Date).toString().split(" ").reverse().splice(4).reverse().splice(1).join(" "));
        
        lobby.save().then((result) => {
          location.assign("multiplayer.html?channel=" + name);
        }, (error) => {
          simple.alert("Error: Failed to create lobby. Check console for error or contact support.");
          console.log(error);
        });
      });
      document.querySelector(".swal-button--confirm").textContent = "Confirm";
    }
  });
}
function multiplayerBot(name) {
  document.querySelector(".currentLobbies").innerHTML += `
    <a href="multiplayer.html?channel=Example" onclick="event.preventDefault(); simple.alert('This is an example lobby. Find an active lobby in this list, or create a new one.')">&quot;Example&quot;&nbsp;&nbsp;:&nbsp;&nbsp;${(new Date).toString().split(" ").splice(1).reverse().splice(4).reverse().join(" ").split(":").reverse().splice(1).reverse().join(":")}</a>
    <br>
  `;
}
multiplayerBot("Example");
function openLobbies() {
  if (!opened) {
    opened = true;
    return document.querySelector(".lobbies").style.top = "0px";
  }
  opened = false;
  document.querySelector(".lobbies").style.top = "-215px";
}
