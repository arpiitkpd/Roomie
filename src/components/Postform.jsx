import React from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input, Select, MultiValueInput} from './index.js'
import appwriteService from '../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Postform({post}) {
    const {register, handleSubmit}= useForm({
        defaultValues:{
            owner: post?.owner|| "",
            address: post?.address || "",
            rent: post?.rent,
            flatSize: post?.flatSize||"",
            status: post?.status || 'active',
            Gender: post?.Gender || "Male",
            roomates: post?.roomates,
            from: post?.from,
            to: post?.to,
            featuredPictures: post?.featuredPictures,
            residential: post?.residential,
            roomsAllocated: post?.roomsAllocated,
            condition: post?.condition
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)

    const submit= async(data)=>{
        console.log(data);
        
        if(post){
            const file=data.image[0]?appwriteService.uploadFile(data.image[0]): null
            
            
            if(file){
                appwriteService.deleteFile(post.featuredPictures)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
               
                ...data,
                rent: Number(data.rent),
                roomates: Number(data.roomates),
                roomsAllocated: Number(data.roomsAllocated),
                featuredPictures: file? file.$id : undefined,

            })

            if(dbPost)[
                navigate(`/post/${dbPost.$id}`)
            ]

        }
        else{
            
            
            const file = await appwriteService.uploadFile(data.image[0]);
            
            if(file){
                const fileId = file.$id
                data.featuredPictures = fileId
              
                const dbPost =await appwriteService.createPost({
                    ...data,
                    rent: Number(data.rent),
                    roomates: Number(data.roomates),
                    roomsAllocated: Number(data.roomsAllocated),
                    userId: userData.$id,
                   
               })

               if(dbPost){
                navigate(`/post/${dbPost.$id}`)
               }
            }
        }
    }

  return (
   
<div className="min-w-full w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 " style={{background:"#f8f8f8f2"}}>
<div className="grid  gap-8 grid-cols-1" >
	<div className="flex flex-col ">
			<div className="flex flex-col sm:flex-row items-center">
				<h2 className="font-semibold text-3xl mr-auto text-black">Room Info</h2>
				<div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
			</div>
            <form onSubmit={handleSubmit(submit)}
        className="">
           <div className="mt-5">
				<div className="form">
						<div className="md:flex flex-row md:space-x-4 w-full text-xs">
							<div className="mb-3 space-y-2 w-full text-xs">
                                <Input
                                label = 'Owner'
                                placeholder='Owner'
                                className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                                type="text"
                                {...register("owner", {required: true})}
                                />
								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>


							<div className="mb-3 space-y-2 w-full text-xs">
                            <Input
                            label = 'From: (date)'
                            placeholder='From'
                            className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            type="date"
                            {...register("from", {required: true})}
                            />
								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>

							<div className="mb-3 space-y-2 w-full text-xs">
                            <Input
                            label = 'Rented Period (months/flexible)'
                            placeholder='6 months'
                            className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            type="text"
                            {...register("to")}
                            />
								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>

						</div>


						<div className="md:flex flex-row md:space-x-4 w-full text-xs">
							
                            
							<div className="mb-3 space-y-2 w-full text-xs">
                            <Input
                            label = 'Address'
                            placeholder='Address'
                            className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            type="text"
                            {...register("address", {required: true})}
                            />
								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>
                            
                            <div className="mb-3 space-y-2 w-full text-xs">
                            <Input
                            label = 'Roomates required'
                            placeholder='1/2 roomates'
                            className2="font-semibold text-gray-600 py-2"
                            className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            type="number"
                            {...register("roomates", {required: true})}
                            />
								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>

							<div className="mb-3 space-y-2 w-full text-xs">
                            <Input
                            label = 'Rent/mon'
                            placeholder='/month'
                            className2="font-semibold text-gray-600 py-2"
                            className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            type= "number"
                            {...register("rent", {required: true})}
                            />

								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>


						</div>


						<div className="md:flex flex-row md:space-x-4 w-full text-xs">
							
                            <div className="mb-3 space-y-2 w-full text-xs">
                                <Input
                                label = 'Residential Type'
                                placeholder='Apartment House Flat'
                                className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                                type= "text"
                                {...register("residential", {required: true})}
                                />

                                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                            </div>

                            <div className="mb-3 space-y-2 w-full text-xs">
                                <Input
                                label = 'Number of room to rent'
                                placeholder='2 rooms'
                                className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                                type= "number"
                                {...register("roomsAllocated", {required: true})}
                                />

                                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                            </div>

                            
                            <div className="mb-3 space-y-2 w-full text-xs">
                                <Select
                                options = {["Male", "Female"]}
                                label= 'Gender'
                                className2="font-semibold text-gray-600 py-2"
                                className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                                {...register("Gender", {required: true})}
                                />

                                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
							

						</div>

						<div className="md:flex flex-row md:space-x-4 w-full text-xs">
							<div className="mb-3 space-y-2 w-full text-xs">
                            
                            <Input 
                            label="Featured Image"
                            type="file"
                            className2="font-semibold text-gray-600 py-2"
                            className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            accept= "image/jpg ,  image/png, image/jpeg "
                            {...register("image", {required: !post})}
                            />
                            {post && (
                                
                                <div className="w-full mb-4">
                                    <img src={appwriteService.getFilePreview(post.featuredPictures)} alt={post.title}  className="rounded-lg"/>
                                </div>
                            )}
							</div>
							<div className="mb-3 space-y-2 w-full text-xs">
                            
                            <Input 
                            label="Conditions (Veg/No-smoke/etc)"
                            type="text"
                            className2="font-semibold text-gray-600 py-2"
                            className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            {...register("condition", {required: !post})}
                            />
                            {post && (
                                
                                <div className="w-full mb-4">
                                    <img src={appwriteService.getFilePreview(post.featuredPictures)} alt={post.title}  className="rounded-lg"/>
                                </div>
                            )}
							</div>

							<div className="mb-3 space-y-2 w-full text-xs">
                            <Select
                            options = {["active", "inactive"]}
                            label= 'Status'
                            className2="font-semibold text-gray-600 py-2"
                            className ='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                            {...register("status", {required: true})}
                            />

								<p className="text-red text-xs hidden">Please fill out this field.</p>
							</div>

						</div>

                        {/* button */}
						<div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <Button
                            type="submit"
                            bgColor={post? "bg-green-500": this}
                            className="mb-2 md:mb-0 bg-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg "
                            
                            >
                                {post? "Update": "Submit"}
                            </Button>
									
						</div>
						    </div>
						</div>
        </form> 
			
					</div>
				</div>
			</div>
  )
}

export default Postform

