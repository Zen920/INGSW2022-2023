import { createContext, useCallback, useState } from "react";
const SnackBarContext = createContext();

// Retrieve employee profile as JSON if it already exists
export const SnackBarContextProvider = ({ children }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Error");
  const [severity, setSeverity] = useState("error");
  const handleSetOpenSnack = useCallback((value) => {
    setOpenSnack(value);
  }, []);
  const handleMessageInfo = useCallback((value) => {
    setMessageInfo(value);
  }, []);
  const handleSetSeverity = useCallback((value) => {
    setSeverity(value);
  }, []);
  return (
    <>
      <SnackBarContext.Provider
        value={{
          openSnack,
          handleSetOpenSnack,
          messageInfo,
          handleMessageInfo,
          severity,
          handleSetSeverity,
        }}
      >
        {children}
      </SnackBarContext.Provider>
    </>
  );
};
export default SnackBarContext;
