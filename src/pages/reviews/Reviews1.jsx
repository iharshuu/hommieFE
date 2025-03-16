import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../../lib/config"
const EachReview=(props)=>{
    const token = localStorage.getItem('hoomie');
    const {stars}=props
   const[msg,setMsg]=useState(props.msg.review)
   useEffect(()=>{
    setMsg(props.msg.review)
   },[props.msg.review])
   const[rating,setRating]=useState(props.msg.rating)
   useEffect(()=>{
        setRating(props.msg.rating)
   },[props.msg.rating])
    const [edit,setEdit]=useState(false)
    const handleDelete=async()=>{
        try {
            const response =await  axios.delete(`${backendUrl}reviews/delete_review/${props.postId}/${props.msg._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`, // Include the token in the Authorization header
                }
                
            });
            
        
            if (response.status === 200) {
               // console.log(response?.data?.reviews?.reviews||[]  );
            // setData(response?.data?.reviews?.reviews||[])
            props.setData([...props.data.slice(0,props.index),...props.data.slice(props.index+1,props.data.length)])
            } 
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }
    const handleEdit=()=>{
        setMsg(props.msg.review)
        setRating(props.msg.rating)
    setEdit(!edit)
    }
    const handlesaveEdit=async()=>{
        try {
            const response =await  axios.put(`${backendUrl}reviews/update_review/${props.msg._id}`,{
                postId:props.postId,review:msg,rating
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`, // Include the token in the Authorization header
                },
                
            });


            if (response.data.status=="S") {
                props.msg.review=msg
                props.msg.rating=rating
                setEdit(false)
                //console.log(response)
              //  setData([response?.data?.latest,...data]||[])
              
              // setData([{review,rating,writtenBy:currentUser.name,email:currentUser.email},...data])
             
            } else {
                // Handle error cases
            }
        } catch (error) {
            // Handle fetch error
        }

    }
    return(
        <div>
            {
                edit?<>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">edit review</label>
                <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} id="message" rows={4}  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <div class="flex items-center mb-5">
                {
                    stars.map((x,index)=>
                        <svg  onClick={()=>setRating(index+1)} class={index<rating?"w-4 h-4 ms-1 text-yellow-300":"w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                        )
                }
                </div>
                <button onClick={handlesaveEdit} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Edit</button>
                <button onClick={handleEdit} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back</button>
                </>: 
                <>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">  Added By : {props.msg.writtenBy}</label>
                <textarea value={msg} id="message"  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <div class="flex items-center mb-5">
                {
                    stars.map((x,index)=>
                        <svg  class={index<rating?"w-4 h-4 ms-1 text-yellow-300":"w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                        )
                }
</div>
{props.msg.email==props.currentUser.email&&<div><button onClick={handleEdit} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
<button onClick={handleDelete} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button></div>}
                </> }
        </div>

    )
}
export default function Review(props){
    const token = localStorage.getItem('hoomie');
    const {postId}=props
    const [data,setData]=useState([])
    const   [review,setreview]=useState("")
    const [rating,setRating]=useState(0)
    const [stars,setStars]=useState([1,1,1,1,1])
    let currentUser=JSON.parse(localStorage.getItem("cred"))
    useEffect(()=>{
        const getFunction=async()=>{
            try {
                const response =await  axios.get(`${backendUrl}reviews/view_reviews/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`, // Include the token in the Authorization header
                    },
                    
                });
                
            
                if (response.status === 200) {
                   // console.log(response?.data?.reviews?.reviews||[]  );
                setData(response?.data?.reviews||[])
                } 
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        getFunction()


    },[postId])
    const sendReview=async()=>{
        try {
            const response =await  axios.post(`${backendUrl}reviews/add_review`,{
                postId,review,rating
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`, // Include the token in the Authorization header
                },
                
            });
            // const response = await fetch(`${backendUrl}reviews/add_review`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `${token}`,
            //     },
            //     body: JSON.stringify({postId, review,rating }),
            // });

            if (response.data.status=="S") {
                //console.log(response)
                setData([response?.data?.latest,...data]||[])
              // setData([{review,rating,writtenBy:currentUser.name,email:currentUser.email},...data])
               setRating(0)
               setreview("")
            } else {
                // Handle error cases
            }
        } catch (error) {
            // Handle fetch error
        }
       

    }
    return(
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Add review</label>
             <textarea value={review} onChange={(e)=>setreview(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
             <div class="flex items-center mb-5">
                {
                    stars.map((x,index)=>
                        <svg onClick={()=>setRating(index+1)} class={index<rating?"w-4 h-4 ms-1 text-yellow-300":"w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                        )
                }
</div>
             <button onClick={sendReview} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
        {data.map((x,index)=><EachReview msg={x} stars={stars} currentUser={currentUser} postId={postId} setData={setData} data={data} index={index}/>)}</div>
    )
}