chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const emailBody = document.querySelector('.a3s');
    if (emailBody === null) {
            sendResponse({
                error: 'No email is open.'
            });
        return;
    }
    const links = emailBody.querySelectorAll('a');
    const urls = [];
    for(const link of links) {
        urls.push(link.getAttribute('href'));
    }
    sendResponse({
        text: emailBody.textContent,
        links: urls
    });
});