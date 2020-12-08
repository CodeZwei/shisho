console.log('PX Content script loaded');

// Like and Bookmark images on Pixiv
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // Like the image
  const likeButton = document.querySelector('.sc-181ts2x-5.laAfgT button');
  if (likeButton) {
    likeButton.click();
  }

  // Bookmark the image
  const favButton = document.querySelector('button.gtm-main-bookmark');
  if (favButton) {
    favButton.click();
  }
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  const title = document.querySelector('.sc-1u8nu73-3.feoVvS');
  record.title = title.textContent;

  // Source
  record.source = 'P';

  // Artist
  const artist = document.querySelector('.sc-10gpz4q-5.bUnVlH');
  record.artist = artist.textContent;

  // Characters (Not on PX)
  record.characters = [];

  // Tags
  const tags = [];
  document.querySelectorAll('.gtm-new-work-tag-event-click').forEach((elem) => {
    tags.push(elem.textContent);
  });
  record.tags = tags;

  return record;
}
