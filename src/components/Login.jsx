/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import image from '../assets/login.jpg'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


export default function Login({ isLogIn=false }) {


    const { setUser } = UserAuth()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isSignUp, setIsSignUp] = useState(!isLogIn)

    let inputStyle = ' rounded-[7px] border-2 px-[10px] py-[2px] border-[#5f5e5e60] focus:outline focus:outline-[#9fd7ff] focus:border-[#55b8ff] ';
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate()

    const emptyFields = () => {
        if (userNameRef.current) userNameRef.current.value  = '' 
        if (emailRef.current) emailRef.current.value = ''
        if (passwordRef.current) passwordRef.current.value = ''
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let userName = userNameRef.current?.value.trim()
        let email = emailRef.current?.value.trim()
        let password = passwordRef.current?.value.trim()

        if (isSignUp) {

            if (userName && email && password) {
                const response = await fetch('https://blog-app-api-nl9o.onrender.com/api/user/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, userName })
                })
                const json = await response.json()
    
                emptyFields()
                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                if (response.ok) {
                    // save the user to local storage
                    localStorage.setItem('user', JSON.stringify(json))
    
                    // update the auth context
                    setUser(json)
    
                    // update loading state
                    setIsLoading(false)

                    navigate('/')
                }
            }
            else {
                setError('Fields are empty')
            }

        }
        else {

            if ( email && password) {
                const response = await fetch('https://blog-app-api-nl9o.onrender.com/api/user/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                const json = await response.json()

                emptyFields()
                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                if (response.ok) {
                    // save the user to local storage
                    localStorage.setItem('user', JSON.stringify(json))

                    // update the auth context
                    setUser(json)
                    console.log(json)

                    // update loading state
                    setIsLoading(false)

                    navigate('/')
                }
            }
            else {
                setError('Fields are empty')
            }

        }
    }

    return(
        <div className="flex h-[100vh] ">

            <div className='bg-[#9dbed6] w-[50%] h-full overflow-y-hidden '>
                <img src={image} alt='' className='bg-cover bg-center rounded-r-[65px] h-[100vh] ' />
            </div>
            
            <div className='flex justify-center items-center bg-gradient-to-r to-[#f3faff] from-[#9dbed6]  w-[55%] '>
                <div className='  border-2 rounded-[20px] shadow-xl bg-[#ffffff] flex flex-col justify-center items-center overflow-hidden '>
                    
                    <div className='flex h-[50px] w-full bg-[#8D8D8D]'>
                        <div className={"w-[50%] flex justify-center items-center border-[#707070] "+(isSignUp?" border-t-2 border-x-2 rounded-t-[20px] bg-white  ":" bg-[#ffffff91] shadow-[-8px_-5px_25px_0px_-_inset] shadow-[rgba(0,0,0,0.4)] border-b-2 ")} onClick={()=>{emptyFields();setIsSignUp(true)}} >Sign Up</div>
                        <div className={"w-[50%] flex justify-center items-center  border-[#707070] "+(isSignUp?" bg-[#ffffff91] shadow-[8px_-5px_25px_0px_-_inset] shadow-[rgba(0,0,0,0.4)] border-b-2 ": " border-t-2 border-x-2 rounded-t-[20px] bg-white ")} onClick={()=>{emptyFields();setIsSignUp(false)}} >Log In</div>
                    </div>
                    
                    <div className='w-full h-0 border-[1px] border-[#c8c8c8e6] ' />
                    
                    <div className='px-[80px] py-[20px] border-b-2 border-x-2 rounded-b-[20px] border-[#707070] '>
                
                        <div className='text-center w-full'>
                            <h2 className='text-[45px] '>{isSignUp?"Create an account":"Welcome back"}</h2>
                            <h5 className='text-[20px] text-[#5f636c] '>{isSignUp ? "Sign up and unleash your creativity" :"Let's pick up where we left off!"}</h5>
                        </div>
                
                        <form className='gap-y-[15px] flex flex-col  text-[20px] mt-[30px] ' onSubmit={handleSubmit}>
                            { 
                                isSignUp && <div className='flex justify-between gap-x-[20px] '>
                                    <label>User Name</label>
                                    <input type='text' ref={userNameRef} className=' rounded-[7px] border-2 px-[10px] py-[2px] border-[#5f5e5e60] focus:outline focus:outline-[#9fd7ff] focus:border-[#55b8ff] ' />
                                </div>
                            }
                            <div className='flex justify-between gap-x-[20px] '>
                                <label>Email</label>
                                <input type='text' ref={emailRef} className={inputStyle}/>
                            </div>
                            <div className='flex justify-between gap-x-[20px] '>
                                <label>Password</label>
                                <input type='password' ref={passwordRef} className={inputStyle}/>
                            </div>
                            <button disabled={isLoading} type='submit' className='w-[110px] h-[45px] font-semibold border-2 rounded-[12px] border-[#66bfff] bg-[#3c9de2] text-white self-center mt-[15px] hover:bg-[rgba(55,148,214,0.71)] hover:border-[#4798d2e4] shadow-2xl '>{isSignUp ? "Sign Up":"Log In"}</button>
                        </form>
                        
                        {error && <div>{error}</div>}

                    </div>
                
                </div>
            </div>
        </div>
    )
}