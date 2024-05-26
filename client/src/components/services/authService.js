
export const logout = () => {
    // Clear any stored tokens or session data here
    localStorage.removeItem('authToken');
    // You can add more clearing logic if needed
  };
  