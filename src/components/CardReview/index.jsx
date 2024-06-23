import React, {useState} from 'react';
import { Card, Input, Form, Select, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import CameraCapture from '@/components/CameraCapture';

const apiUrl = import.meta.env.VITE_API_URL;
const CardReview = ({state}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [location, setLocation] = useState(null);
    const [dataUser, setDataUser] = useState({
        namaUser: '',
        namaFilm: '',
        kategoriFilm: ''
    })
    const[loading , setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataUser((prevDataUser) => ({
            ...prevDataUser,
            [name]: value
        }));
    };


    const onChange = (value) => {
        setDataUser((prevDataUser) => ({
            ...prevDataUser,
            kategoriFilm : value
        }));
      };

      const onSearch = (value) => {
       console.log(value)
      };

      const hanldeSave = () => {
        const postData = {
          userId: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
          img: imageSrc,
          latitude: location.latitude,
          longitude: location.longitude,
          nama: dataUser.namaUser,
          namaFilm: state.item.original_title,
          kategoriFilm: state.title,
          idFilm : state.item.id
        };
        setLoading(true);
        fetch(`${apiUrl}/addPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to upload image');
            }
            message.success("successfully")
            setLoading(false);
            setImageSrc(null);
            setDataUser((prevSate) => ({
                ...prevSate,
                namaUser: '',
                namaFilm: '',
                kategoriFilm: ''
            }))
            // Lakukan sesuatu setelah berhasil mengirim ke database
          })
          .catch(error => {
            setLoading(false);
            message.error("Gagal Insert Data")
          });
      };

    return(
        <Card
            title="Review Film"
            bordered={false}
            style={{
                width: '100%',
                // margin: 20
            }}
        >
             <Form.Item
                label="ID Film"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
                <Input  
                name="idFilm"
                disabled
                value={state.item.id} placeholder="Id Film" />
            </Form.Item>

            <Form.Item
                label="Nama anda"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
                <Input  
                name="namaUser"
                value={dataUser.namaUser} onChange={handleChange} placeholder="nama anda" />
            </Form.Item>
    
            <Form.Item
                label="Nama film"
                disabled
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
                <Input name="namaFilm"
                disabled
                value={state.item.original_title} placeholder="nama film" />
            </Form.Item>
    
            <Form.Item
                label="Kategori film"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
                <Select
                    showSearch
                    placeholder="Select a kategori"
                    disabled
                    value={state.title}
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                        {
                            value: 'now_playing',
                            label: 'Now Playing',
                        },
                        {
                            value: 'populer',
                            label: 'Populer',
                        },
                        {
                            value: 'upcoming',
                            label: 'Upcoming',
                        },
                        {
                            value: 'top_rated',
                            label: 'Top Rated',
                        },
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Ambil Gambar"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
               <CameraCapture imageSrc={imageSrc} setImageSrc={setImageSrc} location={location} setLocation={setLocation}/>
            </Form.Item>

            <Form.Item
                label=""
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 0 }}
            >
               <Button loading={loading} onClick={hanldeSave} style={{marginTop: 10, width: 120}} icon={<SaveOutlined />} type="primary">Simpan</Button>
            </Form.Item>

            
    
    
        </Card>
    )
};
export default CardReview;