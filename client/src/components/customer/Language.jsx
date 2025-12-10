import { useLanguageContext } from "../../hooks/contextHooks.js";
import { useEffect } from 'react';


/**
 * This is a target for a Link that toggles language.
 * @return {null}
 * @constructor
 */
const Language = () => {
  const { handleLanguageToggle } = useLanguageContext();


  useEffect(() => {
    handleLanguageToggle();
  }, []);

  return null;
};

export default Language;
