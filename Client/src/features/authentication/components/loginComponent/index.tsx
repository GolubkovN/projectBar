import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Formik } from "formik";
import {Link} from "react-router-dom";
import { Form, Input } from "formik-antd";
import React, { useCallback } from "react";
import * as Yup from "yup";

import "./index.scss";
import { LoginDataModel } from "features/authentication/containers/loginFormContainer";

export interface LoginModel {
  email: string;
  password: string | undefined;
  accessToken?: string | number;
}

interface LoginPageProps {
  value: LoginDataModel;
  loading: boolean;
  onChange: (LoginModel: LoginModel) => void;
}

const exampleValidationSchema = Yup.object<LoginModel>({
  email: Yup.string().required(),
  password: Yup.string().required()
});

export function LoginFormComponent({ value, onChange, loading }: LoginPageProps): JSX.Element {

  const handleSubmit = useCallback((LoginModel: LoginModel) => {
    onChange(LoginModel);
  }, [onChange]);



  return (
    <Formik
      initialValues={value}
      onSubmit={handleSubmit}
      validationSchema={exampleValidationSchema}
    >
      <Form className="form login-form">
        <h2>Log in</h2>
        <div className="login_controls">
          <Form.Item name="email" label="email" htmlFor="email">
            <Input name="email" type="email" id="email"></Input>
          </Form.Item>
          <Form.Item name="password" label="password" htmlFor="password">
            <Input name="password" type="password" id="password"></Input>
          </Form.Item>
        </div>
        <div className="login__btn-row">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              disabled={loading}
              icon={<LoginOutlined />}
              size="large"
              className ="login-btn"
            >
              Log in
            </Button>
            <span>
              <span>Not registered? </span>
              <Link to="/registr" className="login__registr-link">
                Register
              </Link>
            </span>
          </div>
      </Form>
    </Formik>
  );
}