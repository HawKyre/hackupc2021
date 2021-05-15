const PostVisualizer = ({ post }) => {
  console.log(post);
  return (
    <>
      <div className="py-6 px-8 bg-gray-100">
        <p className="text-xl">{post.postData.data.title}</p>
        <div className="">{post.postData.data.content}</div>
      </div>
      <div className="">
        <textarea name="" id="" className=""></textarea>
      </div>
      <div className="">
        {post.comments.data.map((x) => {
          return (
            <>
              <p>User: {x.nickname}</p>
              <div className="">{x.content}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PostVisualizer;
