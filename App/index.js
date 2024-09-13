import React from 'react';
import Navigation from './config/Navigation';

import { ConversionContextProvider } from './util/ConversionContext'; 
// import { api } from './util/api';

// api()
//   .then((response) => {
//       console.log("response", response);
//   })
//   .catch((error) => {
//       console.log("error", error);
//   })  

// api('/latest?base=USD')
//   .then((res) => console.log(res))
//   .catch((err) => console.log('err', err));


export default () => (
  <ConversionContextProvider>
    <Navigation />
  </ConversionContextProvider>
);
