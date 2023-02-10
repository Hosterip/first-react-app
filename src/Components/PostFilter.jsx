import React from 'react';
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput value={filter.query} onChange={event => setFilter({...filter,query:event.target.value})} placeholder="Search" />
            <MySelect value={filter.sort} onChange={selectedSort => setFilter({...filter, sort: selectedSort})} options={[
                {value: "title", name: "By title"},
                {value: "body", name: "By description"}
            ]} defaultValue={"Sort by"}/>
        </div>
    );
};

export default PostFilter;