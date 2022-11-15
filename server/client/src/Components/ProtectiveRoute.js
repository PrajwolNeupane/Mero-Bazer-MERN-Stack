import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from './Footer'
import NavBar from './NavBar'

export default function ProtectiveRoute({ com }) {


  const { user } = useSelector((state) => state.User);


  return (
    <>
      {
        user === null ? <Navigate to="/login" /> : <><NavBar />
          {com}
          <Footer /></>
      }
    </>
  )
}
