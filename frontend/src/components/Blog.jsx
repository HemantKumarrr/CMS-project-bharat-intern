import styles from './styles/blogList.module.css'

const Blog = ({title, content, name}) => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.posts}>
                <div className={styles.post}>
                    <div className={styles.info}>
                        <h1>{title}</h1>
                        <p>{content}</p>
                        <p className={styles.author}><i className="ri-account-circle-line myicon"></i><span className='authorName'>{name}</span> </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blog;
