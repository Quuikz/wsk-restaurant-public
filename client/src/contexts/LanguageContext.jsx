import {createContext, useState} from 'react';

const LanguageContext = createContext(null);

const LanguageProvider = ({children}) => {

  const [finnish, setFinnish] = useState(true); // 'fi' or 'en'


  //event handler for language button
  const handleLanguageToggle = async () => {
    try {
      if (finnish) {
        setFinnish(false);
      } else {
        setFinnish(true);
      }

    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <LanguageContext.Provider
      value={{
        finnish,
        handleLanguageToggle
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export {LanguageProvider, LanguageContext};
