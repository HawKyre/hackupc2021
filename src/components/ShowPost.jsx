const Post = ({ post }) => {
  return (
    <>
      <div
        className="mx-8 px-4 py-2 mb-8 text-lg rounded-xl bg-indigo-100"
        onClick={goToPost}
      >
        {title.substring(0, 50).trim()}
        {title.length > 50 && "..."}
      </div>
    </>
  );
};

export default Post;
