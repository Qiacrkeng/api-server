import http from "@/utils/http.js";
import { Button, Card, Form, Input, message } from "antd";
import React from "react";

const MyUpdatePwd = () => {
  const [form] = Form.useForm();
  // 當提交更新密碼時
  const onFinish = async (params) => {
    const response = await http.post("/my/updatepwd", {
      oldPwd: params.oldPwd,
      newPwd: params.newPwd,
    });
    if (response.data.status === 1) {
      message.error(response.data.message);
    } else {
      message.success(response.data.message);
    }
    form.resetFields(["newPwd", "oldPwd", "newPwd2"]);
  };

  return (
    <Card style={{ margin: "10px" }} title="修改密碼">
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 6 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPwd"
          label="原密碼"
          rules={[{ required: true, message: "不可爲空" }]}
        >
          <Input.Password placeholder="請輸入原密碼" />
        </Form.Item>
        <Form.Item
          name="newPwd"
          label="新密碼"
          rules={[{ required: true, message: "不可爲空" }]}
        >
          <Input.Password placeholder="請輸入新密碼" />
        </Form.Item>
        <Form.Item
          name="newPwd2"
          label="確認新密碼"
          rules={[
            { required: true, message: "不可爲空" },
            ({ getFieldValue }) => ({
              validator(_, pwd2) {
                if (pwd2 !== getFieldValue("newPwd")) {
                  return Promise.reject(new Error("兩次密碼不一致"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password placeholder="請確認新密碼" />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default MyUpdatePwd;
