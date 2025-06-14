export type SelectionState = {
  selectedItems: string[];
};

export type SelectionAction =
  | { type: "SELECT"; payload: string }
  | { type: "DESELECT"; payload: string }
  | { type: "HYDRATE"; payload: string[] };

export const selectionReducer = (
  state: SelectionState,
  action: SelectionAction
): SelectionState => {
  switch (action.type) {
    case "SELECT":
      return {
        selectedItems: [...state.selectedItems, action.payload]
      };
    case "DESELECT":
      return {
        selectedItems: state.selectedItems.filter(
          (item) => item !== action.payload
        )
      };
    case "HYDRATE":
      return {
        selectedItems: action.payload
      };
    default:
      return state;
  }
};
