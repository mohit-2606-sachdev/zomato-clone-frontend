import React, { useState } from 'react'
import Modal from 'react-modal';
import '../../Styles/Details/Login.css'
import { useAuth0 } from "@auth0/auth0-react";

// Modal Styling
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

function Login(props) {

    // Autheriation code
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();


    // state declaration
    const [Profile, setProfile] = useState(false)
    
    // Profile data
    let name, email
    if (isAuthenticated) {
        name = user.name
        email = user.email
    }


    return (
        <div>
            <div>
                <div>

                    {isAuthenticated ? <button type="button" onClick={() => logout({ returnTo: window.location.origin })} className="float-end login2 btn btn-light">Logout</button> : <button type="button" onClick={() => loginWithRedirect()} className="float-end login2 btn btn-light">Login</button>}

                    {isAuthenticated && <button type="button" onClick={() => setProfile(true)} className="float-end login2 btn btn-sm btn-light">Profile</button>}
                </div>
            </div>
            
            <Modal
                isOpen={Profile}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >

                <div className='container'>
                    <div className="mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <p className="mb-0">Name</p>
                                </div>
                                <div className="col-8">
                                    <p className="text-muted mb-0">{name}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted mb-0">{email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-danger btn-sm' onClick={() => setProfile(false)}>close</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Login