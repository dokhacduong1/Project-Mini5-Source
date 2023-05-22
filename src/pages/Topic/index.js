import { Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { getListTopic} from "../../services/topicServices";
import { Link } from "react-router-dom";
import "./Topic.scss"
function Topic() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchApi = async () => {
            setData(await getListTopic());
            
        }
        fetchApi()
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Tên Chủ Đề',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <Link to={`/quiz/${record.id}`}>
                    <Button className="topics__button">Làm Bài</Button>
                </Link>
            ),
        }
    ];
    return (
        <>
            <Card className="topics">
                <h2>Danh Sách Chủ Đề</h2>
                <Table rowKey={record => record.id} pagination={false} dataSource={data} columns={columns} />


            </Card>
        </>
    )
}
export default Topic;