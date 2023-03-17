import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";

export default function Register() {
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 m-auto flex flex-col gap-10">
        <img
          className="mt-5 z-50 opacity-100"
          src="https://fontmeme.com/permalink/230316/187efe9a23703852ffc83845a6e0fdb1.png"
        />
        <div className="title z-50 opacity-100">
          <h1 className="text-center font-bold text-5xl">Register</h1>
        </div>
        <p className="w-3/4 z-50 text-center m-auto text-black font-bold z-20 text-xl">
          Fill out the fields below to sign up.
        </p>

        {/* form */}
        <form className="flex flex-col gap-5 z-10">
          <div className={styles.input_group}>
            <input
              type="username"
              name="username"
              placeholder="Username"
              className={styles.input_text}
            />
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className={styles.input_text}
            />
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-black font-bold z-10 mb-3">
          Already have an account?{" "}
          <Link href={"/login"}>
            <a className="text-blue-700 mx-1">Login</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
