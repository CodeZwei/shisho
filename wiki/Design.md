# Detailed Design

Shisho is meant to simplify the repetitive steps for downloading/archiving images from hentai sites.

It should include an Options page where you can enable/disable the extension for specific websites. There is a specific adapter for each one.

Also specify the download directory on the local system. Using a directory chooser component?

If the extension is loaded for a page, it create a Context Menu action to perform the archive / download.

Optionally, this action will open a popup which displays each step of the process, so the user knows when to move on.

Hentai Foundry:

- Verify the image is not a thumbnail, if so navigate to the expanded image.
- Download the image.
- Click the "Thumbs Up" Button
- Click "Add to Favorites" Button
- Extract source url, author/artist, tags?, download time and send the payload to Firebase?

Repeat Voting and Adding to Favorites will trigger a javascript Alert(). These is no way to programatically dismiss these alerts, so the user will have to unfortunately.

## Schema

All saved media should be recorded with a Media record in the manifest.

```json
{
  title: 'title',
  type: 'image'|'gif'|'video',
  fileExt: 'jpg'|'png'|'gif'|'webm'|'mpg'|'avi',
  source: SOURCE,
  url: 'http://url-to-media',
  artist: 'artist name',
  location: 'physical disk location',
  characters: ['Bayonetta'],
  tags: ['acts', 'genre', 'category', 'features'],
  recorded: '2004'
  reconcilled: false,
}
```

I need to think about if `artist` requires a full schema of its own.

`SOURCE_ENUM` is the broad location the media is from. Likely one of: `HENTAI_FOUDRY`, `PIXIV`, `DANBORUU`, `WEBMSHARE`. May add more later.

`Location` is the hard disk I have the media saved. Not sure exactly how I will be distributing the media, so this might not be necessary if there is only one repository.

`Characters` is the media characters featured in the media. Might not always be populated depending on the source.

`Tags` is a collection of strings to represent the various features of the media. These could be genres, categories, specific acts depicted, specific features (`vampire`, etc). Hopefully these can be auto-populated from the source.

### Galleries

I should consider adding a schema for galleries, meaning collections of images on a provider. This could be the pages of a doujin, or a group of images posted together on pixiv/twitter.

I would like to have the capacity to selectively save certain pages, since I often do not need the whole thing.

## WebApp

For administrative actions, the Backend serves a React based WebApp.

### Reconcilliation

Each Media recorded is marked as "Un-reconcilled" when it is recorded. The App has a main listing page with all of the Un-reconcilled records.

Users can drill-down into each Record, modify any information, promote any Tags, and submit it as reconcilled.

### Managed Tags

Managed Tags are Tags/Characters which Shisho actually cares about. Since each Media provider has adhoc tags, the Managed Tags are the canonical tags against which all others are reconcilled.

The App has CRUD operations on Managed Tags/Characters

### Filters/Queries

App has a gallary page for viewing all Media with metadata. Gallary can be filtered for various tag combinations.

## Tooling

Shisho could use a host of CLI tools for use offline for processing/querying the data in the database, or syncing the status with thirdparty providers.

Obvious ideas would be to take a set of already downloaded images, process their names, and search for them on thirdparty sites, to build a record. This would help initial ingestion of an existing corpus.

Reconciliation tool obviously.

Dedupping tool - Scans images for similar images. When it finds matching sets, present them to the user so they can select which one to keep based on Quality, amount of metadata, and attribution.

Archive management - It will be a bit wasteful to constantly zip and un-zip the entire corpus, especially once it gets larger. It would be better to divide the corpus into smaller archives which can be zipped individually, record in the database which archive the image exists in.
Possibly even only unzip the database file itself when harvesting, as the rest isn't necessary.
Shard the corpus based on last accessed time, so each shard works like tiered storage classes.

## PornHub Gifs

In general, videos on PH are very large (>500mb) and not worth downloading in their entirity.

However, PH has a "Make a GIF" [tool](https://www.pornhub.com/gifgenerator) they [introduced](https://www.pornhub.com/blog/1811) in 2005. This lets you slice out a 1-10 second segment from any video on PH. These Gifs are uploaded on PH and reference the original video, other metadata, and the creator.

There is a background job which will convert the `.gif` to `.webm`. The `.webm` files are MUCH smaller (2% the size of the `.gif`). This feature does not seem to be well supported. Originally, they wanted users to add their generated Gifs to a photo album they provided. However, that is not longer possible (albums are only user uploaded content). Instead they want you to "Post to your Stream" which always fails in my case. Additionally, there appears to be no indexed way to see all of the `gif`s you have created, or any listing of `favorited` `gif`s.

They provide a hosting link for both versions, so it may be possible to save the `.webm` file, and create a gallery page to display all my favorite PH hosted `.webm`s. This way we can record a meta data media record in the Shisho database for PH Gifs as a way to record them.
