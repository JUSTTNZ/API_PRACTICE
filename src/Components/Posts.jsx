// import { useState, useEffect } from 'react'

// const Posts = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] =  useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 setLoading(true)
//                 const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//                 if(!response.ok) {
//                     throw new Error('HTTP error, network disconnected')
//                 }
//                 const data = await response.json()
//                 setPosts(data)
//                 console.log('response: ',data);
                
//             } catch (err) {
//                 setError(err.message)
                
//             }
//             finally{
//                 setLoading(false)
//             }
//         }
        

//         fetchPosts()
//     },[])

//     if(loading) return <div>loading</div>
//     if(error) return <div>{error}</div>
    
//   return (
//     <div>
//         {!error ?
//             <ul className='list-none'>
//         {posts.map((post, id) => (
//             <li key={id} className='flex gap-4 space-y-2 overflow-x-hidden'>
//                     <p className=''>{post.id}</p>
//                     <p className='text-center'>{post.title}</p>
//                     <div>{post.body}</div>
//             </li>
//         ))}
//         </ul>
//         : 
//         {error}
//         }
        
//     </div>
//   )

// }
// export default Posts

import { useState, useEffect } from 'react'
import axios from 'axios';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [newData, setNewData] = useState({title: '', body:''})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data)
                console.log(response.data);
                // if(!response.ok) {
                //     throw new Error('HTTP error, network disconnected')
                // }
                
            } catch (err) {
                setError(err.message)
            }
            finally{
                setLoading(false)
            }
        }
        

        fetchPosts()
    },[])

    const handleNewPost = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts')
            setPosts([response.data, ...posts]);
            setNewData({title: '', body: ''});
            console.log(newData);
            
        } catch (err) {
            setError(err.message)
        }
    }

    if(loading) return <div>loading</div>
    if(error) return <div>Error: {error}</div>
    
    const filteredPost = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className=''>

        <h1>Post</h1>
        <div className='flex flex-col '>
            <input 
            className='w-[100px]'
            type="text" 
            placeholder='post title'
            value={newData.title}
            onChange={(e) => setNewData({...newData, title: e.target.value})}
            />

            <textarea 
            placeholder='post body'
            value={newData.body}
            onChange={(e) => setNewData({...newData, body: e.target.value})}
            ></textarea>

            <div>
                <button 
                className='w-[300px]'
                type="button"
                onClick={handleNewPost}>
                Click</button>
            </div>
        </div>

        <input 
        placeholder='search'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
        
        <ul>
            {filteredPost.map(post => (
                <li key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
        
    </div>
  )

}
export default Posts
