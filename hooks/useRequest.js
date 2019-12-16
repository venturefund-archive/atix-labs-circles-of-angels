import { useState, useEffect } from 'react';
import api, { getBaseURL } from '../api/api';

// function fetch() {

// }

export default function useRequest(method, url, body, config) {
  const [data, setData] = useState(undefined);
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const doFetch = async () => {
    setErrors(undefined);
    setLoading(true);
    console.log('fetching', method, getBaseURL() + url);
    try {
      const result = await api.request({
        method,
        url: getBaseURL() + url,
        data: body,
        ...config // TODO : can this include the base url?
      });
      console.log('ret', result.data);
      setData(result.data);
    } catch (error) {
      console.error('errors found', error);
      setData(undefined);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    doFetch();
  }, [method, url, body]);

  return [{ data, errors, loading }, () => {}];
}

export function useGet(url) {
  return useRequest('get', url);
}

export function usePost(url, data, config) {
  return useRequest('post', url, data, config);
}
