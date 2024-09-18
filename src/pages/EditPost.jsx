import React,{useEffect, useState} from 'react'
import {Container, Postform} from "../components/index.js"
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config.js'

function EditPost() {
    const [post, setpost] = useState(null)
    const{slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPostById(slug).then((post)=>{
                if(post){
                    setpost(post);
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate ])
  return post? (
    <div className="py-8">
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ): null
}

export default EditPost