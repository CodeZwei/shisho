/**
 * Utils package is for general utilities not specialized to a particular
 * module
 */

/** Check to see if the server is running in DevMode */
export function inDevMode() {
  return process.env.NODE_ENV != 'production';
}

/** Check to see if the server is running in ProdMode */
export function inProdMode() {
  return process.env.NODE_ENV == 'production';
}
