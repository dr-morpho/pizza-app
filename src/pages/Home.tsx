import React from 'react';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FilterStateType, setFilters, sortSelector } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import { Categories, Sort, Pizza, PizzaSkeleton, Pagination, NotFoundBlock } from '../components';
import { RootState, useAppDispatch } from '../redux/store';

export default function Home() {
  // Redux state:
  const activeSort = useSelector(sortSelector);
  const categoryId = useSelector((state: RootState) => state.filterSlice.category);
  const searchValue = useSelector((state: RootState) => state.filterSlice.search);
  const currentPage = useSelector((state: RootState) => state.filterSlice.page);
  const dataApi = useSelector((state: RootState) => state.pizzaSlice.items);
  const isLoading = useSelector((state: RootState) => state.pizzaSlice.status);
  // Redux setState:
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // use Ref:
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // Вшивание строки в адрес:
  React.useEffect(() => {
    if (isMounted.current) {
      const stringLine = QueryString.stringify({
        page: currentPage,
        category: categoryId,
        sort: activeSort,
      });
      navigate(`?${stringLine}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [currentPage, categoryId, activeSort]);

  // Парсинг строки в redux:
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(
        window.location.search.slice(1),
      ) as unknown as FilterStateType;
      dispatch(setFilters(params));
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Mockapi call:
  const fetchCall = async () => {
    const search = searchValue ? searchValue : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : `${''}`;
    dispatch(
      fetchPizza({
        search: search,
        category: category,
        sort: activeSort,
        page: currentPage,
      }),
    );
  };

  // Запрос пицц, если был первый рендер:
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchCall();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [activeSort, currentPage, searchValue, categoryId]);

  const pizzas = dataApi.map((elem) => <Pizza key={elem.id} {...elem} />);
  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzasAndSkeleton = isLoading === 'loading' ? skeletons : pizzas;

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === 'reject' ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">{pizzasAndSkeleton}</div>
      )}
      <Pagination />
    </div>
  );
}
