import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { changePage } from '../actions/packetActions';

const Paginate = ({
  pages,
  page,
  keyword = '',
  sorting,
  filters,
  userId = null
}) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              userId === null
                ? keyword
                  ? `/search/${keyword}/sorting/${sorting}/rating1/${
                      filters.rating1
                    }/rating2/${filters.rating2}/rating3/
                  ${filters.rating3}/rating4/${filters.rating4}/rating5/${
                      filters.rating5
                    }/
                  priceFrom/${filters.priceFrom}/priceTo/${
                      filters.priceTo
                    }/page/${x + 1}`
                  : `/sorting/${sorting}/rating1/${filters.rating1}/rating2/${
                      filters.rating2
                    }/rating3/
                  ${filters.rating3}/rating4/${filters.rating4}/rating5/${
                      filters.rating5
                    }/
                  priceFrom/${filters.priceFrom}/priceTo/${
                      filters.priceTo
                    }/page/${x + 1}`
                : `/packets/user/${userId}/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
