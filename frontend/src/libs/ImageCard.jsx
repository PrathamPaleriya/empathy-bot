import React from 'react';
import { IKImage, IKContext } from 'imagekitio-react';

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_URL_ENDPOINT;

export default function ImageCard({ path, className = '', alt, quality = 100 }) {
  return (
    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint}>
      <IKImage
        path={path}
        width="500"
        height="500"
        className={`${className} aspect-auto object-cover object-center w-full h-full`}
        transformation={[
          {
            quality: 60,
          },
        ]}
        alt={alt}
        loading="lazy"
        lqip={{ active: true, quality: 20 }}
      />
    </IKContext>
  );
}
