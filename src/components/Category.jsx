import { useNavigate } from 'react-router-dom';
import { useData } from '../Context/DataContext'

function Category() {
    //const { categoryOnlyData} = useData();
    const navigate = useNavigate();
    const {data} = useData()
    const getUniqueCategory = (data, property)=>{
            let newVal = data?.map((curElem)=>{
                return curElem[property];
            })
              newVal = [...new Set(newVal)]
              return newVal
        }
    
        const categoryOnlyData = getUniqueCategory(data, "category")
    

  return (
   <div className='bg-[#13203a]'>
  <div className='max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-12 px-2 justify-center'>
    {
      categoryOnlyData?.map((item, index) => (
        <button 
          onClick={()=>navigate(`/category/${item}`)} 
          key={index} 
          className='bg-linear-to-r from-red-500 to-purple-500 text-white px-2 sm:px-3 md:px-4 py-2 uppercase text-center rounded-md cursor-pointer whitespace-normal break-words'
        >
          {item}
        </button>
      ))
    }
  </div>
</div>

  )
}

export default Category