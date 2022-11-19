import http from "@/utils/http.js";
import imageUrlToCanvas from "@/utils/imageUrlToCanvas.js";
import objectToFormData from "@/utils/objectToFormData.js";
import { Button, Card, Form, Input, message, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticleAdd = () => {
  const [cates, setCates] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await http.get("my/article/cates");
      setCates(
        response.data.data.map((item) => ({ label: item.name, value: item.id }))
      );
    })();
  }, []);

  const [fileList, setFileList] = useState([]);
  const onChange = (newFileList) => {
    // console.log(newFileList);
    setFileList(newFileList.fileList);
  };

  const [isDraft] = useState(false);

  const imageDataUrlCompression = (url) => {
    const canvas = imageUrlToCanvas(url, 400, 280);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob == null) {
          reject(new Error("轉換失敗"));
        }
        resolve(blob);
      });
    });
  };

  const onFinish = async (params) => {
    const data = {
      ...params,
      cover_img: await imageDataUrlCompression(fileList[0].thumbUrl),
      state: isDraft ? "草稿" : "已發佈",
    };
    // console.log(data);
    const response = await http.post(
      "/my/article/add",
      objectToFormData(data),
      { headers: { "Content-Type": "form-data" } }
    );

    if (response.data.status === 1) {
      return message.error(response.data.message);
    }
    message.success(response.data.message);
  };
  return (
    <Card title="寫文章" style={{ margin: "10px" }}>
      <Form onFinish={onFinish}>
        <Form.Item
          label="文章標題"
          name="title"
          rules={[{ required: true, message: "標題不能爲空" }]}
        >
          <Input placeholder="請輸入標題" />
        </Form.Item>
        <Form.Item
          label="文章類別"
          name="cate_id"
          rules={[{ required: true, message: "您還未選" }]}
        >
          <Select placeholder="請選擇文章標題" options={cates} />
        </Form.Item>
        <Form.Item
          label="文章內容"
          name="content"
          rules={[{ required: true, message: "請輸入內容" }]}
        >
          <ReactQuill theme="snow" placeholder="請輸入文章內容" />
        </Form.Item>
        <Form.Item
          label="文章封面"
          name="cover_img"
          rules={[{ required: true, message: "請選擇封面" }]}
        >
          <Upload
            listType="picture-card"
            onChange={onChange}
            fileList={fileList}
            beforeUpload={() => false} // 手動上傳
          >
            {fileList.length === 1 ? null : "+"}
          </Upload>
        </Form.Item>

        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default ArticleAdd;
