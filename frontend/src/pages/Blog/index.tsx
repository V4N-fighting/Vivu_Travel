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


const ITEM_PER_PAGE = 6;

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
                pageLocation="blog"
            />
            <BlogPage>
                <Contain>
                    <PageHeader>
                        <PageTitle>Tất cả bài viết</PageTitle>
                        <PageSubtitle>Khám phá những câu chuyện du lịch, mẹo vặt hữu ích và review trải nghiệm thực tế</PageSubtitle>
                    </PageHeader>
                    <Content>
                        {listContent.map((item) => {
                            const imageUrl = item.thumbnail ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${GET_IMAGE_URL}/blogs/${item.thumbnail}`) : "./images/4-900x490.jpg";
                            // Lấy plain text từ content (strip html) và giới hạn độ dài cho mô tả
                            const plainText = (item.content || '').replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
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
                    </Content>
                    <PaginationWrapper>
                        <Pagination 
                            itemsPerPage={ITEM_PER_PAGE} 
                            totalPage={totalPages} 
                            onChange={(value : number)=> {getCurrentPage(value)}} 
                        />
                    </PaginationWrapper>
                </Contain>
                <SidebarWrapper>
                    <Sidebar onSearch={setSearch} />
                </SidebarWrapper>
            </BlogPage>
            
        </>
    );
}

const BlogPage = styled.div`
    display: flex;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
    padding: 60px 20px 100px;
    gap: 40px;
`;

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    min-width: 0;
`

const PageHeader = styled.div`
    margin-bottom: 30px;
`

const PageTitle = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #1C1C1C;
    margin: 0 0 8px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`

const PageSubtitle = styled.p`
    font-size: 15px;
    color: #888;
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    width: 100%;
`;

const Col = styled.div`
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(255, 104, 26, 0.12);
    }
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`

const SidebarWrapper = styled.div`
    width: 320px;
    flex-shrink: 0;
`


export default Blog;
