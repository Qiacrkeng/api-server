import http from "@/utils/http.js";
import imageUrlToCanvas from "@/utils/imageUrlToCanvas.js";
import { Button, Card, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyUpdateAvatar = () => {
  // 我的信息狀態
  const [, setMyInfo] = useOutletContext();
  // 圖片文件的狀態
  const [fileList, setFileList] = useState([]);
  // 圖片文件上傳處理
  const onFileChange = (params) => {
    // console.log(params);
    params.file.status = "done"; // 上傳狀態置爲已完成，邊框不會顯示紅色
    setFileList(params.fileList);
  };
  // 壓縮圖片，置爲100 * 100 px
  const imageDataUrlCompression = (url) => {
    const canvas = imageUrlToCanvas(url, 100, 100);

    return canvas.toDataURL("image/jpeg", 1);
  };
  // 更新頭像前端接口
  const updateAvatar = async () => {
    if (fileList.length < 1) {
      return message.error("請選擇圖片");
    }
    const img = imageDataUrlCompression(fileList[0].thumbUrl);
    const response = await http.post("/my/update/avatar", {
      avatar: img,
    });

    if (response.data.status === 1) {
      return message.error(response.data.message);
    }
    message.success(response.data.message);
    setMyInfo((state) => ({ ...state, user_pic: img }));
    setFileList([]);
  };
  return (
    <Card style={{ margin: "10px" }} title="修改用戶頭像">
      <ImgCrop
        shape="round"
        rotate
        quality={1}
        modalTitle="檢視圖片"
        modalOk="確定"
        modalCancel="取消"
      >
        <Upload
          // 注意，不要覆蓋beforeUpload prop，ImgCrop依賴這個屬性進行裁切
          listType="picture-card"
          fileList={fileList}
          onChange={onFileChange}
        >
          {fileList.length === 0 && "+ 上傳"}
        </Upload>
      </ImgCrop>
      <Button
        type="primary"
        style={{ marginTop: "1em" }}
        onClick={updateAvatar}
      >
        確定上傳
      </Button>
    </Card>
  );
};
export default MyUpdateAvatar;
