/** Valid URL Patterns for context menu item to appear */
const VALID_URL_PATTERNS = VALID_HOSTS.map((host) => {
  return `https://${host}/*`;
});

// Hack, please remove. Need a better way to handle non-secure valid hosts
VALID_URL_PATTERNS.push(`http://rule34.paheal.net/*`);

// Create Contex Menu item
const contextMenuProperties = {
  title: 'Download and Archive',
  contexts: ['image', 'video'],
  documentUrlPatterns: VALID_URL_PATTERNS,
};
chrome.contextMenus.update('ss-download', contextMenuProperties, () => {
  const err = chrome.runtime.lastError;
  if (err && err.message.startsWith('Cannot find menu item')) {
    chrome.contextMenus.create({
      ...contextMenuProperties,
      id: 'ss-download',
    });
  }
});

// Temporary variables during download
let currentDownloadId;
let mediaRecord = {};

chrome.downloads.onChanged.addListener(async (delta) => {
  if (!currentDownloadId) return;

  // TODO: filename needs to be sliced.
  // It includes the absolute path to the file
  if (delta.id === currentDownloadId) {
    if (delta.filename) {
      const filename = delta.filename.current;
      mediaRecord.fileName = filename;
      // TODO: switch to MIME type
      mediaRecord.fileExt = '.' + filename.split('.')[1];

      // Determine location from download location
      const index = filename.lastIndexOf('shisho-downloads');
      mediaRecord.location = filename.substring(index + 16);

      // TODO: do something smarter to map MIME type to media type
      mediaRecord.type = mediaRecord.fileExt === '.gif' ? 'gif' : 'image';
    }

    if (delta.state) {
      if (delta.state.current === 'complete') {
        // console.log(mediaRecord);
        await submitMediaRecord(mediaRecord);
        currentDownloadId = undefined;
        mediaRecord = {};
      }
    }
  }
});

// Click handler for the context menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (getServerStatus() !== SERVER_STATUS.ONLINE) {
    const message = {type: 'prompt', prompt: 'Error: Shisho Backend Offline.'};
    chrome.tabs.sendMessage(tab.id, message);
    return;
  }

  // Check if we have already downloaded this URL
  const searchOpts = {method: 'GET'};
  const existingRecords = await fetchBackend(
      `/media/search?mediaUrl=${encodeURIComponent(info.srcUrl)}`, searchOpts);
  if (existingRecords && existingRecords.result.length > 0) {
    const message = {
      type: 'prompt',
      prompt: 'Error: Record for this Page already exists.',
    };
    chrome.tabs.sendMessage(tab.id, message);
    return;
  }

  // Inform the content script to perform other actions
  const message = {type: 'executeArchiveActions'};
  chrome.tabs.sendMessage(tab.id, message, async (message) => {
    // console.log(message);
    mediaRecord = {...message.record};

    mediaRecord.pageUrl = info.pageUrl;
    mediaRecord.mediaUrl = info.srcUrl;

    // If we are on pixiv and there is a link URL, record that as it is the
    // high-res originl image, otherwise use the srcUrl as default
    const srcUrl = info.pageUrl.includes('pixiv.net') && info.linkUrl ?
        info.linkUrl :
        info.srcUrl;

    // Download the requested Media
    const opts = {
      method: 'GET',
      url: srcUrl,
    };
    chrome.downloads.download(opts, (downloadId) => {
      console.log(`Shisho downloading ID: ${downloadId}`);
      currentDownloadId = downloadId;
      chrome.downloads.search({id: downloadId}, (results) => {
        console.log(results);
      });
    });
  });
});

// Send the MediaRecord to Shisho Backend
async function submitMediaRecord(mediaRecord) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(mediaRecord),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await fetchBackend('/media/new', opts)
      .then((body) => {
        return console.log(body);
      })
      .catch((err) => console.log(err.message));
}
