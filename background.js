chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
	{
		chrome.windows.create({"url": "https://esign.wwu.edu/forms/Library/_equipment_checkout_agreement_1.aspx", "incognito": true});
		sendResponse({test: "allGood"});
	});
