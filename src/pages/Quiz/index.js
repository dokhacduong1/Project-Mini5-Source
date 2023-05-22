import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListQuestions } from "../../services/quizServices";
import { getTopic } from "../../services/topicServices";
import { Form, Radio, Button } from "antd";
import "./Quiz.scss"
import { getCookie } from "../../helpers/cookie"
import { createAnswer } from "../../services/answersService";
function Quiz() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataQuestions, setDataQuestions] = useState([]);
    const [dataTopics, setDataTopics] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setDataQuestions(await getListQuestions(params.id));
            setDataTopics(await getTopic(params.id));
        };
        fetchApi();
    }, []);

    const handleQuiz = async (infoQuiz) => {
        //Chuyển object thành mảng
        const arrayData = Object.entries(infoQuiz);
        const arrayNewData = [];
        arrayData.map((data, index) => {
           const questionId = data[0].split("-")[1];
            arrayNewData.push({
                questionId: parseInt(questionId),
                answer: parseInt(data[1])

            })
        })

        const opitions = {
            userId: parseInt(getCookie("id")),
            topicId: parseInt(params.id),
            answers: arrayNewData
        };
       
        const result = await createAnswer(opitions);
       console.log(result)
      
      if(result === "ok"){
        navigate(`/answers`);
        //navigate(`/answers/${result.id}`);
      }
      
    }

    return (
        <>

            {dataTopics && (
                <>
                    <h2>Bài Quiz Chủ Đề: {dataTopics.name}</h2>
                </>
            )}
            {dataQuestions.length > 0 && (
                <>
                    <Form
                        className="quiz__form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            maxWidth: 300,
                        }}
                        layout="vertical"
                        onFinish={handleQuiz}
                    >
                        {
                            dataQuestions.map((item, index) => (

                                <Form.Item label={`Câu ${index + 1}: ${item.question}`} key={item.id} name={`questions-${item.id}`}
                                    rules={[{ required: true, message: 'Vui Lòng Chọn Không Được Để Trống!' }]}
                                >
                                    <Radio.Group className="quiz__form-questions">
                                        {
                                            item.answers.map((answers, i) => (
                                                <Radio key={i} value={i}>{answers}</Radio>
                                            ))
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            ))
                        }
                        <Form.Item>
                            <Button className="quiz__form-button" type="primary" htmlType="submit">Nộp Bài</Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    );
}
export default Quiz;
