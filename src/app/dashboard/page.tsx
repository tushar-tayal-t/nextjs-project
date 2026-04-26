import React, {Suspense} from 'react'
import { UserList } from './UserList'
import { PostList } from './PostsList'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>this is userList loading...</p>}>
        <UserList/>
      </Suspense>
      <Suspense fallback={<p>this is posts loading...</p>}>
        <PostList/>
      </Suspense>
    </div>
  )
}

export default Dashboard
