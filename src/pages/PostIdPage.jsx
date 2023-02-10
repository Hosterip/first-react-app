import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div style={{width:"700px"}}>
            <h2 style={{margin: "10px 0"}}>Id of the post is {params.id}</h2>
            {isLoading
                ? <Loader/>
                : <div style={{margin: "10px 0"}}><strong>Post title: </strong>{post.title}</div>
            }
            <h3>Comments</h3>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map((comm) =>
                        <div key={comm.id} style={{margin: "10px 0", border: "1px solid teal", padding: "10px"}}>
                            <strong>{comm.id}. {comm.email}</strong>
                            <div style={{margin: "10px 0 0 0"}}>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;