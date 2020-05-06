const variables = {
  development: {
    googleApiKey: 'AIzaSyANY4qGNmB8DVy2aBDwEkf3tfVsrRMJLWk',
  },
  production: {
    googleApiKey: 'wala pang laman',
  },
};

const getEnvVariables = () => {
  //// "AIzaSyANY4qGNmB8DVy2aBDwEkf3tfVsrRMJLWk"
  if (process.env.NODE_ENV !== 'production') {
    return variables.development;
  }
  return variables.production;
};

export default getEnvVariables;
