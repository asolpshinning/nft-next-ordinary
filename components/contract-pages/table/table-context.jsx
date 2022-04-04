import { createContext, useCallback, useContext, useState } from "react";
import invariant from "tiny-invariant";

const TableContext = createContext({});

export function useTableContext() {
  const { _insideProvider, ...context } = useContext(TableContext);
  invariant(
    _insideProvider,
    "useTableContext must be used inside TableProvider",
  );
  return context;
}

export const TableProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(null);

  const expandRow = useCallback((setting) => {
    setExpanded(setting);
  }, []);

  const closeAllRows = useCallback(() => {
    setExpanded(null);
  }, []);

  return (
    <TableContext.Provider
      value={{
        expanded,
        expandRow,
        closeAllRows,
        _insideProvider: true,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
