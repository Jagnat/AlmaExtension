
// Constants
var NOTE_CLASS_NAME = "innerContainer";
var SEARCH_TERM = "equipment checkout";
var CONFIRM_MSG = "User hasn't signed checkout agreement!\nOpen page?"
var PATRON_ELEMENT = "pageBeanfullPatronName"
var SLEEP_TIME = 500

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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
async function handle_div(event) {
  // Get all tables loaded under this content
  var tables = event.getElementsByTagName("table");
  var patron_el = document.getElementById(PATRON_ELEMENT);  // for existence check

  // If there isnt 1 table or we cant find the patron element
  // we're not on the user page
  if (tables.length != 1 || patron_el == null) {
    return;
  }

  var table_text = tables[0].innerText.toLowerCase();

  if (table_text.includes(SEARCH_TERM)) {
    console.log("User has permissions!");
  } else {
    await sleep(SLEEP_TIME);
    if (window.confirm(CONFIRM_MSG)) {
      chrome.runtime.sendMessage({act: "openPage"}, function(response) {
        console.log(response.result);
      });
    }
  }
}

// Register a "load" event listener which is triggered whenever content is told to load
console.log("loaded");
document.addEventListener("load", load_listener, true);
