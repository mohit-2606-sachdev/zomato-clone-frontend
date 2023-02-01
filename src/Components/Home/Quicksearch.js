import React, { useEffect, useState } from 'react'
import '../../Styles/Home/Quicksearch.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Quicksearch() {

    const [mealtype, setMealType] = useState([])
 

    useEffect(() => {
       
        axios.get('https://zomato-clone-backend-a.onrender.com/mealtype').then((data) => {
            setMealType(data.data)
        })
       
    }, [])


    const navigate = useNavigate()
    const goTo = (data)=>{
        navigate(`/filter/${data}`)
    }
    
    return (
        <>
            <div className='container pt-3'>
                <p className="heading1 h2 bold">Quick Searches</p>
                <p className="text-secondary subheading regular">Discover restraunts by type of meal</p>
            </div>
           
            
            (
                <div className='container'>
                <div className='row p-1'>

                    {mealtype.length > 0 && mealtype.map(item => {
                        return (
                            <div  style={{cursor:'pointer'}}  key={item.name} className='col-lg-4 col-12 col-md-6'>
                                <div onClick={()=>goTo(item.name)} className="card mb-3" style={{ maxWidth: '540px' }}>
                                    <div className=" shadow row g-0">
                                        <div className=" col-5 col-md-5">
                                            <img src={require(`../../${item.image}`)} className="img-fluid rounded-start" style={{ height: '100%', width: '100%' }} alt="..." />
                                        </div>
                                        <div className="col-md-7 col-7 p-1">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}


                </div>
            </div>
            )
        </>
    )
}

export default Quicksearch
