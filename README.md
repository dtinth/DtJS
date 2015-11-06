# DtJS

I was obsessed with animations for as long as I can remember coding.
This is my own “JavaScript Animation Framework” library I wrote back in 2007~2008, when I was a 10th grader.

At that time, Internet Explorer still dominates the browser market, and CSS transitions/animations did not exist yet.
Existing libraries that I was aware of at that time did not provide enough fine-grained control over how animation behaves
(custom easing, start/stop).

- [Documentation](https://dtinth.github.io/DtJS/)
- [Easing Demo](https://dtinth.github.io/DtJS/easingtest.html)


This library contains:

- Ajax:
    - Cross-browser XMLHttpRequest (fallbacks to ActiveXObject)
    - Ajax helper function
- Visual:
    - Cross-browser `getComputedStyle`
    - Functions to compute the position of an element relative to the document
    - Function to find scroll position (`scrollX` and `scrollY` did not exist back then)
    - Function to find viewport size (`innerWidth` and `innerHeight` did not exist back then)
    - Function to set an opacity of an element (`opacity` did not exist back then)
    - Cross-browser `addEventListener` and `removeEventListener`
- Animation:
    - Animation constructor
    - Easing functions (some from [Robert Penner’s articles](http://www.robertpenner.com/easing/), some I made myself)
- Color manipulation:
    - Functions to convert between color string and 3-tuple
    - Functions to convert between HSV and RGB colorspace
    - Functions to interpolate between two colors (I did not know the word _interpolate_ at that time)

A prior version (before I moved them to Google Code) also contained a rudimentary CSS selector engine that recognizes tag name, class name, and ID,
but it was later removed in favor of [cssQuery](http://dean.edwards.name/my/cssQuery/).
Back at that time, `document.querySelector` did not exist.

I almost forgot that I could write such a thing back then.
I found it in my Google Code archive, so I moved it here for nostalgic purposes.
