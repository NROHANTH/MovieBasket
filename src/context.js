// createcontext-->
// provider
// consumer/useContext()


import React, { useContext, useEffect,useState} from "react";
// creating warehouse to consume
const AppContext=React.createContext();

const APP_URL=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

// we need to create a provider func
const AppProvider=({children})=>{
    const [isLoading, setisLoading] = useState(true)
    const [Movies, setMovies] = useState([])
    const [isError, setisError] = useState({show:'false',msg:''})
    const [query, setquery] = useState("")


    const getMovies=async(url)=>{
        try{
            const res=await fetch(url)
            const data= await res.json()
            console.log(data)
            if(data.Response==="True"){
                setisLoading(false)
                setMovies(data.Search)
            }
            else{
                setisError({show:true,
                    msg:data.Error})
            }
        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(()=>{
        // debouncing
        let timerOut=setTimeout(()=>{
            getMovies(`${APP_URL}&s=${query}`)
        },800)
        return ()=>clearTimeout(timerOut)
       
    },[query])
    return <AppContext.Provider value={{isLoading,isError,Movies,query,setquery,APP_URL}}>{children}</AppContext.Provider>;
};
// custom hooks
const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext};
