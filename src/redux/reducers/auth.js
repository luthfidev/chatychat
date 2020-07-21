const initialState = {
  isLoading: false,
  isLogin: false,
  isSuccess: false,
  isError: false,
  msg: '',
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
