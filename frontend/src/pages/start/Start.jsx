// import React from 'react'

// export default function Start() {
//   return (
//     <div>this is note intro page!!!</div>
//   )
// }

// import Link from "next/link"
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-blue-600 text-center">Notes App</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center">Your personal note-taking companion!!!!</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        <Link
          to="/signup"
          className="px-5 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-5 sm:px-6 py-2 sm:py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center text-sm sm:text-base"
        >
          Log In
        </Link>
      </div>
    </main>
  )
}

