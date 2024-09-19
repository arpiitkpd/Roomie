import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config.js";
import { Container, Loader, PostCard } from "../components/index.js";
import { useParams } from 'react-router-dom';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState({});
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchProfileAndPosts = async () => {
                try {
                    const prof = await appwriteService.getProfileById(slug);
                    setProfile(prof.documents[0]);
                    
                    const post = await appwriteService.getpostByUser(slug);
                    setPosts(post.documents);
                } catch (error) {
                    console.error("Error fetching profile or posts:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfileAndPosts();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className='min-h-full flex justify-center items-center'>
                <Loader />
            </div>
        );
    }else{
        if(posts.length===0){
            return (

                <div>
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
                        <div className="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-6">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-300">
                                <img src={`${appwriteService.getFilePreview(profile.profilePicture)}`} alt="Profile Picture" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                                <p className="text-gray-600 text-sm mt-2">Age: {profile.age}</p>
                                <p className="text-gray-600 text-sm">Gender: {profile.gender}</p>
                                <p className="mt-4 text-gray-700">{profile.bio}</p>
                            </div>
                        </div>
                    </div>
        
                    <div className="max-w-6xl mx-auto mt-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts by {profile.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            No Rooms are Rented
                        </div>
                    </div>
                </div>
            );
        }
        else{
return (

        <div>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
                <div className="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-300">
                        <img src={`${appwriteService.getFilePreview(profile.profilePicture)}`} alt="Profile Picture" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                        <p className="text-gray-600 text-sm mt-2">Age: {profile.age}</p>
                        <p className="text-gray-600 text-sm">Gender: {profile.gender}</p>
                        <p className="mt-4 text-gray-700">{profile.bio}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts by {profile.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map(post => (
                        <div key={post.$id} className='w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

        
    }

    
    }}

export default Profile
