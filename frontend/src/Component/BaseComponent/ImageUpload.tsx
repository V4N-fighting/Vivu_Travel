import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: any) => void;
  onAddMore?: () => void;
  onRemove?: () => void;
  showAdd?: boolean;
  showRemove?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  onAddMore, 
  onRemove,
  showAdd = false,
  showRemove = false 
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [url, setUrl] = useState<string>(value || '');

  useEffect(() => {
    if (typeof value === 'string') {
      setUrl(value || '');
      // Reset file info if value is a string (URL)
      if (value && !value.startsWith('blob:')) {
        setFileName('');
        setFileType('');
      }
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      const previewUrl = URL.createObjectURL(file);
      setUrl(previewUrl);
      if (onChange) {
        onChange(file); // Gửi file thực tế lên Form
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setFileName('');
    setFileType('');
    if (onChange) {
      onChange(newUrl); // Gửi link string lên Form
    }
  };

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
      <Row align="middle">
        <Col span={6} style={{ borderRight: '1px solid #d9d9d9', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label style={{ cursor: 'pointer', width: '100%', textAlign: 'center', padding: '8px 0', margin: 0 }}>
            Chọn Ảnh
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
          </label>
        </Col>
        <Col span={(showAdd || showRemove) ? 15 : 18}>
          <Input 
            variant="borderless"
            placeholder="https://" 
            value={url} 
            onChange={handleUrlChange}
            style={{ padding: '8px 12px' }}
          />
        </Col>
        {(showAdd || showRemove) && (
          <Col span={3} style={{ display: 'flex', borderLeft: '1px solid #d9d9d9' }}>
            {showRemove && (
              <Button 
                type="text" 
                danger
                icon={<MinusOutlined />} 
                onClick={onRemove}
                style={{ flex: 1, height: '40px', borderRight: showAdd ? '1px solid #d9d9d9' : 'none' }}
              />
            )}
            {showAdd && (
              <Button 
                type="text" 
                icon={<PlusOutlined />} 
                onClick={onAddMore}
                style={{ flex: 1, height: '40px' }}
              />
            )}
          </Col>
        )}
      </Row>

      {(fileName || fileType) && (
        <Row style={{ borderTop: '1px solid #d9d9d9' }}>
          <Col span={18} style={{ borderRight: '1px solid #d9d9d9' }}>
            <Input 
              variant="borderless"
              placeholder="Tên ảnh" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)}
              style={{ padding: '8px 12px', textAlign: 'center' }}
            />
          </Col>
          <Col span={6}>
            <Input 
              variant="borderless"
              placeholder="Loại File" 
              value={fileType} 
              disabled 
              style={{ padding: '8px 12px', textAlign: 'center', background: '#fafafa', color: '#000' }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImageUpload;
