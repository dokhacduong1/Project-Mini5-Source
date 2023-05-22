/* eslint-disable no-unused-vars */
import { Layout} from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterMain from './Footer';
import {useDispatch, useSelector} from "react-redux";
import { getCookie } from '../../helpers/cookie';
import { authen } from '../../action/authen';
import { useEffect } from 'react';

const { Footer, Content } = Layout;
function LayoutMain() {
    const authenMain =useSelector(status => status.authenReducer);
    const token = getCookie("token");
    const dispatch = useDispatch();
    useEffect(()=>{
        token && dispatch(authen(true));
    },[])
    return (
        <>
            <Layout >
                <Header />
                <Content className='main'>
                    <Outlet />
                </Content>
                <FooterMain />
            </Layout>
        </>
    )
}
export default LayoutMain