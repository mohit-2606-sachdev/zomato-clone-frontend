import React, {useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../Styles/Details/content.css'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Modal from 'react-modal';
import { CounterContext } from '../../App';
import { useContext } from 'react';
import Counter from './Counter';

// Modal Style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '630px'
    },
};


function Content() {

    // context api reducer destructuring and calling
    const { reset, state } = useContext(CounterContext)


    // States define
    const [menuOpen, setMenuOpen] = useState(false)
    const [details, setDetails] = useState([])
    const [menu, setMenu] = useState([])
    

    // fetching on load of page
    let  {rname}  = useParams()
    useEffect(() => {
       
        axios.get(`https://zomato-clone-backend-7qc2.onrender.com/restaurant/city/name/${rname}`).then((data) => {
            setDetails(data.data[0])
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Callback functions with axios
    const viewMenu = () => {
        axios.get('https://zomato-clone-backend-7qc2.onrender.com/menu/')
            .then(data => {
                setMenu(data.data)
            })
        setMenuOpen(true)
    }

    const openRazorpayWindow = async (amount) => {

        let orderdata;
        orderdata = await axios.post('https://zomato-clone-backend-7qc2.onrender.com/payment/order', {
            headers: { 'Content-Type': 'application/json' },
            body: amount
        })
        console.log(orderdata.data)


        const options = {
            key: 'rzp_test_L5xt4eSGmwgh6B',
            amount: orderdata.data.amount / 100,
            order_id: orderdata.data.id,
            currency: orderdata.data.currency,
            name: 'Zomato Food dilevery app',

            prefill: {
                email: 'donkeyKing@gmail.com',
                contact: '8691546798'
            },
            handler: function (response) {

                axios.post('https://zomato-clone-backend-7qc2.onrender.com/payment/save', {
                    headers: { 'Content-Type': 'application/json' },
                    body: {response,amount}
                }).then(data=>console.log(data.data))
            }
        }
        const paymentWindow = new window.Razorpay(options)
        paymentWindow.open()
    }


    const { name, thumb, Cuisine, cost, address } = details;
    const cuisineValues = !(Cuisine === undefined) && Cuisine.length && Cuisine.map((item) => <div key={item.name} className=" grey value">{item.name}</div>)

    return (
        <>

            <div className='container mt-5'>
                <div className='imgcontainer'>
                    <img src={thumb} className='image' alt='' />
                </div>
            </div>
            <div className='container mt-5'>
                <div className='conatiner'>
                    <div className='h2 blue d-inline'>{name}</div>
                    <button onClick={viewMenu} className='float-end rounded place-order p-2 text-light' style={{ backgroundColor: '#CE0505' }}>Place online order</button>
                </div>
                <div className='mt-5'>
                    <Tabs className='mt-4'>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Contact</Tab>
                        </TabList>

                        <TabPanel className='mt-5'>
                            <h5 className='blue'>About This Place</h5>
                            <div className='mt-3'>Cuisine: </div>
                            {cuisineValues}
                            <div className='mt-3'>Average Cost:</div>
                            <div className='grey'>{`₹${cost} for 2 people approx.`}</div>
                        </TabPanel>
                        <TabPanel className='mt-5 mb-5'>
                            <div className="content">
                                <div className='blue h5'>Contact Info</div>
                                <div className="head mt-3">Phone Number</div>
                                <div className="value grey mt-1">+91-8787878787</div>
                                <div className="head mt-3">{name}</div>
                                <div className="value  grey mt-1">{address}</div>
                            </div>

                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <Modal
                isOpen={menuOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div className='container'>
                    <div>
                        <div className='mb-3 p-2'>
                            <h2 className='d-inline blue'>{name}</h2>
                            <button className='btn float-end py-0 px-1' onClick={() => { setMenuOpen(false);reset() }}>X</button>
                        </div>
                    </div>
                    <div className=' container menu-div' style={{ height: '400px' }}>
                        {menu.length && menu.map(item => {
                            return (<div key={item.itemName} className='row justify-content-between'>
                                <div className='col-sm-7 col-8'>
                                    {
                                        item.isVeg ? <button className='px-2 py-0 btn btn-sm isVeg ' style={{ border: '1px solid green', color: 'green' }}>&#x25cf;</button> : <button className='px-2 py-0 btn btn-sm isVeg ' style={{ border: '1px solid red', color: 'red' }}>&#x25cf;</button>
                                    }
                                    <h4 className='h4'>{item.itemName}</h4>
                                    <h4 className='h4'>RS. {item.itemPrice}</h4>
                                    <p className='item_desc'>{item.itemDescription}</p>
                                </div>
                                <div className='col-sm-3 col-4 justify-content-center align-items-center d-flex'>
                                    <div className='counter-img justify-content-center d-flex'>
                                        <Counter price={item.itemPrice} />
                                    </div>
                                </div>
                                <hr />
                            </div>)

                        })}

                    </div>

                    <div className='container pt-4'>
                        <p className='d-inline-block fs-3 blue'>Subtotal</p>
                        <p className='d-inline-block fs-3 ms-3'>{state}</p>
                        <button onClick={() => { setMenuOpen(false); openRazorpayWindow(state); reset() }} className='btn btn-danger text-light rounded float-end'>Pay now</button>
                    </div>

                </div>
            </Modal>


        </>
    )
}

export default Content




