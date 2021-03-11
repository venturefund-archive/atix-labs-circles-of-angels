import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function parseQuery(search) {
  return queryString.parse(search);
}

export default function useQuery() {
  const { search } = useLocation();
  return parseQuery(search);
}
