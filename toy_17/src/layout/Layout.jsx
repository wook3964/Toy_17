import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col font-sans'>
        <nav className='bg-blue-600 p-4 text-white shadow-md'>
            <h1 className='text-xl font-bold'>블로그</h1>
        </nav>
        <main className='flex-grow container mx-auto p-6'>
            <Outlet />
        </main>
        <footer className='bg-gray-100 p-4 text-center text-sm text-gray-500'>
            © 2026 블로그
        </footer>
    </div>
  )
}
