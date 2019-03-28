import { dialogConstants } from '../constants';

const initialState = {
  add_project_member: false,
};

export function dialog(state = initialState, action) {
  switch (action.type) {
    case dialogConstants.ADD_PROJECT_MEMBER:
      return {
        ...state,
        add_project_member: action.add_project_member,
      };
    default:
      return state
  }
}
