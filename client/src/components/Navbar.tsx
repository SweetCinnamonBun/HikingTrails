import React, { useState } from 'react'
import { FaHeart, FaHome, FaBars, FaTimes } from 'react-icons/fa'
import { GiTrail } from 'react-icons/gi'
import { IoTrailSignSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // demo placeholders
  const user = null


  return (
    <>
      {/* Navbar */}
      <nav className="relative z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-4 lg:px-14 2xl:px-44">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-black rounded-full" />
            <span className="ml-2 text-lg italic font-bold">
              HikingTrails
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="items-center hidden font-semibold lg:flex space-x-7">
            <Link to="/" className="flex flex-col items-center hover:text-yellow-500">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/favorites" className="flex flex-col items-center hover:text-red-500">
              <FaHeart />
              <span>Favorites</span>
            </Link>
            <Link to="/create-trail" className="flex flex-col items-center hover:text-purple-500">
              <GiTrail />
              <span>Create Trail</span>
            </Link>
            <Link to="/create-region" className="flex flex-col items-center hover:text-purple-500">
              <IoTrailSignSharp />
              <span>Create Region</span>
            </Link>
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl lg:hidden"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-3 font-semibold"
          >
            <FaHome />
            <span>Home</span>
          </Link>

          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-3 font-semibold"
          >
            <FaHeart />
            <span>Favorites</span>
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-3 font-semibold"
          >
            <MdDashboard />
            <span>Create Trail</span>
          </Link>

          <div className="pt-6 space-y-3 border-t">
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2 text-center border border-black rounded-full"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2 text-center text-white bg-black rounded-full"
            >
              Login
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar
