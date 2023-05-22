import { Button, Card } from 'antd';
import { getCookie } from '../../helpers/cookie';
import "./Home.scss"
import { Link } from 'react-router-dom';
function Home(){
    const fullName = getCookie("fullName");
    console.log(fullName);
    return(
        <>
            <Card className='home'>
                <div className='home__welcome'>
                    <div className='home__welcome-header'>
                        <h2>Chào Mừng <strong>{fullName}</strong> Đã Đăng Nhập Thành Công</h2>
                    </div>
                    <div className='home__welcome-main'>
                        <Button className='home__button'> <Link to={"/topic"}>Danh Sách Chủ Đề Ôn Luyện</Link></Button>
                        <Button className='home__button'><Link to={"/answers"}>Danh Sách Bài Đã Luyện Tập</Link></Button>
                    </div>
                    <hr></hr>
                    <div className='home__welcome-footer'>
                        <p>Website trắc nghiệm online lập trình Frontend là một nền tảng trực tiếp
                            cho phép các lập trình viên Frontend thực hiện các bài kiểm tra,
                            trắc nghiệm,đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập
                            trình Frontend.
                        </p>
                    </div>
                </div>
            </Card>
        </>
    )
}
export default Home;