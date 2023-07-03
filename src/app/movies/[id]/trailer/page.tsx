import getTrailerMovie from '@/lib/getTrailerMovie';

type Props = {
  params: {
    id: number;
  };
};

export default async function Trailer({ params: { id } }: Props) {
  const res: TrailerResponse = await getTrailerMovie(id);

  const { key }: Trailer = res.results[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-30 h-screen">
      <iframe
        src={`https://www.youtube.com/embed/${key}?controls=1&autoplay=1`}
        width={500}
        height={500}
        className="h-full w-full"
      ></iframe>
    </div>
  );
}
