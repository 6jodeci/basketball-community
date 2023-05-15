import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изорбажение:
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            <div className='flex object-cover py-2'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>

            <label className='text-xs text-white opacity-70'>
                Заголовок публикации:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Заголовок'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-white opacity-70'>
                Текст публикации:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Введите текст публикации..'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700'
                >
                    Добавить публикацию
                </button>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-red-700'
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}

// return <form className='w-1/3 mx-auto py-10'
// onSubmit={e => e.preventDefault}
// >
// <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
//     Прикрепить изображение:
//     <input type='file' className='hidden' onChange={(e) => setImage(e.target.files[0])} />
// </label>
// <div className='flex object-cover py-2'>IMAGE</div>
// <label className='text-xs text-white opacity-70'>
//     Заголовок публикации:
//     <input type='text'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder='Заголовок'
//         className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'></input>
// </label>
// <label className='text-xs text-white opacity-70'>
//     Тест публикации:
//     <textarea type='text'
//         onChange={(e) => setText(e.target.value)}
//         placeholder='Введите текст публикаци..'
//         className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'></textarea>
// </label>
// <div className='flex gap-8 items-center justify-center mt-4'>
//     <button
//         onClick={submitHandler}
//         className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700'>
//         Добавить публикацию
//     </button>
//     <button className='flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-red-700'>
//         Отменить
//     </button>
// </div>
// </form >
// }