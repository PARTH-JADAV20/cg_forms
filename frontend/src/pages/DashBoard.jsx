import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getFromStorage } from '../utils/encryptStorageutil';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLink, FaPlus, FaRemoveFormat, FaTimes } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';



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

                console.log(window.location.host)

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
                            <NavLink to={`/form/${ele._id}/responses`}>
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
                                    </NavLink>
                                <div className="flex items-center text-xl max-md:flex-col max-md:gap-3">
                                    <button className="bg-red-500 cursor-pointer hover:bg-red-700 aspect-square text-white font-bold py-1 px-2 rounded-full" 
                                        onClick={(async()=>{
                                            const SerVerResponse = await axios.delete(`http://localhost:8080/api/user/${username}/forms/${ele._id}`)
                                            console.log(SerVerResponse);
                                            navigate('/form/successfull-deleted')
                                        })}
                                    >
                                        <MdDelete />
                                    </button>
                                    <button className="bg-blue-500 cursor-pointer aspect-square hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full ml-2" onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.host}/response/${username}/${ele._id}`)
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

            <motion.button
                className="fixed bottom-5 cursor-pointer right-5 bg-blue-500 text-white rounded-full p-4 hover:bg-green-700"
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate('/create-form')}
            >
                <FaPlus size={24} />
            </motion.button>
            

        </div>
    </>
  )
}

export default DashBoard