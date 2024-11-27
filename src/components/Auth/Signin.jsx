import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin } from '../../actions/auth'

const initialState = { name: '', email: '', post: '', password: '', confirmPassword: '' };

const Signin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [requestStatus, setRequestStatus] = useState({ loading: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password || !formData.email) {
            setRequestStatus({ loading: false, error: "Details can't be empty" });
            return;
        }

        setRequestStatus({ loading: true, error: null });
        console.log(formData)

        try {

            await dispatch(signin(formData, navigate));


            setRequestStatus({ loading: false, error: null });

        } catch (error) {
            setRequestStatus({ loading: false, error: error.response.data.message });
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <div className="mt-10 mb-10 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    RPR GPT
                </h4>
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 ">
                    Sign In
                </h4>

                <div className="mb-10 flex items-center ">
                    <div className="h-px w-full bg-gray-200 " />
                </div>
                <label class="font-semibold text-sm text-navy-700 pb-1 block">E-mail</label>

                <input required name="email"
                    onChange={handleChange}
                    type="email"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter your email" />


                <label class="font-semibold text-sm text-navy-700 pb-1 block">Password</label>

                <input required name="password"
                    onChange={handleChange}
                    type="password"
                    class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    placeholder="Enter your password" />

<div className="text-center text-gray-600">
            {error && <p>{error}</p>}
          </div>
          {requestStatus.error && (
            <div className="text-center">
              <label className="font-semibold text-sm text-navy-600 pb-1 block">
                {requestStatus.error}
              </label>
            </div>
          )}
                <button onClick={handleSubmit} type="submit" className="linear mt-2 w-full rounded-xl bg-[#422AFB] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[#3311DB] active:bg-[#2111A5] ">
                    Sign In
                </button>

            </div>
        </div>
    )
}

export default Signin
