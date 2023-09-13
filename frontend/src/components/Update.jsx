
import styles from "./styles/blog.module.css";
import { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';

const Update = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    getBlogDetails();
  },[])

  const getBlogDetails = async ()=>{
    let result = await fetch(`http://localhost:5000/blog/${params.id}`);
    result = await result.json();
    setTitle(result.title)
    setContent(result.content)
  }

  const updateBlog = async () => {
    let result = await fetch(`http://localhost:5000/blog/${params.id}`, {
      method:"Put",
      body: JSON.stringify({title, content}),
      headers:{
        'Content-Type' : 'applicaton/json'
      }
    });
    result = await result.json();
    console.log(result)
    navigate('/profile')
    alert("Blog Updated!");
    }
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <h1>Update Your Blog</h1>
            <p>Learn, Discover and Earn</p>
          </div>
          <div className={styles.section}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={title}
                placeholder="ex: Artificial Intellegence, Forest etc."
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea
                name=""
                id=""
                cols="116"
                rows="8"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <button className={styles.postBtn} onClick={updateBlog}>
            Update
          </button>
        </div>
      </div>
    </>
  );

};

export default Update;
