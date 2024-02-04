import React, { useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
const Genres = ({ data }) => {
    const { geners } = useSelector((state) => state.home); // Destructured from store directly
    const [view, setView] = useState('mobile', 'pc');
    // let bodyLength = document.body.style.width; // CSS properties cannot written anyting
    return (
        <div className='genres'>
            {data?.map((g) => {
                if (!geners[g]?.name) return; // 
                return (
                    <div key={g} className="genre">
                        {geners[g].name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres