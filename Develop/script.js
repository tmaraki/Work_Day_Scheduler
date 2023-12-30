console.log("script is working!");

$(function() {
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));

  var saveButtons = $(".saveBtn");
  saveButtons.on("click", function(event) {
    event.preventDefault();
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".userInput").val();
    localStorage.setItem(timeBlockId, userInput);

    // retrieving existing data
    var savedData = localStorage.getItem("timeBlocksData");
    var timeBlocksData = savedData ? JSON.parse(savedData) : {};

    // updating data object with the user input
    timeBlocksData[timeBlockId] = userInput;

    // saving updated data object back to local storage
    localStorage.setItem("timeBlocksData", JSON.stringify(timeBlocksData));
  });

  const currentHour = dayjs().hour();
  console.log("Current Hour:", currentHour);
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach((timeBlock) => {
    const blockHour = parseInt(timeBlock.id.split('-')[1]);
    if (blockHour < currentHour) {
      timeBlock.classList.add('past');
    } else if (blockHour === currentHour) {
      timeBlock.classList.add('present');
    } else {
      timeBlock.classList.add('future');
    }

    // retrieving saved data from local storage
    var savedData = localStorage.getItem("timeBlocksData");
    if (savedData) {
      var timeBlocksData = JSON.parse(savedData);
      var userInput = timeBlocksData[timeBlock.id];
      if (userInput) {
        $(timeBlock).find(".userInput").val(userInput);
      }
    }
  });
});