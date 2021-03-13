import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import React, { useCallback } from "react";
import {Link} from "react-router-dom";
import * as Yup from "yup";

import "./index.scss";

export interface AuthModel {
  name: string;
  email: string;
  password: string;
}

interface RegistrPageProps {
  value: AuthModel;
  loading: boolean;
  onChange: (exampleModel: AuthModel) => void;
}

const registrValidationSchema = Yup.object<AuthModel>({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required()
});

export function RegistrFormComponent({ value, onChange, loading }: RegistrPageProps): JSX.Element {

  const handleSubmit = useCallback((AuthModel: AuthModel) => {
    onChange(AuthModel);
  }, [onChange]);

  return (
    <Formik
      initialValues={value}
      onSubmit={handleSubmit}
      validationSchema={registrValidationSchema}
    >
      <Form className="form registr-form">
        <h2>Register</h2>
        <Form.Item name="name" label="name*" htmlFor="name">
          <Input name="name" type="text" id="name"></Input>
        </Form.Item>
        <Form.Item name="email" label="email*" htmlFor="email">
          <Input name="email" type="email" id="email"></Input>
        </Form.Item>
        <Form.Item name="password" label="password*" htmlFor="password">
          <Input name="password" type="password" id="password"></Input>
        </Form.Item>
        <div className="auth__btn-row">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            disabled={loading}
            icon={<SendOutlined />}
            size="large"
          >
            register
          </Button>
          <span className="reister__tagline">
            Do you have an account?
            <Link to="/login" className="auth__login-link">
              Log in
            </Link>
          </span>
        </div>
      </Form>
    </Formik>
  );
}