import { useReducer, useEffect, useState } from "react";
import { SelectionContext } from "./SelectionContext";
import { selectionReducer } from "./selectionReducer";
import type { ReactNode } from "react";

const initialState = { selectedItems: [] };

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(selectionReducer, initialState);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (stored) {
      dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(state.selectedItems)
      );
    }
  }, [state.selectedItems, hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};
