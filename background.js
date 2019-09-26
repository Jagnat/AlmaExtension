// Listener for a message to open an incognito window with the checkout agreement
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.act == "openPage") {
		chrome.windows.create({"url": "https://esign.wwu.edu/forms/Library/_equipment_checkout_agreement_1.aspx", "incognito": true});
		sendResponse({result: "opened window"});
	} else {
		sendResponse({result: "not openPage request"});
	};
});
