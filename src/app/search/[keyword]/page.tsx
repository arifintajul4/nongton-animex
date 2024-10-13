import { Card, CardContent } from '@/components/ui/card';
import { AnimeCard } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

const getdata = async (keyword: string) => {
  const response = await fetch(
    `https://apps.animekita.org/api/v1.1.6/search.php?keyword=${keyword}`
  );
  const data = await response.json();
  return data;
};

export default async function page({
  params,
}: {
  params: { keyword: string };
}) {
  const data = await getdata(params.keyword);
  if (data.data[0].result.length === 0) {
    return <div>Not Found</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
      {data.data[0].result.map((item: AnimeCard) => (
        <Link key={item.id} href={`/details/${encodeURIComponent(item.url)}`}>
          <Card className="overflow-hidden cursor-pointer">
            <img
              src={item.cover}
              alt={item.judul}
              className="w-full h-48 object-cover"
            />
            <CardContent>
              <div className="pt-2">
                <p className="font-bold text-lg">{item.judul}</p>
                <p>{item.lastch}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
