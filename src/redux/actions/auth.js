
export const login = (email, password) => {
  return {
    type: 'LOGIN',
  };
};

export const register = (email, password) => {
  return {
    type: 'REGISTER',
  };
};
