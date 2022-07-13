import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Categories: React.FC = React.memo(() => {
  const arr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Микс'];
  const categoryId = useSelector((state: RootState) => state.filterSlice.category);
  const dispatch = useDispatch();

  const changeCategory = React.useCallback((index: number) => dispatch(setCategoryId(index)), []);

  const pizzaElems = arr.map((elem, index) => (
    <li
      key={index}
      onClick={() => changeCategory(index)}
      className={categoryId === index ? 'active' : ''}>
      {elem}
    </li>
  ));

  return (
    <div className="categories">
      <ul>{pizzaElems}</ul>
    </div>
  );
});

export default Categories;
