let img =
    "https://d.ibtimes.co.uk/en/full/1730659/elon-musk-tesla-optimus.jpg?w=736&f=c81768e7ce1d04a8ab2b362aa77abf24";
  
function account() {
    return (
    <>
      <div className="flex items-center gap-3 mb-6">
        {/*bg-red-500*/}
        <div
          className="w-10 h-10 rounded-full bg-cover bg-center "
          style={{ backgroundImage: `url(${img})` }}
        ></div>
            <span className="text-white font-medium">Clanker</span>
        </div>
        <hr className="border-gray-700 my-1" />
    </>
    );
}

export default account