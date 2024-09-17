import React from 'react'
import TopHeadbar from '../TopHeadbar/TopHeadbar'
import Profile from '../../Profile/Profile'

const ProfileHr = () => {
  return (
    <div className='px-4 pb-4'>
        <TopHeadbar />
        <Profile pos='hr' />
    </div>
  )
}

export default ProfileHr

// import React from 'react'
// import Profile from '../../Profile/Profile'

// const ProfileManager = () => {
//   return (
//     <Profile pos='manager' />
//   )
// }

// export default ProfileManager