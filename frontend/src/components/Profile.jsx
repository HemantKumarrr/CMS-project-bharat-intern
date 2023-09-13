import {useEffect, useState} from 'react'
import Blog from './blog';
import {Link} from 'react-router-dom'


import styles from './styles/profile.module.css'

const userData = JSON.parse(localStorage.getItem('user'))

const Profile = () => {
    const [blogs, setBlogs] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    useEffect(()=>{
        getBlog();
    },[])

    const getBlog = async ()=>{
        let result = await fetch(`http://localhost:5000/blogs/${userId}`);
        result = await result.json();
        setBlogs(result);
        console.log(result)
    }
    const deleteBlog = async (id)=>{
        let result = await fetch(`http://localhost:5000/blog/${id}`,{
            method:"delete"
        });
        result = await result.json();
        console.log(result)
        if(result){
            getBlog();
        }
    }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.box}>
                <i className="ri-account-circle-line myicon"></i>
                <div>
                    <h1>Name : </h1>
                    <h1>{userData.name}</h1>
                    <button className={styles.editBtn}></button> 
                </div>
                <div>
                    <h1>Email : </h1>
                    <h1>{userData.email}</h1>
                    <button className={styles.editBtn}></button> 
                </div>
            </div>    
            <div className={styles.blog_list}>
                {
                    blogs.map((item)=>{
                        return (
                            <>
                                <Blog title={item.title} content={item.content} name={item.name} user_img={item.user_img} />
                                <div className={styles.btn}>
                                    <button className={styles.deleteBtn} onClick={()=>{deleteBlog(item._id)}}>Delete</button>
                                    <Link to={"/update/"+ item._id} className={styles.updateBtn} >Update</Link>
                                </div>
                            </>
                        )
                    })
                }
                
            </div>
        </div>
    </>
  )
}

export default Profile;
