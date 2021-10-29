import styles from '../styles/Layout.module.css';

type Props = {
  title: string;
  children: any;
};

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{props.title}</h1>
        {props.children}
      </main>
    </div>
  );
}
