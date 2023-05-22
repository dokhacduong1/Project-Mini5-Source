import { Button, Form, Input,message } from "antd";
import "./Register.scss"
import { generateToken } from "../../helpers/generateToken";
import { Post } from "../../utils/request";
import { checkEmail } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleRegister = async (infoUser) => {
        const reponse = await checkEmail(infoUser.email);
        if(reponse.length === 0){
            const tokenRandom = generateToken();
            const infoUserNew = {
                ...infoUser,
                token: tokenRandom
            }
            Post("users",infoUserNew);
            messageApi.open({
                type: 'success',
                content: 'Đăng Ký Thành Công',
              });
              setTimeout(()=>{
                navigate("/login")
              },1000)
        }else{
            messageApi.open({
                type: 'warning',
                content: 'Email Đã Tồn Tại!',
            });
        }
       
    }
    return (
        <>
            {contextHolder}
            <div className="register">
                <Form className="register__form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 300,
                    }}
                    onFinish={handleRegister}
                >
                    <h3>Register Quiz</h3>
                    <Form.Item name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" className="register__form-input" />
                    </Form.Item>
                    <Form.Item name="fullName"
                        rules={[
                            {
                                required: true, message: 'Please input your Full Name!'
                            }
                        ]}
                    >
                        <Input placeholder="Full Name" className="register__form-input" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            {
                                required: true, message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input type="password" placeholder="Password" className="register__form-input" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register__form-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}
export default Register;