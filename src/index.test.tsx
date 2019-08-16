import React, { useRef } from 'react';

import { mount } from 'enzyme';
import useInfiniteScrolling from './';

const simulateScroll = (
  elem: Element,
  to: number,
  height: number,
  contentHeight: number,
): void => {
  Object.defineProperty(elem, 'clientHeight', {
    value: height,
    writable: true,
  });

  Object.defineProperty(elem, 'scrollHeight', {
    value: contentHeight,
    writable: true,
  });

  Object.defineProperty(elem, 'scrollTop', {
    value: to,
    writable: true,
  });

  elem.dispatchEvent(new Event('scroll'));
};

const TestWrapper = ({
  gap = 0,
  onBottomHit,
  renderChild = true,
}: {
  gap?: number;
  onBottomHit: (e: Event) => void;
  renderChild?: boolean;
}): JSX.Element | null => {
  const elemRef = useRef(null);

  useInfiniteScrolling(
    elemRef,
    onBottomHit,
    // if gap is zero, pass no config to test default config
    gap === 0 ? undefined : { gap },
  );

  return renderChild ? <div ref={elemRef} /> : null;
};

describe('useInfiniteScrolling', (): void => {
  it('should execute callback when hitting bottom', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper onBottomHit={mockInfiniteScrollHandler} />
    );

    simulateScroll(wrapper.getDOMNode(), 1000, 1000, 2000);

    expect(mockInfiniteScrollHandler).toHaveBeenCalled();
  });

  it('should execute callback when hitting configured gap before bottom', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper
        onBottomHit={mockInfiniteScrollHandler}
        gap={100}
      />
    );

    simulateScroll(wrapper.getDOMNode(), 900, 1000, 2000);

    expect(mockInfiniteScrollHandler).toHaveBeenCalled();
  });

  it('should not execute callback when bottom not hit yet', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper onBottomHit={mockInfiniteScrollHandler} />
    );

    simulateScroll(wrapper.getDOMNode(), 999, 1000, 2000);

    expect(mockInfiniteScrollHandler).not.toHaveBeenCalled();
  });

  it('should not execute callback when configured gap before bottom not hit yet', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper
        onBottomHit={mockInfiniteScrollHandler}
        gap={100}
      />
    );

    simulateScroll(wrapper.getDOMNode(), 899, 1000, 2000);

    expect(mockInfiniteScrollHandler).not.toHaveBeenCalled();
  });

  it('should ignore negative gap', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper
        onBottomHit={mockInfiniteScrollHandler}
        gap={-100}
      />
    );

    simulateScroll(wrapper.getDOMNode(), 1000, 1000, 2000);

    expect(mockInfiniteScrollHandler).toHaveBeenCalled();
  });

  it('should detach event handler upon unmount', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper onBottomHit={mockInfiniteScrollHandler} />
    );

    const removeEventListenerSpy = jest.spyOn(wrapper.getDOMNode(), 'removeEventListener');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should not attach event handler if ref is null', (): void => {
    const mockInfiniteScrollHandler = jest.fn();

    const wrapper = mount(
      <TestWrapper onBottomHit={mockInfiniteScrollHandler} />
    );

    const addEventListenerSpy = jest.spyOn(wrapper.getDOMNode(), 'addEventListener');

    // simulate unmount while keeping the useInfiniteScrolling hook
    wrapper.setProps({ renderChild: false });

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });
});
