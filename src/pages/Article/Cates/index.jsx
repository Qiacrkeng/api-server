import http from "@/utils/http.js";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import cssStyles from "./index.module.css";

const ArticleCates = () => {
  // 封裝發送消息的函數
  const sendFormMessage = (status, messageInfo) => {
    if (status === 1) {
      message.error(messageInfo);
    } else {
      message.success(messageInfo);
      setPageParams((state) => ({ ...state }));
    }
  };
  // 刪除文章分類
  const deleteArticleCate = async (id) => {
    // console.log(id);
    const response = await http.get(`/my/article/deletecate/${id}`);
    // console.log(response);
    sendFormMessage(response.data.status, response.data.status);
  };
  // 修改文章分類狀態
  const [edit, setEdit] = useState({ state: false, id: undefined });
  // 點擊編輯按鈕時
  const editArticleCate = ({ id, name, alias }) => {
    // console.log(id);
    visibleModalOpen();
    inModalForm.setFieldsValue({ name, alias });
    setEdit({ id, state: true });
  };
  /** 表單的配置
   *@type {import("antd").TableProps["columns"]}
   */
  const columns = [
    { title: "分類名稱", dataIndex: "name" },
    { title: "分類別名", dataIndex: "alias" },
    {
      title: "操作",
      dataIndex: "process",
      render(_, data) {
        // console.log(data);
        return (
          <Space>
            <Button
              size="small"
              type="primary"
              onClick={() =>
                editArticleCate({
                  id: data.id,
                  name: data.name,
                  alias: data.alias,
                })
              }
            >
              編輯
            </Button>
            <Button type="primary" danger size="small">
              <Popconfirm
                title="確認是否退出"
                okText="確認"
                cancelText="取消"
                onConfirm={() => deleteArticleCate(data.id)}
              >
                刪除
              </Popconfirm>
            </Button>
          </Space>
        );
      },
    },
  ];
  // 通過接口實現更新表單數據
  const [columnsData, setColumnsData] = useState({ list: [], maxCount: 0 });
  // 當前頁的狀態
  const [pageParams, setPageParams] = useState({
    per_page: 10,
    page: 1,
  });
  // 刷新分類列表後臺接口
  useEffect(() => {
    (async () => {
      const response = await http.get("/my/article/cates", {
        params: {
          per_page: pageParams.per_page,
          page: pageParams.page,
        },
      });
      // console.log(response);
      if (response.data.status === 1) {
        message.error(response.data.message);
      }

      setColumnsData({
        list: response.data.data.map((item) => ({ ...item, key: item.id })),
        maxCount: response.data.maxCount,
      });
    })();
  }, [pageParams]);
  // 是否要打開對話框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const noVisibleModalOpen = () => {
    inModalForm.resetFields(["name", "alias"]); // 這些字段變回初始值
    setIsModalOpen(false);
    // 如果點擊了修改，又點擊了取消
    if (edit.state) {
      setEdit((oldState) => ({ ...oldState, state: !oldState.state }));
    }
  };
  const visibleModalOpen = () => {
    setIsModalOpen(true);
  };
  // 添加文章分類
  const addArticleCate = async () => {
    const params = inModalForm.getFieldsValue();

    const response = await http.post("/my/article/addcates", params);
    sendFormMessage(response.data.status, response.data.message);
    noVisibleModalOpen();
  };
  // 更新文章分類
  const updateArticleCate = async () => {
    const params = inModalForm.getFieldsValue();
    const response = await http.post("/my/article/updatecate", {
      ...params,
      id: edit.id,
    });
    // console.log(response);
    sendFormMessage(response.data.status, response.data.message);
    setEdit({ state: false, id: undefined });
    noVisibleModalOpen();
  };
  // 不提供時也會自動創建，用作對話框
  const [inModalForm] = Form.useForm();
  // 如果表格頁改變了
  const pageChange = (page) => {
    setPageParams({ ...pageParams, page });
  };

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>文章類別管理</label>
          <Button onClick={visibleModalOpen} type="primary">
            添加分類
          </Button>
        </div>
      }
      className={cssStyles["cates"]}
    >
      <Table
        // 分頁器
        pagination={{
          onChange: pageChange,
          current: pageParams.page,
          pageSize: pageParams.per_page,
          total: columnsData.maxCount,
        }}
        bordered
        dataSource={columnsData.list}
        columns={columns}
      />
      <Modal
        title={`${edit.state ? "修改" : "添加"}文章分類`}
        open={isModalOpen}
        onOk={edit.state ? updateArticleCate : addArticleCate}
        cancelText="取消"
        okText={`${edit.state ? "修改" : "添加"}`}
        onCancel={noVisibleModalOpen}
      >
        <Form form={inModalForm}>
          <Form.Item
            label="文章名稱"
            name="name"
            rules={[{ required: true, message: "不可爲空" }]}
          >
            <Input type="text" placeholder="請輸入文章名稱" />
          </Form.Item>
          <Form.Item
            label="文章別名"
            name="alias"
            rules={[
              { required: true, message: "不可爲空" },
              { pattern: /^[a-zA-Z]+$/, message: "只能爲字母" },
            ]}
          >
            <Input type="text" placeholder="請輸入文章別名" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ArticleCates;
