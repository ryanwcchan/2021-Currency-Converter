import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { api } from './api';

export const ConversionContext = createContext();

// ConversionContext.Provider
// Conversion Context.Consumer

const DEFAULT_BASE_CURRENCY = 'USD';
const DEFAULT_QUOTE_CURRENCY = 'GBP';

export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQuoteCurrency] = useState(DEFAULT_QUOTE_CURRENCY);
  const [date, setDate] = useState();
  const [rates, setRates] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const setBaseCurrency = (currency) => {
    setIsloading(true);
    return api(`/latest?base=${currency}`)
      .then((res) => {
        _setBaseCurrency(currency);
        setDate(res.date);
        setRates(res.rates);
        setIsloading(false);
      })
      .catch((error) => {
        Alert.alert('Sorry, something went wrong.', error.message);
      })
      .finally(() => {
        setIsloading(false);
      });    
  };

  const swapCurrencies = () => {
      // baseCurrency = quoteCurrency;
      // quoteCurrency = baseCurrency;
      setBaseCurrency(quoteCurrency);
      setQuoteCurrency(baseCurrency);
  };

  const contextValue = {
      baseCurrency,
      quoteCurrency,
      swapCurrencies,
      setBaseCurrency,
      setQuoteCurrency,
      date,
      rates,
      isLoading,
  };

  useEffect(() => {
    setBaseCurrency('USD');
  }, []);

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  )
}