import { useState, useEffect } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json()
                setPosts(data)
                console.log('response: ',data);
                
            } catch (error) {
                console.log(setError(error));
                
            }
            finally{
                setLoading(false)
            }
        }
        

        fetchPosts()
    },[])
    
  return (
    <div>
        <ul className='list-none'>
        {posts.map((post, id) => (
            <li key={id} className='flex gap-4 space-y-2 overflow-x-hidden'>
                    <p className=''>{post.id}</p>
                    <p className='text-center'>{post.title}</p>
                    <div>{post.body}</div>
            </li>
        ))}
        </ul>
    </div>
  )

}
export default Posts
