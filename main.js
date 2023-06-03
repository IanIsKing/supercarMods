// Set Variables for the build and likes
let builds = [];
let likes = [5, 7, 3, 1, 9];

// on document load initialise the page
$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".nav a, a[href='#myPage']").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      let hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        900,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  // add an even listener to turbo-btn to alert the user that the button was clicked
  $(".turbo-btn").click(function () {
    showModal();
  });
  // add an event listener to the close button to close the modal
  $(".cancel").click(function () {
    closeModal();
  });
  // add an event listener to add the build to the builds array from the modal
  $("#addBuild").click(function () {
    addBuild();
  });

  // add a badge to show the number of builds
  if (sessionStorage.getItem("builds") === null) {
    console.log("No Builds");
  } else {
    builds = JSON.parse(sessionStorage.getItem("builds"));
    $("#buildsCount").text(builds.length);
  }

  // call the setLikes function
  setLikes();
  // call the shake function every 2 seconds
  setInterval(shake, 2000);

  // shake the turbo button
  function shake() {
    $(".turbo-btn")
      .animate({ left: "+=10" }, 70)
      .animate({ left: "-=20" }, 70)
      .animate({ left: "+=20" }, 70)
      .animate({ left: "-=20" }, 70)
      .animate({ left: "+=10" }, 70);
  }

  // set the options for the select boxes
  $("#turbo").change(function () {
    $("#ecu").empty();
    $("#mods").empty();
    $("#fuel").empty();
    $("#boost").empty();
    switch ($(this).val()) {
      case "4":
        $("#ecu")
          .empty()
          .append(
            '<option value="" disabled selected>Select ECU</option><option value="2">DS-1</option><option value="3">Stand alone (Syvecs)</option>'
          );
        break;
      default:
        $("#ecu")
          .empty()
          .append(
            '<option value="" disabled selected>Select ECU</option><option value="1">Software Flash</option><option value="2">DS-1</option><option value="3">Stand alone (Syvecs)</option>'
          );
    }
  });
  $("#ecu").change(function () {
    $("#mods").empty();
    $("#fuel").empty();
    $("#boost").empty();
    switch ($(this).val()) {
      case "1":
        $("#mods").append(
          '<option value="" disabled selected>Select Mods</option><option value="1">Mild exhaust + no engine mods</option><option value="2">Performance exhaust + no engine mods</option><option value="3">Performance exhaust, low Comp engine mods</option>'
        );
        break;
      case "2":
        $("#mods").append(
          '<option value="" disabled selected>Select Mods</option><option value="2">Performance exhaust + no engine mods</option><option value="3">Performance exhaust, low Comp engine mods</option><option value="4">Full Performance mods</option>'
        );
        break;
      case "3":
        $("#mods")
          .empty()
          .append(
            '<option value="" disabled selected>Select Mods</option><option value="3">Performance exhaust, low Comp engine mods</option><option value="4">Full Performance mods</option><option value="5">Billet performance mods</option>'
          );
    }
  });
  $("#mods").change(function () {
    $("#fuel").empty();
    $("#boost").empty();
    switch ($(this).val()) {
      case "1":
        $("#fuel").append(
          '<option value="" disabled selected>Select Fuel</option><option value="1">93/95 octain</option><option value="2">Race Fuel 100 octain</option>'
        );
        break;
      case "2":
        $("#fuel").append(
          '<option value="" disabled selected>Select Fuel</option><option value="1">93/95 octain</option><option value="2">Race Fuel 100 octain</option>'
        );
        break;
      case "3":
        $("#fuel").append(
          '<option value="" disabled selected>Select Fuel</option><option value="2">Race Fuel 100 octain</option><option value="3">E85 85% Ethonal</option>'
        );
        break;
      case "4":
        $("#fuel").append(
          '<option value="" disabled selected>Select Fuel</option><option value="3">E85 85% Ethonal</option><option value="4">100% Ethonal</option>'
        );
        break;
      case "5":
        $("#fuel").append(
          '<option value="" disabled selected>Select Fuel</option><option value="4">100% Ethonal</option>'
        );
    }
  });
  $("#fuel").change(function () {
    $("#boost").empty();
    switch ($(this).val()) {
      case "1":
        $("#boost").append(
          '<option value="" disabled selected>Select Boost</option><option value="1">Low Boost (0.5 bar)</option>'
        );
        break;
      case "2":
        $("#boost").append(
          '<option value="" disabled selected>Select Boost</option><option value="2">Mild Boost (1 bar)</option><option value="3">Performance Boost (1.5 bar)</option>'
        );
        break;
      case "3":
        $("#boost").append(
          '<option value="" disabled selected>Select Boost</option><option value="3">Performance Boost (1.5 bar)</option><option value="4">High Boost (2 Bar)</option>'
        );
        break;
      case "4":
        $("#boost").append(
          '<option value="" disabled selected>Select Boost</option><option value="4">High Boost (2 Bar)</option><option value="5">Extreme! (3 Bar)</option>'
        );
    }
  });
});

