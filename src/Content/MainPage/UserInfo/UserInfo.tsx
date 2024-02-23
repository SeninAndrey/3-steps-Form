import React from 'react';
import './userinfo.css';

interface IUserInfoProps {
    username: string,
    avatarSrc?: string
}

export function UserInfo({username, avatarSrc}: IUserInfoProps) {
    const fio:string[] = username.split(' ');
    return (
        <div className='userBlock'>
            {avatarSrc ? 
            <img className='userLogo' src={avatarSrc} alt="user avatar" />
            : <div className='userLogo'>{`${fio[0][0]}${fio[1][0]}`}</div>
            }
            <div className='userName'>{username}</div>
        </div>
    );
}
