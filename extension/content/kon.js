// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // No Media actions on Konachan
  return;
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  // Konachan does not store post titles (just aggregate tags)
  record.title = undefined;

  // Source
  record.source = 'K';

  // Artist
  const artist = document.querySelectorAll('.tag-type-artist a')[1];
  record.artist = artist.textContent;

  // Characters
  const characters = [];
  const charAnchors = document.querySelectorAll('.tag-type-character a');
  charAnchors.forEach((elem, index) => {
    // Konachan puts the character name in the Second anchor for each tag.
    if (index % 2 === 1) {
      characters.push(elem.textContent);
    }
  });
  record.characters = characters;

  // Tags
  const tags = [];
  const tagAnchors = document.querySelectorAll('.tag-type-general a');
  tagAnchors.forEach((elem, index) => {
    // Konachan puts the tag name in the Second anchor for each tag.
    if (index % 2 === 1) {
      tags.push(elem.textContent);
    }
  });
  record.tags = tags;

  return record;
}
