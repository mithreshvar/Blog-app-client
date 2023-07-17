/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [editData, setEditData] = useState({});
    const [blogData, setBlogData] = useState({});

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      if (user) {
        setUser(user)
      }
    }, []);

    const logout = () => {
      // remove user from storage
      localStorage.removeItem('user')
      setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, blogData, setBlogData, editData, setEditData }}>
          { children }
        </AuthContext.Provider>
      );

}

export const UserAuth = () => {
    return useContext(AuthContext);
}
