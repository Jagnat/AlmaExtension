var secondLoad = false;

var btn = document.getElementById("fulfillmentpatronServicesuser_notes");

function isLoadingDone()
{
	var e = document.getElementById("fulfillmentpatronServicesuser_notes_span")
	if (e.className.includes("tabSelected"))
	{
		checkUserNotes();
	}
	else
	{
		window.setTimeout(isLoadingDone, 50);
	}
}

if (btn)
{
	btn.click();
	window.setTimeout(isLoadingDone, 50);
}

function checkUserNotes()
{
	var e = document.getElementsByTagName("span");

	var shouldPopup = true;

	for (var i = 0; i < e.length; i++)
	{
		var text = e[i].innerHTML.toLowerCase();
		if (text.includes("equipment checkout"))
		{
			shouldPopup = false;
		}
	}

	if (document.getElementById("TABLE_DATA_loanList"))
	{
		shouldPopup = false
	}

	if (shouldPopup)
	{
		console.log("User doesn't have permissions!");
		if (window.confirm("User hasn't signed checkout agreement! Open page?"))
		{
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
