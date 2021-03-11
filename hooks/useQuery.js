import { useLocation } from 'react-router-dom';
import { isUuid } from 'uuidv4';

function parseQuery(search) {
  let object = {};
  let uuid;
  if (search.includes('id=')) {
    const value = search.slice(
      search.lastIndexOf('id=') + 3,
      search.lastIndexOf('id=') + 39
    );
    uuid = isUuid(value) ? value : undefined;
  }
  const params = new URLSearchParams(search);
  const entries = params.entries();
  if (entries.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of entries) {
      object[key] = JSON.parse(value);
    }
  }
  return uuid ? { id: uuid, ...object } : object;
}

export default function useQuery() {
  const { search } = useLocation();
  return parseQuery(search);
}
