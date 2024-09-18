import React, { useEffect, useState, useMemo } from 'react';
import appwriteService from "../appwrite/config.js";
import { Container, Loader, PostCard , Logo} from "../components/index.js";
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'

function Home() {
  const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const cacheKey = `posts-${query || 'all'}`;
      const cachedPosts = sessionStorage.getItem(cacheKey);

      if (cachedPosts) {
        setPosts(JSON.parse(cachedPosts));
        setLoading(false);
      } else {
        try {
          const fetchedPosts = query ? await appwriteService.searchPost(query) : await appwriteService.getPosts();
          if (fetchedPosts) {
            const postsToCache = fetchedPosts.documents;
            sessionStorage.setItem(cacheKey, JSON.stringify(postsToCache)); // Cache posts data
            setPosts(postsToCache);
            setLoading(false);
          } else {
            console.log("No posts available.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [query]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  if (loading) {
    return (
      <div className='min-h-full flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section style={{background:"#5075dc"}} className=" text-white py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Find Your Perfect Roommate</h1>
          <p className="text-lg md:text-xl mb-6">Easily list your room or flat and connect with potential roommates in just a few steps.</p>
          <Link to="/list-room" className="bg-yellow-500 text-black py-3 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">List Your Room Now</Link>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-4">1</div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Create an Account</h3>
              <p className="text-sm md:text-base">Sign up to get started with listing your room or finding your ideal roommate.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-4">2</div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">List Your Room</h3>
              <p className="text-sm md:text-base">Provide details about your room or flat to get it listed on our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-4">3</div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Connect with Roommates</h3>
              <p className="text-sm md:text-base">Browse through profiles and connect with potential roommates to find the perfect match.</p>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
    );
  }

  return (
    <div className="md:px-2 mt-14 md:grid md:grid-cols-2 mx-6 my-9 place-items-center lg:grid-cols-4 gap-1 space-y-4 md:space-y-0" style={{ rowGap: "1.7rem" }}>
      {memoizedPosts.map((post) => (
        <div key={post.$id} className='w-full'>
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
