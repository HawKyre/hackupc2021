const UniMain = ({ uniName, categoryList, goToCategory }) => {
  return (
    <div className="">
      <p className="my-12 text-xl flex justify-center px-8">
        Bienvenido al portal de la {uniName}
      </p>
      <div className="grid grid-cols-2 mx-8 gap-3">
        {categoryList.map((c) => {
          return (
            <button
              className="h-32 bg-red-100 rounded-xl"
              onClick={() => goToCategory(c)}
            >
              <p className="text-xl">{c.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UniMain;
