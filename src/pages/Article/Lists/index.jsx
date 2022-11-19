import http from "@/utils/http.js";
import {
  Button,
  Card,
  Divider,
  Form,
  message,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import cssStyles from "./index.module.css";

const ArticleLists = () => {
  /**
   *@type {import("antd").TableProps["columns"]}
   */
  const columns = [
    { title: "文章標題", dataIndex: "title" },
    { title: "分類", dataIndex: "cate_name" },
    { title: "發表時間", dataIndex: "pub_date" },
    { title: "狀態", dataIndex: "state" },
    {
      title: "操作",
      render() {
        return (
          <Space>
            <Button type="primary" size="small">
              編輯
            </Button>
            <Button type="primary" size="small" danger>
              刪除
            </Button>
          </Space>
        );
      },
    },
  ];
  const [articleData, setArticleData] = useState(
    /**@type {{label:String,value:number}[]} */ ([])
  );
  // 獲取文章所有分類列表
  useEffect(() => {
    (async () => {
      const response = await http.get("/my/article/cates");

      if (response.data.status === 1) {
        return message.error(response.data.message);
      }

      setArticleData(
        response.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
      // console.log(articleData);
    })();
  }, []);

  const [pageParams, setPageParams] = useState({ per_page: 10, page: 1 });
  const [columnsData, setColumnsData] = useState({ list: [], maxCount: 0 });

  useEffect(() => {
    (async () => {
      if (submitData === undefined) return;
      const response = await http.get("/my/article/list", {
        params: {
          ...pageParams,
          ...submitData,
        },
      });
      if (response.data.status === 1) {
        return message.error(response.data.message);
      }
      setColumnsData({
        list: response.data.data.map((item) => ({ ...item, key: item.id })),
        maxCount: response.data.maxCount,
      });
    })();
  }, [pageParams]);

  const [submitData, setSubmitData] = useState(undefined);
  const onFinish = (params) => {
    // console.log(params);
    setSubmitData(params);
    setPageParams((state) => ({ ...state, page: 1 }));
  };

  const [myForm] = Form.useForm();

  const onPageChange = (page) => {
    setPageParams({ ...pageParams, page });
  };

  return (
    <Card className={cssStyles["lists"]} title="文章列表">
      <Form onFinish={onFinish} form={myForm}>
        <Form.Item name="cate_id" label="分類">
          <Select placeholder="請選擇" options={articleData} />
        </Form.Item>
        <Form.Item name="state" label="狀態">
          <Select placeholder="請選擇" value={1}>
            <Select.Option key={"已發佈"}>已發佈</Select.Option>
            <Select.Option key={"草稿"}>草稿</Select.Option>
          </Select>
        </Form.Item>
        <Button htmlType="submit" type="primary">
          篩選
        </Button>
        <Divider />
      </Form>
      <Table
        dataSource={columnsData.list}
        columns={columns}
        pagination={{
          current: pageParams.page,
          onChange: onPageChange,
          pageSize: columnsData.per_page,
          total: columnsData.maxCount,
        }}
        bordered
      />
    </Card>
  );
};
export default ArticleLists;
