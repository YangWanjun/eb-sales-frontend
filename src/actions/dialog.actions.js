import { dialogConstants } from '../constants';

export const addProjectMember = (open) => ({
  type: dialogConstants.ADD_PROJECT_MEMBER,
  add_project_member: open,
});
