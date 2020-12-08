// Upvote and Favorite images on Hentai Foundry
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function executeMediaActions() {
  // Upvote the image
  const votes = document.querySelector('#voteBox');
  if (votes) {
    const upVote = votes.querySelector('.fa-thumbs-up');
    if (upVote) {
      upVote.click();
    }
  }

  // Favorite the image
  const favButton = document.querySelector('#yt1');
  if (favButton) {
    favButton.click();
  }
  // Triggers an alert unfortunately.
}

/** Extract metadata from page contents to record in Shisho */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractMediaRecord() {
  const record = {};

  // Title
  const title = document.querySelector('main .boxtitle .imageTitle');
  record.title = title.textContent;

  // Source
  record.source = 'HF';

  // Artist
  const artist = document.querySelector('main .boxtitle a');
  record.artist = artist.textContent;

  // Characters (Not on HF?)
  record.characters = [];

  // Tags
  const tags = [];
  document.querySelectorAll('a[rel=tag]').forEach((elem) => {
    tags.push(elem.textContent);
  });
  record.tags = tags;

  return record;
}
