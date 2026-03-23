import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([]) // 게시글을 담을 곳
    const [loading, setLoading] = useState(true)  // 로딩중인지 확인

    useEffect(() => {
    const fetchPosts = async () => {
        const { data, error } = await supabase
        .from('posts') // posts 테이블 에서
        .select('*')  // (*) 모든 데이터를 가져오기
        .order('date', { ascending: false }) // 최신순 정렬

        if (error) {
            console.error('데이터 가져오기 실패:', error)
        } else {
            setPosts(data)  // 가져온 데이터를 set에 담기
        }
        setLoading(false) // 로딩 끝
    }
    // 페이지 열릴때 딱 한번 실행
        fetchPosts()
    }, [])

    if (loading) return <div className='p-10 text-center'>로딩중...</div>

  return (
    <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>
            최신 게시글 리스트
        </h2>
        {/* 게시글 없을때 UI */}
        {posts.length === 0 ? (
            <div className='text-center py-20 text-gray-500 border-2 border-dashed rounded-lg'>
                아직 작성된 게시글이 없습니다.
            </div>
        ) : (
            <div className='grid gap-4'>
                {posts.map((post) => (
                    <Link key={post.id} to={`/detail/${post.id}`} className='block'>
                        <div className='p-4 border rounded-lg hover:shadow-md transition bg-white'>
                            <h3 className='text-lg font-bold text-gray-800'>{post.title}</h3>
                            <span className='text-sm text-gray-400'>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}


// 진행/실행 원리
// useState([]): 게시글이 없을때 빈 배열([])로 시작한다.
// useEffect: 페이지가 열리면 리액트가 Supabase에 '데이터 줘' 하고 동작한다.
// supabase.from('posts').select('*'): 전체 데이터를 가져온다.
// 조건부 렌더링(posts.length === 0): 게시글이 없으면 '아직 작성된 게시글이 없습니다.'를 보여준다.
