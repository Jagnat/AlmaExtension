var secondLoad = false;
var TIMEOUT_VALUE = 50;

// Recursively check and see if loading has finished
function isLoadingDone()
{
	var e = document.getElementById("fulfillmentpatronServicesuser_notes_span")
	if (e.className.includes("tabSelected"))
	{
		// If we are loaded
		checkUserNotes();
	}
	else
	{
		// Otherwise, time out again
		window.setTimeout(isLoadingDone, TIMEOUT_VALUE);
	}
}

var btn = document.getElementById("fulfillmentpatronServicesuser_notes");

// Programmatically click button, call function to wait for loading
if (btn)
{
	btn.click();
	window.setTimeout(isLoadingDone, TIMEOUT_VALUE);
}

function checkUserNotes()
{
	var e = document.getElementsByTagName("span");

	var shouldPopup = true;

	// Iterate through span elements, search for required text
	for (var i = 0; i < e.length; i++)
	{
		var text = e[i].innerHTML.toLowerCase();
		if (text.includes("equipment checkout"))
		{
			// If we found text, we don't need to popup
			shouldPopup = false;
		}
	}

	// If an item has been scanned, we don't need to popup
	if (document.getElementById("TABLE_DATA_loanList"))
	{
		shouldPopup = false
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
