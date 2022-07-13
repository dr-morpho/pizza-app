import styles from './loading.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        Загрузка...
        <br />
        <span>😎</span>
      </h1>
      <p className={styles.description}>Ща, пять сек</p>
    </div>
  );
};

export default NotFoundBlock;
