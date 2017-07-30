var TIMEOUT_VALUE = 50;
var LOAD_DELAY = 100;
var TIMEOUT_ATTEMPTS_LIMIT = 10;
var PATRON_SERVICES_TITLE = "Patron Services"
var MANAGE_ITEM_RETURNS_TITLE = "Manage Item Returns"

var attempt = 1;


var websiteTitle = document.title

if (websiteTitle == PATRON_SERVICES_TITLE)
{
  window.setTimeout(checkForCheckouts, LOAD_DELAY)
  
  // Programmatically click button, call function to wait for loading
  var btn = document.getElementById("fulfillmentpatronServicesuser_notes");
  if (btn)
  {
    btn.click();
    window.setTimeout(isLoadingDone, TIMEOUT_VALUE);
  }
}
else if (websiteTitle == MANAGE_ITEM_RETURNS_TITLE)
{
  window.setTimeout(checkForCheckins, LOAD_DELAY)
}

function checkForCheckouts()
{
  var BARCODE_PREFIX = "HREF_INPUT_SELENIUM_ID_loanList_ROW_"
  var BARCODE_SUFFIX = "_COL_itemLoanbarcode"
  var ITEM_NAME_PREFIX = "SPAN_SELENIUM_ID_returnList_ROW_"
  var ITEM_NAME_SUFFIX = "_COL_itemLoanbarcode"
  var PATRON_DETAILS_ID = "EXLPatronDetailsRow"
  
  
  var arrayOfItems = []
  
  var i = 0
  while (true)
  {
    var id = '' + i
    
    var barcode_id = BARCODE_PREFIX + id + BARCODE_SUFFIX 
    var item_name_id = ITEM_NAME_PREFIX + id + ITEM_NAME_SUFFIX
    
    var barcode = document.getElementById(barcode_id).value
    var item_name = document.getElementById(item_name_id).value
    
    if (barcode == null)
    {
      break
    }
    
    arrayOfItems.push([barcode, barcode_id])
    
    i++
  }
  
  if (i == 0)
  {
    return
  }
  
  var patronDetails = document.getElementsById(PATRON_DETAILS_ID)
  // The first element contains the patron's name in a 'lastName, firstName' format
  // We grab the first element, split it on the ', ' and grab the second element for the first name
  var patronFirstName = patronDetails[0].value.split(", ")[1]
  // The second element is simply the w number
  var patronWNumber = patronDetails[1].value
  
  for (var i = 0; i < arrayOfItems.length; i++)
  {
    item = arrayOfItems[i]
    
    // TODO: Check database to see if  items is in database table yet, if not, add it in the format of...
  // itemBarcode | itemName | patronWNumber | patronFirstName
    // mysqlHandler(?).add(item[0], item[1], patronWNumber, patronFirstName)
  }
}

function checkForCheckins()
{
  var BARCODE_PREFIX = "SPAN_SELENIUM_ID_returnList_ROW_"
  var BARCODE_SUFFIX = "_COL_itemLoanbarcode"
  
  var i = 0
  while (true)
  {
    var id = '' + i
    var barcode_id = BARCODE_PREFIX + id + BARCODE_SUFFIX
    
    var barcode = document.getElementsById(barcode_id).value
    
    if (barcode == null)
    {
      break
    }
    
    # TODO: Check database to remove barcode if it exists. Barcode is our key
    // mysqlHandler(?).remove(barcode)
    
    i++
  }
}

// Recursively check and see if loading has finished
function isLoadingDone()
{
	var e = document.getElementById("fulfillmentpatronServicesuser_notes_span")
	if (e.className.includes("tabSelected"))
	{
		// If we are loaded
		checkUserNotes();
    return
	}
  
  // Otherwise, time out again
  attempt++
  
  if (attempt > TIMEOUT_ATTEMPTS_LIMIT) {
    console.log("Timeout on loading user notes tab")
    return
  }
  
  window.setTimeout(isLoadingDone, TIMEOUT_VALUE);
}

function checkUserNotes()
{
	var e = document.getElementsByTagName("span");

	var shouldPopup = true;

  
  // If an item has been scanned, we don't need to popup
	if (document.getElementById("TABLE_DATA_loanList"))
	{
		shouldPopup = false
	}
  else
  {
    // Iterate through span elements, search for required text
    for (var i = 0; i < e.length; i++)
    {
      var text = e[i].innerHTML.toLowerCase();
      if (text.includes("equipment checkout"))
      {
        // If we found text, we don't need to popup
        shouldPopup = false;
        break
      }
    }
  }

	if (shouldPopup)
	{
		console.log("User doesn't have permissions!");
		// Open confirmation dialog box
		if (window.confirm("User hasn't signed checkout agreement! Open page?"))
		{
			// If "ok" clicked, send a message to the background script
			// to open up an incognito window
			chrome.runtime.sendMessage({act: "openPage"}, function(response)
			{
				console.log(response.test);
			});
		}
	}
	else
	{
		console.log("User has permissions!");
	}
}
