# Detailed Design

Shisho is meant to simplify the repetitive steps for downloading/archiving images from hentai sites.

It should include an Options page where you can enable/disable the extension for specific websites. There is a specific adapter for each one.

Also specify the download directory on the local system. Using a directory chooser component?

If the extension is loaded for a page, it create a Context Menu action to perform the archive / download.

Optionally, this action will open a popup which displays each step of the process, so the user knows when to move on.

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
