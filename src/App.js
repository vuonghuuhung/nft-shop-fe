/* src/App.js */
import './App.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import axios from 'axios';

const storage = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNzcyODI4MDQ1NjBFNUYwOTg1NTYyOGE2ZGVDMGEwODUyYmM4MzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTk0OTM2NTU1MTcsIm5hbWUiOiJ0ZXN0MSJ9.gxMQWZycpSj92qnWA6uzZZRAr4cef1r8nOUswDTpdKI" });

function App() {
  const [file, setFile] = useState();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    avatar: undefined,
    imglink: "https://i.ibb.co/n1fFcDS/IMG-4431.jpg"
  });
  const [arr, setArr] = useState([]);

  const arrayHash = [
    "bafybeifkvkp5sf2v56xukbboihnx52gcks2ixxkqx7en5eddqta2kbklhq",
    "bafybeifkvkp5sf2v56xukbboihnx52gcks2ixxkqx7en5eddqta2kbklhq",
    "bafybeifkvkp5sf2v56xukbboihnx52gcks2ixxkqx7en5eddqta2kbklhq"
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        arrayHash.forEach(async (e) => {
          const res = (await axios.get(`https://${e}.ipfs.w3s.link/hello.json`)).data
          console.log(res);
          setArr(e => {
            const newArr = [...e, res];
            return newArr
          })
        })
      } catch (error) {
      }
    }
    getData();
  }, [])

  const handleOpenInputFile = (
    e
  ) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const onFileChange = (e) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal) {
      setFile(fileFromLocal);
      setFormData((prev) => {
        const newFormData = {
          ...prev,
          avatar: fileFromLocal
        };
        return newFormData;
      });
    }
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };
      return newFormData;
    });
  };

  const onPublish = async (e) => {
    e.preventDefault();
    if (formData) {
      try {
        const obj = formData
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
        const files = [
          new File([blob], 'hello.json')
        ]
        const cid = await storage.put(files)
        console.log('stored files with cid:', cid)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto my-10">
      <h1 className="text-3xl font-semibold">Form Control</h1>
      <button
        className="border border-red-600 w-[300px] float-right h-[40px] flex items-center justify-center"
        onClick={handleOpenInputFile}
      >
        connect Wallet
      </button>
      <form onSubmit={onPublish}>
        <div className="flex mt-8 gap-4">
          <div className="flex-grow">
            <input
              placeholder="name"
              onChange={onChangeInput}
              name="name"
              value={formData.name}
              className="border border-black block w-full py-2 px-4"
            />
            <input
              placeholder="description"
              onChange={onChangeInput}
              name="description"
              value={formData.description}
              className="border border-black block w-full py-2 px-4 mt-4"
            />
            <input
              placeholder="price"
              onChange={onChangeInput}
              name="price"
              value={formData.price}
              className="border border-black block w-full py-2 px-4 mt-4"
            />
          </div>
          <div className="w-[30%] flex flex-col items-center justify-center">
            <div className="my-5 h-24 w-24">
              <img
                src={
                  previewImage ||
                  "https://blog.alliedmarketresearch.com/images/user_icon.png"
                }
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              name="image"
              onChange={onFileChange}
            />
            <button
              className="border border-red-600 w-[100px] h-[40px] flex items-center justify-center"
              onClick={handleOpenInputFile}
            >
              chọn ảnh
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="border border-red-600 w-[100px] h-[40px] flex items-center justify-center mt-8"
        >
          Đăng bán
        </button>
      </form>
      <div className="mt-8 p-4 border border-black">
        <div className="flex w-full ">
          <div>
            <img
              src="https://images.unsplash.com/photo-1699116548131-09a8a8a5ee4e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="product"
              className="w-[100px] h-[100px] object-cover"
            />
          </div>
          <div className="ml-6 w-full  flex items-center justify-between ">
            <div>
              <h3 className="text-xl">Sản phẩm 1</h3>
              <div>descrip...</div>
              <div>price</div>
            </div>
            <button className="border border-red-600 w-[100px] h-[40px] flex items-center justify-center">
              Mua
            </button>
          </div>
        </div>
        {arr.map((e, index) => (
          <div key={index} className="flex mt-4">
            <div>
              <img
                src="https://images.unsplash.com/photo-1699116548131-09a8a8a5ee4e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
            <div className="ml-6 w-full  flex items-center justify-between ">
              <div>
                <h3 className="text-xl">Sản phẩm 1</h3>
                <div>descrip...</div>
                <div>price</div>
              </div>
              <button className="border border-red-600 w-[100px] h-[40px] flex items-center justify-center">
                Mua
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
