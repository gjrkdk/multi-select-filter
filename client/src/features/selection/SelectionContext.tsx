import { createContext } from "react";
import type { SelectionState, SelectionAction } from "./selectionReducer";

export const initialState: SelectionState = { selectedItems: [] };

export const SelectionContext = createContext<{
  state: SelectionState;
  dispatch: React.Dispatch<SelectionAction>;
}>({
  state: initialState,
  dispatch: () => {}
});
