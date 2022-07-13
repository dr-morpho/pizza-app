import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not Found...
      </h1>
      <p className={styles.description}>Что-то пошло не так, пардон</p>
    </div>
  );
};

export default NotFoundBlock;
