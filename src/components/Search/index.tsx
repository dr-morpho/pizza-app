import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';
import styles from './search.module.scss';
import searchImg from '../../assets/img/search.svg';
import deleteImg from '../../assets/img/delete.svg';

const Search: React.FC = () => {
  const [localValue, setLocalValue] = React.useState('');
  const dispatch = useDispatch();
  // Use Ref:
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const onClickClear = () => {
    setLocalValue('');
    setSearch('');
    inputRef.current.focus();
  };
  // Use Callback:
  const debounceCall = React.useCallback(
    debounce((text) => dispatch(setSearch(text)), 1000),
    [],
  );

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceCall(event.target.value);
    setLocalValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <img className={styles.img} src={searchImg} alt="поиск" />
        <input
          ref={inputRef}
          value={localValue}
          onChange={changeInput}
          className={styles.input}
          placeholder="Поиск пиццы..."
        />
      </div>
      {localValue && (
        <img className={styles.clear} src={deleteImg} onClick={onClickClear} alt="удалить текст" />
      )}
    </div>
  );
};

export default Search;
