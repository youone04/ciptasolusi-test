import { fetchAPi } from "@/helper/api";
import { lisApi } from "@/helper/listApi";
import { useEffect, useState } from "react"
import { Col, Row, Card, Pagination } from 'antd';
import CardMod from "@components/CardMod";

export default function BaseCard({ title, url }) {
    const [data, setData] = useState({
        data: {},
        loading: true,
        error: null
    })
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 20;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        async function fetchData() {
            await fetchAPi({
                url: `${lisApi[url]}?page=${currentPage}`,
                setData: setData
            });
        }
        fetchData()
    }, [url, currentPage]);

    return (
        <>
            <Card title={<div className="glitch-wrapper">
                <div className="glitch" data-text={title}><p style={{
                    fontSize: 30,
                    color: '#183bffb0'
                }}>{title}</p></div>
            </div>} loading={data.loading}>
                <Row gutter={[16, 16]} style={{ padding: '0 16px' }}>
                    {
                        Object.keys(data.data).length !== 0 && data.data?.results?.map((item, index) => {
                            return (
                                <Col xs={24} sm={24} md={8} lg={6} key={index}>
                                    <CardMod item={item} title={title} />
                                </Col>
                            )
                        })
                    }

                    <Pagination
                        showSizeChanger={false}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                        current={currentPage}
                        total={data.data?.total_results || 0}
                        pageSize={moviesPerPage}
                        onChange={handlePageChange}
                    />
                </Row>
            </Card>
        </>
    )
}