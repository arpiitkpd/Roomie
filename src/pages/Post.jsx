import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/index.js';
import appwriteService from '../appwrite/config.js';
import Container from '../components/container/Container';
import { useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPostById(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    setLoading(true);
    try {
      // Delete post from server
      await appwriteService.deletePost(post.$id);
  
      // Delete related files
      if (post.featuredPictures) {
        await appwriteService.deleteFile(post.featuredPictures);
      }
  
      // Remove individual post cache
      sessionStorage.removeItem(`post-${post.$id}`);
      localStorage.removeItem(`post-${post.$id}`);
      navigate('/');
      // Redirect to homepage
      
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally, set an error state to display a message to the user
    } finally {
      setLoading(false);
    }
  };
  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return post ? (
    <div className="py-8 relative">
      <Container>
        <div className="w-full flex justify-center mb-6 relative border rounded-xl p-4 bg-white shadow-lg">
          <img
            src={appwriteService.getFilePreview(post.featuredPictures)}
            alt={post.owner}
            className="rounded-xl object-cover w-full max-w-screen-sm h-auto max-h-80"
            loading="lazy"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/edit-post/${post.$id}`}
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            Edit
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={deletePost}
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700'
                            } block w-full text-left px-4 py-2 text-sm`}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.owner}</h1>
          <p className="text-lg font-medium text-gray-600">{post.address}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-3">
            <span className="text-xl font-semibold text-gray-800">
              Rent: ${post.rent} / month
            </span>
            <span className="text-xl text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {post.roommates} Roommates
            </span>
            <span className="text-xl text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {post.Gender}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-lg">
            <span>Available from:</span>
            <span className="font-medium">
              {new Date(post.from).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span>to</span>
            <span className="font-medium">
              {new Date(post.to).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={togglePopup}
            className="w-full py-3 bg-blue-500 text-white text-lg font-bold rounded-md"
          >
            Contact Owner
          </button>
        </div>
      </Container>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative backdrop-filter backdrop-blur-md bg-opacity-70">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-lg">Owner: {post.owner}</p>
            <p className="text-lg">Email: {userData?.email || 'Not provided'}</p>
            <p className="text-lg">Phone: {post.ownerPhone || 'Not provided'}</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>No post available</div>
  );
}

export default Post;
