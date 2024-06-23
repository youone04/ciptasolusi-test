import React, { useState } from 'react';
import { Card, Badge, Rate, Divider } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const CardMod = ({ item , title }) => {
  const [expanded, setExpanded] = useState(false);
  const data ={
    item,
    title
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Badge.Ribbon text={item.release_date}>
      <Card
        hoverable
        style={{
          width: 300,
          margin: 10
        }}
        cover={<img alt={item.poster_path} src={item.poster_path ? `http://image.tmdb.org/t/p/w500${item.poster_path}` :
          'https://media.istockphoto.com/id/1581323346/id/vektor/foto-segera-hadir-belum-ada-foto-tombol-foto-belum-ada-gambar-vektor.jpg?s=1024x1024&w=is&k=20&c=cmolONm7xM_485AMPqw_peXRQBYB131oO4e0WG7Ssg4='} />}
      >
        <Meta title={item.title} />
        <div style={{ minHeight: 100 }} className={`description ${expanded ? 'expanded' : ''}`}>
          {expanded ? item.overview : `${item.overview.slice(0, 80)}...`}
        </div>
        <div style={{ textAlign: 'right' }}>
          <a onClick={toggleExpanded}>{expanded ? 'Less' : 'More'}</a>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Rate disabled defaultValue={item.vote_average / 2} />
        </div>
        <Divider />

        <div style={{ textAlign: 'Left' }}>
          <Link
            to={{
              pathname: "/review",
              
            }}
            state = {
              data
            }
          >
            Review
          </Link>
        </div>

      </Card>
    </Badge.Ribbon>
  );
}
export default CardMod;