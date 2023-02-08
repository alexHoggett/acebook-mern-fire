import React, { useState } from 'react';

const PostForm = ({post}) => {  
    console.log(window.localStorage)
    const[newPost, setNewPost] = useState("")

    const handleSubmit = async (event) => {
        // event.preventDefault();
        const token = window.localStorage.getItem("token")
        let response = await fetch( '/posts', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: newPost })
        })
    
        if(response.status !== 201) {
          console.log("post was not created");

        } else {
          console.log("post was created")
          let data = await response.json()
          window.localStorage.setItem("token", data.token);

        }
      }

    const handlePostChange = (event) => {
        setNewPost(event.target.value)
      }

  return(
  

    <div>
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='Add new post' 
                id="post" type='text'
                value={newPost}
                onChange={handlePostChange}
            />
            <button type='submit'>create post</button>
        </form>
    </div>
  )
  }

export default PostForm;


