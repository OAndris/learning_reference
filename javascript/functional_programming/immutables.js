/*
Immutability is one of the core concepts of functional programming, recommended for ensuring predictability and often required by libraries like Redux.
JavaScript is a multi-paradigm (not strictily functional) programming language and thus allow mutability.
While mutability is allowed by JS, it can nevertheless be avoided, e.g. by using the spread operator.
However, the spread operator creates a shallow copy only. Deep copies (of nested objects) are cumbersome to make, as it involces nesting multiple spread operators, on all affected levels.
Immutability can be enforced by using libraries like Immutable or Immer:
- "Immutable" provides new, immutable data types. This library comes with its own methods, and the code has to be refactored a lot
- "Immer" doesn't provide new data types, but provides functions that can be used for working with the same old familiar JS objects, while ensuring immutability in the background

Therefore, "Immer" may be a better choice than "Immutable".

Source of examples:
[Redux Tutorial - Learn Redux from Scratch](https://www.youtube.com/watch?v=poQXNp9ItL4) by Mosh (Youtube)
*/

// ======================================
// IMMUTABLE:
// ======================================
import { Map } from 'immutable';

let book = Map({ title: 'Harry Potter' });

const publish = (book) => book.set('isPublished', true);

book = publish(book);
console.log(book.toJS());

// ======================================
// IMMER:
// ======================================
import { produce } from 'immer';

let book = { title: 'Harry Potter' };

const publish = (book) => {
    return produce(book, (draftBook) => {
        draftBook.isPublished = true;
    });
};

let updatedBook = publish(book);
console.log(book);
console.log(updatedBook);
