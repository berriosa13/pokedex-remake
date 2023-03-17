import { useSession, getSession, signOut } from "next-auth/react";
import Login from "./login.js";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


function HomePage() {
  const { data: session } = useSession();
  
  function handleSignOut(){
    signOut();
  }
  
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? AuthorizedUser({ session, handleSignOut }) : UnauthorizedUser()}
    </div>
  )
}
export default HomePage;

function UnauthorizedUser(){
  const router = useRouter()
  useEffect(() => {
    router.replace('/login')
  },[router])

  return null;
}

function AuthorizedUser({ session, handleSignOut }) {
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/pokedex'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Pokedex</a></Link>
          </div>
      </main>
  )
}

export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

