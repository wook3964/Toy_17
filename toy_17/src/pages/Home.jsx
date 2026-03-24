import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('date', { ascending: false })

        if (error) {
            console.error('데이터 가져오기 실패:', error)
        } else {
            setPosts(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (e, id) => {
        e.preventDefault(); // 링크 이동 방지
        e.stopPropagation(); // 버블링 방지
        
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) {
                alert('삭제 실패했습니다.');
            } else {
                alert('성공적으로 삭제되었습니다.');
                fetchPosts(); // 목록 새로고침
            }
        }
    }

    if (loading) return (
        <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366F1]'></div>
        </div>
    )

    return (
        <div className='space-y-6'>
            {posts.length === 0 ? (
                /* Empty State UI (Screenshot 2) */
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 py-16 px-6 text-center flex flex-col items-center'>
                    <div className='bg-gray-50 p-4 rounded-xl mb-4'>
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-2'>아직 작성된 글이 없습니다.</h3>
                    <p className='text-gray-500'>새로운 게시글을 작성해 보세요.</p>
                </div>
            ) : (
                /* Post List UI (Screenshot 1) */
                <div className='flex flex-col gap-6'>
                    {posts.map((post) => (
                        <div key={post.id} className='relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group'>
                            <Link to={`/detail/${post.id}`} className='block pr-20'>
                                <div className='flex justify-between items-start mb-2'>
                                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-[#6366F1] transition-colors'>
                                        {post.title}
                                    </h3>
                                    <span className='text-sm text-gray-400 font-medium whitespace-nowrap ml-4'>
                                        {post.date}
                                    </span>
                                </div>
                                <p className='text-gray-600 line-clamp-2 leading-relaxed'>
                                    {post.contents}
                                </p>
                            </Link>
                            
                            {/* Delete Button */}
                            <button 
                                onClick={(e) => handleDelete(e, post.id)}
                                className='absolute bottom-6 right-6 bg-[#ED1C24] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-sm'
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
