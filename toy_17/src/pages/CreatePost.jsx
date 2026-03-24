import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
    // 제목, 내용 상태관리
   const [title, setTitle] = useState('')
   const [contents, setContents] = useState('')
   const navigate = useNavigate()  // 글작성후 홈으로 이동시키기 위한 도구
    // 저장 버튼 눌렀을때 실행될 함수
   const handleSubmit = async (e) => {
    e.preventDefault() // 새로고침 방지
    // 데이터 형식
    const newPost = {
        title: title,
        contents: contents,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),  // 2026-03-23 14:30 이런 형식
    }
    // supabase에 저장
    const { error } = await supabase
    .from('posts')
    .insert([newPost]);

    if ( error ) {
        alert('글쓰기 실패')
    } else {
        alert('글쓰기 성공!')
        navigate('/')  // 홈으로 이동
    }
   }
  return (
    <div className='max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>새 글 작성</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold text-gray-500 ml-1'>제목</label>
                <input
                className='border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all'
                placeholder='제목을 입력하세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold text-gray-500 ml-1'>내용</label>
                <textarea
                className='border border-gray-200 p-3 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all'
                placeholder='내용을 입력하세요'
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                />
            </div>
            <button 
                type='submit' 
                className='bg-[#6366F1] text-white p-4 rounded-xl font-bold hover:bg-[#4F46E5] transition-all mt-4 shadow-md'
            >
                등록하기
            </button>
        </form>
    </div>
  )
}

// 진행/실행 순서

// 입력: 제목 입력시 onChange가 동작 해서 title이라는 Sate에 글자가 담김
// 클릭: 등록하기 버튼 클릭시 handleSubmit 함수가 실행됨
// 포장: newPost라는 객체(Object)에 제목, 내용, 날짜를 담아 포장함
// 전송: supabase.from('posts').insert([newPost]) 를 통해 supabase 데이터베이스에 저장
// 이동: 저장이 완료되면 Maps('/')가 실행되면서 자동으로 메인페이지로 이동
