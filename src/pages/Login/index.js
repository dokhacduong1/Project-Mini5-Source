import { Button, Form, Input,message } from "antd";
import "./Login.scss"
import { getUser } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import {authen} from "../../action/authen"
function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const handleFinish = async (infoInput) => {
        const response = await getUser(infoInput.email,infoInput.password);
        if(response.length>0){
            const time =1;
            setCookie("id",response[0].id,time);
            setCookie("fullName",response[0].fullName,time);
            setCookie("email",response[0].email,time);
            setCookie("token",response[0].token,time);
            dispatch(authen(true))
            navigate("/");
        }else{
            messageApi.open({
                type: 'warning',
                content: 'Tài Khoản Hoặc Mật Khẩu Không Chính Xác',
            });
        }
    }
    return (
        <>
            {contextHolder}
            <div className="login">
               
                <Form className="login__form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 300,
                      }}
                    onFinish={handleFinish}
                >   
                    <h3>Login Quiz</h3>
                    <Form.Item name="email">
                        <Input placeholder="Email" className="login__form-input" />
                    </Form.Item>

                    <Form.Item name="password">
                        <Input type="password" placeholder="Password" className="login__form-input" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login__form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
}
export default Login;
