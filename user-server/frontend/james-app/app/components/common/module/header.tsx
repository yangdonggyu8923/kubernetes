'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@mui/material';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import { useEffect, useState } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, logoutUser } from '../../user/service/user-service';
import { IUsers } from '../../user/model/users-model';
import { getOneUser } from '../../user/service/user-slice';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const oneUser:IUsers = useSelector(getOneUser)
  const [showProfile, setShowProfile] = useState(false)
  let token:string = "";

  useEffect(() => {
    if (parseCookies().accessToken) {
      setShowProfile(true)
      token = parseCookies().accessToken;
      dispatch(findUserById(jwtDecode<any>(token).userId))
    } else {
      setShowProfile(false)
    }
  }, [parseCookies().accessToken])

  const logoutHandler = () => {
    console.log('로그아웃 적용 전 : ' + parseCookies().accessToken)
    dispatch(logoutUser())
      .then((res: any) => {
        destroyCookie(null, 'accessToken')
        console.log('로그아웃 적용 후 : ' + parseCookies().accessToken)
        setShowProfile(false)
        token="";
        router.push('/')
      })
      .catch((err: any) => {
        console.log('로그아웃 실행에서 에러가 발생함 : ' + err)
      })
  }

  return <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
      </Link>
      {!showProfile && <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="public/img/user/profile.jpg" alt="user photo" />
      </button>}
      {showProfile &&
        <div className="flex px-4 py-3 float-end">
          <span className="block text-sm text-gray-900 dark:text-white">{oneUser.username}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">{oneUser.username}@gmail.com</span>
          <span 
          onClick={logoutHandler} 
          className="block text-sm  text-gray-500 truncate dark:text-gray-400"><a href='#'>Logout</a></span>
        </div>
      }
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

          {linkButtonTitles.map((elem) => (
            <li key={elem.id}>
              <LinkButton title={elem.title} path={elem.path} id={elem.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
}
export default Header;