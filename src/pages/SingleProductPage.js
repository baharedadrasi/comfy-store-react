import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const {
    fetchSingleProduct,
    single_product: product,
    single_product_loading: laoding,
    single_product_error: error,
  } = useProductsContext();
  const {
    id: sku,
    price,
    shipping,
    colors,
    category,
    images,
    reviews,
    stars,
    name,
    description,
    company,
    stock,
  } = product;

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [error]);

  if (laoding) {
    return (
      <div className="page-100">
        <Loading />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-100 text-center">
        <Error />
        <Link className="btn " to="/">
          back home
        </Link>
      </div>
    );
  }

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className=" section section-center page">
        <Link className="btn" to="/products">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>available : </span>
              {stock > 0 ? 'in Stock' : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
