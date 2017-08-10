import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import MyComponent from 'src/';

describe('MyComponent', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('should render', () => {
    render(<MyComponent />, node, () => {
      expect(node.innerHTML).toContain('MYCOMPONENT');
    });
  });
});
