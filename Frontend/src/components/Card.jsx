const Card = (props) => {
  return (
    <div className="max-w-md my-4 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-2">{props.title}</h1>
      <h2 className="text-lg text-gray-700 mb-4">{props.value}</h2>
    </div>
  );
};

export default Card;