 /**
 * Native JavaScript utilities to replace lodash methods
 * These functions provide equivalent functionality to commonly used lodash methods
 */
 
 window.FlipletListLargeThumbsUtils = {
  /**
   * Safely get a nested property from an object
   * Replacement for _.get()
   * @param {Object} obj - The object to query
   * @param {string|Array} path - The path to the property (dot notation string or array of keys)
   * @param {*} [defaultValue] - The value returned if the path is not found
   * @returns {*} The resolved value or defaultValue
   * @description Safely retrieves a nested property value from an object using dot notation or array path
   * @example
   * FlipletListLargeThumbsUtils.get({a: {b: 2}}, 'a.b'); // 2
   * FlipletListLargeThumbsUtils.get({a: {b: 2}}, ['a', 'b']); // 2
   * FlipletListLargeThumbsUtils.get({a: {b: 2}}, 'a.c', 'default'); // 'default'
   */
  get: function(obj, path, defaultValue) {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
    
    const keys = Array.isArray(path) ? path : path.split('.');
    let result = obj;
    
    for (let i = 0; i < keys.length; i++) {
      if (result == null || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[keys[i]];
    }
    
    return result === undefined ? defaultValue : result;
  },

   /**
    * Iterate over a collection and execute a function for each item
    * @param {Array|Object} collection - The collection to iterate over
    * @param {Function} iteratee - The function to execute for each item
    */
   forEach: function(collection, iteratee) {
     if (!collection) return;
     if (Array.isArray(collection)) {
       for (var i = 0; i < collection.length; i++) {
         iteratee(collection[i], i);
       }
       return;
     }
     if (typeof collection === 'object') {
       var keys = Object.keys(collection);
       for (var k = 0; k < keys.length; k++) {
         var key = keys[k];
         iteratee(collection[key], key);
       }
     }
   },

   /**
    * Find the first element in an array that satisfies a condition
    * @param {Array} array - The array to search
    * @param {Function} predicate - The condition to satisfy
    * @returns {any} The first element that satisfies the condition or undefined
    */ 
   find: function(array, predicate) {
     if (!Array.isArray(array)) return undefined;
     if (typeof predicate === 'function') {
       for (var i = 0; i < array.length; i++) {
         if (predicate(array[i], i)) return array[i];
       }
       return undefined;
     }
     if (predicate && typeof predicate === 'object') {
       return this.find(array, function(item) {
         for (var key in predicate) {
           if (Object.prototype.hasOwnProperty.call(predicate, key)) {
             if (item[key] !== predicate[key]) return false;
           }
         }
         return true;
       });
     }
     for (var j = 0; j < array.length; j++) {
       if (array[j] === predicate) return array[j];
     }
     return undefined;
   },

    /**
   * Check if value is empty
   * Replacement for _.isEmpty()
   * @param {*} value - The value to check
   * @returns {boolean} True if the value is empty, false otherwise
   * @description Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
   * @example
   * NativeUtils.isEmpty(null); // true
   * NativeUtils.isEmpty([]); // true
   * NativeUtils.isEmpty({}); // true
   * NativeUtils.isEmpty(''); // true
   * NativeUtils.isEmpty([1, 2, 3]); // false
   */
  isEmpty: function(value) {
    if (value == null) return true;
    if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  /**
   * Check if value is undefined
   * Replacement for _.isUndefined()
   * @param {*} value - The value to check
   * @returns {boolean} True if the value is undefined, false otherwise
   * @description Checks if a value is undefined
   * @example
   * NativeUtils.isUndefined(undefined); // true
   * NativeUtils.isUndefined(null); // false
   */
  isUndefined: function(value) {
    return value === undefined;
  },

  /**
   * Simple debounce implementation
   * Replacement for _.debounce()
   * @param {Function} func - The function to debounce
   * @param {number} wait - The number of milliseconds to delay
   * @returns {Function} The debounced function
   * @description Creates a debounced function that delays invoking func until after wait milliseconds
   * @example
   * const debouncedFn = NativeUtils.debounce(() => console.log('called'), 100);
   * debouncedFn(); // Will be called after 100ms if not called again
   */
  debounce: function(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },

   /**
    * Remove elements from an array that satisfy a condition
    * @param {Array} array - The array to remove elements from
    * @param {Function|Object} predicate - The condition to satisfy
    * @returns {Array} The array with the removed elements
    */
   remove: function(array, predicate) {
     if (!Array.isArray(array)) return [];
     var removed = [];
     var test;
     if (typeof predicate === 'function') {
       test = predicate;
     } else if (predicate && typeof predicate === 'object') {
       test = function(item) {
         for (var key in predicate) {
           if (Object.prototype.hasOwnProperty.call(predicate, key)) {
             if (item[key] !== predicate[key]) return false;
           }
         }
         return true;
       };
     } else {
       test = function(item) { return item === predicate; };
     }
     for (var i = array.length - 1; i >= 0; i--) {
       if (test(array[i], i)) {
         removed.push(array[i]);
         array.splice(i, 1);
       }
     }
     return removed.reverse();
   },

   /**
   * Sort array by property or function
   * Replacement for _.sortBy()
   * @param {Array} array - The array to sort
   * @param {Function|string} iteratee - The iteratee function or property path
   * @returns {Array} A new sorted array
   * @description Creates a new array sorted by the result of the iteratee
   * @example
   * NativeUtils.sortBy([{a: 3}, {a: 1}, {a: 2}], 'a'); // [{a: 1}, {a: 2}, {a: 3}]
   * NativeUtils.sortBy([3, 1, 2], x => x); // [1, 2, 3]
   */
  sortBy: function(array, iteratee) {
    const getKey = typeof iteratee === 'function' ? iteratee : (item) => this.get(item, iteratee);
    return [...array].sort((a, b) => {
      const valueA = getKey(a);
      const valueB = getKey(b);
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }
 }; 