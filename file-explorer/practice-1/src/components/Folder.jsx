import { useState } from "react";
import { LiaEdit, LiaPlusSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const Folder = ({ directoryData, handleDirectory }) => {
  const [explore, setExplore] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: false,
  });
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleDropdown = (event) => {
    event.stopPropagation();
    setIsDropDown((prevState) => !prevState);
  };

  const handleShowInput = (event, isFolder) => {
    event.stopPropagation();
    setIsDropDown(false);
    setShowInput({
      isVisible: true,
      isFolder,
    });
  };

  const handleDireactoryCreation = (event, type) => {
    if (event.key === "Enter") {
      handleDirectory({
        id: directoryData.id,
        info: {
          name: input,
          isFolder: showInput.isFolder,
          type,
        },
      });
      setInput("");
      setShowInput((prevState) => ({
        ...prevState,
        isVisible: false,
      }));
      setExplore(true);
    }
  };

  const handleDireactoryEdit = (event) => {
    if (event.key === "Enter") {
      handleDirectory({
        id: directoryData.id,
        info: {
          name: input,
          isFolder: showInput.isFolder,
          type: "edit",
        },
      });
      setInput("");
      setIsEditing(false);
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  if (directoryData === null) {
    return null;
  }

  if (directoryData.isFolder) {
    return (
      <>
        <div
          className={` relative  w-56 cursor-pointer flex justify-between ${
            explore ? "bg-red-100" : "bg-slate-200"
          }`}
          onClick={() => {
            setExplore((prevState) => !prevState);
          }}
        >
          {isEditing ? (
            <div className="pl-1 py-1 flex gap-1">
              📁
              <input
                type="text"
                className="outline-none px-1"
                placeholder="Enter New Name"
                autoFocus
                onBlur={() => {
                  setInput("");
                  setIsEditing(false);
                }}
                onKeyDown={handleDireactoryEdit}
                onChange={handleInput}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                value={input}
              />
            </div>
          ) : (
            <div className="pl-1 py-1">📁 {directoryData.name}</div>
          )}

          <div
            onClick={(event) => {
              handleDropdown(event);
            }}
            className="relative"
          >
            <BsThreeDots className="hover:bg-slate-300 h-full  w-6 px-1" />
            <div
              className={`absolute right-0  top-[110%] z-10 border border-black bg-slate-50 ${
                isDropDown ? "block" : "hidden"
              }`}
              // onMouseLeave={handleDropdown}
            >
              <div
                onClick={(event) => {
                  handleShowInput(event, true);
                }}
                className="m-1 px-1 whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-1"
              >
                <span>Folder</span>
                <LiaPlusSolid />
              </div>
              <div
                onClick={(event) => {
                  handleShowInput(event, false);
                }}
                className="m-1 px-1  whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-1"
              >
                <span>File</span>
                <LiaPlusSolid />
              </div>
              <div
                onClick={() => {
                  setIsEditing(true);
                }}
                className="m-1 px-1  whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-2"
              >
                <span>Edit</span>
                <LiaEdit className="hover:bg-slate-300" />
              </div>
              <div
                onClick={() => {
                  handleDirectory({
                    id: directoryData.id,
                    info: {
                      type: "delete",
                    },
                  });
                }}
                className="m-1 px-1  whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-2"
              >
                <span>Delete</span>
                <RiDeleteBin6Line className="hover:bg-slate-300 pt-0.5" />
              </div>
            </div>
          </div>
        </div>
        {showInput.isVisible && (
          <div className="mx-6 border w-56 mt-0.5">
            <span className="px-1">{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="outline-none "
              autoFocus
              onChange={handleInput}
              onBlur={() => {
                setInput("");
                setShowInput((prevState) => ({
                  ...prevState,
                  isVisible: false,
                }));
              }}
              onKeyDown={(event) => {
                handleDireactoryCreation(event, "create");
              }}
              value={input}
            />
          </div>
        )}

        <div className="ml-5 my-1">
          {explore &&
            directoryData.items.map((item) => {
              if (item === null) {
                return null;
              }
              return (
                <Folder
                  key={item.id}
                  directoryData={item}
                  handleDirectory={handleDirectory}
                />
              );
            })}
        </div>
      </>
    );
  } else {
    if (directoryData === null) {
      return null;
    }

    return (
      <div
        className={` relative  w-56 cursor-pointer flex justify-between bg-slate-200 mt-0.5`}
      >
        {isEditing ? (
          <div className="my-1 flex gap-1">
            📄
            <input
              type="text"
              className="outline-none px-1"
              placeholder="Enter New Name"
              autoFocus
              onBlur={() => {
                setInput("");
                setIsEditing(false);
              }}
              onKeyDown={handleDireactoryEdit}
              onChange={handleInput}
              value={input}
            />
          </div>
        ) : (
          <div className="my-1">📄 {directoryData.name}</div>
        )}

        <div onClick={handleDropdown} className="relative">
          <BsThreeDots className="hover:bg-slate-300 h-full  w-6 px-1" />
          <div
            className={`absolute right-0  top-[110%] z-10 border border-black bg-slate-50 ${
              isDropDown ? "block" : "hidden"
            }`}
          >
            <div
              onClick={(event) => {
                handleShowInput(event, true);
              }}
            >
              <div
                onClick={() => {
                  setIsEditing(true);
                }}
                className="m-1 px-1  whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-2"
              >
                <span>Edit</span>
                <LiaEdit className="hover:bg-slate-300" />
              </div>
              <div
                onClick={() => {
                  handleDirectory({
                    id: directoryData.id,
                    info: {
                      type: "delete",
                    },
                  });
                }}
                className="m-1 px-1  whitespace-nowrap hover:bg-slate-300 rounded-sm flex justify-between items-center gap-2"
              >
                <span>Delete</span>
                <RiDeleteBin6Line className="hover:bg-slate-300 pt-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Folder;
