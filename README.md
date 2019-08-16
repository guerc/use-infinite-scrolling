# use-infinite-scrolling

[![Build Status](https://travis-ci.com/guerc/use-infinite-scrolling.svg?branch=master)](https://travis-ci.com/guerc/use-infinite-scrolling) [![codecov](https://codecov.io/gh/guerc/use-infinite-scrolling/branch/master/graph/badge.svg)](https://codecov.io/gh/guerc/use-infinite-scrolling) [![Known Vulnerabilities](https://snyk.io//test/github/guerc/use-infinite-scrolling/badge.svg?targetFile=package.json)](https://snyk.io//test/github/guerc/use-infinite-scrolling?targetFile=package.json) [![Dev Dependencies Status](https://david-dm.org/guerc/use-infinite-scrolling/dev-status.svg)](https://david-dm.org/guerc/use-infinite-scrolling?type=dev) [![Minified Bundle Size](https://badgen.net/bundlephobia/min/use-infinite-scrolling)](https://bundlephobia.com/result?p=use-infinite-scrolling)

A React Hook for infinite scrolling on virtually any vertically scrollable element.

## Installation

```
npm install use-infinite-scrolling
```

## Usage

In your component, initialize the Hook using `useInfiniteScrolling` like so:

```js
const MyComponent = () => {
  const onBottomHit = () => {
    console.log('bottom reached');
  };

  const elemRef = useRef(null);
  useInfiniteScrolling(elemRef, onBottomHit, { gap: 0 });

  return <div ref={elemRef} />;
}
```

You _must_ provide at least `ref` (first parameter) and `onBottomHit` (second parameter) to `useInfiniteScrolling`.

Make sure that the element which is targeted via `ref` has the [`overflow-y` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) set to `auto` or `scroll` to enable infinite scrolling.

As a third parameter you may pass a configuration object which currently has one supported property called `gap`. It determines the pixel distance between the bottom of the scroll container and the vertical scroll position at which to call `onBottomHit`. By default, `gap` is zero, or, in other words, `onBottomHit` will only be executed when the bottom of the scroll container has been reached (not before). If `gap` is set to 100, `onBottomHit` will be called as soon as the scroll position is 100 pixels or less before the bottom of the scroll container. If `gap` is set to a negative value, it will be evaluated as zero.

## License

- MIT (see [LICENSE](/LICENSE))
