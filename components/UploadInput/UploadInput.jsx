import React, { useState } from 'react';
import { Upload, Icon, message, Button } from 'antd';

const UploadInput = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    const uploadButton = (
        <div className="upload-render">
            <Icon type={isLoading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">{props.valueUrl !== null ? "Upload Ulang" : "Upload"}</div>
        </div>
    );

    const handleChangeUpload = info => {
        if (info.file.status === 'uploading') {
            setIsLoading(true)
            return;
        }
        if (info.file.status === 'error') {
            message.error('Gagal Upload');
            setIsLoading(false)
            return;
        }
        if (info.file.status === 'done') {
            setIsLoading(false)
            props.onChange(info.file.response.secure_url)
            message.success('Sukses Upload');
        }
    };

    const beforeUpload = (file) => {
       
        const isJPG = file.type === 'application/pdf';
        if (!isJPG) {
            message.error('You can only upload PDF file');
        }
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            message.error('File must smaller than 1MB!');
        }
        return isJPG && isLt2M;
    }

    const urlFile = props.valueUrl;

    return (
        <>
            <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://api.cloudinary.com/v1_1/fim-indonesia/image/upload"
                beforeUpload={beforeUpload}
                onChange={handleChangeUpload}
                data={(file) => {
                    return {
                        upload_preset: 'ID_card',
                        file,
                        tags: 'browser_upload'
                    }
                }}
            >
                {uploadButton}
            </Upload>

            {urlFile && <Button>
                <a href={urlFile} target="_blank">
                    Download file
                    </a>
            </Button>}
        </>
    )
}

export default UploadInput;