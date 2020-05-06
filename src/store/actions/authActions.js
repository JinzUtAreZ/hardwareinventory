import env from '../../Data/env';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const SET_LOADING = 'SET_LOADING';
export const ERROR_AUTH = 'ERROR_AUTH';

export const signUp = (email, password) => async (dispatch) => {
  try {
    //setLoading();
    const apiKey = env().googleApiKey;
    console.log(email, password);
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) {
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const results = await res.json();

    dispatch({
      type: SIGN_UP,
      payload: results,
    });
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: err.response.statusText,
    });
  }
};
