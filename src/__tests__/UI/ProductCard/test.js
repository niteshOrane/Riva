import React from 'react';
import renderer from 'react-test-renderer';
import ProductCard from '../../../components/common/Cards/ProductCard';

test('Product card with color functionality', () => {
  const component = renderer.create(
    <ProductCard
      product={{
        id: 1,
        src: 'assets/images/recentGirl.png',
        title: 'Contrast Paisley Printed Pleated Skirt',
        price: '75.90',
      }}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
