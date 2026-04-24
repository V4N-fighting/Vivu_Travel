import React, { useState } from 'react';
import styled from "styled-components";
import Banner from "../../Component/Banner";
import NewsCard from "../../Component/NewsCard";
import Sidebar from "./Sidebar";
import { usePagination } from "../../Hooks/usePagination";
import Pagination from "../../Component/Pagination";
import { useBlogs } from "../../service/blogService";
import { GET_IMAGE_URL } from "../../api";
import dayjs from "dayjs";


const ITEM_PER_PAGE = 4;

function Blog() {
    const { blogs, isLoading, isError } = useBlogs();
    const [search, setSearch] = useState('');

    const {
        indexOfFirstItem,
        indexOfLastItem,
        totalPages,
        getCurrentPage
      } =  usePagination(ITEM_PER_PAGE, blogs?.length || 0)
    
      if (isLoading) return <div style={{ padding: '100px', textAlign: 'center' }}>Đang tải bài viết...</div>;
      if (isError) return <div style={{ padding: '100px', textAlign: 'center' }}>Có lỗi xảy ra khi tải bài viết</div>;

      const filteredBlogs = blogs?.filter(b => 
        b.title.toLowerCase().includes(search.toLowerCase())
      ) || [];

      const listContent = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

    const categoriesMap: { [key: string]: string } = {
        'travel': 'Cẩm nang du lịch',
        'news': 'Tin tức sự kiện',
        'review': 'Review trải nghiệm'
    };

    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Blog"}
                thisPage={"/Blog"}
            />
            <BlogPage>
                <Contain>
                    
                    <Content>
                        {listContent.map((item) => {
                            const imageUrl = item.thumbnail ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${GET_IMAGE_URL}/blogs/${item.thumbnail}`) : "./images/4-900x490.jpg";
                            // Lấy plain text từ content (strip html) và giới hạn độ dài cho mô tả
                            const plainText = item.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
                            const categoryLabel = categoriesMap[item.category] || item.category || "Tin tức";
                            
                            return <Col key={item.id}>
                                        <NewsCard
                                            url={imageUrl}
                                            title={item.title}
                                            textDescr={plainText}
                                            textTime={dayjs(item.published_at).format('DD [tháng] MM, YYYY')}
                                            label={categoryLabel}
                                            view={"0"}
                                            slug={item.slug}
                                        />
                            </Col>
                        })}
                        <Pagination 
                            itemsPerPage={ITEM_PER_PAGE} 
                            totalPage={totalPages} 
                            onChange={(value : number)=> {getCurrentPage(value)}} 
                        />
                    </Content>
                </Contain>
                <Sidebar onSearch={setSearch} />
            </BlogPage>
            
        </>
    );
}

const BlogPage = styled.div`
    display: flex;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
    padding: 100px 0;
`;

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 0 10px;
    /* margin: 0 10px; */
`

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 30px;
`;

const Col = styled.div`
    width: calc(100% - 30px);
    margin-bottom: 20px;
`;




export default Blog;
