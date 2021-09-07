# Adapters

Each media source will require a unique adapter module for image harvesting and bookkeeping. All of these will include instructions for accessing the media object itself, collecting metadata / tags from the page, and processing any other secondary actions on the page.

## Hentai Foundry

- Verify the image is not a thumbnail, if so navigate to the expanded image.
- Download the image.
- Click the "Thumbs Up" Button
- Click "Add to Favorites" Button
- Extract source url, author/artist, tags?, download time and send the payload to Firebase?

Repeat Voting and Adding to Favorites will trigger a javascript Alert(). These is no way to programatically dismiss these alerts, so the user will have to unfortunately.

## PornHub Gifs

In general, videos on PH are very large (>500mb) and not worth downloading in their entirity.

However, PH has a "Make a GIF" [tool](https://www.pornhub.com/gifgenerator) they [introduced](https://www.pornhub.com/blog/1811) in 2005. This lets you slice out a 1-10 second segment from any video on PH. These Gifs are uploaded on PH and reference the original video, other metadata, and the creator.

There is a background job which will convert the `.gif` to `.webm`. The `.webm` files are MUCH smaller (2% the size of the `.gif`). This feature does not seem to be well supported. Originally, they wanted users to add their generated Gifs to a photo album they provided. However, that is not longer possible (albums are only user uploaded content). Instead they want you to "Post to your Stream" which always fails in my case. Additionally, there appears to be no indexed way to see all of the `gif`s you have created, or any listing of `favorited` `gif`s.

They provide a hosting link for both versions, so it may be possible to save the `.webm` file, and create a gallery page to display all my favorite PH hosted `.webm`s. This way we can record a meta data media record in the Shisho database for PH Gifs as a way to record them.

## Webmshare

TODO

## Danboruu

TODO

## Pixiv

`Download and Archive` will fail on Pixiv. It will record the necessary information but will fail to download the image. For now, manually save it at the same time.

## Konachan

TODO

## Rule 34 (x)

TODO

## Rule 34 (paheal)

TODO

## Sex.com

TODO
