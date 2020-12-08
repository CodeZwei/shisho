// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // No Media actions on Rule34.x
  return;
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  // Rule34.x does not store post titles (just aggregate tags)
  record.title = undefined;

  // Source
  record.source = '34X';

  // Artist
  const artists = document.querySelectorAll('li.tag-type-artist a');
  if (artists.length > 0) {
    // Always select the first artist if there are multiple
    record.artist = artists[0].textContent;
  }

  // Characters
  const characters = [];
  const charAnchors = document.querySelectorAll('li.tag-type-character a');
  charAnchors.forEach((elem) => {
    characters.push(elem.textContent);
  });
  record.characters = characters;

  // Tags
  const tags = [];
  const tagAnchors = document.querySelectorAll('li.tag-type-general a');
  tagAnchors.forEach((elem) => {
    tags.push(elem.textContent);
  });
  record.tags = tags;

  return record;
}
