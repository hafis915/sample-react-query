import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Notes from "../../utils/database/controller/notes";

type NotesValue = {
  name: string;
  uuid: string;
};

const Home: FC = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["todoList"],
    queryFn: Notes.GetNotes,
  });

  const [newTask, setNewTask] = useState<string>("");

  const [editValue, setEditValue] = useState<NotesValue | null>({
    name: "",
    uuid: "",
  });

  useEffect(() => {
    const input = document.getElementById("EditInput");
    if (input) {
      input.focus();
    }
  }, [editValue]);

  function handleEdit(index: number) : void {
    const value = data[index];
    setEditValue(value);
  }

  async function handleSaveValue() : Promise<void> {
    await Notes.UpdateNotes(editValue.uuid, editValue)
    const temp : NotesValue = {
        name : '',
        uuid : ''
    }
    setEditValue(temp)
    refetch()
  }

  async function deleteValue(id:string) : Promise<void> {
    await Notes.DeleteNotes(id)
    refetch()
  }

  function handleChangeEditValue(e: React.ChangeEvent<HTMLInputElement>) {
    const temp = { ...editValue };
    const value = e.target.value;
    temp.name = value;

    setEditValue(temp);
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setNewTask(value);
  }

  async function handleSaveNotes(): Promise<void> {
    const payload = {
      name: newTask,
    };
    await Notes.CreateNotes(payload);
    refetch();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data</p>;
  }
  return (
    <div className="home bg-[#0C356A] h-full w-full flex justify-center ">
      <div className="box-container bg-[#279EFF] border rounded border-white w-[600px] mt-6 mb-6 flex justify-center align-center">
        <div className="flex w-[90%] flex-col">
          <div className="add-todo-container flex w-full justify-center mt-5 gap-2">
            <input
              className="rounded w-full p-2 h-30px"
              placeholder="Write your activity here"
              onChange={handleChangeInput}
            />
            <button
              className="w-[50px] h-[50px] bg-emerald-700 cursor-pointer rounded flex items-center justify-center text-white"
              onClick={handleSaveNotes}
            >
              +
            </button>
          </div>
          <div className="todo-items-container mt-5 flex flex-col gap-2 rounded overflow-auto">
            {isLoading
              ? "Loading..."
              : data.map((el, index) => (
                  <div
                    key={index}
                    className="items-todo flex gap-1 bg-white  items-center border p-2 border-black rounded"
                  >
                    <div className="w-[80%]">
                      {editValue.uuid === el.uuid ? (
                        <input
                          id="EditInput"
                          onChange={handleChangeEditValue}
                          className="w-full"
                          value={editValue.name}
                        />
                      ) : (
                        <p className="truncate m-0">{el.name}</p>
                      )}
                    </div>
                    <button onClick={() => deleteValue(el.uuid)} className="bg-red-600 rounded h-[30px] w-[50px]">
                      {" "}
                      <p className="m-0 text-white text-sm ">Delete</p>
                    </button>

                    {editValue.uuid === el.uuid ? (
                      <button
                        onClick={handleSaveValue}
                        className="bg-sky-700 rounded h-[30px] w-[50px]"
                      >
                        <p className="text-white text-sm">Save</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-sky-700 rounded h-[30px] w-[50px]"
                      >
                        <p className="text-white text-sm">Edit</p>
                      </button>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
