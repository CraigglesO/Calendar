var usrTrackerDay = 0;
var usrTrackerMonth = 0;
var usrTrackerYear = 0;
const month = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];



$(document).on('click', ".day", function(e) {
  $(".calendar").fadeOut(200);
  let monthYear = $("#month-name").text();
  monthYear = monthYear.replace(' ','');
  monthYear = monthYear.split(' ');
  let m = month.indexOf(monthYear[0])+1;
  let y = monthYear[1];
  let targ = e.currentTarget;
  targ = targ.id.toString();
  targ = targ.replace('day-','');
  $("#c-input").val(`${m}-${targ}-${y}`);
});

$(document).on('click', ".day-today", function(e) {
  $(".calendar").css({"display":"none"});
  console.log('the date...');
});

$(document).ready(function(){
  $(".calendar").fadeOut(0);

  createCalendar();

  $("#c-input").click(() => {
    $(".calendar").fadeIn(700);
    $(document).mouseup(function (e)
    {
        var container = $(".calendar");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.fadeOut(200);
        }
    });
  });

  $("#arrow-left").click(() => {
    $(".day-ntm").remove();
    $(".day").remove();
    $(".day-today").remove();
    //reload with new month:
    usrTrackerMonth--;
    createCalendar();
  });

  $("#arrow-right").click(() => {
    $(".day-ntm").remove();
    $(".day").remove();
    $(".day-today").remove();
    //reload with new month:
    usrTrackerMonth++;
    createCalendar();
  });
});



function createCalendar() {
  var day;
  let now = new Date();
  let today = new Date(now.getFullYear() + usrTrackerYear, now.getMonth() + usrTrackerMonth, now.getDate() + usrTrackerDay);
  let thisMonth = today.getMonth();
  let thisDay = today.getDay(); //day of the week (Sun, Mon, Tue...)
  let thisYear = today.getFullYear();
  let todaysDate = today.getDate(); //day of 30ish days
  let lastDay = new Date(thisYear, thisMonth + 1, 0);
  let lastDayDate = lastDay.getDate();

  //set the month and year:
  let monthDisplay = ` ${month[thisMonth]} ${thisYear} `;
  $("#month-name").text(monthDisplay);

  //lets make our Calendar!!!
  let cSize = 42;

  let firstOfMonth = new Date(thisYear, thisMonth, 1);
  let prevMonthCount = firstOfMonth.getDay();

  //Month Before
  for (let x = prevMonthCount; x > 0; x--){
    let lastDayMonthPrior = new Date(thisYear, thisMonth, 1-x);
    day = lastDayMonthPrior.getDate();
    $(".days-flex").append(`<div class="day-ntm"><text class="day-text" style="">${day}</text></div>`);
    cSize--;
  }

  //This Month
  for (let x = 1; x <= lastDayDate; x++){
    day = x;
    if (x === todaysDate && usrTrackerMonth === 0 && usrTrackerYear === 0){
      $(".days-flex").append(`<div id="day-${day}" class="day-today" style="transition:0.6s;"><text class="day-text" style="">${day}</text></div>`);
    }
    else {
      $(".days-flex").append(`<div id="day-${day}" class="day" style="transition:0.6s;"><text class="day-text" style="">${day}</text></div>`);
    }
    cSize--;
  }

  //Month After
  for (let x = 0; x < cSize; x++){
    day = x + 1;
    $(".days-flex").append(`<div class="day-ntm" style="transition:0.6s;"><text class="day-text" style="">${day}</text></div>`);
  }

}
