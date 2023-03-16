import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
      <div className={styles.vertical_center}>
        <div className={styles.featured}>
          <video muted autoPlay loop className={styles.myVideo}>
            <source
              className={styles.overlay}
              src="../assets/pexels-mr-borys-8295528.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="m-auto z-100 bg-neutral-300 rounded-lg">{children}</div>
      </div>
  );
}
