import { Chapter } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

const handleGetData = async (slug: string) => {
  const response = await fetch(
    `https://apps.animekita.org/api/v1.1.6/series.php?url=${slug}`
  );
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return {
      data: [],
    };
  }
};

export default async function Latest({ params }: { params: { slug: string } }) {
  const data = await handleGetData(params.slug);

  if (data.data.length === 0) {
    return <div>Not Found</div>;
  }
  return (
    <div className="">
      <div className="flex gap-5">
        <div>
          <Image
            width={200}
            height={300}
            src={data.data[0].cover}
            alt={data.data[0].judul}
          />
        </div>
        <div className="max-h-[50vh] overflow-auto max-w-[80%]">
          <h6 className="font-bold text-lg mb-2">{data.data[0]?.judul}</h6>
          <pre className="bg-black text-white">
            {JSON.stringify(data.data[0], null, 2)}
          </pre>
        </div>
      </div>
      <div className="mt-10 max-h-[40vh] overflow-y-auto">
        <div>
          <div className="bg-blue-600 text-white rounded-md">
            <div className="flex justify-between items-center mb-3 px-2 py-1">
              <p className="">Episode</p>
              <p className="text-right">Tanggal Rilis</p>
            </div>
          </div>
          <ul className="max-h-[40vh] overflow-auto">
            {data.data[0].chapter.map((item: Chapter) => (
              <Link
                href={`/stream/${encodeURIComponent(item.url)}`}
                key={item.id}
              >
                <div className="flex justify-between items-center pb-2 hover:bg-gray-100 px-2 py-1 rounded-md">
                  <p>Episode {item.ch}</p>
                  <p className="text-right">{item.date}</p>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
