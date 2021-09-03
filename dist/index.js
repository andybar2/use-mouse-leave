'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = require('react');
var throttle_debounce_1 = require('throttle-debounce');
function useMouseLeave() {
  var _a = (0, react_1.useState)(true),
    mouseLeft = _a[0],
    setMouseLeft = _a[1];
  var elementRef = (0, react_1.useRef)(null);
  // Check whether the pointer is still within our element, every 50ms
  var handleMouseMove = (0, react_1.useRef)(
    (0, throttle_debounce_1.throttle)(50, function(e) {
      if (!elementRef || !elementRef.current) return;
      var rect = elementRef.current.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        setMouseLeft(true);
      } else {
        setMouseLeft(false);
      }
    }),
  ).current;
  // Start tracking the pointer when it enters our element
  var handleMouseEnter = (0, react_1.useRef)(function() {
    window.addEventListener('mousemove', handleMouseMove);
  }).current;
  // See https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
  // Dynamic ref because the element may be null at times
  var setRef = (0, react_1.useCallback)(function(node) {
    // Make sure to cleanup any events/references added to the last instance
    if (elementRef && elementRef.current) {
      elementRef.current.removeEventListener('mouseenter', handleMouseEnter);
    }
    if (node !== null) {
      node.addEventListener('mouseenter', handleMouseEnter);
      // Save a reference to the node
      elementRef.current = node;
    }
  }, []);
  // Cleanup the pointer tracking when the mouse is not over our element anymore
  // useLayoutEffect(() => {
  (0, react_1.useEffect)(
    function() {
      if (mouseLeft) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    },
    [mouseLeft],
  );
  (0, react_1.useEffect)(function() {
    // Cleanup events on component unmount
    return function() {
      if (elementRef && elementRef.current) {
        elementRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return [mouseLeft, setRef];
}
exports.default = useMouseLeave;
//# sourceMappingURL=index.js.map
