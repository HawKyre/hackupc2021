import Post from "./Post";

const CategoryShowcase = ({
  categoryName,
  posts,
  goToPost,
  goBack,
  goToCreatePost,
}) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <button className="text-4xl ml-8" onClick={goBack}>
          {"<"}
        </button>
        <p className="text-3xl flex justify-center my-8 px-6">{categoryName}</p>
      </div>
      {posts.map((p) => {
        return (
          <Post title={p.title} goToPost={() => goToPost(p.id)} key={p.id} />
        );
      })}
      <div className="flex justify-center">
        <button
          onClick={() => goToCreatePost(categoryName)}
          className="mx-8 px-4 py-2 mb-8 text-lg rounded-xl bg-blue-100"
        >
          Crear un post
        </button>
      </div>
    </div>
  );
};

export default CategoryShowcase;
