import axios from "axios"
import { DataContext } from "./DataContext";
import { useState } from "react";

export const DataProvider = ({children}) => {
    const [data, setData] = useState([])

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("https://dummyjson.com/products?limit=250");
             console.log(res.data.products)
             const productsData = res.data.products
            setData(productsData)  // ✅ data state-এ save করা হলো
           
        } catch (error) {
            console.log(error)
        }
    }

    const getUniqueCategory = (data, property)=>{
            let newVal = data?.map((curElem)=>{
                return curElem[property];
            })
              newVal = ["All",...new Set(newVal)]
              return newVal
        }
    
        const categoryOnlyData = getUniqueCategory(data, "category")
        const brandOnlyData = getUniqueCategory(data, "brand")
    

    return <DataContext.Provider value={{data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData}}>
        {children}
    </DataContext.Provider>
}
