import Post from "./Post";

const CategoryShowcase = ({ categoryName, posts, goToPost }) => {
  return (
    <div className="">
      <p className="text-3xl flex justify-center my-8 px-6">{categoryName}</p>
      {posts.map((p) => {
        return (
          <Post title={p.title} goToPost={() => goToPost(p.id)} key={p.id} />
        );
      })}
    </div>
  );
};

export default CategoryShowcase;
