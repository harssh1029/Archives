import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/Product-Page-Component/ProductCard';
import styled from 'styled-components';
import { getProduct } from '../Redux/App/action';

const ProductPage = ({ limit }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const gender = query.get('gender') || '';
  const type = query.get('type') || '';
  const products = useSelector((state) => state.AppReducer.products);
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(type);

  useEffect(() => {
    dispatch(getProduct('products', limit, gender, selectedType));
  }, [dispatch, limit, gender, selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const typeOptions = [
    { label: 'T-Shirts', value: 'tshirt' },
    { label: 'Shirts', value: 'shirt' },
    { label: 'Jeans', value: 'jeans' },
    { label: 'Coat', value: 'coat' },
  ];

  return (
    <ProdContainer>
      {/* Conditionally render type filter dropdown */}
      {(gender === 'men' || gender === 'women') && (
        <div className="filterDropdown">
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">All Types</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="gridlayout">
        {products.map((item) => (
          <ProductCard key={item.id} id={item.id} item={item} />
        ))}
      </div>
    </ProdContainer>
  );
};

export default ProductPage;

const ProdContainer = styled.div`
  width: 90%;
  margin: auto;
  padding-top: 150px;
  margin-bottom: 50px;

  .filterDropdown {
    width: 100%;
    margin-bottom: 15px;
  }

  .filterDropdown select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    outline: none;
  }

  .gridlayout {
    display: grid;
    width: 100%;
    gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  }
`;
