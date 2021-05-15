import Post from "./Post";

const CategoryShowcase = ({ categoryName, posts, loadMorePosts }) => {
  return (
    <div className="">
      <p className="text-3xl flex justify-center my-8 px-6">{categoryName}</p>
      {posts.map((p) => {
        return <Post title={p.title} content={p.content} postID={p.postID} />;
      })}
    </div>
  );
};

export default CategoryShowcase;
