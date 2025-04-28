export default function Card({ data }) {
  return (
    <a>
      <figure className="w-32 h-32 mb-2 flex justify-center items-center p-8 bg-[#bac2c2] rounded-full shadow-md">
        <img src={data.imageSrc} alt="Product" className=" object-cover" />
      </figure>
      <h3 className="text-lg font-medium text-center">{data.title}</h3>
    </a>
  );
}
