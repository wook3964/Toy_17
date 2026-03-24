import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation();  // 현재 브라우저 주소창 정보를 가져온다.
  const isHome = location.pathname === '/';  // 현재 브라우저 주소창 정보가 '/'이면 isHome을 true로 설정한다.

  return (
    <div className='min-h-screen flex flex-col bg-[#F0F4FF] font-sans'>
      {/* Header */}
      <header className='bg-white h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10'>
        <div className='w-24'></div> {/* Left Spacer for centering */}
        <Link to="/" className='text-xl font-bold text-gray-800 tracking-tight'>
          게시판
        </Link>
        <div className='w-24 flex justify-end'>
          {isHome && (
            <Link 
              to="/write" 
              className='bg-[#6366F1] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#4F46E5] transition-all'
            >
              글쓰기
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className='grow container mx-auto max-w-4xl py-8 px-4'>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className='bg-[#8B8B8B] py-10 text-center text-white'>
        <p className='text-sm font-medium'>
          © 2025 MyBoard. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
