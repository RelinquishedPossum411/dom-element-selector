# A DOM Element Selector

An attempt at something similar to the CSS element selectors and the JavaScript ```window.querySelector()``` method.

## Design

A string fed into the selector is broken down into one or main parts and then parsed into the form of a tree that formally relates each part as a component to search for in the DOM.


## Usage

Be sure to import the ```Selector``` namespace:
```javascript
import Selector from "dom-element-selector";
```

All relevant functions are packaged in the exported ```Selector``` class.
* ```Selector.match()``` returns all matched elements of the specified query/selector conveniently in an array.
* ```Selector.tree()``` returns the search tree of the parsed string as an object literal.

## Examples
A list of examples of the usage of all supported queries and selectors.

### HTML
A sample HTML snippet:
```html
<div class="flex responsive">
</div>
<div id="content">
	<span id="main">Some span <b>text</b>!</span>
	<p>More text.</p>

	<form data="some data!" more-data="" method="post"></form>
</div>
```

### JavaScript
Using ```Selector``` to match elements in the snippet:

#### Tags
```javascript
// Returns an array of elements: [div.flex, div#content]
Selector.match("div");
```

#### Classes and IDs
```javascript
// Only one element is matched:
// [div.flex]
Selector.match("div.flex");

// Both of these will match the same result, for IDs are unique.
// [div#content]
Selector.match("div#content");
Selector.match("#content");
```

#### Ancestor and Descendant Relationships
```javascript
// Matches a bold element that is a descendant of a div element.
// [b] (<b>text</b>)
Selector.match("div b");
```

#### Parent and Child Relationships
```javascript
// Matches nothing since we seek an immediate bold element as a child of a div element.
// []
Selector.match("div > b");

// Matches the span element with id "main" because it is a direct descendant of a div element.
Selector.match("div > span");
```

#### Attributes
```javascript
// Matches all elements with an "id" attribute.
// [div#content, span#main]
Selector.match("[id]");

// Matches a form element with method POST.
Selector.match("form[method=post]");

// Matches a form element with an attribute "data" that has a substring "some data" in its value.
// NOTE: characters like spaces must be escaped with double backslashes "\\"
// SEE: Notable Issues section for more information.
Selector.match("form[data*=some\\ data]");

// More attribute selectors:
Selector.match("[attribute|=value]");
Selector.match("[attribute^=value]");
Selector.match("[attribute$=value]");
Selector.match("[attribute~=value]");
```


## Implementation and Features

* **Two-part Splitting**: The parser first splits a string by the hierarchical relational symbols: ```,```, ```~```, ```~```, ```+``` and ``` ``` (whitespace). Each part split by these symbols is further broken down into components of a selector like the tag name, ID and classes.
  * Example: to parse the string ```div#wrapper > .text.bold```, the parser first splits it by ```>``` into two separate strings ```div#wrapper``` and ```.text.bold```. Both the strings will then be broken down and restructured as a syntax tree.
* **Syntax Tree**: The result of splitting the initial string is a syntax tree. From there, a traverser function will go through the DOM tree in search of elements matching the conditions present in the syntax tree.


## Features to be Implemented

* **All Elements Selector**: Select all elements using the ```*``` selector.
* **Traverser Function**: A traverser function will be implemented that goes through the DOM tree to match all DOM elements that fulfill the conditions in the syntax tree.
* **Result**: A function that will return all the matched elements in the DOM.


## Notable Issues

* When using an attribute selector like ```[attribute=content]```, the following characters must be escaped with an escaped backslash, ```\\```:
  * ```,```, ```~```, ```~```, ```+``` and ``` ``` (whitespace).
```javascript
// Correct usage:
Selector.select("input[value=Some\\ Value]");

// The following will throw an error:
Selector.select("input[value=Wrong Value]");
```
