import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getFromStorage } from '../utils/encryptStorageutil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLink, FaRemoveFormat, FaTimes } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";


const DashBoard = () => {
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [username, setUsername] = useState("User");
    const [userForms, setUserForms] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
            (async () => {
                const checking = await getFromStorage("utilityfunctions");
                if (checking) {
                    console.log(checking)
                    setIsUserLogin(true)
                    setUsername(checking._id)

                    const userCreatedForms = await axios.get(`http://localhost:8080/api/user/${checking._id}/forms`)
                    console.log(userCreatedForms.data.forms)
                    setUserForms(userCreatedForms.data.forms)

                } else {
                    navigate('/signup')
                }



            })()
        }, [])

  return (
    <>
        <Navbar />
        <div className="mt-[75px] h-[calc(100vh-75px)]">
            <h1 className='text-4xl font-bold text-center w-full p-3'>Your Created Forms</h1>
            {/* <div className="">
                {username}
            </div> */}
            <div className="flex gap-5 flex-col standard-max-width">

            {
                userForms.map((ele, key) => {
                    return (
                        <div className="flex flex-col p-4 border-2 border-gray-300 last:border-b-0 bg-white rounded-lg shadow-lg" key={key}>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h2 className="font-bold text-3xl">{ele.title}</h2>
                                    <p className="text-sm mt-1">{ele.description}</p>
                                    <div className="mt-4 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                                        <span className="text-xs text-gray-600">
                                            Created: {new Date(ele.createdAt).toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            Expiration: {new Date(ele.expiration).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-xl max-md:flex-col max-md:gap-3">
                                    <button className="bg-red-500 cursor-pointer hover:bg-red-700 aspect-square text-white font-bold py-1 px-2 rounded-full" onClick={() => {
                                        navigator.clipboard.writeText(`https://localhost:3000/response/${username}/${ele._id}`)
                                        alert("Form link copied to clipboard")
                                    }}>
                                        <MdDelete />
                                    </button>
                                    <button className="bg-blue-500 cursor-pointer aspect-square hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full ml-2" onClick={() => {
                                        navigator.clipboard.writeText(`Welcome to my Form: https://localhost:3000/response/${username}/${ele._id}`)
                                        alert("Form link copied to clipboard")
                                    }}>
                                        <FaLink />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                <span className=""></span>
            </div>

        </div>
    </>
  )
}

export default DashBoard