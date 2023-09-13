import styles from "./styles/blog.module.css";
import { useEffect, useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");


  const postBlog = async () => {
    if (title === "" && content === "") {
      alert("Please fill all fields!");
    } else {
      console.log(title, content);
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const name = JSON.parse(localStorage.getItem("user")).name;
      let result = await fetch("http://localhost:5000/create-blog", {
        method: "post",
        body: JSON.stringify({ title, content, userId, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

      // const fData = new FormData()
      // fData.append('user_image', file)
      // let fileUpload = await fetch("http://localhost:5000/upload", {
      //   method:"post",
      //   body: image/png,
      //   headers: {
      //     "Content-Type":"multipart/form-data"
      //   }
      // });
      // fileUpload = await fileUpload.json();
      // console.log(fileUpload);
      alert("Blog Posted Done!");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <h1>Create Your Blog</h1>
            <p>Learn, Discover and Earn</p>
          </div>
          <div className={styles.section}>
            <div>
              <div>
                <input type="file" className={styles.upload} onChange={(e)=>{setFile(e.target.files[0])}} />
              </div>
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
              {/* <input type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} /> */}
            </div>
          </div>
          <button className={styles.postBtn} onClick={postBlog}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
