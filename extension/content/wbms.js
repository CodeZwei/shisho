// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // No Media actions on Webmshare
  return;
}

console.log('wbms conctent script loaded');

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  // Many webmshare title are just sources. There is no obvious CSS classes to
  // use but the title happens to be the first H1 tag. This might be fragile.
  const title = document.querySelector('h1');
  record.title = title.textContent;

  // Source
  record.source = 'W';

  // Artist
  // Webmshare does not store Artist Information
  record.artist = '';

  // Characters
  // Webmshare does not store Character Information
  record.characters = [];

  // Tags
  // Webmshare does not store Tag Information
  record.tags = [];

  return record;
}
