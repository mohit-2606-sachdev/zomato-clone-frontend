import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../Styles/Home/Wallpaper.css'
import { useNavigate } from 'react-router-dom'
import Login from '../Details/Login';

function Wallpaper() {
    const navigate = useNavigate()
    const [location, setLocation] = useState([])
    const [restaurant, setRestaurant] = useState([])

    useEffect(() => {
        axios.get('https://zomato-clone-backend-7qc2.onrender.com/location').then((data) => {
            setLocation(data.data)
        })
    }, [])

    const fetchRestaurants = (event) => {
        axios.get(`https://zomato-clone-backend-7qc2.onrender.com/restaurant/city/${event.target.value}`).then((data) => {
            setRestaurant(data.data)
        })


    }

    const goTo = (event) => {
        navigate(`/details/${event.target.value}`)
    }


    return (
        <>
            <div className='container-fluid main pt-3'>
                <div className='container-fluid'>
                    <div className='row container-fluid mb-5'>
                    <div className='container-fluid'>
                    <div >
                        <span className='float-end '>
                            <Login/>
                        </span>
                    </div>
                </div>

                    </div>
                    <div className='container-fluid'>
                        <div className='row justify-content-center'>
                            <div className='logo text-center'>e!</div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <p className="text-light d-flex justify-content-center caption  text-center semibold">Find the best restaurants, cafés, and bars</p>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2 pb-4'>
                            <select className=" me-3 location text-center form-select" onChange={fetchRestaurants} aria-label="Default select example">
                                <option defaultValue>Location</option>
                                {location.length && location.map(item => <option key={item.name} value={item.city_id}>{item.name}</option>)}
                            </select>
                            <select className=" me-3 restaurant text-center form-select" onChange={goTo} aria-label="Default select example">
                                <option defaultValue>Restaurant</option>
                                {restaurant.length && restaurant.map(item => {
                                    return (<option key={item.name} value={item.name}>{item.name}</option>)
                                })}

                            </select>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Wallpaper






