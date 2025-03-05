// import React from 'react'

// const PreviewPage = () => {
//   return (
//     <div>PreviewPage</div>
//   )
// }

// export default PreviewPage


import { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const questionTypes = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'number', label: 'Number' },
  { value: 'text', label: 'Text' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'boolean', label: 'Yes/No' }
];

function PreviewPage() {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Form Description');

  const [userResponse, setUserResponse] = useState({});

    const { userId, formId } = useParams();





  useEffect(()=>{
    (async () => {
        const serverResponse = await axios.get("http://localhost:8080/api/user/eh8w0SOovfU4BLATTG38gt4nNpI3/forms");
        console.log(serverResponse.data.forms)
        setQuestions(serverResponse.data.forms[1].questions)
        setFormTitle(serverResponse.data.forms[1].title)
        setFormDescription(serverResponse.data.forms[1].description)
        console.log(userId)
        console.log(formId)
        console.log(questions)
        serverResponse.data.forms[1].questions.map((question) => {
            if (question.type === 'mcq') {
                setUserResponse((prevResponse) => ({
                    ...prevResponse,
                    [question._id]: ''
                }));
            } else if (question.type === 'text') {
                setUserResponse((prevResponse) => ({
                    ...prevResponse,
                    [question._id]: ''
                }));
            } else if (question.type === 'paragraph') {
                setUserResponse((prevResponse) => ({
                    ...prevResponse,
                    [question._id]: ''
                }));
            } else if (question.type === 'boolean') {
                setUserResponse((prevResponse) => ({
                    ...prevResponse,
                    [question._id]: false
                }));
            } else if (question.type === 'number') {
                setUserResponse((prevResponse) => ({
                    ...prevResponse,
                    [question._id]: 0
                }));
            }
        });

        console.log(userResponse)
    })()

  }, [])


  const showdata = () => {
    console.log(userResponse)
  }

  return (
    <>
    <Navbar />
    <div className="min-h-[calc(100vh-72px)] mt-[72px] bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <input
            type="text"
            disabled
            value={formTitle}
            className="w-full select-none text-3xl font-bold border-b-2 border-purple-300 focus:border-purple-500 outline-none pb-2"
          />
          <input
            type="text"
            disabled
            value={formDescription}
            className="w-full mt-4 select-none border-b border-gray-300 focus:border-purple-500 outline-none"
          />
        </div>

        {/* Questions */}
        {questions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={question.question}
                    placeholder="Question"
                    className="flex-1 border-b border-gray-300 focus:border-purple-500 outline-none"
                  />
                  
                </div>

                {question.type === 'mcq' && (
                  <div className="space-y-2">
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={question._id}
                          value={option}
                          checked={userResponse[question._id] === option}
                          onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                          className="text-purple-600"
                        />
                        <span className="flex-1">{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <input
                    type="text"
                    value={userResponse[question._id]}
                    onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                    // disabled
                    placeholder="Short answer text"
                    className="w-full border-b border-gray-300 mt-2"
                  />
                )}

                {question.type === 'paragraph' && (
                  <textarea
                  value={userResponse[question._id]}
                  onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                    // disabled
                    placeholder="Long answer text"
                    className="w-full border border-gray-300 rounded mt-2 h-24"
                  />
                )}

                {question.type === 'number' && (
                  <input
                  value={userResponse[question._id]}
                  onChange={(e) => setUserResponse((prevResponse) => ({ ...prevResponse, [question._id]: e.target.value }))}
                    type="number"
                    placeholder="Number input"
                    className="w-full border-b border-gray-300 mt-2"
                  />
                )}

                {question.type === 'boolean' && (
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={question._id}
                        value={true}
                        checked={userResponse[question._id] === true}
                        onChange={(e) =>
                          setUserResponse((prevResponse) => ({
                            ...prevResponse,
                            [question._id]: e.target.value === 'true'
                          }))
                        }
                        className="text-purple-600"
                      />{' '}
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={question._id}
                        value={false}
                        checked={userResponse[question._id] === false}
                        onChange={(e) =>
                          setUserResponse((prevResponse) => ({
                            ...prevResponse,
                            [question._id]: e.target.value === 'true'
                          }))
                        }
                        className="text-purple-600"
                      />{' '}
                      No
                    </label>
                  </div>
                )}
              </div>

            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={question.required}
                className="text-purple-600"
              />
              <span className="text-sm text-gray-600">Required</span>
            </div>
          </div>
        ))}

        <div className="bg-blue-500 p-4 rounded-lg" onClick={showdata}>
            Submit
        </div>
        
      </div>
    </div>
  </>
  );
}

export default PreviewPage;