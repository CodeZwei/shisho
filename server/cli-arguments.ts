import yargs from 'yargs';

export interface Args {
  $0: string;
  _: string[];
  init: boolean|undefined;
}

export function processArguments(): Args {
  return yargs
      .option('init', {
        alias: 'i',
        description: 'Initialize Shisho with an empty Database',
        type: 'boolean',
      })
      .help()
      .alias('help', 'h')
      .argv;
}
