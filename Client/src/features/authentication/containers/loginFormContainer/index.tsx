import { AppState } from "app-state";
import { IResponseUserModel } from "features/authentication/models/ResponseUserModel";
import React, { Dispatch, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { LoginFormComponent, LoginModel } from "../../components/loginComponent";
import { loginAction } from "../../store/actions";
import { message, Space } from 'antd';
export interface AuthFormContainerProps { }


export interface LoginDataModel {
  email: string;
  password: string | undefined;
}

export function LoginFormContainer(): JSX.Element {
  const dispatch: React.Dispatch<Action<LoginModel>> = useDispatch<Dispatch<Action<LoginModel>>>();
  const handleLogin = useCallback(
    
    (LoginModel: LoginModel) => dispatch(loginAction({email: LoginModel.email, password: LoginModel.password, accessToken: LoginModel.accessToken })),
    [dispatch]
  );

  const loading = useSelector<AppState, boolean>((state): boolean => {
    return state.user.status === "running";
  });

  const isError = useSelector<AppState, boolean>((state): boolean => {
    return state.user.status === "error";
  });

  const error = () => {
    message.error('email or password not valid');
  }

  useEffect(() => {
    if(isError) {
      error();
    }
  }, [isError]);

  const userData: IResponseUserModel = useSelector<AppState>((state) => state.user.loginData) as IResponseUserModel;
  
  return (
    <Space>
      <LoginFormComponent
        value={
          userData 
          ? {
            email: userData.email,
            password: userData.password
          }
          :{
            email: "",
            password: "",
          }
        }
        loading={loading}
        onChange={handleLogin}
      />
    </Space>
  );
}