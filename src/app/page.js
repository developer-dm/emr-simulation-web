import Link from "next/link";
import styles from "./page.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.title}>EHR Research Project</h1>
        <h2 className={styles.subtitle}>
          How can existing Electronic Health Record Design be simplified to reduce cognitive overload?
        </h2>
        <hr className={styles.divider} />
        <div className={styles.buttonList}>
          <Link href="/paper">
            <button type="button" className={styles.buttonSide}>Research Paper</button>
          </Link>
          <Link href="/login">
            <button type="button" className={styles.buttonMain}>Go to Demo Login</button>
          </Link>
          <Link href="/credits">
            <button type="button" className={styles.buttonSide}>Credits</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
