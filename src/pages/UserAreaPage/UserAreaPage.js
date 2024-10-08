import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getMe } from '../../WebAPI'; 
import { useNavigate, useLocation } from 'react-router-dom';
import UserNav from './UserNav';
import { MEDIA_QUERY_MOBILE } from '../../constants/style';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 70px;
  ${MEDIA_QUERY_MOBILE} {
    margin-bottom: 150px;
  }
`;

const UserAreaContainer = styled.div`
  width: 520px;
  height: 100%;
  padding: 60px 20px;
  margin-bottom: 150px;
  border: 1px solid #ddd; 
  border-radius: 8px; /* 圓角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${MEDIA_QUERY_MOBILE} {
    width: 350px;
  }
`;

const UserAreaTitle = styled.div`
  h1 {
    text-align: center;
    font-weight: 500;
    color: rgb(47, 150, 169);
    letter-spacing: 0.04em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;


const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
  }

  .required-star {
    color: red;
    margin-left: 4px;
  }

  input,
  select,
  date {
    padding: 8px;
  }
`;

const Label = styled.label`
  width: 60px;
  display: block;
  margin: 10px 0px 20px 0px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: rgb(47, 150, 169);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  letter-spacing: .1rem;

  &:hover {
    background-color: rgb(35 112 128);
  }
`;

export default function UserAreaPage () {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getMe();
                if (response.success) {
                setUserData(response.user);
                } else {
                console.error('獲取使用者資料失敗:', response.message);
                // API 回應中 success 為 false，表示身份驗證已經失效
                window.alert('身份驗證已逾時，請重新登入');
                navigate('/login'); // 將用戶導向登入頁面
                }
            } catch (error) {
                console.error('發生錯誤:', error);
            } 
        };

        fetchUserData();
    }, [navigate]);

    const handleUserEdit = () => {
        navigate("/userEdit");
    }

    return (
        <Root>
            <UserNav location={location} />
            <UserAreaContainer>
              <UserAreaTitle>
                <h1>會員資料</h1>
              </UserAreaTitle>
              
              <Form>
                <FormGroup>
                  <Label htmlFor="user_name">帳號：</Label>
                  <Input type="text" value={userData ? userData.user_name : ''} disabled />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="user_password">密碼：</Label>
                <Input type="password" value="********" disabled />
              </FormGroup>
              
                <Button type="button" onClick={handleUserEdit}>
                  修改會員密碼
                </Button>
              </Form>
            </UserAreaContainer>
      </Root>
    );
  };