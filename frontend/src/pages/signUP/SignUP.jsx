import React from 'react'

export default function SignUP() {
  return (
    <div>This is Sign up component!!</div>
  )
}


// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom";

// export default function SignupForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required"
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters"
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters"
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password"
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setIsLoading(true)

//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     console.log("Signup form data:", formData)

//     setIsLoading(false)
//   }



//   return (
//   <main className="min-h-screen flex items-center justify-center p-4 bg-background">
//     <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm">
//       {/* Header */}
//       <div className="p-6 space-y-2 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-center text-blue-600">Create an account</h1>
//         <p className="text-sm text-gray-600 text-center">Enter your details to create your Notes App account</p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-4">
//         {/* Name Field */}
//         <div className="space-y-2">
//           <label htmlFor="name" className="block text-sm font-medium text-blue-600">
//             Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             placeholder="John Doe"
//             value={formData.name}
//             onChange={handleChange}
//             disabled={isLoading}
//             className={`w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
//           />
//           {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
//         </div>

//         {/* Email Field */}
//         <div className="space-y-2">
//           <label htmlFor="email" className="block text-sm font-medium text-blue-600">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="john@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             disabled={isLoading}
//             className={`w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
//           />
//           {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
//         </div>

//         {/* Password Field */}
//         <div className="space-y-2">
//           <label htmlFor="password" className="block text-sm font-medium text-blue-600">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               disabled={isLoading}
//               className={`w-full px-3 py-2 pr-10 border rounded-md text-sm outline-none transition-colors ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//               tabIndex={-1}
//             >
//               {showPassword ? (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-.672 3.157-1.757 4.243A6 6 0 0121 12a6 6 0 00-6-6 5.999 5.999 0 00-4.243 1.757M12 3v1m4.243 1.757l.707-.707M15 12h1m-1 4.243l.707.707M12 21v-1m-4.243-1.757l-.707.707M9 12H8m1-4.243L8.293 7.05"
//                   />
//                 </svg>
//               ) : (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
//         </div>

//         {/* Confirm Password Field */}
//         <div className="space-y-2">
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-600">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               disabled={isLoading}
//               className={`w-full px-3 py-2 pr-10 border rounded-md text-sm outline-none transition-colors ${
//                 errors.confirmPassword ? "border-red-500" : "border-gray-300"
//               } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//               tabIndex={-1}
//             >
//               {showConfirmPassword ? (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-.672 3.157-1.757 4.243A6 6 0 0121 12a6 6 0 00-6-6 5.999 5.999 0 00-4.243 1.757M12 3v1m4.243 1.757l.707-.707M15 12h1m-1 4.243l.707.707M12 21v-1m-4.243-1.757l-.707.707M9 12H8m1-4.243L8.293 7.05"
//                   />
//                 </svg>
//               ) : (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-6"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Creating account...
//             </div>
//           ) : (
//             "Sign Up"
//           )}
//         </button>

//         {/* Navigation Links */}
//         <div className="text-center">
//           <p className="text-xs text-gray-600">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline font-medium">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   </main>
//   )
// }



