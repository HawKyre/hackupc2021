const Post = ({ title, goToPost }) => {
  const MAX_CHAR = 50;
  return (
    <>
      <div
        className="mx-8 px-4 py-2 mb-8 text-lg rounded-xl bg-indigo-100"
        onClick={goToPost}
      >
        {title.substring(0, MAX_CHAR).trim()}
        {title.length > MAX_CHAR && "..."}
      </div>
    </>
  );
};

export default Post;
