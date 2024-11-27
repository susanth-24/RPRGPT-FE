import React, { useState, useEffect } from 'react'
import banner from '../../assets/banner.png';
import { FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userProfile } from '../../actions/auth';
import Banner from './Banner';

const Profile = () => {
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
            <div className="flex w-full flex-col gap-5">
                <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                    <div className="col-span-7 lg:!mb-0">
                        <Banner />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile
