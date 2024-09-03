import { Flex, Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { FunctionComponent } from "react";
import { Plus } from "react-feather";

interface UploadHandlerProps {
  props: UploadProps<unknown>;
  onPreview: (file: UploadFile) => Promise<void>;
}

const UploadHandler: FunctionComponent<UploadHandlerProps> = ({
  props,
  onPreview,
}) => {
  return (
    <ImgCrop zoomSlider aspect={100 / 150} quality={0.9} aspectSlider={true}>
      <Upload
        listType="picture-card"
        maxCount={1}
        {...props}
        onPreview={onPreview}
      >
        <button style={{ border: 0, background: "none" }} type="button">
          <Flex justify="center">
            <Plus />
          </Flex>
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </ImgCrop>
  );
};

export default UploadHandler;
