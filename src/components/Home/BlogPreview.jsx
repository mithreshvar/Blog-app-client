/* eslint-disable react/prop-types */
import TextTruncate from 'react-text-truncate'; 
import { Link } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext";


// import comment from '../../assets/comment.svg'

export default function BlogPreview({data}) {

  const { setBlogData } = UserAuth()

  let d = new Date(data.createdAt.split('T')[0]);
  let month = d.toLocaleDateString('US-en', {month: 'short'})
  let date = d.getDate()
  let year = d.getFullYear()
  let currYear = new Date().getFullYear()
  if (year===currYear) year = ''; else year = ' ,'+year;
  if (data.createdAt !== data.updatedAt) {
    month = `Update ${month}`
  } 

  data = {...data, month, date, year}

  return (
    <>
    <div className="max-h-[200px] w-[1000px]  px-[30px] flex flex-col gap-y-[10px] ">

        <div className='flex font-medium '>{data.userName} <span className='whitespace-pre text-[#757575] ' >{` . ${month} ${date}${year}`}</span></div>

        <Link to={'/read/'+data._id} className="text-[30px] font-semibold w-fit " onClick={()=>setBlogData(data)}>{data.title}</Link>

        <Link to={'/read/'+data._id} className='text-[20px] pl-[20px] w-fit' onClick={()=>setBlogData(data)}>
        <TextTruncate
            text={data.content}
            line={3}
            truncateText='...'
        />
        </Link>

    </div>
    <div className='w-full h-0 border-[1px] border-[#E6E6E6] ' />
    </>
  )
}
