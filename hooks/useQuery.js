import { useLocation } from 'react-router-dom';

function parseQuery(search) {
  const params = new URLSearchParams(search);
  const entries = params.entries();
  const object = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    object[key] = JSON.parse(value);
  }

  return object;
}

export default function useQuery() {
  const { search } = useLocation();
  return parseQuery(search);
}
