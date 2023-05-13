import { light } from "./theme/light";
import { dark } from "./theme/dark";

const initialState = {
  thm: light,
};

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "LIGHT":
      return {
        ...state,
        thm: light,
      };

    case "DARK":
      return {
        ...state,
        thm: dark,
      };

    default:
      return state;
  }
}
export default themeReducer;
