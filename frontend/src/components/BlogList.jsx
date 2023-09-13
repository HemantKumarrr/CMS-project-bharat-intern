import {useEffect, useState} from 'react'
import Blog from './blog';


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(()=>{
        getBlog();
    },[])

    const getBlog = async ()=>{
        let result = await fetch("http://localhost:5000/blogs");
        result = await result.json();
        setBlogs(result);
        console.log(result)
    }
  return (
    <>
        {
            blogs.map((item)=>{
                return (
                    <Blog title={item.title} content={item.content} name={item.name} user_img={item.user_img} />
                )
            })
        }    
    </>
  )
}

export default BlogList
