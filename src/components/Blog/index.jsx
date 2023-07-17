import { UserAuth } from "../../context/AuthContext";
import comments from "../../assets/comment.svg"
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Blog() {

    const { user, blogData, setBlogData, setEditData } = UserAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const isAuthor = user?.userName === blogData?.userName;

    if (!blogData.content) {
        const fetchData = async () => {
            
            try{
                const response = await fetch(`https://blog-app-api-nl9o.onrender.com/api/blog/${id}`);
                let json = await response.json();
    
                if (response.ok) {
                    let d = new Date(json.createdAt.split('T')[0]);
                    let month = d.toLocaleDateString('US-en', {month: 'short'})
                    let date = d.getDate()
                    let year = d.getFullYear()
                    let currYear = new Date().getFullYear()
                    if (year===currYear) year = ''; else year = ' ,'+year;
                    if (json.createdAt !== json.updatedAt) {
                      month = `Update ${month}`
                    } 

                    json = {...json, month, date, year}
                    setBlogData(json)
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
    }

    const deleteBlog = async () => {

        if (confirm("Are you Sure to DELETE this blog?")){
            try{
                const response = await fetch(`https://blog-app-api-nl9o.onrender.com/api/blog/${id}`,{
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                let json = await response.json();
    
                if (response.ok) {
                    toast.success('Blog Deleted')
                    setTimeout(()=>navigate('/'),4000)
                }
                else {
                    console.log(json.error)
                }
            }
            catch(err) {
                console.log(err.message);
            }
        }

    }

    return(
        <>
            <NavBar/>
            <div className="font-poppins p-[100px] w-full flex  justify-center overflow-scroll ">

                <div className="w-[65%] flex flex-col justify-center gap-y-[10px] px-[30px] ">

                    <div className="text-[42px] font-semibold w-fit " >{blogData.title}</div>

                    <div className='flex font-medium '>{blogData.userName} <span className='whitespace-pre text-[#757575] ' >{` . ${blogData.month} ${blogData.date}${blogData.year}`}</span></div>
                    <div className='w-full p-[12px] px-[25px] border-y-[2px] mt-[10px] border-[#f2f2f2] flex justify-between ' >
                        <img src={comments} alt='' className="h-[20px] w-[20px] [transform:scaleX(-1)] "/>
                        {isAuthor && <div className="flex gap-x-[15px]">
                            <Link to={`/edit/${blogData._id}`} onClick={()=>setEditData({title: blogData.title, content: blogData.content, userName: blogData.userName})} >Edit</Link>
                            <div className="cursor-pointer" onClick={()=>{deleteBlog()}}>Delete</div>
                        </div>}
                    </div>

                    <div className='text-[22px] px-[10px] mt-[50px] w-fit' >
                        <pre className="whitespace-pre-wrap font-poppins ">{blogData.content}</pre>
                    </div>

                    <div className='w-full h-0 border-[1px] border-[#E6E6E6] mt-[50px] ' />

                </div>
                <ToastContainer
                    position="bottom-left"
                    limit={1}
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>
    )
}