/**
 * This function takes a location object, and a name of a query string
 * and then return the value of that query string
 *
 * @param  {Object} location:
 *   A location object that has the querystrings in its `search` field
 *
 * @param  {String} name:
 *   The name of the query string to return
 *
 * @return {String | null}
 *   The string value of the query string, or null if it doesn't exist
 *
 * @example
 *   getQueryValue({ search: '?search=macbook' }, 'search'); -> 'macbook'
 *   getQueryValue({ search: '?search=macbook' }, 'keyword'); -> null
 *
 */

export default function getQueryValue(location, name) {
  const testedName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${testedName}=([^&#]*)`);
  const results = regex.exec(location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
