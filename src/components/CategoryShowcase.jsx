import Post from "./Post";

const CategoryShowcase = ({ categoryName, posts, goToPost, goBack }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <button className="text-4xl ml-8" onClick={goBack}>
          {"<"}
        </button>
        <p className="text-3xl flex justify-center my-8 px-6">{categoryName}</p>
      </div>
      {posts.map((post) => {
        return (
          <Post
            title={post.title}
            goToPost={() => goToPost(post.id)}
            key={post.id}
          />
        );
      })}
    </div>
  );
};

export default CategoryShowcase;
