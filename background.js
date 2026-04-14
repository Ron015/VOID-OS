chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.type === "history") {
    chrome.history.search({ text: "", maxResults: 50 }, data => {
      sendResponse(data);
    });
    return true;
  }

  if (request.type === "bookmarks") {
    chrome.bookmarks.getRecent(50, data => {
      sendResponse(data);
    });
    return true;
  }

  if (request.type === "downloads") {
    chrome.downloads.search({ limit: 50 }, data => {
      sendResponse(data);
    });
    return true;
  }

});