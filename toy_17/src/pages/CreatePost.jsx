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
    <div className='max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>새 글 작성</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
            className='border p-2 rounded'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // State 업데이트 
            />
            <textarea
            className='border p-2 rounded h-40'
            placeholder='내용을 입력하세요'
            value={contents}
            onChange={(e) => setContents(e.target.value)} // State 업데이트
            />
            <button type='submit' className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
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
