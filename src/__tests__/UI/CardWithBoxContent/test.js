import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Card from '../../../components/common/Cards/CardWithBoxContent';

afterEach(cleanup);

it('render correct value in card component', () => {
  const {getByText,getByAltText} = render(
    <Card
      item={{
        image: 'assets/images/glsGirl.png',
        title: 'EID GLAM',
        description:
          'Indulge in accessories from Gucci and beyond for a look finished to perfection',
      }}
    />
  );
  expect(getByText(/EID GLAM/i)).toBeTruthy();
  expect(getByText(/Indulge in accessories from Gucci and beyond for a look finished to perfection/i)).toBeTruthy();
  expect(getByAltText("EID GLAM").src).toContain("assets/images/glsGirl.png")
});


test('Card With img, title and description | UI', () => {
  const component = renderer.create(
    <Card
      item={{
        image: 'assets/images/glsGirl.png',
        title: 'EID GLAM',
        description:
          'Indulge in accessories from Gucci and beyond for a look finished to perfection',
      }}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



