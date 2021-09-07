# Schema

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
