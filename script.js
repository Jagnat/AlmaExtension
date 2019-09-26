
// Constants
var NOTE_CLASS_NAME = "innerContainer";
var SEARCH_TERM = "equipment checkout";
var CONFIRM_MSG = "User hasn't signed checkout agreement!\nOpen page?"


// Load listener
function load_listener(event) {
  var events = event['path'];

  // Iterate over each event and see if its the DIV we care about
  for (var i=0; i < events.length; i++) {
    // If so, handle it and break
    if (events[i].className == NOTE_CLASS_NAME) {
      handle_div(events[i]);
      break;
    }
  }
}

// Handles checking user info
function handle_div(event) {
  // Get all tables loaded under this content
  var tables = event.getElementsByTagName("table");
  var popup = true;

  // Iterate over each table and see if its inner text has the keyword we want
  for (var i=0; i < tables.length; i++) {
    var table_text = tables[i].innerText.toLowerCase();

    // If so, the user is free to checkout and no popup is wanted
    if (table_text.includes(SEARCH_TERM)) {
      popup = false;
      break;
    }
  }

  // Otherwise we send a message to a background script to make a new incognito window
  if (popup) {
    console.log("User doesn't have permissions!");

    // Open confirmation dialog box
    if (window.confirm(CONFIRM_MSG)) {
      chrome.runtime.sendMessage({act: "openPage"}, function(response) {
        console.log(response.result);
      });
    }
  } else {
    console.log("User has permissions!");
  }
}

// Register a "load" event listener which is triggered whenever content is told to load
console.log("loaded");
document.addEventListener("load", load_listener, true);
