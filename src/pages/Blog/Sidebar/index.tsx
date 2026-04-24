import styled from "styled-components";
import React, { useState } from 'react';
import BlogItem from "../../../Component/BlogItem";
import { Title } from "../../../styled";
import Icons from "../../../Component/BaseComponent/Icons";
import { useBlogs } from "../../../service/blogService";
import { GET_IMAGE_URL } from "../../../api";
import dayjs from "dayjs";


interface SidebarProps {
    onSearch?: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSearch }) => {
    const { blogs, isLoading } = useBlogs();
    const [search, setSearch] = useState('');

    if (isLoading) return <div>Đang tải...</div>;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const recentBlogs = blogs?.slice(0, 5) || [];
    const categories = Array.from(new Set(blogs?.map(b => b.category).filter(Boolean))) as string[];

    return ( 
        <SideBar>
            <SearchBox>
                <Icons.SearchIcon />
                <SearchInput 
                    placeholder="Tìm kiếm bài viết" 
                    value={search}
                    onChange={handleSearchChange}
                />
            </SearchBox>
            {categories.length > 0 && (
                <TypeBox>
                    <Title small>Chọn loại bài viết</Title>
                    {categories.map((type, index) => {
                        return <TypeItem key={index}>
                                    <input type="checkbox" />
                                    <span>{type}</span>
                                </TypeItem>
                    })}
                </TypeBox>
            )}
            <OrtherBlog>
                <Title small>Các bài viết khác</Title>
                <ListBlog>
                    {recentBlogs.map((blog) => {
                        const imageUrl = blog.thumbnail ? (blog.thumbnail.startsWith('http') ? blog.thumbnail : `${GET_IMAGE_URL}/blogs/${blog.thumbnail}`) : "./images/insta6.jpg";
                        return <BlogItem
                                    key={blog.id}
                                    imgUrl={imageUrl}
                                    timeText={dayjs(blog.published_at).format('DD/MM/YYYY')}
                                    blogTitle={blog.title}
                                    slug={blog.slug}
                                />
                    })}
                </ListBlog>
            </OrtherBlog>
        </SideBar>
     );
}


const SideBar = styled.div`
    width: 30%;
    padding:  0 10px 10px;
    /* margin: 0 10px; */
`;

const SearchBox = styled.div`
    padding: 15px 25px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #eee;
    margin: 0 0 30px;
    background: #fff;
    transition: all 0.3s ease;

    &:focus-within {
        border-color: #ff681a;
        box-shadow: rgba(255, 104, 26, 0.1) 0px 4px 12px;
    }
`
const SearchInput = styled.input`
    width: 100%;
    font-size: 14px;
    color: #777777;
    border: none;
    outline-color: none;
    padding: 10px 8px;

    &:focus {
        outline: none;
        border: none;
    }
`

const TypeBox = styled.div`
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #eee;
    margin: 0 0 30px;
    background: #fff;
`
const TypeItem = styled.div`
    padding: 10px 0 10px 10px;

    & input {
        font-size: 14px;
    }

    & span {
        font-size: 14px;
        color: black;
        margin-left: 20px;
    }
`

const OrtherBlog = styled.div`
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #eee;
    margin: 0 0 15px;
    background: #fff;
`
const ListBlog = styled.div`
    margin-top: 23px;
`;

export default Sidebar;