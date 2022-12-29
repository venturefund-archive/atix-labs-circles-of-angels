import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/molecules/Loading/Loading';
import { fetchTexts } from '../../api/texts';

export const DictionaryContext = React.createContext({});

export const DictionaryContextProvider = ({ children }) => {
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(true);

  const _fetchTexts = async() => {
    setLoading(true);
    try {
      const _texts = await fetchTexts();
      setTexts(_texts);
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  }

  useEffect(()=> {
    _fetchTexts();
  }, []);

  if(loading) return <Loading></Loading>

  return (
    <DictionaryContext.Provider value={{ texts, setTexts }}>
      {children}
    </DictionaryContext.Provider>
  );
}

DictionaryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
