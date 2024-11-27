import React, { useState, useEffect } from 'react'
import banner from '../../assets/banner.png';
import { FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userProfile } from '../../actions/auth';

const Banner = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const id = user?.result?._id
    console.log(id)
    useEffect(() => {
        dispatch(userProfile(id));
    }, [id]);
    const userdata = useSelector(state => state.authReducer.userData);
    console.log(userdata)
    return (
        <>
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 items-center w-full h-full p-[16px] bg-cover">
                <div
                    className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white ">
                        <FaUserCircle className="h-10 w-10" />
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-navy-700 ">
                        {userdata?.name}
                    </h4>
                </div>
                <p className="text-base font-normal text-gray-600">Post: {userdata?.post}</p>

                <div className="grid mt-2 grid-cols-2 gap-4 px-2">
                    
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Pursuing</p>
                        <p className="text-base font-medium text-navy-700 ">
                        {userdata?.grad}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Entry Year</p>
                        <p className="text-base font-medium text-navy-700 ">
                        {userdata?.year}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-base font-medium text-navy-700 ">
                        {userdata?.email}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-lightPrimary bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="text-base font-medium text-navy-700 ">
                        {userdata?.name}
                        </p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Banner
