const initialState = {
  user: {
    uuid: "",
    name: "",
    companyID: "",
    token: "",
    companyName: "",
    loading: false,
    error: {},
  },
  requests: {
    loading: false,
    error: {},
    requests: [],
  },
  ui: {
    notifications: [],
  },
  company: {
    loading: false,
    error: {},
    companies: [],
    users: [],
  },
};

export default initialState;
