# Questions

## 1

Difference is that *ShouldComponentUpdate* lifecycle is implemented better in *PureComponent*, with more careful re-rendering props from state. In *PureComponent* case component might not break, but miss re-render. With just Component can break, in case if prop coming with error. 


## 2

Because, as I wrote in a previous question, *ShouldComponentUpdate* handles updates of props and states, but don't have much control over props in context. Could be resulted in conflict. Should not be issue now, with function components, but context still should be used carefully and not contain security information.


## 3

1) Declare in state of parent, pass to child function for change;
2) Use Redux or similar;
3) Attach HOC for both;
   

## 4

1) Check dependencies in useEffect, useCallback, useMemo, unsubscribe from ongoing events in useEffect when component finished working;
2) Use memo wrapped for whole component;
   

## 5

React component should be wrapped in one HTML tag div, structure like div1,div2..., without wrapper, from component output will break page. In older versions it was required to add div wrapper around HTML, then Fragment was invented, to make structure HTML simpler, nowadays, it is just <></>.


## 6

I personally used HOC only once, to pass props on between component on initial rendering with async data, so I can do just this one example.


## 7

Promise will return either resolve or reject, and it is possible to call action right after async function with .then or .all. Callback needs to be nested carefully and could create complicated nested system, which hard to maintain in order to provide controlled async response and action. Async await create more simple line by line async action handling. It is also promises, but looks cleaner.


## 8

setState take object with scope of properties, which  needed to be changed and callback function, because it async. It async, because some properties could be big and complicated and can slow page loading, while updating.


## 9

1) rewrite declaration from class to const function;
2) remove constructor;
3) rewrite state, setstate on useState;
4) rewrite lifecycles to useEffects;
5) remove render();
6) remove this everywhere;
7) rewrite function declaration from name() to const name = () => ();
   

## 10

1) as in <style> </style> tag;
2) imported with separate scss/css file;
3) inline styles in specific tag;
   

## 11

1) dangerouslySetInnerHTML; 2) express.js solution such as express.static;
