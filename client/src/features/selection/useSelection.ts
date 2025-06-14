import { useContext } from "react";
import { SelectionContext } from "./SelectionContext";

export const useSelection = () => {
  const { state, dispatch } = useContext(SelectionContext);

  const isSelected = (item: string) => state.selectedItems.includes(item);

  const toggle = (item: string) => {
    dispatch({
      type: isSelected(item) ? "DESELECT" : "SELECT",
      payload: item
    });
  };

  return {
    selectedItems: state.selectedItems,
    isSelected,
    toggle
  };
};
