import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";
import { signIn } from "next-auth/react";

export default function Login() {

    // Google Handler
    async function handleGoogleSignIn() {
      console.log('inside handleGoogleSignIn method')
        signIn('google', { callbackUrl:'http://localhost:3000/'})
    }
    //Github handler
    async function handleGithubSignIn() {
        signIn('github', { callbackUrl:'http://localhost:3000/'})
    }

  return (
    <Layout>
      <Head>
        <title>Pokédex-Login</title>
      </Head>

      <section className="w-3/4 m-auto flex flex-col gap-10">
        <img
          className="mt-5 z-50 opacity-100"
          src="https://fontmeme.com/permalink/230316/187efe9a23703852ffc83845a6e0fdb1.png"
        />
        <div className="title z-50 opacity-100">
          <h1 className="text-center font-bold text-5xl">Login</h1>
        </div>
        <p className="w-3/4 text-center m-auto text-black font-bold z-20 text-xl">
          Use one of the login methods below to start using the pokedex!
        </p>

        {/* form */}
        <form className="flex flex-col gap-5 z-10">
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
            {/* <span className='icon flex items-center px-4'>
                    <HiAtSymbol size={25}/>
                </span> */}
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
            {/* <span className='icon flex items-center px-4'>
                    <HiFingerPrint size={25}/>
                </span> */}
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button type="button" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button bg-white">
            <button type="button" onClick={handleGoogleSignIn} className={styles.button_custom}>
              Sign In with Google{" "}
              <Image src={"/assets/google.svg"} width={20} height={20}></Image>
            </button>
          </div>
          <div className="input-button bg-white">
            <button type="button" onClick={handleGithubSignIn} className={styles.button_custom}>
              Sign In with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-black font-bold z-10 mb-3">
          Don't have an account yet?{" "}
          <Link href={"/register"}>
            <a className="text-blue-700 mx-1">Sign Up</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
