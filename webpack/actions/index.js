import {
  NO_OP,
  loginRequestTypes,
  LOGIN_DETAILS,
  LOGIN_REQUEST,
  LOGOUT,
  driversGetHideListTypes,
  driversListSetInfoType,
  driversListHideExpiredType,
  driversListHideConfirmedType,
  currentDriverShowHideTypes,
  ridersGetHideListTypes,
  ridersListSetInfoType,
  ridersListHideExpiredType,
  ridersListHideConfirmedType,
  currentRiderShowHideTypes,
  matchesGetHideListTypes,
  matchesListSetInfoType,
  matchesListHideExpiredType,
  matchesListHideConfirmedType,
  currentMatchShowHideTypes,
  matchesOtherDriverGetHideListTypes,
  matchesOtherDriverListSetInfoType,
  matchesOtherDriverListHideExpiredType,
  matchesOtherDriverListHideConfirmedType
} from './types';

const noOp = (a, b, c) => ({
  type: NO_OP,
  payload: { a, b, c }
});

const loginDetails = details => ({
  type: LOGIN_DETAILS,
  payload: details
});

const login = (remoteUrlBase, username, password) => ({
  type: LOGIN_REQUEST,
  payload: { remoteUrlBase, username, password, successProperty: 'id_token' }
});

const loginSuccess = token => ({
  type: loginRequestTypes.success,
  payload: { token }
});

const logout = () => ({
  type: LOGOUT,
  payload: {}
});

const getItemsList = itemsGetListType => (remoteUrlBase, token) => ({
  type: itemsGetListType,
  payload: { remoteUrlBase, token, successProperty: 'data' }
});

const hideItemsList = itemsHideListType => () => ({
  type: itemsHideListType,
  payload: {}
});

const getDriversList = getItemsList(driversGetHideListTypes.get);
const hideDriversList = hideItemsList(driversGetHideListTypes.hide);

const getRidersList = getItemsList(ridersGetHideListTypes.get);
const hideRidersList = hideItemsList(ridersGetHideListTypes.hide);

const getMatchesList = getItemsList(matchesGetHideListTypes.get);
const hideMatchesList = hideItemsList(matchesGetHideListTypes.hide);

const getMatchesOtherDriverList = getItemsList(
  matchesOtherDriverGetHideListTypes.get
);
const hideMatchesOtherDriverList = hideItemsList(
  matchesOtherDriverGetHideListTypes.hide
);

const setInfoItemsList = itemsListSetInfoType => (
  listPageIndex,
  listPageSize
) => ({
  type: itemsListSetInfoType,
  payload: { listPageIndex, listPageSize }
});

const setInfoDriversList = setInfoItemsList(driversListSetInfoType);
const setInfoRidersList = setInfoItemsList(ridersListSetInfoType);
const setInfoMatchesList = setInfoItemsList(matchesListSetInfoType);
const setInfoMatchesOtherDriverList = setInfoItemsList(
  matchesOtherDriverListSetInfoType
);

const hideExpiredItemsList = itemsListHideExpiredType => () => ({
  type: itemsListHideExpiredType,
  payload: {}
});
const hideExpiredDriversList = hideExpiredItemsList(driversListHideExpiredType);
const hideExpiredRidersList = hideExpiredItemsList(ridersListHideExpiredType);
const hideExpiredMatchesList = hideExpiredItemsList(matchesListHideExpiredType);
const hideExpiredMatchesOtherDriverList = hideExpiredItemsList(
  matchesOtherDriverListHideExpiredType
);

const hideConfirmedItemsList = itemsListHideConfirmedType => () => ({
  type: itemsListHideConfirmedType,
  payload: {}
});
const hideConfirmedDriversList = hideConfirmedItemsList(
  driversListHideConfirmedType
);
const hideConfirmedRidersList = hideConfirmedItemsList(
  ridersListHideConfirmedType
);
const hideConfirmedMatchesList = hideConfirmedItemsList(
  matchesListHideConfirmedType
);
const hideConfirmedMatchesOtherDriverList = hideConfirmedItemsList(
  matchesOtherDriverListHideConfirmedType
);

const showCurrentItem = currentItemShowType => itemDetails => ({
  type: currentItemShowType,
  payload: { itemDetails }
});

const hideCurrentItem = currentItemHideType => () => ({
  type: currentItemHideType,
  payload: {}
});

const showCurrentDriver = showCurrentItem(currentDriverShowHideTypes.show);
const hideCurrentDriver = hideCurrentItem(currentDriverShowHideTypes.hide);

const showCurrentRider = showCurrentItem(currentRiderShowHideTypes.show);
const hideCurrentRider = hideCurrentItem(currentRiderShowHideTypes.hide);

const showCurrentMatch = showCurrentItem(currentMatchShowHideTypes.show);
const hideCurrentMatch = hideCurrentItem(currentMatchShowHideTypes.hide);

export {
  noOp,
  loginDetails,
  login,
  loginSuccess,
  logout,
  getDriversList,
  hideDriversList,
  setInfoDriversList,
  hideExpiredDriversList,
  hideConfirmedDriversList,
  showCurrentDriver,
  hideCurrentDriver,
  getRidersList,
  hideRidersList,
  setInfoRidersList,
  hideExpiredRidersList,
  hideConfirmedRidersList,
  showCurrentRider,
  hideCurrentRider,
  getMatchesList,
  hideMatchesList,
  setInfoMatchesList,
  hideExpiredMatchesList,
  hideConfirmedMatchesList,
  showCurrentMatch,
  hideCurrentMatch,
  getMatchesOtherDriverList,
  hideMatchesOtherDriverList,
  setInfoMatchesOtherDriverList,
  hideExpiredMatchesOtherDriverList,
  hideConfirmedMatchesOtherDriverList
};
