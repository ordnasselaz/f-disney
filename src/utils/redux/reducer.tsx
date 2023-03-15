export type Authentication = {
  account_id: string;
  access_token: string;
}

export const initialState = {
  request_token: "",
  list_id: null,
  auth: {
    account_id: "",
    access_token: "",
  }  
};

export function persistAuthReducer(state = initialState, action: any){
  switch (action.type) {
    case 'AUTH/SET_REQUEST_TOKEN':
      return {
        ...state,
        request_token: action.payload
      };
    case 'AUTH/SET_AUTHENTICATION':
      return {
        ...state,
        auth: {
          account_id: action.payload.account_id,
          access_token: action.payload.access_token
        }
      };
      case 'AUTH/SET_LIST':
        return {
          ...state,
          list_id: action.payload
        };
        case 'AUTH/CLEAR_LISTID':
          return {
            ...state,
            list_id: null
          }
    default:
      return state;
  }
}


/*export type Authentication = {
    account_id: string;
    access_token: string;
  }

  const initialState = {
    request_token: null,
    auth: {
      account_id: null,
      access_token: null,
    }
  };

  export const persistedReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'AUTH/SET_REQUEST_TOKEN':
        return {
          ...state,
          request_token: action.payload
        };
      case 'AUTH/SET_AUTHENTICATION':
        return {
          ...state,
          auth: {
            account_id: action.payload.account_id,
            access_token: action.payload.access_token
          }
        };
      default:
        return state;
    }
  };
  */