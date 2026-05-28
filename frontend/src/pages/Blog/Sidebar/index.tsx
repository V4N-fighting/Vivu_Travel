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
            <SidebarCard>
                <SearchBox>
                    <SearchIconWrap><Icons.SearchIcon /></SearchIconWrap>
                    <SearchInput 
                        placeholder="Tìm kiếm bài viết..." 
                        value={search}
                        onChange={handleSearchChange}
                    />
                </SearchBox>
            </SidebarCard>

            {categories.length > 0 && (
                <SidebarCard>
                    <SidebarTitle small>Chọn loại bài viết</SidebarTitle>
                    <CategoryList>
                        {categories.map((type, index) => {
                            return <CategoryItem key={index}>
                                        <CategoryCheckbox type="checkbox" />
                                        <CategoryLabel>{type}</CategoryLabel>
                                    </CategoryItem>
                        })}
                    </CategoryList>
                </SidebarCard>
            )}

            <SidebarCard>
                <SidebarTitle small>Bài viết gần đây</SidebarTitle>
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
            </SidebarCard>
        </SideBar>
     );
}


const SideBar = styled.div`
    width: 100%;
`;

const SidebarCard = styled.div`
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #f0f0f0;
    margin: 0 0 24px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
`

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 1.5px solid #eee;
    background: #fafafa;
    padding: 4px;
    transition: all 0.3s ease;

    &:focus-within {
        border-color: #FF681A;
        box-shadow: 0 0 0 3px rgba(255, 104, 26, 0.08);
        background: #fff;
    }
`

const SearchIconWrap = styled.div`
    padding: 10px 12px;
    color: #aaa;
    display: flex;
    align-items: center;
`

const SearchInput = styled.input`
    width: 100%;
    font-size: 14px;
    color: #333;
    border: none;
    outline: none;
    padding: 10px 8px;
    background: transparent;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

    &::placeholder {
        color: #bbb;
    }
`

const SidebarTitle = styled(Title)`
    font-size: 18px;
    font-weight: 700;
    color: #1C1C1C;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #FF681A;
    display: inline-block;
`

const CategoryList = styled.div``

const CategoryItem = styled.label`
    display: flex;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;
    transition: all 0.2s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        padding-left: 4px;
    }
`

const CategoryCheckbox = styled.input`
    width: 18px;
    height: 18px;
    accent-color: #FF681A;
    cursor: pointer;
`

const CategoryLabel = styled.span`
    font-size: 14px;
    color: #555;
    margin-left: 12px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`

const ListBlog = styled.div`
    margin-top: 8px;
`;

export default Sidebar;