import React, {useEffect, useState} from 'react';
import appwriteService from "../appwrite/config.js";
import { Container, Loader, PostCard } from "../components/index.js"
import { useParams } from 'react-router-dom';

function QueryPosts() {

    const { query } = useParams(); 
    const[posts, setPosts] = useState([])
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
      console.log(query);
      
        if(query){
            appwriteService.seachPost(query).then((posts)=>{
            if(posts){
              setPosts(posts.documents)
              setLoading(false)
            }else{
              console.log("no posts");
              
            }
          })
        }
          
        
        
    },[query])


    if(loading){
        return(<>
        <div className='min-h-full  flex justify-center items-center'>
            <Loader/>
        </div>
        </>
            )
        
    }else if(!loading){
        if(posts.length===0){
            return(
                <div className="w-full py-8 mt-4 text-center h-full min-h-screen bg-slate-50">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold text-black hover:text-gray-500">
                                    No rooms available on : {query}
                                    
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
          }else{
            return(
                
                        // <div className='flex'>    
                        //     {posts .map((post)=>(
                        //         <div className="p-2 w-1/3" key={post.$id}>
                        //             <PostCard {...post}/>
                        //         </div>
                        //     ))}
                        // </div>
                        <div className="md:px-2 mt-14 md:grid md:grid-cols-2 mx-6 my-9 place-items-center lg:grid-cols-4 gap-1 space-y-4 md:space-y-0" style={{rowGap:" 1.7rem"}}>
                            {
                posts.map((post)=>{
                   
                    return(
                        <div key={post.$id} className='w-full'> 
                            <PostCard {...post} />
                        </div>
                    )
                })
                    
                    
                }
                        


                      </div>
            )
          }
        
    }


  
}

export default QueryPosts