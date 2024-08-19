import { createContext, useContext, useState } from "react"

const GlobalContext = createContext(); 
export default function GlobalContextProvider({children}) {
    const [sidebar,setSidebar] = useState(false);
    const [isSearch,setIsSearch] = useState(false)

    const values = {
        sidebar,
        setSidebar,
        isSearch,
        setIsSearch
    }
    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )
}
export function useGlobalContext(){
    const context = useContext(GlobalContext);
    return context
}
