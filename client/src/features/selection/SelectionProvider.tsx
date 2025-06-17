import { useReducer, useEffect, useState } from "react";
import { SelectionContext, initialState } from "./SelectionContext";
import { selectionReducer } from "./selectionReducer";
import type { ReactNode } from "react";

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(selectionReducer, initialState);

  // Track if localStorage has been read (hydration step)
  const [hydrated, setHydrated] = useState<boolean>(false);

  // On initial render, try to load selected items from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedItems");
    if (stored) {
      dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
    }
    setHydrated(true); // Mark hydration as complete
  }, []);

  // Persist selected items to localStorage after hydration
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(state.selectedItems)
      );
    }
  }, [state.selectedItems, hydrated]);

  // Prevent rendering children until hydration is complete
  if (!hydrated) {
    return null;
  }

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};
