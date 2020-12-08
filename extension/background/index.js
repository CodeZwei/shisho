const VALID_HOSTS = [
  'www.hentai-foundry.com',
  'konachan.com',
  'danbooru.donmai.us',
  'www.pixiv.net',
  'rule34.xxx',
  'rule34.paheal.net',
  'webmshare.com',
];

// Current Shisho API Version expected by this extension
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXT_API_VERSION = 1;

const PAGE_STATE_CONDITIONS = VALID_HOSTS.map((url) => {
  return new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: url},
  });
});

chrome.runtime.onInstalled.addListener(() => {
  // Clear all rules and add a single rule to check for valid pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: PAGE_STATE_CONDITIONS,
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});

// Override download location to a specific directory/symlink on the client
chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  if (item.byExtensionId === chrome.runtime.id) {
    suggest({filename: 'shisho-downloads/media/' + item.filename});
  } else {
    suggest();
  }
});
