import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function PostDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('게시글 가져오기 실패:', error)
            } else {
                setPost(data)
            }
            setLoading(false)
        }
        fetchPost()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if (error) {
            alert('삭제 실패')
        } else {
            alert('삭제 완료')
            navigate('/')
        }
    }

    if (loading) return <div className='p-10 text-center'>로딩중...</div>
    if (!post) return <div className='p-10 text-center'>게시글을 찾을 수 없습니다.</div>

    return (
        <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold mb-2'>{post.title}</h2>
            <span className='text-sm text-gray-400'>{new Date(post.date).toLocaleDateString()}</span>
            <p className='mt-6 text-gray-700 whitespace-pre-wrap'>{post.contents}</p>
            <div className='flex gap-2 mt-8'>
                <Link to={`/edit/${post.id}`} className='bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500'>
                    수정
                </Link>
                <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                    삭제
                </button>
                <Link to='/' className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'>
                    목록
                </Link>
            </div>
        </div>
    )
}
