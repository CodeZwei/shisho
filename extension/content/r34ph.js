// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // No Media actions on Rule34.paheal
  return;
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  // Rule34.paheal does not store post titles (just aggregate tags)
  record.title = undefined;

  // Source
  record.source = '34P';

  // Artist
  const artists = document.querySelector('.image_info a.username');
  // NOTE: Rule34.paheal doesn't have a designated artist field. This is the
  // uploader of the content, but it is unlikely to be the original author.
  // Should correct in reconcilliation.
  record.artist = artists.textContent;

  // Characters
  // Not on Rule34.paheal
  record.characters = [];

  // Tags
  const tags = [];
  const tagAnchors = document.querySelectorAll('.tag_name_cell a.tag_name');
  tagAnchors.forEach((elem) => {
    tags.push(elem.textContent);
  });
  record.tags = tags;

  return record;
}
