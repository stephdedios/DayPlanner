function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}

$(document).ready(function () {
  $("#today").text(moment().format("dddd, MMMM Do"));
  for (let i = 9; i < 18; i++) {
    var row = $(`<div data-time=${i} id='${i}' class="row">`);

    // COLUMN FOR HOURS
    var columnOne = $(
      '<div class="col-sm-2"> <p class= "hour" >' + formatAMPM(i) + "</p>"
    );

    // COLUMN FOR EVENTS
    var columnTwo = $(
      `<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Enter Event"></textarea>`
    );

    // COLUMN FOR SAVE BUTTON
    var columnThree = $(
      `<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`
    );

    row.append(columnOne);
    row.append(columnTwo);
    row.append(columnThree);

    $(".container").append(row);

    getLocalStorage(i);
  }

  // FORMATS TIME BETWEEN AM & PM
  function formatAMPM(hours) {
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
  }
  formatAMPM();

  //   UPDATES COLOR OF COLUMN BASED ON CURRENT TIME AND TIME LEFT BEFORE EOD
  function updateCurrentColor() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
      console.log(currentTime, $(`#${i}`).data("time"));
      if ($(`#${i}`).data("time") == currentTime) {
        $(`#text${i}`).addClass("present");
      } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass("future");
      }
    }
  }

  setInterval(function () {
    updateCurrentColor();
  }, 1000);

  //   SAVE BUTTON FOR EVENT ADDED
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function () {
    let eventId = $(this).attr("id");
    let eventText = $(this).parent().siblings().children(".description").val();
    localStorage.setItem(eventId, eventText);
  });
});
