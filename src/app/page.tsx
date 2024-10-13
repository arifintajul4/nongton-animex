import { AnimeCard } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const getData = async () => {
  const response = await fetch(
    'https://apps.animekita.org/api/v1.1.6/terbaru.php'
  );
  const data = await response.json();
  return data;
};

export default async function Home() {
  const data = await getData();
  // console.log(data);
  return (
    <div className="min-h-screen">
      <h2 className="font-bold mb-5 text-3xl">Baru diupload</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((item: AnimeCard) => (
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
    </div>
  );
}
