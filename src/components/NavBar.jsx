/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
// import add from '../assets/add.svg'

export default function NavBar() {

    const { user, logout } = UserAuth()

    return (
        <div className='flex h-[70px] font-poppins border-b-[1px] border-black w-full bg-white items-center px-[40px] justify-between font-bold ' >

            <Link to='/' className='text-[28px] font-bold ' >Blog-App</Link>

            <div className='flex gap-x-[30px] text-[22px] '>
                {
                    (user)
                    ?
                        <>
                            <Link to ='/create'>Write</Link>
                            <Link to = '/my'>{user.userName}</Link>
                            <div className="cursor-pointer" onClick={()=>logout()}>Log Out</div>
                        </>
                    :
                    <>
                    <Link to='/login'>Log In</Link>
                    <Link to='/signup'>Sign Up</Link>
                    </>
                }
            </div>

        </div>
  )
}
