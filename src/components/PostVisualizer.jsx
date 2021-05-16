import { useState } from "react";

const PostVisualizer = ({ post, submitComment, goBack }) => {
  const [text, setText] = useState("");

  return (
    <>
      <div className="py-6 px-8 bg-gray-100">
        <button className="text-4xl mb-4" onClick={goBack}>
          {"<"}
        </button>
        <p className="text-xl">{post.postData.data.title}</p>
        <div className="">{post.postData.data.content}</div>
      </div>
      <div className="flex flex-col justify-center">
        <textarea
          name=""
          id=""
          rows="20"
          columns="8"
          className="w-screen px-8 py-4 h-40"
          placeholder="Escribe tu comentario..."
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        ></textarea>
        <button
          className="bg-gray-200 py-4 my-8 mx-20 rounded-xl"
          onClick={() => {
            if (text !== "") {
              setText("");
              submitComment(text);
            }
          }}
        >
          Enviar
        </button>
      </div>
      <div className="">
        {post.comments.data.map((com) => {
          return (
            <>
              <div className="px-8 mb-4">
                <p className="text-xl">- {com.nickname} -</p>
                <div className="">{com.content}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PostVisualizer;
