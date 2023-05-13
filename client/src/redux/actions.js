export const LOGIN = (payload) => {
  return {
    type: "LOGIN",
    payload: payload,
  };
};
export const LOGOUT = (payload) => {
  return {
    type: "LOGOUT",
    payload: payload,
  };
};

export const FRIENDS = (payload) => {
  return {
    type: "FRIENDS",
    payload: payload,
  };
};
export const POSTS = (payload) => {
  return {
    type: "POSTS",
    payload: payload,
  };
};

export const POST = (payload) => {
  return {
    type: "POST",
    payload: payload,
  };
};

export const GUESTS = (payload) => {
  return {
    type: "GUESTS",
    payload: payload,
  };
};

export const RECIEVIED_COMMENTS = (payload) => {
  return {
    type: "RECIEVIED_COMMENTS",
    payload: payload,
  };
};


