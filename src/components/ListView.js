import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
const ListView = ({ products }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <Wrapper>
      {products.map(({ id, image, name, price, description }) => {
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h5>{name}</h5>
              <span className="price">{formatPrice(price)}</span>
              <p>
                {showMore ? description : description.substring(0, 150)}...
                <button
                  className="show-more"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'show less' : 'read more'}
                </button>
              </p>

              <Link className="btn" to={`products/${id}`}>
                details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  .show-more {
    border: transparent;
    background: transparent;
    cursor: pointer;
    color: var(--clr-primary-6);
    transition: var(--transition);
  }
  .show-more:hover {
    color: var(--clr-primary-3);
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
