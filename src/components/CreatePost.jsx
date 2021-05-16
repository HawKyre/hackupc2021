const CreatePost = ({
  categoryName,
  accept,
  cancel,
  newPostData,
  setNewPostData,
}) => {
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewPostData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <div className="flex justify-center text-2xl my-8">
        Crea un post en {categoryName}
      </div>
      <p className="ml-6 my-3">Título:</p>
      <textarea
        name="title"
        id=""
        cols="18"
        rows="4"
        placeholder="No os lo váis a creer..."
        value={newPostData.title}
        onChange={handleChange}
        className="w-screen px-8 py-4 bg-gray-50"
      ></textarea>
      <p className="ml-6 my-3">Descripción:</p>
      <textarea
        name="content"
        id=""
        cols="18"
        rows="12"
        placeholder="El otro día, paseando por la uni, vi a un chico..."
        value={newPostData.content}
        onChange={handleChange}
        className="w-screen px-8 py-4 mb-6 bg-gray-50 min-h-18"
      ></textarea>
      <div className="flex flex-row justify-around text-xl">
        <button onClick={accept} className="px-3 py-2 bg-green-50 rounded">
          Crear
        </button>
        <button
          className="px-3 py-2 bg-red-50 rounded"
          onClick={() => {
            setNewPostData({
              content: "",
              title: "",
            });
            cancel();
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
