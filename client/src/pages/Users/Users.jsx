import React from 'react'

import './Users.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from './UsersList'
import { useMediaQuery } from 'react-responsive'

const Users = () => {

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
    const isMobile = useMediaQuery({query: '(max-width: 1045px)'})

    return (
        <>
        {isDesktopOrLaptop && <div className='users-home-container-1'>
            <LeftSidebar />
            <div className="users-home-container-2" style={{marginTop: "30px"}}>
                <h1 style={{fontWeight: "400"}}>Users</h1>
                <UsersList /> 
            </div>
        </div>}

        {isMobile && <div className='mob-users-home-container-1'>
            <LeftSidebar />
            <div className="mob-users-home-container-2" style={{marginTop: "30px"}}>
                <h1 style={{fontWeight: "400"}}>Users</h1>
                <UsersList /> 
            </div>
        </div>}
        </>
    )
}

export default Users
