import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const initInvitation = createAction(types.INVITATION_INIT);
export const loadContacts = createAction(types.INVITATION_LOAD_CONTACTS);
export const showInvitationShield = createAction(types.INVITATION_MENU_SHOW);
