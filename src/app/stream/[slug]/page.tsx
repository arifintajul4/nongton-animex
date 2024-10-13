'use client';
import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Stream({ params }: { params: { slug: string } }) {
  const handleGetData = async (slug: string) => {
    const response = await fetch(
      `https://apps.animekita.org/api/v1.1.6/chapter.php?url=${slug}&reso=720p`
    );
    const data = await response.json();
    return data;
  };

  const [currentUrl, setCurrentUrl] = React.useState('');
  const [data, setData] = React.useState<any>({ data: [] });

  useEffect(() => {
    const getData = async () => {
      const data = await handleGetData(params.slug).then((res) => res);
      console.log(data.data[0].stream);
      setData(data);
      setCurrentUrl(data.data[0].stream[0].link);
    };
    getData();
  }, []);

  if (currentUrl === '') {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Select
        value={currentUrl}
        onValueChange={(value) => {
          setCurrentUrl(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select server" />
        </SelectTrigger>
        <SelectContent>
          {data.data[0]?.stream.map((item: any, index: number) => (
            <SelectItem value={item.link} key={index}>
              {item.link.split('/')[2]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-center mt-2">
        <video
          controls
          key={currentUrl}
          className="w-fit min-h-[80vh] max-h-[80vh] "
        >
          <source src={currentUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
