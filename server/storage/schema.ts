import SQL from 'sql-template-strings';

/** Enum of hosting locations known to Shisho */
export enum SOURCE {
  UNKNOWN = 'U',
  HENTAI_FOUNDRY = 'HF',
  KONACHAN = 'K',
  DANBORUU = 'D',
  PIXIV = 'P',
  RULE34X = '34X',
  RULE34PAHEAL = '34P',
  WEBMSHARE = 'W',
}

/** Content Type of the Media Record */
export type MediaType = 'image'|'gif'|'video';

/** File extension of the MediaRecord */
export type MediaFileExt = '.jpg'|'.png'|'.gif'|'.webm'|'.mpg'|'.avi';

/** Record of a particular piece of Media downloaded */
export interface MediaRecord {
  title: string;          // Title from hosting site
  type: MediaType;        // 'image', 'gif', 'video'
  source: SOURCE;         // Hosting Service code
  pageUrl: string;        // 'http://url-to-media'
  mediaUrl: string;       // 'https://url-to-media/media.jpg'
  artist: string;         // 'artist name'
  location: string;       // 'physical disk path from Shisho root'
  fileName: string;       // name of the file
  fileExt: MediaFileExt;  // extension of the file
  characters: string[];   // ['Bayonetta']
  tags: string[];         // ['acts', 'genre', 'category', 'features']
  recorded: number;       // Date record was made
  reconcilled: boolean;   // false
}

export const CREATE_TABLES_SQL = SQL`
CREATE TABLE IF NOT EXISTS media (
  title       TEXT NOT NULL DEFAULT '',
  type        TEXT CHECK( type IN ('image','gif','video') ) NOT NULL,
  source      TEXT NOT NULL DEFAULT 'U',
  pageUrl     TEXT NOT NULL,
  mediaUrl    TEXT NOT NULL,
  artist      TEXT NOT NULL DEFAULT '',
  location    TEXT NOT NULL,
  fileName    TEXT NOT NULL,
  fileExt     TEXT NOT NULL,
  characters  BLOB NOT NULL DEFAULT [],
  tags        BLOB NOT NULL DEFAULT [],
  recorded    TEXT NOT NULL,
  reconcilled BOOLEAN DEFAULT false
)`;
