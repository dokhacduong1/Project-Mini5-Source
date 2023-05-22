import { useEffect, useState } from "react";
import { getAnswerByUserId } from "../../services/answersService";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "antd";
import { getTopic } from "../../services/topicServices";

function Answers(){
    const [dataAnswers,setDataAnswers] = useState();
    useEffect(()=>{
        const fetchApi = async()=>{
            let result = await getAnswerByUserId();
            for (let i = 0; i < result.length; i++) {
                const topic = await getTopic(result[i].topicId);
                result[i].topicName = topic.name;
              }
            setDataAnswers(result);
           
        }   
        fetchApi()
    },[])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Tên Chủ Đề',
            dataIndex: 'topicName',
            key: 'topicName',
            align: 'center'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <Link to={`/result/${record.id}`}>
                    <Button className="topics__button">Xem Chi Tiết</Button>
                </Link>
            ),
        }
    ];
    return (
        <>
            <Card className="topics">
                <h2>Danh Sách Chủ Đề</h2>             
                <Table rowKey={record => record.id} pagination={false} dataSource={dataAnswers} columns={columns} />                         
            </Card>
        </>
    )
}
export default Answers;