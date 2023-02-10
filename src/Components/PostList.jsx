import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";
const PostList = ({posts, title, remove}) => {

    if(!posts.length) {
        return (
            <h2 style={{margin: "20px 0px", textAlign: "center"}}>No posts founded!</h2>
        )
    }

  return (
    <div>
      <h1 style={{textAlign: "center"}}>{title}</h1>
      <TransitionGroup>
          {posts.map((post) =>
              <CSSTransition
                  key={post.id}
                  timeout={500}
                  classNames="post"
              >
                <PostItem remove={remove} post={post}/>
              </CSSTransition>
          )}
      </TransitionGroup>

    </div>
  );
};

export default PostList;
