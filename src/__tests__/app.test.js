import React from 'react';
// import renderer from 'react-test-renderer';
import App from '../app';

describe('<App />', () => {
  it('is rendered at application start', () => {
    const app = shallow(<App />);
    expect(app.find('h1').exists()).toBe(true);
  });
});
