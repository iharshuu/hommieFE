import React from 'react';

const RoomCard = ({ title, price, imageUrl }) => {
  return (
    <div className="max-w-sm overflow-hidden p-4 relative group">
      <img
        className="w-fit h-[70vh] object-cover group-hover:grayscale-0 hover:scale-105 hover:rotate-10 transition duration-300 ease-in-out"
        src={imageUrl}
        alt={title}
        style={{ filter: 'grayscale(70%)' }}
      />
      <div className="absolute top-[70%] w-full bg-opacity-70 text-white p-4 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-70">
        <div className="font-bold text-xl flex items-center leading-10 font-serif mb-2">{title}</div>
        {/* <p className="text-base font-semibold font-serif mt-5">price starts from:{price} / NIGHT</p> */}
      </div>
    </div>
  );
};

const Rooms = () => {
  const rooms = [
    { title: 'Junior Suite', price: '150$', imageUrl: 'https://images.squarespace-cdn.com/content/v1/631304c00eb1736174aa4d06/1662981344758-D5QDLHDD02ZQM48HG3PG/unsplash-image-T5pL6ciEn-I.jpg?format=1500w' },
    { title: 'Family Room', price: '200$', imageUrl: 'https://images.squarespace-cdn.com/content/v1/631304c00eb1736174aa4d06/1662981380472-TLNBSUU5ANVQNGUFJHHO/unsplash-image-Yrxr3bsPdS0.jpg?format=1500w' },
    { title: 'Double Room', price: '250$', imageUrl: 'https://images.squarespace-cdn.com/content/v1/631304c00eb1736174aa4d06/1662981425959-WCPEK086WVEW3QH9HPWQ/unsplash-image-AUF6Gl4wwzA.jpg?format=1500w' },
  ];

  return (
    <div className="flex justify-center mx-16 items-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room, index) => (
          <RoomCard key={index} title={room.title} price={room.price} imageUrl={room.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
