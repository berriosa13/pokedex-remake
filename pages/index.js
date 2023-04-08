import { useSession, getSession, signOut } from "next-auth/react";
import Login from "./login.js";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


function HomePage() {
  const { data: session } = useSession();
  
  
  return (
    <div>
      <Head>
        <title>Pokédex-HomePage</title>
      </Head>

      {session ? AuthorizedUser() : UnauthorizedUser()}
    </div>
  )
}
export default HomePage
function UnauthorizedUser() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/login')
  },[router])
  
  return null;
}

function AuthorizedUser() {
  
  const router = useRouter()
  useEffect(() => {
    router.replace('/pokedex')
  },[router])
  
  return null;
}

function handleSignOut(){
  signOut();
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

