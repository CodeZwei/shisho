import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface MediaRecord {
  id?: number;
  title: string;          // Title from hosting site
  type: string; //MediaType;        // 'image', 'gif', 'video'
  source: string; //SOURCE;         // Hosting Service code
  pageUrl: string;        // 'http://url-to-media'
  mediaUrl: string;       // 'https://url-to-media/media.jpg'
  artist: string;         // 'artist name'
  location: string;       // 'physical disk path from Shisho root'
  fileName: string;       // name of the file
  fileExt: string; //MediaFileExt;  // extension of the file
  characters: string[];   // ['Bayonetta']
  tags: string[];         // ['acts', 'genre', 'category', 'features']
  recorded: number;       // Date record was made
  reconcilled: boolean;   // false
}

export default function SimpleTable({ rows }: { rows: Array<MediaRecord> }): JSX.Element {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">File Name</TableCell>
            <TableCell align="right">Characters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.source}</TableCell>
              <TableCell align="right">{row.artist}</TableCell>
              <TableCell align="right">{row.fileName}</TableCell>
              <TableCell align="right">{row.characters}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
