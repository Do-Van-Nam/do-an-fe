import React, { createContext,useState} from "react";

export const AppContext = createContext()

const AppProvider = ({children})=>{
    const [acc,setAcc] = useState({})
    const [buildings,setBuildings] = useState([])
    const [floor,setFloor] = useState([])
    const [rooms,setRooms] = useState([])
    const [selectedBuilding,setSelectedBuilding] = useState({})
    const [plan,setPlan] = useState({})


    return (
        <AppContext.Provider 
        value={{acc,setAcc,buildings,setBuildings,selectedBuilding,setSelectedBuilding,
            rooms,setRooms, floor,setFloor,plan,setPlan
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider