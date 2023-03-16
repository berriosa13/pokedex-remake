import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiFingerPrint, HiAtSymbol } from 'react-icons/hi'

export default function Login(){
    return (
        <Layout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className="w-3/4 m-auto flex flex-col gap-10">
            <img className='m-3' src="https://fontmeme.com/permalink/210729/8c92d652b67e3e5fe9ae253bd6e0b24a.png"/>
            <div className="title">
                <p className='w-3/4 m-auto text-black font-bold'>Use one of the login methods below to start using the pokedex!</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5 z-10'>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    />
                <span className='icon flex items-center px-4'>
                    <HiAtSymbol size={25}/>
                </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type="password"
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    />
                <span className='icon flex items-center px-4'>
                    <HiFingerPrint size={25}/>
                </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button bg-white">
                    <button type='submit' className={styles.button_custom}>
                        Sign In with Google <Image src={'/assets/google.svg'} width={20} height={20} ></Image>
                    </button>
                </div>
                <div className="input-button bg-white">
                    <button type='submit' className={styles.button_custom}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-black font-bold z-10'>
                Don't have an account yet? <Link href={'/register'}><a className='text-blue-700'>Sign Up</a></Link>
            </p>
        </section>
        </Layout>
    )
}