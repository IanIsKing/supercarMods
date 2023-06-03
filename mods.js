// On document load, run myLoad function
$(document).ready(function () {
  myLoad();
});

// initialise the builds array
let modsLookUp = {
  morot: [
    "Gallardo 5.0L V10",
    "Gallardo 5.2L LP560-4",
    "Huracán 5.2L LP580-2",
    "Huracán 5.2L LP610-4",
    "Huracán 5.2L LP640-4",
  ],
  turbo: [
    "Twin Garret GT35",
    "Twin Garret GTX35",
    "Twin Garret G35",
    "Twin Garret G42",
  ],
  ecu: ["Software Flash", "DS-1", "Stand alone (Syvecs)"],
  mods: [
    "Mild exhaust + no engine mods",
    "Performance exhaust + no engine mods",
    "Performance exhaust, low Comp engine mods",
    "Full Performance mods",
    "Billet performance mods",
  ],
  fuel: [
    "93/95 octain",
    "Race Fuel 100 octain",
    "E85 85% Ethonal",
    "100% Ethonal",
  ],
  boost: [
    "Low Boost (0.5 bar)",
    "Medium Boost (1.0 bar)",
    "Performance Boost (1.5 bar)",
    "High Boost (2 Bar)",
    "Extreme Boost (3 Bar)",
  ],
};

// add the builds to the screen
function myLoad() {
  let htmlSelect = document.querySelector(".builds");
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("mods", JSON.stringify(builds));
    console.log("code has not run before");
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    builds = JSON.parse(sessionStorage.getItem("builds"));
    console.log(builds);
    let i = 0;
    builds.forEach(function (m) {
      let modItem = document.createElement("div");
      modItem.classList.add("build"); // Add the "mods" class to the created div
      modItem.innerHTML = `<h2>${m.title}</h2><p>${
        modsLookUp.turbo[m.turbo - 1]
      }</p>
      <p>${modsLookUp.ecu[m.ecu - 1]}</p>
      <p>${modsLookUp.mods[m.mods - 1]}</p>
      <p>${modsLookUp.fuel[m.fuel - 1]}</p>
      <p>${modsLookUp.boost[m.boost - 1]}</p>
      <p>${m.notes}</p>
      <button onclick="deleteBuild(${i})" class="delete">Delete Build</button>`;
      modItem.value = i;
      i = i + 1;
      htmlSelect.appendChild(modItem);
    });
  }
}

// delete the build from the builds array and reload the window
function deleteBuild(index) {
  builds = JSON.parse(sessionStorage.getItem("builds"));
  builds.splice(index, 1);
  sessionStorage.setItem("builds", JSON.stringify(builds));
  console.log("Deleted build at index " + index);
  console.log("Builds are now " + JSON.stringify(builds));
  window.location.reload();
}
