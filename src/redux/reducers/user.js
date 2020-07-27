const initialState = {
  dataUser: [],
  isLoading: false,
  isLogin: false,
  isSuccess: false,
  isError: false,
  msg: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
        dataUser: action.payload._data,
      };
    }
    case 'ADD_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'ADD_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'ADD_PROFILE_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'UPDATE_IMAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_IMAGE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'UPDATE_IMAGE_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    case 'UPDATE_LOCATION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    }
    case 'UPDATE_LOCATION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    }
    case 'UPDATE_LOCATION_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default user;
