"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

type props = {
   children: ReactNode
}
export const Providers = ({children}: props) => {
   const queryClient = new QueryClient

   return (
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   )
}