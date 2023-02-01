import React, { useState, useEffect } from 'react'
import '../Styles/Filter/Filter.css'
import Navbar from '../Components/Details/Navbar'
import FilterSort from '../Components/Filter/FilterSort'
import Content from '../Components/Filter/Content2'
import Modal from 'react-modal';
import axios from 'axios'
import { useParams } from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


function useWindowSize() {

    const [size, setSize] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)

    }, [])
    return size
}

function Filter() {

    let { rname } = useParams()

    const getData = (data) => {
        setFilter({ ...data })
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [restaurants, setRestaurants] = useState([])
    const [totalCount, setTotalCount] = useState(0)

    const [filter, setFilter] = useState({
        city_id: '',
        cuisine: [],
        lcost: '',
        hcost: '',
        sort: 1
    })

    useEffect(() => {
        
        axios.post(`https://zomato-clone-backend-a.onrender.com/restaurant/filter/${currentPage}`, {
            headers: { 'Content-Type': 'application/json' },
            body: filter
        }).then(response => { setRestaurants(response.data.data); setTotalCount(response.data.totalRecords / 2) })
        
    }, [filter, currentPage])



    const [filterOpen, setFilterOpen] = useState(false)
    const width = useWindowSize()
    let condition = width > 1000;

    let pageList = []
    for (let i = 1; i <= totalCount; i++) {
        pageList[i] = <li><a href={() => false} key={i} style={{ cursor: 'pointer' }} onClick={() => setCurrentPage(i)}>{i}</a></li>
    }


    return (
        <>
            <div className='container-fluid p-0'>
                
                <Navbar />
                <div className='container'>
                    {condition ?
                        <>
                            <div className='container'>
                                <h1 className='mt-3 heading'>{rname} Places in mumbai</h1>
                            </div>
                            <div className='float-start d-inline-block border mt-2 shadow'>
                                <FilterSort onSubmit={getData} />
                            </div>
                        </> :
                        <>
                            <div className='container'>
                                <h1 className='mt-3 heading d-inline-block'>{rname} Places in mumbai</h1>
                                <button className='btn btn-danger float-end mt-4 filter_button' onClick={() => setFilterOpen(true)}>Filter</button>
                            </div>
                            <Modal
                                isOpen={filterOpen}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <button className='float-end btn btn-danger' onClick={() => setFilterOpen(false)}>x</button> <FilterSort onSubmit={getData} />
                            </Modal>
                        </>}
                    <div className='constainer-fluid'>

                        {restaurants.length && restaurants.map(item => <Content key={item.name} item={item} />)}
                        <div className='row pages justify-content-center'>
                            <div className='col-6 d-flex justify-content-center'>
                                <ul>
                                    {
                                        pageList
                                    }
                                </ul>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter