const UniMain = ({ uniName, categoryList, goToCategory }) => {
  return (
    <div className="">
      <p className="my-12 text-xl flex justify-center px-8">
        Bienvenido al portal de la {uniName}
      </p>
      <div className="grid grid-cols-2 mx-8 gap-3">
        {categoryList.map((cat) => {
          return (
            <button
              className="h-32 bg-red-100 rounded-xl"
              key={cat.id}
              onClick={() => goToCategory(cat)}
            >
              <p className="text-xl">{cat.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UniMain;
