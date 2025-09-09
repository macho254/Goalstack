import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // mock user for now
  const currentUser = {
    id: "user-123",
    name: "Test User",
    avatar: "https://i.pravatar.cc/150?u=user-123"
  };

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
