import React from 'react'
import '../../Styles/Filter/Content.css'
import { useNavigate } from 'react-router-dom'



function Content(props) {

    const navigate = useNavigate()
    const goTo = (data)=>{
        navigate(`/details/${data}`)
    }

    let CuisineList = props.item.Cuisine.length && props.item.Cuisine.map(res =><span key={res.name}>-{res.name}  </span>)
     
    return (
        
        
        <div className='container-fluid pt-2 '>
            <div style={{cursor:'pointer'}} onClick={()=>goTo(props.item.name)} className='row justify-content-center pb-4'>
                <div className='col-sm-12 col-xl-10 border p-4 shadow-lg'>
                    <div className='pb-1 d-flex'>
                        <div className='d-inline-block'>
                            <img src={props.item.thumb} alt='' className='filter_image' />
                        </div>
                        <div className='d-inline-block mt-2 ms-5'>
                            <p className='restaurant_name'>{props.item.name}</p>
                            <p className='restaurant_add1'>{props.item.locality}</p>
                            <p className='restaurant_add2'>{props.item.address}</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='d-inline-block ms-4'>
                            <p className='lh-1 discrp' style={{color:'#636F88'}}>CUISINES:</p>
                            <p className='discrp' style={{color:'#636F88'}}>COST FOR TWO:</p>
                        </div>
                        <div className='d-inline-block ms-5'>
                            <p className='lh-1 discrp' style={{color:'#192F60'}}>{CuisineList}</p>
                            <p className='discrp' style={{color:'#192F60'}}>₹ {props.item.cost}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content
