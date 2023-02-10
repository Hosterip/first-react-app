import React, {useEffect, useRef, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import PostList from "../Components/PostList";
import Pagination from "../UI/pagination/Pagination";
import Loader from "../UI/loader/Loader";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: "", query:""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts,...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useObserver(lastElement,page < totalPages,isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        if(limit === 25 && page >= 7) {
            setPage(-100)
        }else if(limit === 100 && page > 1) {
            setPage(-100)
        }

        fetchPosts(limit, page)
    }, [page, limit])
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    return (
        <div className='App'>
            <MyButton onClick={() => setModal(true)}>Click to create a new post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: "15px 0"}}/>

            <PostFilter filter={filter} setFilter={setFilter}/>

            <MySelect value={limit} onChange={value => setLimit(+value)} defaultValue="Number of items on the page" options={[
                {value: 5, name: "5"},
                {value: 10, name: "10"},
                {value: 25, name: "25"},
                {value: 100, name: "All"}
            ]}/>

            {postError && <h1>Error {postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts list"}/>
            <div ref={lastElement} style={{height: "20px"}}/>
            {isPostsLoading && <div style={{display:"flex",justifyContent:"center", marginTop: "50px"}}><Loader/></div>}

            {/*<Pagination page={page} totalPages={totalPages} changePage={changePage}/>*/}
        </div>
    );
}

export default Posts;
