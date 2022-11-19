const TOKEN_KEY = "api-server";

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getToken, setToken, clearToken };

// getToken();
// setToken("a3456bf1-b3a4-490d-9b3b-004846df25b9");
