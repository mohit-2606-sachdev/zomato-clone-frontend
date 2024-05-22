import React, { useState, useEffect } from 'react'
import '../../Styles/Filter/FilterSort.css'
import axios from 'axios'

function Filter_sort(props) {

  const [location, setLocation] = useState([])
    useEffect(() => {
        axios.get('https://zomato-clone-backend-7qc2.onrender.com/location').then((data) => {
            setLocation(data.data)
        })
    }, [])

    
    const [filter, setFilter] = useState({
      city_id:'',
      cuisine:[],
      lcost:'',
      hcost:'',
      sort:1
    })

    const handleSort = (sort) =>{
      filter.sort=sort
      setFilter({...filter})
    }

    const handleCost = (lcost,hcost) =>{
      filter.lcost=lcost
      filter.hcost=hcost
      setFilter({...filter})
    }

    const handleCityId = (e) =>{
      filter.city_id=e.target.value
      setFilter({...filter})
    }

    const handleCuisine = (e) =>{
      if(e.target.checked){
        filter.cuisine.push(e.target.value)
      }
      else{
        let index = filter.cuisine.indexOf(e.target.value)
        if (index>-1){
          filter.cuisine.splice(index,1)
        }
      }

      setFilter({...filter})
    }

  return (
    <div className='container-fluid filter p-4 pt-3'>
      <p className='fs-3 mb-2'>Filters</p>
      <p className='fs-5 mb-2'>Select Location</p>
      <select className="form-select mb-3" style={{width:'200px'}}  onChange={(e)=>handleCityId(e)} aria-label="Default select example">
        <option selected>Location</option>
        {location.length && location.map(item => <option key={item.name} value={item.city_id}>{item.name}</option>)}
      </select>
      <p className='fs-5 mb-2'>Cuisine</p>
      <input value='North Indian' onChange={(e)=>handleCuisine(e)} type='checkbox'/>
      <label className="ms-1" for="">North Indian</label><br/>
      <input value='South Indian' onChange={(e)=>handleCuisine(e)} type='checkbox'/>
      <label className="ms-1" for="">South Indian</label><br/>
      <input value='Chinese' onChange={(e)=>handleCuisine(e)} type='checkbox'/>
      <label className="ms-1" for="">Chinese</label><br/>
      <input value='Fast Food' onChange={(e)=>handleCuisine(e)} type='checkbox'/>
      <label className="ms-1" for="">Fast Food</label><br/>
      <input value='Street Food'onChange={(e)=>handleCuisine(e)}  type='checkbox'/>
      <label className="mb-3 ms-1" for="">Street Food</label>
      <p className='fs-5 mb-2'>Cost For Two</p>
      <input name='cost' onChange={()=>handleCost(0,500)} type='radio'/>
      <label className="ms-1"   for="">Less than `500</label><br/>
      <input name='cost' onChange={()=>handleCost(500,1000)} type='radio'/>
      <label className="ms-1"  for="">`500 to `1000</label><br/>
      <input name='cost' onChange={()=>handleCost(1000,1500)} type='radio'/>
      <label className="ms-1"  for="">`1000 to `1500</label><br/>
      <input name='cost' onChange={()=>handleCost(1500,2000)} type='radio'/>
      <label className="ms-1"  for="">`1500 to `2000</label><br/>
      <input name='cost' onChange={()=>handleCost(2000,50000)} type='radio'/>
      <label className="mb-3 ms-1"  for="">`2000+</label>
      <p className='fs-5 mb-2'>Sort</p>
      <input  checked={filter.sort===1} onChange={()=>handleSort(1)} name='sort' type='radio'/>
      <label className="ms-1"  for="">Price low to high</label><br/>
      <input  checked={filter.sort===-1} onChange={()=>handleSort(-1)} name='sort' type='radio'/>
      <label className="mb-3 ms-1 sort"  for="">Price high to low</label><br/>

      <button type="button" onClick={()=>{props.onSubmit(filter)}} className="ms-4 mt-2 btn btn-danger">Apply</button>

    </div>

  )
}

export default Filter_sort