// add a testimonial
function addTestimonial() {
  let testimonial = $("#addTestimonialText").val();
  let name = $("#addTestimonialName").val();
  if (testimonial == "" || name == "") {
    alert("Please fill in all fields");
  } else {
    let htmlSelect = document.querySelector("#addedTestimonials");
    let testimonialItem = document.createElement("div");
    testimonialItem.innerHTML = `<p>"<em>${testimonial}</em> "- ${name}</p>`;
    htmlSelect.appendChild(testimonialItem);
    $("#addTestimonialText").val("");
    $("#addTestimonialName").val("");
  }
}

// set the likes
function setLikes() {
  if (sessionStorage.getItem("likes") === null) {
    sessionStorage.setItem("likes", JSON.stringify(likes));
  } else {
    likes = JSON.parse(sessionStorage.getItem("likes"));
  }
  for (let i = 0; i < likes.length; i++) {
    $("#likes" + i).text(likes[i]);
  }
}

// add a like
function addLike(index) {
  likes = JSON.parse(sessionStorage.getItem("likes"));
  likes[index] = likes[index] + 1;
  sessionStorage.setItem("likes", JSON.stringify(likes));
  setLikes();
}

// close modal
function closeModal() {
  // clear the input fields using jquery
  $("#title").val("");
  $("#turbo").val("");
  $("#ecu").val("");
  $("#mods").val("");
  $("#fuel").val("");
  $("#boost").val("");
  $("#notes").val("");

  // hide the modal and overlay using jquery
  $("#addBuild").show();
  $("#modal").hide();
  $("#overlay").hide();
}

// display modal
function showModal() {
  // show the modal and overlay using jquery
  $("#modal").show();
  $("#overlay").show();
}

function addBuild() {
  // get the values from the input fields using jquery
  let title = $("#title").val();
  let turbo = $("#turbo").val();
  let ecu = $("#ecu").val();
  let mods = $("#mods").val();
  let fuel = $("#fuel").val();
  let boost = $("#boost").val();
  let notes = $("#notes").val();
  // add the build to session storage
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    builds.push({
      title: title,
      turbo: turbo,
      ecu: ecu,
      mods: mods,
      fuel: fuel,
      boost: boost,
      notes: notes,
    });
    sessionStorage.setItem("builds", JSON.stringify(builds));
    sessionStorage.setItem("hasCodeRunBefore", true);
    alert("You have added your first build");
  } else {
    builds = JSON.parse(sessionStorage.getItem("builds"));
    builds.push({
      title: title,
      turbo: turbo,
      ecu: ecu,
      mods: mods,
      fuel: fuel,
      boost: boost,
      notes: notes,
    });
    sessionStorage.setItem("builds", JSON.stringify(builds));

    // alert the user that they have added a build
    if (builds.length == 1) {
      alert("You have added your first build");
    } else {
      alert("There are " + builds.length + " builds saved");
    }
  }
}
