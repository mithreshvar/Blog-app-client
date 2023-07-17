
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import BlogPreview from "../Home/BlogPreview";

export default function MyPages() {

    const { user } = UserAuth()
    const [ blogPreviews, setBlogPreviews ] = useState([])
    console.log(user)

    useEffect(()=>{

        const fetchData = async () => {
                    
            try{
                const response = await fetch(`https://blog-app-api-nl9o.onrender.com/api/blog/my`,{
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    setBlogPreviews(json)
                }
                else {
                    console.log(json.error)
                }
            }
            catch(err) {
                console.log(err.message);
            }
            
        }

        fetchData();

    },[])

    return(

        <div className='font-poppins'>
            <div className="absolute w-full">
                <NavBar />
            </div>
            <div className='h-[100vh] overflow-scroll w-full'>
                <div className="flex flex-col w-full gap-y-[30px] pt-[150px] pb-[80px] justify-center items-center  px-[15%]  ">

                    {blogPreviews.map((data, i)=><BlogPreview data={data} key={i}/>)}

                </div>
            </div>
        </div>

    )
}