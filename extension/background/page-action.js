// TODO: Add a PageAction popup.html file to display server information and
// actions.

chrome.pageAction.onClicked.addListener(async (tab) => {
  await checkServerAliveStatus().catch((err) => console.log(err.message));

  const status = getServerStatus();
  const path = getIconPath(status);
  chrome.pageAction.setIcon({path, tabId: tab.id});
  chrome.pageAction.setTitle({
    title: `Shisho\nStatus: ${getServerStatusLabel(status)}`,
    tabId: tab.id,
  });
});

const statusToIconMap = {
  [SERVER_STATUS.ONLINE]: 'online',
  [SERVER_STATUS.MISMATCH]: 'mismatch',
  [SERVER_STATUS.OFFLINE]: 'offline',
};

function getIconPath(status) {
  const icon = statusToIconMap[status] || 'get_started32';
  return `images/${icon}.png`;
}

const statusToServerLabel = {
  [SERVER_STATUS.ONLINE]: 'Connected',
  [SERVER_STATUS.MISMATCH]: 'API Version Mismatch',
  [SERVER_STATUS.OFFLINE]: 'Offline',
};

function getServerStatusLabel(status) {
  return statusToServerLabel[status] || 'offline';
}
