import React, { useState, useEffect } from 'react'
import signin from '../../assets/signin.jpg';
import { Link } from 'react-router-dom';
import MainAgent from './MainAgent';

const CreateAgent = () => {
  return (
    <>
            <div className=" bg-white border-spacing-2 pb-2 mt-3 w-full float-right  h-full">
                <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 ">
                <div className="px-4 ">
                    <MainAgent/>
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[36vw] 2xl:w-[44vw]">
                    <div
                        className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                        style={{ backgroundImage: `url(${signin})` }}
                    />
                </div>
                </div>
            </div>
        </>
  )
}

export default CreateAgent
