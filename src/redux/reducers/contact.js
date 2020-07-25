const initialState = {
  dataContact: [],
  isLoading: false,
  isLogin: false,
  isSuccess: false,
  isError: false,
  msg: '',
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'GET_CONTACT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'GET_CONTACT_FULFILLED': {
      console.log(action.payload)
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
        dataContact: action.payload.user,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default contact;
