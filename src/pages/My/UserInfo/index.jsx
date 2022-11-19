import http from "@/utils/http.js";
import { Button, Card, Form, Input, message, Typography } from "antd";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const { Text } = Typography;

const MyUserInfo = () => {
  const [myInfo, setMyInfo] = useOutletContext();

  useEffect(() => {
    formInfo.setFieldsValue({ ...myInfo });

    console.log(formInfo);
  }, []);

  const [formInfo] = Form.useForm();
  // 修改用戶信息時
  const onFinish = async (params) => {
    const response = await http.post("/my//userinfo", { ...params });
    if (response.data.status === 1) {
      return message.error(response.data.message);
    } else {
      message.success(response.data.message);
      // ! 這就是命名統一的好處
      setMyInfo((state) => ({ ...state, ...params }));
    }
    // console.log();
  };

  return (
    <Card style={{ margin: "10px" }} title="修改用戶信息">
      <Form form={formInfo} onFinish={onFinish} wrapperCol={{ span: 6 }}>
        <Form.Item label="登錄名稱">
          <Text type="success">{myInfo.username}</Text>
        </Form.Item>
        <Form.Item label="用戶暱稱" name="nickname">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="用戶郵箱" name="email">
          <Input type="text" />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          提交修改
        </Button>
      </Form>
    </Card>
  );
};
export default MyUserInfo;
