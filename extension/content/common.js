// Listen for messages from the background script.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const type = message.type;

  switch (type) {
    case 'executeArchiveActions':
      executeMediaActions();

      const mediaRecord = extractMediaRecord();
      sendResponse({record: mediaRecord});
      break;

    case 'prompt':
      alert(message.prompt);

    default:
      break;
  }
});
