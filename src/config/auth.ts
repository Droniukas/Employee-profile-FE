export const setAuthToken = (token: string) => {
  sessionStorage.setItem('bearer_token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('bearer_token');
};

export const deleteAuthToken = () => {
  sessionStorage.removeItem('bearer_token');
};
