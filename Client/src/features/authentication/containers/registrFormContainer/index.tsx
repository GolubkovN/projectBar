import { AppState } from "app-state";
import React, { Dispatch, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { RegistrFormComponent, AuthModel } from "../../components/registrFormComponent";
import { registrAction } from "../../store/actions";
import { message, Space } from 'antd';
export interface AuthFormContainerProps { }

export function RegistrFormContainer(): JSX.Element {
  const dispatch: React.Dispatch<Action<AuthModel>> = useDispatch<Dispatch<Action<AuthModel>>>();
  const handleChange = useCallback(
    (AuthModel: AuthModel) => dispatch(registrAction({ name: AuthModel.name, email: AuthModel.email, password: AuthModel.password })),
    [dispatch]
  );

  const isError = useSelector<AppState, boolean>((state): boolean => {
    return state.user.status === "error";
  });

  const error = () => {
    message.error('user already exist');
  }

  useEffect(() => {
    if(isError) {
      error();
    }
  }, [isError]);

  const loading = useSelector<AppState, boolean>((state): boolean => {
    return state.user.status === "running";
  });

  return (
    <Space>
      <RegistrFormComponent
        value={{
          name: "",
          email: "",
          password: "",
        }}
        loading={loading}
        onChange={handleChange}
      />
    </Space>
  );
}