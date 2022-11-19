import { Form, Input, Card, Button, message } from "antd";
import React, { useState } from "react";
import cssStyles from "./index.module.css";

import bageImage from "@/assets/login_title.png";
import http from "@/utils/http.js";
import { setToken } from "@/utils/token.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (params) => {
    const { username, password } = params;

    // console.log(params);
    const response = await http.post(isLogin ? "/api/login" : "/api/reguser", {
      username,
      password,
    });

    const { token, status, message: messageString } = response.data;

    if (token) {
      setToken(response.data.token);
    }
    if (status === 0) {
      message.success(messageString);
      navigate("/");
    } else {
      message.error(messageString);
    }

    // console.log(response);
  };

  // let isLogin = true;
  const [isLogin, setIsLogin] = useState(true); // 是否爲註冊

  const handleIsLogin = () => {
    setIsLogin((state) => !state);
  };

  return (
    <div className={cssStyles["login"]}>
      <Card className={cssStyles["login-container"]}>
        <img src={bageImage} />
        <Form
          onFinish={onFinish}
          style={{ paddingTop: "1em" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="用戶名"
            name="username"
            rules={[{ required: true, message: "不能爲空" }]}
          >
            <Input placeholder="請輸入賬戶" />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: "不能爲空" }]}
          >
            <Input.Password placeholder="請輸入密碼" />
          </Form.Item>
          {!isLogin && (
            <Form.Item
              label="確認密碼"
              name="password2"
              rules={[
                { required: true, message: "不能爲空" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("兩次密碼不一致"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="再次輸入密碼" />
            </Form.Item>
          )}
          <Button htmlType="submit" type="primary">
            {isLogin ? "登录" : "注册"}
          </Button>
          <Button
            onClick={handleIsLogin}
            style={{
              marginLeft: "auto",
            }}
            type="link"
          >
            切换为注册
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
