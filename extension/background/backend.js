// Last known Status from the Backend
let serverStatus = undefined;

// Enum of Server Status values
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_STATUS = {
  OFFLINE: 'offline',
  ONLINE: 'online',
  MISMATCH: 'mismatch',
};

/** Get the current Server Status */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getServerStatus() {
  if (!serverStatus) return SERVER_STATUS.OFFLINE;

  if (serverStatus.api_version === EXT_API_VERSION) return SERVER_STATUS.ONLINE;

  return SERVER_STATUS.MISMATCH;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function checkServerAliveStatus() {
  const opts = {
    method: 'GET',
    headers: {},
  };
  return fetchBackend('/version', opts).then((body) => {
    serverStatus = body;
  });
}

async function fetchBackend(url, opts) {
  if (serverStatus || url === '/version') {
    return fetch(`http://localhost:3000${url}`, opts)
        .then((response) => response.json())
        .catch((err) => {
          if (err) {
            serverStatus = undefined;
          }
        });
  } else {
    return Promise.reject(new Error(
        // eslint-disable-next-line max-len
        'Shisho Backend Offline. \nPlease verify the server is running and click the Extension Icon to reconnect.'));
  }
}
