import React from 'react';

const Archive = () => {
    return (
        <div className='archive'>
            <div className='archive__inner'>
                <ul className='archive__list'>
                    <li className='archive__item'>
                        <p className='archive__itemImg'>
                            <img src='' alt='' />
                        </p>
                        <div className='archive__itemBody'>
                            <h3 className='archive__itemTilte'>最新の投稿になります。</h3>
                            <p className='archive__itemMeta'>
                                <span className='date'>2023.12.12</span>
                                <span className='category'>news</span>
                            </p>
                            <p className='archive__itemText'>本文内容が入ります。本文内容が入ります。本文内容が入ります。本文内容が入ります。本文内容が入ります。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Archive;