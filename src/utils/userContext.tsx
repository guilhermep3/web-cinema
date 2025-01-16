"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserContextType = {
   user: { name: string; lastname: string },
   setUser: (user: { name: string; lastname: string; }) => void,
   imageSrc: string,
   setImageSrc: (image: string) => void,
}
export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<{ name: string, lastname: string }>({ name: '', lastname: '' });
   const [imageSrc, setImageSrc] = useState('/user-image.jpg');

   useEffect(() => {
      const image = localStorage.getItem('userImg');
      if (image) {
         setImageSrc(image)
      }
   }, [])

   useEffect(() => {
      localStorage.setItem('userImg', imageSrc)
   }, [imageSrc])

   return (
      <UserContext.Provider value={{ user, setUser, imageSrc, setImageSrc }}>
         {children}
      </UserContext.Provider>
   )
};

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error('useUser must be used within a UserProvider')
   }
   return context;
};