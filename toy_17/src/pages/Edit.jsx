import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
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
                setTitle(data.title)
                setContents(data.contents)
            }
            setLoading(false)
        }
        fetchPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabase
            .from('posts')
            .update({ title, contents })
            .eq('id', id)

        if (error) {
            alert('수정 실패')
        } else {
            alert('수정 완료!')
            navigate(`/detail/${id}`)
        }
    }

    if (loading) return <div className='p-10 text-center'>로딩중...</div>

    return (
        <div className='max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>글 수정</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    className='border p-2 rounded'
                    placeholder='제목을 입력하세요'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className='border p-2 rounded h-40'
                    placeholder='내용을 입력하세요'
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                />
                <button type='submit' className='bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500'>
                    수정하기
                </button>
            </form>
        </div>
    )
}
