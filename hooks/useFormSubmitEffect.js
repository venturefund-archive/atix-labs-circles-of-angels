import { useEffect } from 'react';

export default function useFormSubmitEffect({
  apiCall,
  successCallback,
  errorCallback,
  params: { isSubmitting, ...otherParams }
}) {
  useEffect(() => {
    if (isSubmitting)
      apiCall(otherParams)
        .then(successCallback)
        .catch(errorCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);
}
