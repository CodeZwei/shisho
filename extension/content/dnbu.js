// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // No Media actions on Danbooru
  return;
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  // Danbooru does not store post titles (just aggregate tags)
  record.title = undefined;

  // Source
  record.source = 'D';

  // Artist
  const artists = document.querySelectorAll('ul.artist-tag-list .search-tag');
  // Always select the first artist if there are multiple
  record.artist = artists[0].textContent;

  // Characters
  const characters = [];
  const charAnchors =
      document.querySelectorAll('ul.character-tag-list .search-tag');
  charAnchors.forEach((elem) => {
    characters.push(elem.textContent);
  });
  record.characters = characters;

  // Tags
  const tags = [];
  const tagAnchors =
      document.querySelectorAll('ul.general-tag-list .search-tag');
  tagAnchors.forEach((elem) => {
    tags.push(elem.textContent);
  });
  record.tags = tags;

  return record;
}
