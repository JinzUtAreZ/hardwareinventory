import { SIGN_UP, LOG_OUT, ERROR_AUTH } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      let userdata = action.payload;
      return {
        token: userdata.refreshToken,
        userId: userdata.idToken,
      };
    case LOG_OUT:
      return initialState;
    case ERROR_AUTH:
      return action.payload;
    default:
      return state;
  }
};
