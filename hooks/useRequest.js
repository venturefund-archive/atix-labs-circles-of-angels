import { useState, useEffect } from 'react';
import api, { getBaseURL } from '../api/api';

export default function useRequest(method, url, body, config) {
  const [data, setData] = useState(undefined);
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      setErrors(undefined);
      setLoading(true);

      try {
        const result = await api.request({
          method,
          url: getBaseURL() + url,
          data: body,
          ...config // TODO : can this include the base url?
        });
        setData(result.data);
      } catch (error) {
        setData(undefined);
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };

    doFetch();
  }, [method, url, body, config]);

  return [{ data, errors, loading }, () => {}];
}

export function useGet(url) {
  return useRequest('get', url);
}

export function usePost(url, data, config) {
  return useRequest('post', url, data, config);
}
