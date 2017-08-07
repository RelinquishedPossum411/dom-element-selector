# A DOM Element Selector
An attempt at something similar to the CSS element selectors or the JavaScript ```window.querySelector()``` method.

## Design
A string fed into the selector is broken down into one or main parts and then parsed into the form of a tree that formally relates each part as a component to search for in the DOM.

## Implementation and Features
* **Two-part Splitting**: The parser first splits a string by the hierarchical relational symbols: ```,```, ```~```, ```~``` and ``` ``` (whitespace). Each part split by these symbols is further broken down into components of a selector like the tag name, ID and classes.
  * Example: to parse the string ```div#wrapper > .text.bold```, the parser first splits it by ```>``` into two separate strings ```div#wrapper``` and ```.text.bold```. Both the strings will then be broken down restructured as a syntax tree.
* **Syntax Tree**: The result of splitting the initial string is a syntax tree. From there, a traverser function will go through the DOM tree in search of elements matching the conditions present in the syntax tree.
