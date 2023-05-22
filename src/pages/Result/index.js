import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicServices";
import { getAnswer } from "../../services/resultService";
import { getListQuestions } from "../../services/quizServices";
import { Button, Form, Radio } from "antd";
import "./Result.scss"
function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    const [dataTopics, setDataTopics] = useState([]);
    const [infoOk,setInfo] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getAnswer(params.id);
            const dataQuestions = await getListQuestions(dataAnswers[0].topicId);
            let result = [];
            for (let i = 0; i < dataQuestions.length; i++) {
                result.push({
                    ...dataQuestions[i],
                    ...dataAnswers[0].answers.find((item) =>
                        item.questionId === dataQuestions[i].id
                    )
                })
            }

            setDataResult(result);
            setDataTopics(await getTopic(dataAnswers[0].topicId));

            let countAnswerTrue = 0;
            for(const item of result){
                if(item.answer === item.correctAnswer){
                    countAnswerTrue+=1;
                }
            }
            let info = {
                countAnswerTrue : countAnswerTrue,
                totalAnswer : result.length
            }
            setInfo(info);
        };
        fetchApi();
    }, []);
   
    return (
        <>
            {dataTopics && (
                <>
                    <h2>Kết Quả Chủ Đề: {dataTopics.name}</h2>
                </>
            )}
            {
                infoOk &&(
                    <>
                        <div>
                            <span>Đúng: <strong>{infoOk.countAnswerTrue}</strong></span>
                            <span> | Sai: <strong>{infoOk.totalAnswer-infoOk.countAnswerTrue}</strong></span>
                            <span> | Tổng Số Câu: <strong>{infoOk.totalAnswer}</strong></span>
                            <span> | Tỷ Lệ Đúng: <strong>{infoOk.countAnswerTrue / infoOk.totalAnswer *100}%</strong></span>
                        </div>
                    </>
                )
            }
            {dataResult.length > 0 && (
                <>
                    <Form
                        className="result__form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            maxWidth: 300,
                        }}
                        layout="vertical"

                    >
                        {
                            dataResult.map((item, index) => (

                                <Form.Item label={<>
                                    <span className="result__form-header">
                                        <p> Câu {index + 1}: {item.question}</p>
                                        {
                                            item.answer === item.correctAnswer ? <p className="result__true">Đúng</p> : <p className="result__false">Sai</p>
                                        }
                                    </span>
                                </>} 
                                
                                name={`questions-${item.id}`}
                                rules={[{ required: true, message: 'Vui Lòng Chọn Không Được Để Trống!' }]}
                                key={item.id} 
                                >
                                    <Radio.Group className="result__form-questions" defaultValue={item.answer}>
                                        {
                                            item.answers.map((answers, i) => {
                                                let className = "";
                                                if (item.answer === i) {
                                                    className = "result__checkfalse"
                                                }
                                                if (item.correctAnswer === i) {
                                                    className = "result__checktrue"
                                                }
                                                return (
                                                    <>
                                                        <Radio className={className} defaultChecked disabled key={i} value={i}>{answers}</Radio>
                                                    </>
                                                )

                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            ))
                        }
                        <Form.Item>
                            <Button className="result__form-button" ><Link to={"/quiz/"+dataTopics.id}>Làm Lại</Link></Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    )
}
export default Result;