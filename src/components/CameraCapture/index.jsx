import React, { useRef, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import { VideoCameraOutlined, CameraOutlined, StopOutlined } from '@ant-design/icons';

const CameraCapture = ({
  imageSrc, setImageSrc,
  location, setLocation
}) => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false); // State untuk menandai apakah kamera menyala atau tidak

  // Fungsi untuk memulai kamera
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsCameraOn(true); // Menandai bahwa kamera telah dinyalakan
          }
        })
        .catch(error => {
          message.warning('Error accessing media devices');
        });
    } else {
      message.warning('getUserMedia is not supported');
    }
  };

  // Fungsi untuk menghentikan kamera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraOn(false); // Menandai bahwa kamera telah dimatikan
  };

  // Fungsi untuk mengambil gambar
  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');

      // Ambil lokasi pengguna saat ini
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const locationInfo = { latitude, longitude };
            setLocation(locationInfo);
          },
          error => {
            message.warning('Error getting location')
            console.error('Error getting location:', error);
          }
        );
      } else {
        message.warning('Geolocation is not supported')
        console.error('Geolocation is not supported.');
      }

      setImageSrc(imageUrl);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={12} style={{ textAlign: 'left' }}>
        {!isCameraOn ? (
          <Button style={{ marginBottom: 10 }} type="primary" onClick={startCamera} icon={<VideoCameraOutlined />}>
            Start Camera
          </Button>
        ) : (
          <Button style={{ marginBottom: 10 }} type="primary" onClick={stopCamera} icon={<StopOutlined />} danger>
            Stop Camera
          </Button>
        )}
        <br />
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', display: isCameraOn ? 'block' : 'none' }} />
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Button disabled={!isCameraOn} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', marginBottom: 10 }} type="primary" onClick={takePicture} icon={<CameraOutlined />}>
          Take Picture
        </Button>
        <br />
        {imageSrc && <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%' }} />}
        {location && (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default CameraCapture;
