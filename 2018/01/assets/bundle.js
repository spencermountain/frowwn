(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/* somehow v0.0.2
   github.com/spencermountain/somehow
   MIT
*/
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.somehow = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof _dereq_ && _dereq_;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof _dereq_ && _dereq_, i = 0; i < t.length; i++) {
        o(t[i]);
      }

      return o;
    }

    return r;
  }()({
    1: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-array/ v1.2.4 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict';

        function ascending(a, b) {
          return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        }

        function bisector(compare) {
          if (compare.length === 1) compare = ascendingComparator(compare);
          return {
            left: function left(a, x, lo, hi) {
              if (lo == null) lo = 0;
              if (hi == null) hi = a.length;

              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
              }

              return lo;
            },
            right: function right(a, x, lo, hi) {
              if (lo == null) lo = 0;
              if (hi == null) hi = a.length;

              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
              }

              return lo;
            }
          };
        }

        function ascendingComparator(f) {
          return function (d, x) {
            return ascending(f(d), x);
          };
        }

        var ascendingBisect = bisector(ascending);
        var bisectRight = ascendingBisect.right;
        var bisectLeft = ascendingBisect.left;

        function pairs(array, f) {
          if (f == null) f = pair;
          var i = 0,
              n = array.length - 1,
              p = array[0],
              pairs = new Array(n < 0 ? 0 : n);

          while (i < n) {
            pairs[i] = f(p, p = array[++i]);
          }

          return pairs;
        }

        function pair(a, b) {
          return [a, b];
        }

        function cross(values0, values1, reduce) {
          var n0 = values0.length,
              n1 = values1.length,
              values = new Array(n0 * n1),
              i0,
              i1,
              i,
              value0;
          if (reduce == null) reduce = pair;

          for (i0 = i = 0; i0 < n0; ++i0) {
            for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
              values[i] = reduce(value0, values1[i1]);
            }
          }

          return values;
        }

        function descending(a, b) {
          return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
        }

        function number(x) {
          return x === null ? NaN : +x;
        }

        function variance(values, valueof) {
          var n = values.length,
              m = 0,
              i = -1,
              mean = 0,
              value,
              delta,
              sum = 0;

          if (valueof == null) {
            while (++i < n) {
              if (!isNaN(value = number(values[i]))) {
                delta = value - mean;
                mean += delta / ++m;
                sum += delta * (value - mean);
              }
            }
          } else {
            while (++i < n) {
              if (!isNaN(value = number(valueof(values[i], i, values)))) {
                delta = value - mean;
                mean += delta / ++m;
                sum += delta * (value - mean);
              }
            }
          }

          if (m > 1) return sum / (m - 1);
        }

        function deviation(array, f) {
          var v = variance(array, f);
          return v ? Math.sqrt(v) : v;
        }

        function extent(values, valueof) {
          var n = values.length,
              i = -1,
              value,
              min,
              max;

          if (valueof == null) {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = values[i]) != null && value >= value) {
                min = max = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = values[i]) != null) {
                    if (min > value) min = value;
                    if (max < value) max = value;
                  }
                }
              }
            }
          } else {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = valueof(values[i], i, values)) != null && value >= value) {
                min = max = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = valueof(values[i], i, values)) != null) {
                    if (min > value) min = value;
                    if (max < value) max = value;
                  }
                }
              }
            }
          }

          return [min, max];
        }

        var array = Array.prototype;
        var slice = array.slice;
        var map = array.map;

        function constant(x) {
          return function () {
            return x;
          };
        }

        function identity(x) {
          return x;
        }

        function range(start, stop, step) {
          start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
          var i = -1,
              n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
              range = new Array(n);

          while (++i < n) {
            range[i] = start + i * step;
          }

          return range;
        }

        var e10 = Math.sqrt(50),
            e5 = Math.sqrt(10),
            e2 = Math.sqrt(2);

        function ticks(start, stop, count) {
          var reverse,
              i = -1,
              n,
              ticks,
              step;
          stop = +stop, start = +start, count = +count;
          if (start === stop && count > 0) return [start];
          if (reverse = stop < start) n = start, start = stop, stop = n;
          if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

          if (step > 0) {
            start = Math.ceil(start / step);
            stop = Math.floor(stop / step);
            ticks = new Array(n = Math.ceil(stop - start + 1));

            while (++i < n) {
              ticks[i] = (start + i) * step;
            }
          } else {
            start = Math.floor(start * step);
            stop = Math.ceil(stop * step);
            ticks = new Array(n = Math.ceil(start - stop + 1));

            while (++i < n) {
              ticks[i] = (start - i) / step;
            }
          }

          if (reverse) ticks.reverse();
          return ticks;
        }

        function tickIncrement(start, stop, count) {
          var step = (stop - start) / Math.max(0, count),
              power = Math.floor(Math.log(step) / Math.LN10),
              error = step / Math.pow(10, power);
          return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
        }

        function tickStep(start, stop, count) {
          var step0 = Math.abs(stop - start) / Math.max(0, count),
              step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
              error = step0 / step1;
          if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
          return stop < start ? -step1 : step1;
        }

        function sturges(values) {
          return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
        }

        function histogram() {
          var value = identity,
              domain = extent,
              threshold = sturges;

          function histogram(data) {
            var i,
                n = data.length,
                x,
                values = new Array(n);

            for (i = 0; i < n; ++i) {
              values[i] = value(data[i], i, data);
            }

            var xz = domain(values),
                x0 = xz[0],
                x1 = xz[1],
                tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

            if (!Array.isArray(tz)) {
              tz = tickStep(x0, x1, tz);
              tz = range(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
            } // Remove any thresholds outside the domain.


            var m = tz.length;

            while (tz[0] <= x0) {
              tz.shift(), --m;
            }

            while (tz[m - 1] > x1) {
              tz.pop(), --m;
            }

            var bins = new Array(m + 1),
                bin; // Initialize bins.

            for (i = 0; i <= m; ++i) {
              bin = bins[i] = [];
              bin.x0 = i > 0 ? tz[i - 1] : x0;
              bin.x1 = i < m ? tz[i] : x1;
            } // Assign data to bins by value, ignoring any outside the domain.


            for (i = 0; i < n; ++i) {
              x = values[i];

              if (x0 <= x && x <= x1) {
                bins[bisectRight(tz, x, 0, m)].push(data[i]);
              }
            }

            return bins;
          }

          histogram.value = function (_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
          };

          histogram.domain = function (_) {
            return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
          };

          histogram.thresholds = function (_) {
            return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
          };

          return histogram;
        }

        function quantile(values, p, valueof) {
          if (valueof == null) valueof = number;
          if (!(n = values.length)) return;
          if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
          if (p >= 1) return +valueof(values[n - 1], n - 1, values);
          var n,
              i = (n - 1) * p,
              i0 = Math.floor(i),
              value0 = +valueof(values[i0], i0, values),
              value1 = +valueof(values[i0 + 1], i0 + 1, values);
          return value0 + (value1 - value0) * (i - i0);
        }

        function freedmanDiaconis(values, min, max) {
          values = map.call(values, number).sort(ascending);
          return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
        }

        function scott(values, min, max) {
          return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
        }

        function max(values, valueof) {
          var n = values.length,
              i = -1,
              value,
              max;

          if (valueof == null) {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = values[i]) != null && value >= value) {
                max = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = values[i]) != null && value > max) {
                    max = value;
                  }
                }
              }
            }
          } else {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = valueof(values[i], i, values)) != null && value >= value) {
                max = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = valueof(values[i], i, values)) != null && value > max) {
                    max = value;
                  }
                }
              }
            }
          }

          return max;
        }

        function mean(values, valueof) {
          var n = values.length,
              m = n,
              i = -1,
              value,
              sum = 0;

          if (valueof == null) {
            while (++i < n) {
              if (!isNaN(value = number(values[i]))) sum += value;else --m;
            }
          } else {
            while (++i < n) {
              if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;else --m;
            }
          }

          if (m) return sum / m;
        }

        function median(values, valueof) {
          var n = values.length,
              i = -1,
              value,
              numbers = [];

          if (valueof == null) {
            while (++i < n) {
              if (!isNaN(value = number(values[i]))) {
                numbers.push(value);
              }
            }
          } else {
            while (++i < n) {
              if (!isNaN(value = number(valueof(values[i], i, values)))) {
                numbers.push(value);
              }
            }
          }

          return quantile(numbers.sort(ascending), 0.5);
        }

        function merge(arrays) {
          var n = arrays.length,
              m,
              i = -1,
              j = 0,
              merged,
              array;

          while (++i < n) {
            j += arrays[i].length;
          }

          merged = new Array(j);

          while (--n >= 0) {
            array = arrays[n];
            m = array.length;

            while (--m >= 0) {
              merged[--j] = array[m];
            }
          }

          return merged;
        }

        function min(values, valueof) {
          var n = values.length,
              i = -1,
              value,
              min;

          if (valueof == null) {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = values[i]) != null && value >= value) {
                min = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = values[i]) != null && min > value) {
                    min = value;
                  }
                }
              }
            }
          } else {
            while (++i < n) {
              // Find the first comparable value.
              if ((value = valueof(values[i], i, values)) != null && value >= value) {
                min = value;

                while (++i < n) {
                  // Compare the remaining values.
                  if ((value = valueof(values[i], i, values)) != null && min > value) {
                    min = value;
                  }
                }
              }
            }
          }

          return min;
        }

        function permute(array, indexes) {
          var i = indexes.length,
              permutes = new Array(i);

          while (i--) {
            permutes[i] = array[indexes[i]];
          }

          return permutes;
        }

        function scan(values, compare) {
          if (!(n = values.length)) return;
          var n,
              i = 0,
              j = 0,
              xi,
              xj = values[j];
          if (compare == null) compare = ascending;

          while (++i < n) {
            if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
              xj = xi, j = i;
            }
          }

          if (compare(xj, xj) === 0) return j;
        }

        function shuffle(array, i0, i1) {
          var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
              t,
              i;

          while (m) {
            i = Math.random() * m-- | 0;
            t = array[m + i0];
            array[m + i0] = array[i + i0];
            array[i + i0] = t;
          }

          return array;
        }

        function sum(values, valueof) {
          var n = values.length,
              i = -1,
              value,
              sum = 0;

          if (valueof == null) {
            while (++i < n) {
              if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
            }
          } else {
            while (++i < n) {
              if (value = +valueof(values[i], i, values)) sum += value;
            }
          }

          return sum;
        }

        function transpose(matrix) {
          if (!(n = matrix.length)) return [];

          for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
            for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
              row[j] = matrix[j][i];
            }
          }

          return transpose;
        }

        function length(d) {
          return d.length;
        }

        function zip() {
          return transpose(arguments);
        }

        exports.bisect = bisectRight;
        exports.bisectRight = bisectRight;
        exports.bisectLeft = bisectLeft;
        exports.ascending = ascending;
        exports.bisector = bisector;
        exports.cross = cross;
        exports.descending = descending;
        exports.deviation = deviation;
        exports.extent = extent;
        exports.histogram = histogram;
        exports.thresholdFreedmanDiaconis = freedmanDiaconis;
        exports.thresholdScott = scott;
        exports.thresholdSturges = sturges;
        exports.max = max;
        exports.mean = mean;
        exports.median = median;
        exports.merge = merge;
        exports.min = min;
        exports.pairs = pairs;
        exports.permute = permute;
        exports.quantile = quantile;
        exports.range = range;
        exports.scan = scan;
        exports.shuffle = shuffle;
        exports.sum = sum;
        exports.ticks = ticks;
        exports.tickIncrement = tickIncrement;
        exports.tickStep = tickStep;
        exports.transpose = transpose;
        exports.variance = variance;
        exports.zip = zip;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    2: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-collection/ v1.0.7 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict';

        var prefix = "$";

        function Map() {}

        Map.prototype = map.prototype = {
          constructor: Map,
          has: function has(key) {
            return prefix + key in this;
          },
          get: function get(key) {
            return this[prefix + key];
          },
          set: function set(key, value) {
            this[prefix + key] = value;
            return this;
          },
          remove: function remove(key) {
            var property = prefix + key;
            return property in this && delete this[property];
          },
          clear: function clear() {
            for (var property in this) {
              if (property[0] === prefix) delete this[property];
            }
          },
          keys: function keys() {
            var keys = [];

            for (var property in this) {
              if (property[0] === prefix) keys.push(property.slice(1));
            }

            return keys;
          },
          values: function values() {
            var values = [];

            for (var property in this) {
              if (property[0] === prefix) values.push(this[property]);
            }

            return values;
          },
          entries: function entries() {
            var entries = [];

            for (var property in this) {
              if (property[0] === prefix) entries.push({
                key: property.slice(1),
                value: this[property]
              });
            }

            return entries;
          },
          size: function size() {
            var size = 0;

            for (var property in this) {
              if (property[0] === prefix) ++size;
            }

            return size;
          },
          empty: function empty() {
            for (var property in this) {
              if (property[0] === prefix) return false;
            }

            return true;
          },
          each: function each(f) {
            for (var property in this) {
              if (property[0] === prefix) f(this[property], property.slice(1), this);
            }
          }
        };

        function map(object, f) {
          var map = new Map(); // Copy constructor.

          if (object instanceof Map) object.each(function (value, key) {
            map.set(key, value);
          }); // Index array by numeric index or specified key function.
          else if (Array.isArray(object)) {
              var i = -1,
                  n = object.length,
                  o;
              if (f == null) while (++i < n) {
                map.set(i, object[i]);
              } else while (++i < n) {
                map.set(f(o = object[i], i, object), o);
              }
            } // Convert object to map.
            else if (object) for (var key in object) {
                map.set(key, object[key]);
              }
          return map;
        }

        function nest() {
          var keys = [],
              _sortKeys = [],
              _sortValues,
              _rollup,
              nest;

          function apply(array, depth, createResult, setResult) {
            if (depth >= keys.length) {
              if (_sortValues != null) array.sort(_sortValues);
              return _rollup != null ? _rollup(array) : array;
            }

            var i = -1,
                n = array.length,
                key = keys[depth++],
                keyValue,
                value,
                valuesByKey = map(),
                values,
                result = createResult();

            while (++i < n) {
              if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
                values.push(value);
              } else {
                valuesByKey.set(keyValue, [value]);
              }
            }

            valuesByKey.each(function (values, key) {
              setResult(result, key, apply(values, depth, createResult, setResult));
            });
            return result;
          }

          function _entries(map$$1, depth) {
            if (++depth > keys.length) return map$$1;
            var array,
                sortKey = _sortKeys[depth - 1];
            if (_rollup != null && depth >= keys.length) array = map$$1.entries();else array = [], map$$1.each(function (v, k) {
              array.push({
                key: k,
                values: _entries(v, depth)
              });
            });
            return sortKey != null ? array.sort(function (a, b) {
              return sortKey(a.key, b.key);
            }) : array;
          }

          return nest = {
            object: function object(array) {
              return apply(array, 0, createObject, setObject);
            },
            map: function map(array) {
              return apply(array, 0, createMap, setMap);
            },
            entries: function entries(array) {
              return _entries(apply(array, 0, createMap, setMap), 0);
            },
            key: function key(d) {
              keys.push(d);
              return nest;
            },
            sortKeys: function sortKeys(order) {
              _sortKeys[keys.length - 1] = order;
              return nest;
            },
            sortValues: function sortValues(order) {
              _sortValues = order;
              return nest;
            },
            rollup: function rollup(f) {
              _rollup = f;
              return nest;
            }
          };
        }

        function createObject() {
          return {};
        }

        function setObject(object, key, value) {
          object[key] = value;
        }

        function createMap() {
          return map();
        }

        function setMap(map$$1, key, value) {
          map$$1.set(key, value);
        }

        function Set() {}

        var proto = map.prototype;
        Set.prototype = set.prototype = {
          constructor: Set,
          has: proto.has,
          add: function add(value) {
            value += "";
            this[prefix + value] = value;
            return this;
          },
          remove: proto.remove,
          clear: proto.clear,
          values: proto.keys,
          size: proto.size,
          empty: proto.empty,
          each: proto.each
        };

        function set(object, f) {
          var set = new Set(); // Copy constructor.

          if (object instanceof Set) object.each(function (value) {
            set.add(value);
          }); // Otherwise, assume it’s an array.
          else if (object) {
              var i = -1,
                  n = object.length;
              if (f == null) while (++i < n) {
                set.add(object[i]);
              } else while (++i < n) {
                set.add(f(object[i], i, object));
              }
            }
          return set;
        }

        function keys(map) {
          var keys = [];

          for (var key in map) {
            keys.push(key);
          }

          return keys;
        }

        function values(map) {
          var values = [];

          for (var key in map) {
            values.push(map[key]);
          }

          return values;
        }

        function entries(map) {
          var entries = [];

          for (var key in map) {
            entries.push({
              key: key,
              value: map[key]
            });
          }

          return entries;
        }

        exports.nest = nest;
        exports.set = set;
        exports.map = map;
        exports.keys = keys;
        exports.values = values;
        exports.entries = entries;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    3: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-color/ v1.2.3 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict';

        function define(constructor, factory, prototype) {
          constructor.prototype = factory.prototype = prototype;
          prototype.constructor = constructor;
        }

        function extend(parent, definition) {
          var prototype = Object.create(parent.prototype);

          for (var key in definition) {
            prototype[key] = definition[key];
          }

          return prototype;
        }

        function Color() {}

        var _darker = 0.7;

        var _brighter = 1 / _darker;

        var reI = "\\s*([+-]?\\d+)\\s*",
            reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
            reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
            reHex3 = /^#([0-9a-f]{3})$/,
            reHex6 = /^#([0-9a-f]{6})$/,
            reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
            reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
            reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
            reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
            reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
            reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
        var named = {
          aliceblue: 0xf0f8ff,
          antiquewhite: 0xfaebd7,
          aqua: 0x00ffff,
          aquamarine: 0x7fffd4,
          azure: 0xf0ffff,
          beige: 0xf5f5dc,
          bisque: 0xffe4c4,
          black: 0x000000,
          blanchedalmond: 0xffebcd,
          blue: 0x0000ff,
          blueviolet: 0x8a2be2,
          brown: 0xa52a2a,
          burlywood: 0xdeb887,
          cadetblue: 0x5f9ea0,
          chartreuse: 0x7fff00,
          chocolate: 0xd2691e,
          coral: 0xff7f50,
          cornflowerblue: 0x6495ed,
          cornsilk: 0xfff8dc,
          crimson: 0xdc143c,
          cyan: 0x00ffff,
          darkblue: 0x00008b,
          darkcyan: 0x008b8b,
          darkgoldenrod: 0xb8860b,
          darkgray: 0xa9a9a9,
          darkgreen: 0x006400,
          darkgrey: 0xa9a9a9,
          darkkhaki: 0xbdb76b,
          darkmagenta: 0x8b008b,
          darkolivegreen: 0x556b2f,
          darkorange: 0xff8c00,
          darkorchid: 0x9932cc,
          darkred: 0x8b0000,
          darksalmon: 0xe9967a,
          darkseagreen: 0x8fbc8f,
          darkslateblue: 0x483d8b,
          darkslategray: 0x2f4f4f,
          darkslategrey: 0x2f4f4f,
          darkturquoise: 0x00ced1,
          darkviolet: 0x9400d3,
          deeppink: 0xff1493,
          deepskyblue: 0x00bfff,
          dimgray: 0x696969,
          dimgrey: 0x696969,
          dodgerblue: 0x1e90ff,
          firebrick: 0xb22222,
          floralwhite: 0xfffaf0,
          forestgreen: 0x228b22,
          fuchsia: 0xff00ff,
          gainsboro: 0xdcdcdc,
          ghostwhite: 0xf8f8ff,
          gold: 0xffd700,
          goldenrod: 0xdaa520,
          gray: 0x808080,
          green: 0x008000,
          greenyellow: 0xadff2f,
          grey: 0x808080,
          honeydew: 0xf0fff0,
          hotpink: 0xff69b4,
          indianred: 0xcd5c5c,
          indigo: 0x4b0082,
          ivory: 0xfffff0,
          khaki: 0xf0e68c,
          lavender: 0xe6e6fa,
          lavenderblush: 0xfff0f5,
          lawngreen: 0x7cfc00,
          lemonchiffon: 0xfffacd,
          lightblue: 0xadd8e6,
          lightcoral: 0xf08080,
          lightcyan: 0xe0ffff,
          lightgoldenrodyellow: 0xfafad2,
          lightgray: 0xd3d3d3,
          lightgreen: 0x90ee90,
          lightgrey: 0xd3d3d3,
          lightpink: 0xffb6c1,
          lightsalmon: 0xffa07a,
          lightseagreen: 0x20b2aa,
          lightskyblue: 0x87cefa,
          lightslategray: 0x778899,
          lightslategrey: 0x778899,
          lightsteelblue: 0xb0c4de,
          lightyellow: 0xffffe0,
          lime: 0x00ff00,
          limegreen: 0x32cd32,
          linen: 0xfaf0e6,
          magenta: 0xff00ff,
          maroon: 0x800000,
          mediumaquamarine: 0x66cdaa,
          mediumblue: 0x0000cd,
          mediumorchid: 0xba55d3,
          mediumpurple: 0x9370db,
          mediumseagreen: 0x3cb371,
          mediumslateblue: 0x7b68ee,
          mediumspringgreen: 0x00fa9a,
          mediumturquoise: 0x48d1cc,
          mediumvioletred: 0xc71585,
          midnightblue: 0x191970,
          mintcream: 0xf5fffa,
          mistyrose: 0xffe4e1,
          moccasin: 0xffe4b5,
          navajowhite: 0xffdead,
          navy: 0x000080,
          oldlace: 0xfdf5e6,
          olive: 0x808000,
          olivedrab: 0x6b8e23,
          orange: 0xffa500,
          orangered: 0xff4500,
          orchid: 0xda70d6,
          palegoldenrod: 0xeee8aa,
          palegreen: 0x98fb98,
          paleturquoise: 0xafeeee,
          palevioletred: 0xdb7093,
          papayawhip: 0xffefd5,
          peachpuff: 0xffdab9,
          peru: 0xcd853f,
          pink: 0xffc0cb,
          plum: 0xdda0dd,
          powderblue: 0xb0e0e6,
          purple: 0x800080,
          rebeccapurple: 0x663399,
          red: 0xff0000,
          rosybrown: 0xbc8f8f,
          royalblue: 0x4169e1,
          saddlebrown: 0x8b4513,
          salmon: 0xfa8072,
          sandybrown: 0xf4a460,
          seagreen: 0x2e8b57,
          seashell: 0xfff5ee,
          sienna: 0xa0522d,
          silver: 0xc0c0c0,
          skyblue: 0x87ceeb,
          slateblue: 0x6a5acd,
          slategray: 0x708090,
          slategrey: 0x708090,
          snow: 0xfffafa,
          springgreen: 0x00ff7f,
          steelblue: 0x4682b4,
          tan: 0xd2b48c,
          teal: 0x008080,
          thistle: 0xd8bfd8,
          tomato: 0xff6347,
          turquoise: 0x40e0d0,
          violet: 0xee82ee,
          wheat: 0xf5deb3,
          white: 0xffffff,
          whitesmoke: 0xf5f5f5,
          yellow: 0xffff00,
          yellowgreen: 0x9acd32
        };
        define(Color, color, {
          displayable: function displayable() {
            return this.rgb().displayable();
          },
          hex: function hex() {
            return this.rgb().hex();
          },
          toString: function toString() {
            return this.rgb() + "";
          }
        });

        function color(format) {
          var m;
          format = (format + "").trim().toLowerCase();
          return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
          ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
        }

        function rgbn(n) {
          return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
        }

        function rgba(r, g, b, a) {
          if (a <= 0) r = g = b = NaN;
          return new Rgb(r, g, b, a);
        }

        function rgbConvert(o) {
          if (!(o instanceof Color)) o = color(o);
          if (!o) return new Rgb();
          o = o.rgb();
          return new Rgb(o.r, o.g, o.b, o.opacity);
        }

        function rgb(r, g, b, opacity) {
          return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
        }

        function Rgb(r, g, b, opacity) {
          this.r = +r;
          this.g = +g;
          this.b = +b;
          this.opacity = +opacity;
        }

        define(Rgb, rgb, extend(Color, {
          brighter: function brighter(k) {
            k = k == null ? _brighter : Math.pow(_brighter, k);
            return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
          },
          darker: function darker(k) {
            k = k == null ? _darker : Math.pow(_darker, k);
            return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
          },
          rgb: function rgb() {
            return this;
          },
          displayable: function displayable() {
            return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
          },
          hex: function hex() {
            return "#" + _hex(this.r) + _hex(this.g) + _hex(this.b);
          },
          toString: function toString() {
            var a = this.opacity;
            a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
            return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
          }
        }));

        function _hex(value) {
          value = Math.max(0, Math.min(255, Math.round(value) || 0));
          return (value < 16 ? "0" : "") + value.toString(16);
        }

        function hsla(h, s, l, a) {
          if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
          return new Hsl(h, s, l, a);
        }

        function hslConvert(o) {
          if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
          if (!(o instanceof Color)) o = color(o);
          if (!o) return new Hsl();
          if (o instanceof Hsl) return o;
          o = o.rgb();
          var r = o.r / 255,
              g = o.g / 255,
              b = o.b / 255,
              min = Math.min(r, g, b),
              max = Math.max(r, g, b),
              h = NaN,
              s = max - min,
              l = (max + min) / 2;

          if (s) {
            if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
            s /= l < 0.5 ? max + min : 2 - max - min;
            h *= 60;
          } else {
            s = l > 0 && l < 1 ? 0 : h;
          }

          return new Hsl(h, s, l, o.opacity);
        }

        function hsl(h, s, l, opacity) {
          return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
        }

        function Hsl(h, s, l, opacity) {
          this.h = +h;
          this.s = +s;
          this.l = +l;
          this.opacity = +opacity;
        }

        define(Hsl, hsl, extend(Color, {
          brighter: function brighter(k) {
            k = k == null ? _brighter : Math.pow(_brighter, k);
            return new Hsl(this.h, this.s, this.l * k, this.opacity);
          },
          darker: function darker(k) {
            k = k == null ? _darker : Math.pow(_darker, k);
            return new Hsl(this.h, this.s, this.l * k, this.opacity);
          },
          rgb: function rgb() {
            var h = this.h % 360 + (this.h < 0) * 360,
                s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
                l = this.l,
                m2 = l + (l < 0.5 ? l : 1 - l) * s,
                m1 = 2 * l - m2;
            return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
          },
          displayable: function displayable() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
          }
        }));
        /* From FvD 13.37, CSS Color Module Level 3 */

        function hsl2rgb(h, m1, m2) {
          return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
        }

        var deg2rad = Math.PI / 180;
        var rad2deg = 180 / Math.PI; // https://beta.observablehq.com/@mbostock/lab-and-rgb

        var K = 18,
            Xn = 0.96422,
            Yn = 1,
            Zn = 0.82521,
            t0 = 4 / 29,
            t1 = 6 / 29,
            t2 = 3 * t1 * t1,
            t3 = t1 * t1 * t1;

        function labConvert(o) {
          if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);

          if (o instanceof Hcl) {
            if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
            var h = o.h * deg2rad;
            return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
          }

          if (!(o instanceof Rgb)) o = rgbConvert(o);
          var r = rgb2lrgb(o.r),
              g = rgb2lrgb(o.g),
              b = rgb2lrgb(o.b),
              y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
              x,
              z;
          if (r === g && g === b) x = z = y;else {
            x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
            z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
          }
          return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
        }

        function gray(l, opacity) {
          return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
        }

        function lab(l, a, b, opacity) {
          return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
        }

        function Lab(l, a, b, opacity) {
          this.l = +l;
          this.a = +a;
          this.b = +b;
          this.opacity = +opacity;
        }

        define(Lab, lab, extend(Color, {
          brighter: function brighter(k) {
            return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
          },
          darker: function darker(k) {
            return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
          },
          rgb: function rgb() {
            var y = (this.l + 16) / 116,
                x = isNaN(this.a) ? y : y + this.a / 500,
                z = isNaN(this.b) ? y : y - this.b / 200;
            x = Xn * lab2xyz(x);
            y = Yn * lab2xyz(y);
            z = Zn * lab2xyz(z);
            return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
          }
        }));

        function xyz2lab(t) {
          return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
        }

        function lab2xyz(t) {
          return t > t1 ? t * t * t : t2 * (t - t0);
        }

        function lrgb2rgb(x) {
          return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
        }

        function rgb2lrgb(x) {
          return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        }

        function hclConvert(o) {
          if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
          if (!(o instanceof Lab)) o = labConvert(o);
          if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
          var h = Math.atan2(o.b, o.a) * rad2deg;
          return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
        }

        function lch(l, c, h, opacity) {
          return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
        }

        function hcl(h, c, l, opacity) {
          return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
        }

        function Hcl(h, c, l, opacity) {
          this.h = +h;
          this.c = +c;
          this.l = +l;
          this.opacity = +opacity;
        }

        define(Hcl, hcl, extend(Color, {
          brighter: function brighter(k) {
            return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
          },
          darker: function darker(k) {
            return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
          },
          rgb: function rgb() {
            return labConvert(this).rgb();
          }
        }));
        var A = -0.14861,
            B = +1.78277,
            C = -0.29227,
            D = -0.90649,
            E = +1.97294,
            ED = E * D,
            EB = E * B,
            BC_DA = B * C - D * A;

        function cubehelixConvert(o) {
          if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
          if (!(o instanceof Rgb)) o = rgbConvert(o);
          var r = o.r / 255,
              g = o.g / 255,
              b = o.b / 255,
              l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
              bl = b - l,
              k = (E * (g - l) - C * bl) / D,
              s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
              // NaN if l=0 or l=1
          h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
          return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
        }

        function cubehelix(h, s, l, opacity) {
          return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
        }

        function Cubehelix(h, s, l, opacity) {
          this.h = +h;
          this.s = +s;
          this.l = +l;
          this.opacity = +opacity;
        }

        define(Cubehelix, cubehelix, extend(Color, {
          brighter: function brighter(k) {
            k = k == null ? _brighter : Math.pow(_brighter, k);
            return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
          },
          darker: function darker(k) {
            k = k == null ? _darker : Math.pow(_darker, k);
            return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
          },
          rgb: function rgb() {
            var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
                l = +this.l,
                a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
                cosh = Math.cos(h),
                sinh = Math.sin(h);
            return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
          }
        }));
        exports.color = color;
        exports.rgb = rgb;
        exports.hsl = hsl;
        exports.lab = lab;
        exports.hcl = hcl;
        exports.lch = lch;
        exports.gray = gray;
        exports.cubehelix = cubehelix;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    4: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-format/ v1.3.2 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict'; // Computes the decimal coefficient and exponent of the specified number x with
        // significant digits p, where x is positive and p is in [1, 21] or undefined.
        // For example, formatDecimal(1.23) returns ["123", 0].

        function formatDecimal(x, p) {
          if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

          var i,
              coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
          // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

          return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
        }

        function exponent(x) {
          return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
        }

        function formatGroup(grouping, thousands) {
          return function (value, width) {
            var i = value.length,
                t = [],
                j = 0,
                g = grouping[0],
                length = 0;

            while (i > 0 && g > 0) {
              if (length + g + 1 > width) g = Math.max(1, width - length);
              t.push(value.substring(i -= g, i + g));
              if ((length += g + 1) > width) break;
              g = grouping[j = (j + 1) % grouping.length];
            }

            return t.reverse().join(thousands);
          };
        }

        function formatNumerals(numerals) {
          return function (value) {
            return value.replace(/[0-9]/g, function (i) {
              return numerals[+i];
            });
          };
        } // [[fill]align][sign][symbol][0][width][,][.precision][~][type]


        var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

        function formatSpecifier(specifier) {
          return new FormatSpecifier(specifier);
        }

        formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

        function FormatSpecifier(specifier) {
          if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
          var match;
          this.fill = match[1] || " ";
          this.align = match[2] || ">";
          this.sign = match[3] || "-";
          this.symbol = match[4] || "";
          this.zero = !!match[5];
          this.width = match[6] && +match[6];
          this.comma = !!match[7];
          this.precision = match[8] && +match[8].slice(1);
          this.trim = !!match[9];
          this.type = match[10] || "";
        }

        FormatSpecifier.prototype.toString = function () {
          return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width == null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
        }; // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.


        function formatTrim(s) {
          out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
            switch (s[i]) {
              case ".":
                i0 = i1 = i;
                break;

              case "0":
                if (i0 === 0) i0 = i;
                i1 = i;
                break;

              default:
                if (i0 > 0) {
                  if (!+s[i]) break out;
                  i0 = 0;
                }

                break;
            }
          }

          return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
        }

        var prefixExponent;

        function formatPrefixAuto(x, p) {
          var d = formatDecimal(x, p);
          if (!d) return x + "";
          var coefficient = d[0],
              exponent = d[1],
              i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
              n = coefficient.length;
          return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
        }

        function formatRounded(x, p) {
          var d = formatDecimal(x, p);
          if (!d) return x + "";
          var coefficient = d[0],
              exponent = d[1];
          return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
        }

        var formatTypes = {
          "%": function _(x, p) {
            return (x * 100).toFixed(p);
          },
          "b": function b(x) {
            return Math.round(x).toString(2);
          },
          "c": function c(x) {
            return x + "";
          },
          "d": function d(x) {
            return Math.round(x).toString(10);
          },
          "e": function e(x, p) {
            return x.toExponential(p);
          },
          "f": function f(x, p) {
            return x.toFixed(p);
          },
          "g": function g(x, p) {
            return x.toPrecision(p);
          },
          "o": function o(x) {
            return Math.round(x).toString(8);
          },
          "p": function p(x, _p) {
            return formatRounded(x * 100, _p);
          },
          "r": formatRounded,
          "s": formatPrefixAuto,
          "X": function X(x) {
            return Math.round(x).toString(16).toUpperCase();
          },
          "x": function x(_x) {
            return Math.round(_x).toString(16);
          }
        };

        function identity(x) {
          return x;
        }

        var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

        function formatLocale(locale) {
          var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
              currency = locale.currency,
              decimal = locale.decimal,
              numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
              percent = locale.percent || "%";

          function newFormat(specifier) {
            specifier = formatSpecifier(specifier);
            var fill = specifier.fill,
                align = specifier.align,
                sign = specifier.sign,
                symbol = specifier.symbol,
                zero = specifier.zero,
                width = specifier.width,
                comma = specifier.comma,
                precision = specifier.precision,
                trim = specifier.trim,
                type = specifier.type; // The "n" type is an alias for ",g".

            if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
            else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

            if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
            // For SI-prefix, the suffix is lazily computed.

            var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
                suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : ""; // What format function should we use?
            // Is this an integer type?
            // Can this type generate exponential notation?

            var formatType = formatTypes[type],
                maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
            // or clamp the specified precision to the supported range.
            // For significant precision, it must be in [1, 21].
            // For fixed precision, it must be in [0, 20].

            precision = precision == null ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

            function format(value) {
              var valuePrefix = prefix,
                  valueSuffix = suffix,
                  i,
                  n,
                  c;

              if (type === "c") {
                valueSuffix = formatType(value) + valueSuffix;
                value = "";
              } else {
                value = +value; // Perform the initial formatting.

                var valueNegative = value < 0;
                value = formatType(Math.abs(value), precision); // Trim insignificant zeros.

                if (trim) value = formatTrim(value); // If a negative value rounds to zero during formatting, treat as positive.

                if (valueNegative && +value === 0) valueNegative = false; // Compute the prefix and suffix.

                valuePrefix = (valueNegative ? sign === "(" ? sign : "-" : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
                // grouped, and fractional or exponential “suffix” part that is not.

                if (maybeSuffix) {
                  i = -1, n = value.length;

                  while (++i < n) {
                    if (c = value.charCodeAt(i), 48 > c || c > 57) {
                      valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                      value = value.slice(0, i);
                      break;
                    }
                  }
                }
              } // If the fill character is not "0", grouping is applied before padding.


              if (comma && !zero) value = group(value, Infinity); // Compute the padding.

              var length = valuePrefix.length + value.length + valueSuffix.length,
                  padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

              if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

              switch (align) {
                case "<":
                  value = valuePrefix + value + valueSuffix + padding;
                  break;

                case "=":
                  value = valuePrefix + padding + value + valueSuffix;
                  break;

                case "^":
                  value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
                  break;

                default:
                  value = padding + valuePrefix + value + valueSuffix;
                  break;
              }

              return numerals(value);
            }

            format.toString = function () {
              return specifier + "";
            };

            return format;
          }

          function formatPrefix(specifier, value) {
            var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
                e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
                k = Math.pow(10, -e),
                prefix = prefixes[8 + e / 3];
            return function (value) {
              return f(k * value) + prefix;
            };
          }

          return {
            format: newFormat,
            formatPrefix: formatPrefix
          };
        }

        var locale;
        defaultLocale({
          decimal: ".",
          thousands: ",",
          grouping: [3],
          currency: ["$", ""]
        });

        function defaultLocale(definition) {
          locale = formatLocale(definition);
          exports.format = locale.format;
          exports.formatPrefix = locale.formatPrefix;
          return locale;
        }

        function precisionFixed(step) {
          return Math.max(0, -exponent(Math.abs(step)));
        }

        function precisionPrefix(step, value) {
          return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
        }

        function precisionRound(step, max) {
          step = Math.abs(step), max = Math.abs(max) - step;
          return Math.max(0, exponent(max) - exponent(step)) + 1;
        }

        exports.formatDefaultLocale = defaultLocale;
        exports.formatLocale = formatLocale;
        exports.formatSpecifier = formatSpecifier;
        exports.precisionFixed = precisionFixed;
        exports.precisionPrefix = precisionPrefix;
        exports.precisionRound = precisionRound;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    5: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-interpolate/ v1.3.2 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-color')) : typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) : factory(global.d3 = global.d3 || {}, global.d3);
      })(this, function (exports, d3Color) {
        'use strict';

        function basis(t1, v0, v1, v2, v3) {
          var t2 = t1 * t1,
              t3 = t2 * t1;
          return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
        }

        function basis$1(values) {
          var n = values.length - 1;
          return function (t) {
            var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
                v1 = values[i],
                v2 = values[i + 1],
                v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
                v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
            return basis((t - i / n) * n, v0, v1, v2, v3);
          };
        }

        function basisClosed(values) {
          var n = values.length;
          return function (t) {
            var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
                v0 = values[(i + n - 1) % n],
                v1 = values[i % n],
                v2 = values[(i + 1) % n],
                v3 = values[(i + 2) % n];
            return basis((t - i / n) * n, v0, v1, v2, v3);
          };
        }

        function constant(x) {
          return function () {
            return x;
          };
        }

        function linear(a, d) {
          return function (t) {
            return a + t * d;
          };
        }

        function exponential(a, b, y) {
          return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
            return Math.pow(a + t * b, y);
          };
        }

        function hue(a, b) {
          var d = b - a;
          return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
        }

        function gamma(y) {
          return (y = +y) === 1 ? nogamma : function (a, b) {
            return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
          };
        }

        function nogamma(a, b) {
          var d = b - a;
          return d ? linear(a, d) : constant(isNaN(a) ? b : a);
        }

        var rgb = function rgbGamma(y) {
          var color = gamma(y);

          function rgb(start, end) {
            var r = color((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
                g = color(start.g, end.g),
                b = color(start.b, end.b),
                opacity = nogamma(start.opacity, end.opacity);
            return function (t) {
              start.r = r(t);
              start.g = g(t);
              start.b = b(t);
              start.opacity = opacity(t);
              return start + "";
            };
          }

          rgb.gamma = rgbGamma;
          return rgb;
        }(1);

        function rgbSpline(spline) {
          return function (colors) {
            var n = colors.length,
                r = new Array(n),
                g = new Array(n),
                b = new Array(n),
                i,
                color;

            for (i = 0; i < n; ++i) {
              color = d3Color.rgb(colors[i]);
              r[i] = color.r || 0;
              g[i] = color.g || 0;
              b[i] = color.b || 0;
            }

            r = spline(r);
            g = spline(g);
            b = spline(b);
            color.opacity = 1;
            return function (t) {
              color.r = r(t);
              color.g = g(t);
              color.b = b(t);
              return color + "";
            };
          };
        }

        var rgbBasis = rgbSpline(basis$1);
        var rgbBasisClosed = rgbSpline(basisClosed);

        function array(a, b) {
          var nb = b ? b.length : 0,
              na = a ? Math.min(nb, a.length) : 0,
              x = new Array(na),
              c = new Array(nb),
              i;

          for (i = 0; i < na; ++i) {
            x[i] = value(a[i], b[i]);
          }

          for (; i < nb; ++i) {
            c[i] = b[i];
          }

          return function (t) {
            for (i = 0; i < na; ++i) {
              c[i] = x[i](t);
            }

            return c;
          };
        }

        function date(a, b) {
          var d = new Date();
          return a = +a, b -= a, function (t) {
            return d.setTime(a + b * t), d;
          };
        }

        function number(a, b) {
          return a = +a, b -= a, function (t) {
            return a + b * t;
          };
        }

        function object(a, b) {
          var i = {},
              c = {},
              k;
          if (a === null || _typeof2(a) !== "object") a = {};
          if (b === null || _typeof2(b) !== "object") b = {};

          for (k in b) {
            if (k in a) {
              i[k] = value(a[k], b[k]);
            } else {
              c[k] = b[k];
            }
          }

          return function (t) {
            for (k in i) {
              c[k] = i[k](t);
            }

            return c;
          };
        }

        var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
            reB = new RegExp(reA.source, "g");

        function zero(b) {
          return function () {
            return b;
          };
        }

        function one(b) {
          return function (t) {
            return b(t) + "";
          };
        }

        function string(a, b) {
          var bi = reA.lastIndex = reB.lastIndex = 0,
              // scan index for next number in b
          am,
              // current match in a
          bm,
              // current match in b
          bs,
              // string preceding current number in b, if any
          i = -1,
              // index in s
          s = [],
              // string constants and placeholders
          q = []; // number interpolators
          // Coerce inputs to strings.

          a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

          while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
            if ((bs = bm.index) > bi) {
              // a string precedes the next number in b
              bs = b.slice(bi, bs);
              if (s[i]) s[i] += bs; // coalesce with previous string
              else s[++i] = bs;
            }

            if ((am = am[0]) === (bm = bm[0])) {
              // numbers in a & b match
              if (s[i]) s[i] += bm; // coalesce with previous string
              else s[++i] = bm;
            } else {
              // interpolate non-matching numbers
              s[++i] = null;
              q.push({
                i: i,
                x: number(am, bm)
              });
            }

            bi = reB.lastIndex;
          } // Add remains of b.


          if (bi < b.length) {
            bs = b.slice(bi);
            if (s[i]) s[i] += bs; // coalesce with previous string
            else s[++i] = bs;
          } // Special optimization for only a single match.
          // Otherwise, interpolate each of the numbers and rejoin the string.


          return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
            for (var i = 0, o; i < b; ++i) {
              s[(o = q[i]).i] = o.x(t);
            }

            return s.join("");
          });
        }

        function value(a, b) {
          var t = _typeof2(b),
              c;

          return b == null || t === "boolean" ? constant(b) : (t === "number" ? number : t === "string" ? (c = d3Color.color(b)) ? (b = c, rgb) : string : b instanceof d3Color.color ? rgb : b instanceof Date ? date : Array.isArray(b) ? array : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : number)(a, b);
        }

        function discrete(range) {
          var n = range.length;
          return function (t) {
            return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
          };
        }

        function hue$1(a, b) {
          var i = hue(+a, +b);
          return function (t) {
            var x = i(t);
            return x - 360 * Math.floor(x / 360);
          };
        }

        function round(a, b) {
          return a = +a, b -= a, function (t) {
            return Math.round(a + b * t);
          };
        }

        var degrees = 180 / Math.PI;
        var identity = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1
        };

        function decompose(a, b, c, d, e, f) {
          var scaleX, scaleY, skewX;
          if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
          if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
          if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
          if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
          return {
            translateX: e,
            translateY: f,
            rotate: Math.atan2(b, a) * degrees,
            skewX: Math.atan(skewX) * degrees,
            scaleX: scaleX,
            scaleY: scaleY
          };
        }

        var cssNode, cssRoot, cssView, svgNode;

        function parseCss(value) {
          if (value === "none") return identity;
          if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
          cssNode.style.transform = value;
          value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
          cssRoot.removeChild(cssNode);
          value = value.slice(7, -1).split(",");
          return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
        }

        function parseSvg(value) {
          if (value == null) return identity;
          if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
          svgNode.setAttribute("transform", value);
          if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
          value = value.matrix;
          return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
        }

        function interpolateTransform(parse, pxComma, pxParen, degParen) {
          function pop(s) {
            return s.length ? s.pop() + " " : "";
          }

          function translate(xa, ya, xb, yb, s, q) {
            if (xa !== xb || ya !== yb) {
              var i = s.push("translate(", null, pxComma, null, pxParen);
              q.push({
                i: i - 4,
                x: number(xa, xb)
              }, {
                i: i - 2,
                x: number(ya, yb)
              });
            } else if (xb || yb) {
              s.push("translate(" + xb + pxComma + yb + pxParen);
            }
          }

          function rotate(a, b, s, q) {
            if (a !== b) {
              if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path

              q.push({
                i: s.push(pop(s) + "rotate(", null, degParen) - 2,
                x: number(a, b)
              });
            } else if (b) {
              s.push(pop(s) + "rotate(" + b + degParen);
            }
          }

          function skewX(a, b, s, q) {
            if (a !== b) {
              q.push({
                i: s.push(pop(s) + "skewX(", null, degParen) - 2,
                x: number(a, b)
              });
            } else if (b) {
              s.push(pop(s) + "skewX(" + b + degParen);
            }
          }

          function scale(xa, ya, xb, yb, s, q) {
            if (xa !== xb || ya !== yb) {
              var i = s.push(pop(s) + "scale(", null, ",", null, ")");
              q.push({
                i: i - 4,
                x: number(xa, xb)
              }, {
                i: i - 2,
                x: number(ya, yb)
              });
            } else if (xb !== 1 || yb !== 1) {
              s.push(pop(s) + "scale(" + xb + "," + yb + ")");
            }
          }

          return function (a, b) {
            var s = [],
                // string constants and placeholders
            q = []; // number interpolators

            a = parse(a), b = parse(b);
            translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
            rotate(a.rotate, b.rotate, s, q);
            skewX(a.skewX, b.skewX, s, q);
            scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
            a = b = null; // gc

            return function (t) {
              var i = -1,
                  n = q.length,
                  o;

              while (++i < n) {
                s[(o = q[i]).i] = o.x(t);
              }

              return s.join("");
            };
          };
        }

        var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
        var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
        var rho = Math.SQRT2,
            rho2 = 2,
            rho4 = 4,
            epsilon2 = 1e-12;

        function cosh(x) {
          return ((x = Math.exp(x)) + 1 / x) / 2;
        }

        function sinh(x) {
          return ((x = Math.exp(x)) - 1 / x) / 2;
        }

        function tanh(x) {
          return ((x = Math.exp(2 * x)) - 1) / (x + 1);
        } // p0 = [ux0, uy0, w0]
        // p1 = [ux1, uy1, w1]


        function zoom(p0, p1) {
          var ux0 = p0[0],
              uy0 = p0[1],
              w0 = p0[2],
              ux1 = p1[0],
              uy1 = p1[1],
              w1 = p1[2],
              dx = ux1 - ux0,
              dy = uy1 - uy0,
              d2 = dx * dx + dy * dy,
              i,
              S; // Special case for u0 ≅ u1.

          if (d2 < epsilon2) {
            S = Math.log(w1 / w0) / rho;

            i = function i(t) {
              return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
            };
          } // General case.
          else {
              var d1 = Math.sqrt(d2),
                  b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
                  b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
                  r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
                  r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
              S = (r1 - r0) / rho;

              i = function i(t) {
                var s = t * S,
                    coshr0 = cosh(r0),
                    u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
                return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
              };
            }

          i.duration = S * 1000;
          return i;
        }

        function hsl(hue$$1) {
          return function (start, end) {
            var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
                s = nogamma(start.s, end.s),
                l = nogamma(start.l, end.l),
                opacity = nogamma(start.opacity, end.opacity);
            return function (t) {
              start.h = h(t);
              start.s = s(t);
              start.l = l(t);
              start.opacity = opacity(t);
              return start + "";
            };
          };
        }

        var hsl$1 = hsl(hue);
        var hslLong = hsl(nogamma);

        function lab(start, end) {
          var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
              a = nogamma(start.a, end.a),
              b = nogamma(start.b, end.b),
              opacity = nogamma(start.opacity, end.opacity);
          return function (t) {
            start.l = l(t);
            start.a = a(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
          };
        }

        function hcl(hue$$1) {
          return function (start, end) {
            var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
                c = nogamma(start.c, end.c),
                l = nogamma(start.l, end.l),
                opacity = nogamma(start.opacity, end.opacity);
            return function (t) {
              start.h = h(t);
              start.c = c(t);
              start.l = l(t);
              start.opacity = opacity(t);
              return start + "";
            };
          };
        }

        var hcl$1 = hcl(hue);
        var hclLong = hcl(nogamma);

        function cubehelix(hue$$1) {
          return function cubehelixGamma(y) {
            y = +y;

            function cubehelix(start, end) {
              var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
                  s = nogamma(start.s, end.s),
                  l = nogamma(start.l, end.l),
                  opacity = nogamma(start.opacity, end.opacity);
              return function (t) {
                start.h = h(t);
                start.s = s(t);
                start.l = l(Math.pow(t, y));
                start.opacity = opacity(t);
                return start + "";
              };
            }

            cubehelix.gamma = cubehelixGamma;
            return cubehelix;
          }(1);
        }

        var cubehelix$1 = cubehelix(hue);
        var cubehelixLong = cubehelix(nogamma);

        function piecewise(interpolate, values) {
          var i = 0,
              n = values.length - 1,
              v = values[0],
              I = new Array(n < 0 ? 0 : n);

          while (i < n) {
            I[i] = interpolate(v, v = values[++i]);
          }

          return function (t) {
            var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
            return I[i](t - i);
          };
        }

        function quantize(interpolator, n) {
          var samples = new Array(n);

          for (var i = 0; i < n; ++i) {
            samples[i] = interpolator(i / (n - 1));
          }

          return samples;
        }

        exports.interpolate = value;
        exports.interpolateArray = array;
        exports.interpolateBasis = basis$1;
        exports.interpolateBasisClosed = basisClosed;
        exports.interpolateDate = date;
        exports.interpolateDiscrete = discrete;
        exports.interpolateHue = hue$1;
        exports.interpolateNumber = number;
        exports.interpolateObject = object;
        exports.interpolateRound = round;
        exports.interpolateString = string;
        exports.interpolateTransformCss = interpolateTransformCss;
        exports.interpolateTransformSvg = interpolateTransformSvg;
        exports.interpolateZoom = zoom;
        exports.interpolateRgb = rgb;
        exports.interpolateRgbBasis = rgbBasis;
        exports.interpolateRgbBasisClosed = rgbBasisClosed;
        exports.interpolateHsl = hsl$1;
        exports.interpolateHslLong = hslLong;
        exports.interpolateLab = lab;
        exports.interpolateHcl = hcl$1;
        exports.interpolateHclLong = hclLong;
        exports.interpolateCubehelix = cubehelix$1;
        exports.interpolateCubehelixLong = cubehelixLong;
        exports.piecewise = piecewise;
        exports.quantize = quantize;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {
      "d3-color": 3
    }],
    6: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-path/ v1.0.7 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict';

        var pi = Math.PI,
            tau = 2 * pi,
            epsilon = 1e-6,
            tauEpsilon = tau - epsilon;

        function Path() {
          this._x0 = this._y0 = // start of current subpath
          this._x1 = this._y1 = null; // end of current subpath

          this._ = "";
        }

        function path() {
          return new Path();
        }

        Path.prototype = path.prototype = {
          constructor: Path,
          moveTo: function moveTo(x, y) {
            this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
          },
          closePath: function closePath() {
            if (this._x1 !== null) {
              this._x1 = this._x0, this._y1 = this._y0;
              this._ += "Z";
            }
          },
          lineTo: function lineTo(x, y) {
            this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
          },
          quadraticCurveTo: function quadraticCurveTo(x1, y1, x, y) {
            this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
          },
          bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
            this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
          },
          arcTo: function arcTo(x1, y1, x2, y2, r) {
            x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
            var x0 = this._x1,
                y0 = this._y1,
                x21 = x2 - x1,
                y21 = y2 - y1,
                x01 = x0 - x1,
                y01 = y0 - y1,
                l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

            if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

            if (this._x1 === null) {
              this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
            } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
            else if (!(l01_2 > epsilon)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
              // Equivalently, is (x1,y1) coincident with (x2,y2)?
              // Or, is the radius zero? Line to (x1,y1).
              else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
                  this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
                } // Otherwise, draw an arc!
                else {
                    var x20 = x2 - x0,
                        y20 = y2 - y0,
                        l21_2 = x21 * x21 + y21 * y21,
                        l20_2 = x20 * x20 + y20 * y20,
                        l21 = Math.sqrt(l21_2),
                        l01 = Math.sqrt(l01_2),
                        l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                        t01 = l / l01,
                        t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

                    if (Math.abs(t01 - 1) > epsilon) {
                      this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
                    }

                    this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
                  }
          },
          arc: function arc(x, y, r, a0, a1, ccw) {
            x = +x, y = +y, r = +r;
            var dx = r * Math.cos(a0),
                dy = r * Math.sin(a0),
                x0 = x + dx,
                y0 = y + dy,
                cw = 1 ^ ccw,
                da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

            if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

            if (this._x1 === null) {
              this._ += "M" + x0 + "," + y0;
            } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
            else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
                this._ += "L" + x0 + "," + y0;
              } // Is this arc empty? We’re done.


            if (!r) return; // Does the angle go the wrong way? Flip the direction.

            if (da < 0) da = da % tau + tau; // Is this a complete circle? Draw two arcs to complete the circle.

            if (da > tauEpsilon) {
              this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
            } // Is this arc non-empty? Draw an arc!
            else if (da > epsilon) {
                this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
              }
          },
          rect: function rect(x, y, w, h) {
            this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
          },
          toString: function toString() {
            return this._;
          }
        };
        exports.path = path;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    7: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-scale/ v2.1.2 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-collection'), _dereq_('d3-array'), _dereq_('d3-interpolate'), _dereq_('d3-format'), _dereq_('d3-time'), _dereq_('d3-time-format')) : typeof define === 'function' && define.amd ? define(['exports', 'd3-collection', 'd3-array', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format'], factory) : factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3);
      })(this, function (exports, d3Collection, d3Array, d3Interpolate, d3Format, d3Time, d3TimeFormat) {
        'use strict';

        var array = Array.prototype;
        var map = array.map;
        var slice = array.slice;
        var implicit = {
          name: "implicit"
        };

        function ordinal(range) {
          var index = d3Collection.map(),
              domain = [],
              unknown = implicit;
          range = range == null ? [] : slice.call(range);

          function scale(d) {
            var key = d + "",
                i = index.get(key);

            if (!i) {
              if (unknown !== implicit) return unknown;
              index.set(key, i = domain.push(d));
            }

            return range[(i - 1) % range.length];
          }

          scale.domain = function (_) {
            if (!arguments.length) return domain.slice();
            domain = [], index = d3Collection.map();
            var i = -1,
                n = _.length,
                d,
                key;

            while (++i < n) {
              if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
            }

            return scale;
          };

          scale.range = function (_) {
            return arguments.length ? (range = slice.call(_), scale) : range.slice();
          };

          scale.unknown = function (_) {
            return arguments.length ? (unknown = _, scale) : unknown;
          };

          scale.copy = function () {
            return ordinal().domain(domain).range(range).unknown(unknown);
          };

          return scale;
        }

        function band() {
          var scale = ordinal().unknown(undefined),
              domain = scale.domain,
              ordinalRange = scale.range,
              range = [0, 1],
              step,
              bandwidth,
              round = false,
              paddingInner = 0,
              paddingOuter = 0,
              align = 0.5;
          delete scale.unknown;

          function rescale() {
            var n = domain().length,
                reverse = range[1] < range[0],
                start = range[reverse - 0],
                stop = range[1 - reverse];
            step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
            if (round) step = Math.floor(step);
            start += (stop - start - step * (n - paddingInner)) * align;
            bandwidth = step * (1 - paddingInner);
            if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
            var values = d3Array.range(n).map(function (i) {
              return start + step * i;
            });
            return ordinalRange(reverse ? values.reverse() : values);
          }

          scale.domain = function (_) {
            return arguments.length ? (domain(_), rescale()) : domain();
          };

          scale.range = function (_) {
            return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
          };

          scale.rangeRound = function (_) {
            return range = [+_[0], +_[1]], round = true, rescale();
          };

          scale.bandwidth = function () {
            return bandwidth;
          };

          scale.step = function () {
            return step;
          };

          scale.round = function (_) {
            return arguments.length ? (round = !!_, rescale()) : round;
          };

          scale.padding = function (_) {
            return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
          };

          scale.paddingInner = function (_) {
            return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
          };

          scale.paddingOuter = function (_) {
            return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
          };

          scale.align = function (_) {
            return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
          };

          scale.copy = function () {
            return band().domain(domain()).range(range).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
          };

          return rescale();
        }

        function pointish(scale) {
          var copy = scale.copy;
          scale.padding = scale.paddingOuter;
          delete scale.paddingInner;
          delete scale.paddingOuter;

          scale.copy = function () {
            return pointish(copy());
          };

          return scale;
        }

        function point() {
          return pointish(band().paddingInner(1));
        }

        function constant(x) {
          return function () {
            return x;
          };
        }

        function number(x) {
          return +x;
        }

        var unit = [0, 1];

        function deinterpolateLinear(a, b) {
          return (b -= a = +a) ? function (x) {
            return (x - a) / b;
          } : constant(b);
        }

        function deinterpolateClamp(deinterpolate) {
          return function (a, b) {
            var d = deinterpolate(a = +a, b = +b);
            return function (x) {
              return x <= a ? 0 : x >= b ? 1 : d(x);
            };
          };
        }

        function reinterpolateClamp(reinterpolate) {
          return function (a, b) {
            var r = reinterpolate(a = +a, b = +b);
            return function (t) {
              return t <= 0 ? a : t >= 1 ? b : r(t);
            };
          };
        }

        function bimap(domain, range, deinterpolate, reinterpolate) {
          var d0 = domain[0],
              d1 = domain[1],
              r0 = range[0],
              r1 = range[1];
          if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
          return function (x) {
            return r0(d0(x));
          };
        }

        function polymap(domain, range, deinterpolate, reinterpolate) {
          var j = Math.min(domain.length, range.length) - 1,
              d = new Array(j),
              r = new Array(j),
              i = -1; // Reverse descending domains.

          if (domain[j] < domain[0]) {
            domain = domain.slice().reverse();
            range = range.slice().reverse();
          }

          while (++i < j) {
            d[i] = deinterpolate(domain[i], domain[i + 1]);
            r[i] = reinterpolate(range[i], range[i + 1]);
          }

          return function (x) {
            var i = d3Array.bisect(domain, x, 1, j) - 1;
            return r[i](d[i](x));
          };
        }

        function copy(source, target) {
          return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp());
        } // deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
        // reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].


        function continuous(deinterpolate, reinterpolate) {
          var domain = unit,
              range = unit,
              interpolate = d3Interpolate.interpolate,
              clamp = false,
              piecewise,
              output,
              input;

          function rescale() {
            piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
            output = input = null;
            return scale;
          }

          function scale(x) {
            return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate)))(+x);
          }

          scale.invert = function (y) {
            return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
          };

          scale.domain = function (_) {
            return arguments.length ? (domain = map.call(_, number), rescale()) : domain.slice();
          };

          scale.range = function (_) {
            return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
          };

          scale.rangeRound = function (_) {
            return range = slice.call(_), interpolate = d3Interpolate.interpolateRound, rescale();
          };

          scale.clamp = function (_) {
            return arguments.length ? (clamp = !!_, rescale()) : clamp;
          };

          scale.interpolate = function (_) {
            return arguments.length ? (interpolate = _, rescale()) : interpolate;
          };

          return rescale();
        }

        function tickFormat(domain, count, specifier) {
          var start = domain[0],
              stop = domain[domain.length - 1],
              step = d3Array.tickStep(start, stop, count == null ? 10 : count),
              precision;
          specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);

          switch (specifier.type) {
            case "s":
              {
                var value = Math.max(Math.abs(start), Math.abs(stop));
                if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
                return d3Format.formatPrefix(specifier, value);
              }

            case "":
            case "e":
            case "g":
            case "p":
            case "r":
              {
                if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
                break;
              }

            case "f":
            case "%":
              {
                if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
                break;
              }
          }

          return d3Format.format(specifier);
        }

        function linearish(scale) {
          var domain = scale.domain;

          scale.ticks = function (count) {
            var d = domain();
            return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
          };

          scale.tickFormat = function (count, specifier) {
            return tickFormat(domain(), count, specifier);
          };

          scale.nice = function (count) {
            if (count == null) count = 10;
            var d = domain(),
                i0 = 0,
                i1 = d.length - 1,
                start = d[i0],
                stop = d[i1],
                step;

            if (stop < start) {
              step = start, start = stop, stop = step;
              step = i0, i0 = i1, i1 = step;
            }

            step = d3Array.tickIncrement(start, stop, count);

            if (step > 0) {
              start = Math.floor(start / step) * step;
              stop = Math.ceil(stop / step) * step;
              step = d3Array.tickIncrement(start, stop, count);
            } else if (step < 0) {
              start = Math.ceil(start * step) / step;
              stop = Math.floor(stop * step) / step;
              step = d3Array.tickIncrement(start, stop, count);
            }

            if (step > 0) {
              d[i0] = Math.floor(start / step) * step;
              d[i1] = Math.ceil(stop / step) * step;
              domain(d);
            } else if (step < 0) {
              d[i0] = Math.ceil(start * step) / step;
              d[i1] = Math.floor(stop * step) / step;
              domain(d);
            }

            return scale;
          };

          return scale;
        }

        function linear() {
          var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber);

          scale.copy = function () {
            return copy(scale, linear());
          };

          return linearish(scale);
        }

        function identity() {
          var domain = [0, 1];

          function scale(x) {
            return +x;
          }

          scale.invert = scale;

          scale.domain = scale.range = function (_) {
            return arguments.length ? (domain = map.call(_, number), scale) : domain.slice();
          };

          scale.copy = function () {
            return identity().domain(domain);
          };

          return linearish(scale);
        }

        function nice(domain, interval) {
          domain = domain.slice();
          var i0 = 0,
              i1 = domain.length - 1,
              x0 = domain[i0],
              x1 = domain[i1],
              t;

          if (x1 < x0) {
            t = i0, i0 = i1, i1 = t;
            t = x0, x0 = x1, x1 = t;
          }

          domain[i0] = interval.floor(x0);
          domain[i1] = interval.ceil(x1);
          return domain;
        }

        function deinterpolate(a, b) {
          return (b = Math.log(b / a)) ? function (x) {
            return Math.log(x / a) / b;
          } : constant(b);
        }

        function reinterpolate(a, b) {
          return a < 0 ? function (t) {
            return -Math.pow(-b, t) * Math.pow(-a, 1 - t);
          } : function (t) {
            return Math.pow(b, t) * Math.pow(a, 1 - t);
          };
        }

        function pow10(x) {
          return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
        }

        function powp(base) {
          return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
            return Math.pow(base, x);
          };
        }

        function logp(base) {
          return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
            return Math.log(x) / base;
          });
        }

        function reflect(f) {
          return function (x) {
            return -f(-x);
          };
        }

        function log() {
          var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
              domain = scale.domain,
              base = 10,
              logs = logp(10),
              pows = powp(10);

          function rescale() {
            logs = logp(base), pows = powp(base);
            if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
            return scale;
          }

          scale.base = function (_) {
            return arguments.length ? (base = +_, rescale()) : base;
          };

          scale.domain = function (_) {
            return arguments.length ? (domain(_), rescale()) : domain();
          };

          scale.ticks = function (count) {
            var d = domain(),
                u = d[0],
                v = d[d.length - 1],
                r;
            if (r = v < u) i = u, u = v, v = i;
            var i = logs(u),
                j = logs(v),
                p,
                k,
                t,
                n = count == null ? 10 : +count,
                z = [];

            if (!(base % 1) && j - i < n) {
              i = Math.round(i) - 1, j = Math.round(j) + 1;
              if (u > 0) for (; i < j; ++i) {
                for (k = 1, p = pows(i); k < base; ++k) {
                  t = p * k;
                  if (t < u) continue;
                  if (t > v) break;
                  z.push(t);
                }
              } else for (; i < j; ++i) {
                for (k = base - 1, p = pows(i); k >= 1; --k) {
                  t = p * k;
                  if (t < u) continue;
                  if (t > v) break;
                  z.push(t);
                }
              }
            } else {
              z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
            }

            return r ? z.reverse() : z;
          };

          scale.tickFormat = function (count, specifier) {
            if (specifier == null) specifier = base === 10 ? ".0e" : ",";
            if (typeof specifier !== "function") specifier = d3Format.format(specifier);
            if (count === Infinity) return specifier;
            if (count == null) count = 10;
            var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

            return function (d) {
              var i = d / pows(Math.round(logs(d)));
              if (i * base < base - 0.5) i *= base;
              return i <= k ? specifier(d) : "";
            };
          };

          scale.nice = function () {
            return domain(nice(domain(), {
              floor: function floor(x) {
                return pows(Math.floor(logs(x)));
              },
              ceil: function ceil(x) {
                return pows(Math.ceil(logs(x)));
              }
            }));
          };

          scale.copy = function () {
            return copy(scale, log().base(base));
          };

          return scale;
        }

        function raise(x, exponent) {
          return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
        }

        function pow() {
          var exponent = 1,
              scale = continuous(deinterpolate, reinterpolate),
              domain = scale.domain;

          function deinterpolate(a, b) {
            return (b = raise(b, exponent) - (a = raise(a, exponent))) ? function (x) {
              return (raise(x, exponent) - a) / b;
            } : constant(b);
          }

          function reinterpolate(a, b) {
            b = raise(b, exponent) - (a = raise(a, exponent));
            return function (t) {
              return raise(a + b * t, 1 / exponent);
            };
          }

          scale.exponent = function (_) {
            return arguments.length ? (exponent = +_, domain(domain())) : exponent;
          };

          scale.copy = function () {
            return copy(scale, pow().exponent(exponent));
          };

          return linearish(scale);
        }

        function sqrt() {
          return pow().exponent(0.5);
        }

        function quantile() {
          var domain = [],
              range = [],
              thresholds = [];

          function rescale() {
            var i = 0,
                n = Math.max(1, range.length);
            thresholds = new Array(n - 1);

            while (++i < n) {
              thresholds[i - 1] = d3Array.quantile(domain, i / n);
            }

            return scale;
          }

          function scale(x) {
            if (!isNaN(x = +x)) return range[d3Array.bisect(thresholds, x)];
          }

          scale.invertExtent = function (y) {
            var i = range.indexOf(y);
            return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
          };

          scale.domain = function (_) {
            if (!arguments.length) return domain.slice();
            domain = [];

            for (var i = 0, n = _.length, d; i < n; ++i) {
              if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
            }

            domain.sort(d3Array.ascending);
            return rescale();
          };

          scale.range = function (_) {
            return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
          };

          scale.quantiles = function () {
            return thresholds.slice();
          };

          scale.copy = function () {
            return quantile().domain(domain).range(range);
          };

          return scale;
        }

        function quantize() {
          var x0 = 0,
              x1 = 1,
              n = 1,
              domain = [0.5],
              range = [0, 1];

          function scale(x) {
            if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
          }

          function rescale() {
            var i = -1;
            domain = new Array(n);

            while (++i < n) {
              domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
            }

            return scale;
          }

          scale.domain = function (_) {
            return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
          };

          scale.range = function (_) {
            return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
          };

          scale.invertExtent = function (y) {
            var i = range.indexOf(y);
            return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
          };

          scale.copy = function () {
            return quantize().domain([x0, x1]).range(range);
          };

          return linearish(scale);
        }

        function threshold() {
          var domain = [0.5],
              range = [0, 1],
              n = 1;

          function scale(x) {
            if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
          }

          scale.domain = function (_) {
            return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
          };

          scale.range = function (_) {
            return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
          };

          scale.invertExtent = function (y) {
            var i = range.indexOf(y);
            return [domain[i - 1], domain[i]];
          };

          scale.copy = function () {
            return threshold().domain(domain).range(range);
          };

          return scale;
        }

        var durationSecond = 1000,
            durationMinute = durationSecond * 60,
            durationHour = durationMinute * 60,
            durationDay = durationHour * 24,
            durationWeek = durationDay * 7,
            durationMonth = durationDay * 30,
            durationYear = durationDay * 365;

        function date(t) {
          return new Date(t);
        }

        function number$1(t) {
          return t instanceof Date ? +t : +new Date(+t);
        }

        function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
          var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber),
              invert = scale.invert,
              domain = scale.domain;
          var formatMillisecond = format(".%L"),
              formatSecond = format(":%S"),
              formatMinute = format("%I:%M"),
              formatHour = format("%I %p"),
              formatDay = format("%a %d"),
              formatWeek = format("%b %d"),
              formatMonth = format("%B"),
              formatYear = format("%Y");
          var tickIntervals = [[second, 1, durationSecond], [second, 5, 5 * durationSecond], [second, 15, 15 * durationSecond], [second, 30, 30 * durationSecond], [minute, 1, durationMinute], [minute, 5, 5 * durationMinute], [minute, 15, 15 * durationMinute], [minute, 30, 30 * durationMinute], [hour, 1, durationHour], [hour, 3, 3 * durationHour], [hour, 6, 6 * durationHour], [hour, 12, 12 * durationHour], [day, 1, durationDay], [day, 2, 2 * durationDay], [week, 1, durationWeek], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];

          function tickFormat(date) {
            return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
          }

          function tickInterval(interval, start, stop, step) {
            if (interval == null) interval = 10; // If a desired tick count is specified, pick a reasonable tick interval
            // based on the extent of the domain and a rough estimate of tick size.
            // Otherwise, assume interval is already a time interval and use it.

            if (typeof interval === "number") {
              var target = Math.abs(stop - start) / interval,
                  i = d3Array.bisector(function (i) {
                return i[2];
              }).right(tickIntervals, target);

              if (i === tickIntervals.length) {
                step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
                interval = year;
              } else if (i) {
                i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
                step = i[1];
                interval = i[0];
              } else {
                step = Math.max(d3Array.tickStep(start, stop, interval), 1);
                interval = millisecond;
              }
            }

            return step == null ? interval : interval.every(step);
          }

          scale.invert = function (y) {
            return new Date(invert(y));
          };

          scale.domain = function (_) {
            return arguments.length ? domain(map.call(_, number$1)) : domain().map(date);
          };

          scale.ticks = function (interval, step) {
            var d = domain(),
                t0 = d[0],
                t1 = d[d.length - 1],
                r = t1 < t0,
                t;
            if (r) t = t0, t0 = t1, t1 = t;
            t = tickInterval(interval, t0, t1, step);
            t = t ? t.range(t0, t1 + 1) : []; // inclusive stop

            return r ? t.reverse() : t;
          };

          scale.tickFormat = function (count, specifier) {
            return specifier == null ? tickFormat : format(specifier);
          };

          scale.nice = function (interval, step) {
            var d = domain();
            return (interval = tickInterval(interval, d[0], d[d.length - 1], step)) ? domain(nice(d, interval)) : scale;
          };

          scale.copy = function () {
            return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
          };

          return scale;
        }

        function time() {
          return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
        }

        function utcTime() {
          return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
        }

        function sequential(interpolator) {
          var x0 = 0,
              x1 = 1,
              k10 = 1,
              clamp = false;

          function scale(x) {
            var t = (x - x0) * k10;
            return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
          }

          scale.domain = function (_) {
            return arguments.length ? (x0 = +_[0], x1 = +_[1], k10 = x0 === x1 ? 0 : 1 / (x1 - x0), scale) : [x0, x1];
          };

          scale.clamp = function (_) {
            return arguments.length ? (clamp = !!_, scale) : clamp;
          };

          scale.interpolator = function (_) {
            return arguments.length ? (interpolator = _, scale) : interpolator;
          };

          scale.copy = function () {
            return sequential(interpolator).domain([x0, x1]).clamp(clamp);
          };

          return linearish(scale);
        }

        function diverging(interpolator) {
          var x0 = 0,
              x1 = 0.5,
              x2 = 1,
              k10 = 1,
              k21 = 1,
              clamp = false;

          function scale(x) {
            var t = 0.5 + ((x = +x) - x1) * (x < x1 ? k10 : k21);
            return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
          }

          scale.domain = function (_) {
            return arguments.length ? (x0 = +_[0], x1 = +_[1], x2 = +_[2], k10 = x0 === x1 ? 0 : 0.5 / (x1 - x0), k21 = x1 === x2 ? 0 : 0.5 / (x2 - x1), scale) : [x0, x1, x2];
          };

          scale.clamp = function (_) {
            return arguments.length ? (clamp = !!_, scale) : clamp;
          };

          scale.interpolator = function (_) {
            return arguments.length ? (interpolator = _, scale) : interpolator;
          };

          scale.copy = function () {
            return diverging(interpolator).domain([x0, x1, x2]).clamp(clamp);
          };

          return linearish(scale);
        }

        exports.scaleBand = band;
        exports.scalePoint = point;
        exports.scaleIdentity = identity;
        exports.scaleLinear = linear;
        exports.scaleLog = log;
        exports.scaleOrdinal = ordinal;
        exports.scaleImplicit = implicit;
        exports.scalePow = pow;
        exports.scaleSqrt = sqrt;
        exports.scaleQuantile = quantile;
        exports.scaleQuantize = quantize;
        exports.scaleThreshold = threshold;
        exports.scaleTime = time;
        exports.scaleUtc = utcTime;
        exports.scaleSequential = sequential;
        exports.scaleDiverging = diverging;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {
      "d3-array": 1,
      "d3-collection": 2,
      "d3-format": 4,
      "d3-interpolate": 5,
      "d3-time": 10,
      "d3-time-format": 9
    }],
    8: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-shape/ v1.2.2 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-path')) : typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) : factory(global.d3 = global.d3 || {}, global.d3);
      })(this, function (exports, d3Path) {
        'use strict';

        function constant(x) {
          return function constant() {
            return x;
          };
        }

        var abs = Math.abs;
        var atan2 = Math.atan2;
        var cos = Math.cos;
        var max = Math.max;
        var min = Math.min;
        var sin = Math.sin;
        var sqrt = Math.sqrt;
        var epsilon = 1e-12;
        var pi = Math.PI;
        var halfPi = pi / 2;
        var tau = 2 * pi;

        function acos(x) {
          return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
        }

        function asin(x) {
          return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
        }

        function arcInnerRadius(d) {
          return d.innerRadius;
        }

        function arcOuterRadius(d) {
          return d.outerRadius;
        }

        function arcStartAngle(d) {
          return d.startAngle;
        }

        function arcEndAngle(d) {
          return d.endAngle;
        }

        function arcPadAngle(d) {
          return d && d.padAngle; // Note: optional!
        }

        function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
          var x10 = x1 - x0,
              y10 = y1 - y0,
              x32 = x3 - x2,
              y32 = y3 - y2,
              t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
          return [x0 + t * x10, y0 + t * y10];
        } // Compute perpendicular offset line of length rc.
        // http://mathworld.wolfram.com/Circle-LineIntersection.html


        function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
          var x01 = x0 - x1,
              y01 = y0 - y1,
              lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
              ox = lo * y01,
              oy = -lo * x01,
              x11 = x0 + ox,
              y11 = y0 + oy,
              x10 = x1 + ox,
              y10 = y1 + oy,
              x00 = (x11 + x10) / 2,
              y00 = (y11 + y10) / 2,
              dx = x10 - x11,
              dy = y10 - y11,
              d2 = dx * dx + dy * dy,
              r = r1 - rc,
              D = x11 * y10 - x10 * y11,
              d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
              cx0 = (D * dy - dx * d) / d2,
              cy0 = (-D * dx - dy * d) / d2,
              cx1 = (D * dy + dx * d) / d2,
              cy1 = (-D * dx + dy * d) / d2,
              dx0 = cx0 - x00,
              dy0 = cy0 - y00,
              dx1 = cx1 - x00,
              dy1 = cy1 - y00; // Pick the closer of the two intersection points.
          // TODO Is there a faster way to determine which intersection to use?

          if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
          return {
            cx: cx0,
            cy: cy0,
            x01: -ox,
            y01: -oy,
            x11: cx0 * (r1 / r - 1),
            y11: cy0 * (r1 / r - 1)
          };
        }

        function arc() {
          var innerRadius = arcInnerRadius,
              outerRadius = arcOuterRadius,
              cornerRadius = constant(0),
              padRadius = null,
              startAngle = arcStartAngle,
              endAngle = arcEndAngle,
              padAngle = arcPadAngle,
              context = null;

          function arc() {
            var buffer,
                r,
                r0 = +innerRadius.apply(this, arguments),
                r1 = +outerRadius.apply(this, arguments),
                a0 = startAngle.apply(this, arguments) - halfPi,
                a1 = endAngle.apply(this, arguments) - halfPi,
                da = abs(a1 - a0),
                cw = a1 > a0;
            if (!context) context = buffer = d3Path.path(); // Ensure that the outer radius is always larger than the inner radius.

            if (r1 < r0) r = r1, r1 = r0, r0 = r; // Is it a point?

            if (!(r1 > epsilon)) context.moveTo(0, 0); // Or is it a circle or annulus?
            else if (da > tau - epsilon) {
                context.moveTo(r1 * cos(a0), r1 * sin(a0));
                context.arc(0, 0, r1, a0, a1, !cw);

                if (r0 > epsilon) {
                  context.moveTo(r0 * cos(a1), r0 * sin(a1));
                  context.arc(0, 0, r0, a1, a0, cw);
                }
              } // Or is it a circular or annular sector?
              else {
                  var a01 = a0,
                      a11 = a1,
                      a00 = a0,
                      a10 = a1,
                      da0 = da,
                      da1 = da,
                      ap = padAngle.apply(this, arguments) / 2,
                      rp = ap > epsilon && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
                      rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
                      rc0 = rc,
                      rc1 = rc,
                      t0,
                      t1; // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.

                  if (rp > epsilon) {
                    var p0 = asin(rp / r0 * sin(ap)),
                        p1 = asin(rp / r1 * sin(ap));
                    if ((da0 -= p0 * 2) > epsilon) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;else da0 = 0, a00 = a10 = (a0 + a1) / 2;
                    if ((da1 -= p1 * 2) > epsilon) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;else da1 = 0, a01 = a11 = (a0 + a1) / 2;
                  }

                  var x01 = r1 * cos(a01),
                      y01 = r1 * sin(a01),
                      x10 = r0 * cos(a10),
                      y10 = r0 * sin(a10); // Apply rounded corners?

                  if (rc > epsilon) {
                    var x11 = r1 * cos(a11),
                        y11 = r1 * sin(a11),
                        x00 = r0 * cos(a00),
                        y00 = r0 * sin(a00); // Restrict the corner radius according to the sector angle.

                    if (da < pi) {
                      var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
                          ax = x01 - oc[0],
                          ay = y01 - oc[1],
                          bx = x11 - oc[0],
                          by = y11 - oc[1],
                          kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
                          lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
                      rc0 = min(rc, (r0 - lc) / (kc - 1));
                      rc1 = min(rc, (r1 - lc) / (kc + 1));
                    }
                  } // Is the sector collapsed to a line?


                  if (!(da1 > epsilon)) context.moveTo(x01, y01); // Does the sector’s outer ring have rounded corners?
                  else if (rc1 > epsilon) {
                      t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
                      t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
                      context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

                      if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
                      else {
                          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
                        }
                    } // Or is the outer ring just a circular arc?
                    else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw); // Is there no inner ring, and it’s a circular sector?
                  // Or perhaps it’s an annular sector collapsed due to padding?

                  if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10); // Does the sector’s inner ring (or point) have rounded corners?
                  else if (rc0 > epsilon) {
                      t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
                      t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
                      context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

                      if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
                      else {
                          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
                        }
                    } // Or is the inner ring just a circular arc?
                    else context.arc(0, 0, r0, a10, a00, cw);
                }
            context.closePath();
            if (buffer) return context = null, buffer + "" || null;
          }

          arc.centroid = function () {
            var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
                a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
            return [cos(a) * r, sin(a) * r];
          };

          arc.innerRadius = function (_) {
            return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
          };

          arc.outerRadius = function (_) {
            return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
          };

          arc.cornerRadius = function (_) {
            return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
          };

          arc.padRadius = function (_) {
            return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
          };

          arc.startAngle = function (_) {
            return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
          };

          arc.endAngle = function (_) {
            return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
          };

          arc.padAngle = function (_) {
            return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
          };

          arc.context = function (_) {
            return arguments.length ? (context = _ == null ? null : _, arc) : context;
          };

          return arc;
        }

        function Linear(context) {
          this._context = context;
        }

        Linear.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
              // proceed

              default:
                this._context.lineTo(x, y);

                break;
            }
          }
        };

        function curveLinear(context) {
          return new Linear(context);
        }

        function x(p) {
          return p[0];
        }

        function y(p) {
          return p[1];
        }

        function line() {
          var x$$1 = x,
              y$$1 = y,
              defined = constant(true),
              context = null,
              curve = curveLinear,
              output = null;

          function line(data) {
            var i,
                n = data.length,
                d,
                defined0 = false,
                buffer;
            if (context == null) output = curve(buffer = d3Path.path());

            for (i = 0; i <= n; ++i) {
              if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) output.lineStart();else output.lineEnd();
              }

              if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
            }

            if (buffer) return output = null, buffer + "" || null;
          }

          line.x = function (_) {
            return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
          };

          line.y = function (_) {
            return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
          };

          line.defined = function (_) {
            return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
          };

          line.curve = function (_) {
            return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
          };

          line.context = function (_) {
            return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
          };

          return line;
        }

        function area() {
          var x0 = x,
              x1 = null,
              y0 = constant(0),
              y1 = y,
              defined = constant(true),
              context = null,
              curve = curveLinear,
              output = null;

          function area(data) {
            var i,
                j,
                k,
                n = data.length,
                d,
                defined0 = false,
                buffer,
                x0z = new Array(n),
                y0z = new Array(n);
            if (context == null) output = curve(buffer = d3Path.path());

            for (i = 0; i <= n; ++i) {
              if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) {
                  j = i;
                  output.areaStart();
                  output.lineStart();
                } else {
                  output.lineEnd();
                  output.lineStart();

                  for (k = i - 1; k >= j; --k) {
                    output.point(x0z[k], y0z[k]);
                  }

                  output.lineEnd();
                  output.areaEnd();
                }
              }

              if (defined0) {
                x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
                output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
              }
            }

            if (buffer) return output = null, buffer + "" || null;
          }

          function arealine() {
            return line().defined(defined).curve(curve).context(context);
          }

          area.x = function (_) {
            return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
          };

          area.x0 = function (_) {
            return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
          };

          area.x1 = function (_) {
            return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
          };

          area.y = function (_) {
            return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
          };

          area.y0 = function (_) {
            return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
          };

          area.y1 = function (_) {
            return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
          };

          area.lineX0 = area.lineY0 = function () {
            return arealine().x(x0).y(y0);
          };

          area.lineY1 = function () {
            return arealine().x(x0).y(y1);
          };

          area.lineX1 = function () {
            return arealine().x(x1).y(y0);
          };

          area.defined = function (_) {
            return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
          };

          area.curve = function (_) {
            return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
          };

          area.context = function (_) {
            return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
          };

          return area;
        }

        function descending(a, b) {
          return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
        }

        function identity(d) {
          return d;
        }

        function pie() {
          var value = identity,
              sortValues = descending,
              sort = null,
              startAngle = constant(0),
              endAngle = constant(tau),
              padAngle = constant(0);

          function pie(data) {
            var i,
                n = data.length,
                j,
                k,
                sum = 0,
                index = new Array(n),
                arcs = new Array(n),
                a0 = +startAngle.apply(this, arguments),
                da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
                a1,
                p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
                pa = p * (da < 0 ? -1 : 1),
                v;

            for (i = 0; i < n; ++i) {
              if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
                sum += v;
              }
            } // Optionally sort the arcs by previously-computed values or by data.


            if (sortValues != null) index.sort(function (i, j) {
              return sortValues(arcs[i], arcs[j]);
            });else if (sort != null) index.sort(function (i, j) {
              return sort(data[i], data[j]);
            }); // Compute the arcs! They are stored in the original data's order.

            for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
              j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
                data: data[j],
                index: i,
                value: v,
                startAngle: a0,
                endAngle: a1,
                padAngle: p
              };
            }

            return arcs;
          }

          pie.value = function (_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
          };

          pie.sortValues = function (_) {
            return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
          };

          pie.sort = function (_) {
            return arguments.length ? (sort = _, sortValues = null, pie) : sort;
          };

          pie.startAngle = function (_) {
            return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
          };

          pie.endAngle = function (_) {
            return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
          };

          pie.padAngle = function (_) {
            return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
          };

          return pie;
        }

        var curveRadialLinear = curveRadial(curveLinear);

        function Radial(curve) {
          this._curve = curve;
        }

        Radial.prototype = {
          areaStart: function areaStart() {
            this._curve.areaStart();
          },
          areaEnd: function areaEnd() {
            this._curve.areaEnd();
          },
          lineStart: function lineStart() {
            this._curve.lineStart();
          },
          lineEnd: function lineEnd() {
            this._curve.lineEnd();
          },
          point: function point(a, r) {
            this._curve.point(r * Math.sin(a), r * -Math.cos(a));
          }
        };

        function curveRadial(curve) {
          function radial(context) {
            return new Radial(curve(context));
          }

          radial._curve = curve;
          return radial;
        }

        function lineRadial(l) {
          var c = l.curve;
          l.angle = l.x, delete l.x;
          l.radius = l.y, delete l.y;

          l.curve = function (_) {
            return arguments.length ? c(curveRadial(_)) : c()._curve;
          };

          return l;
        }

        function lineRadial$1() {
          return lineRadial(line().curve(curveRadialLinear));
        }

        function areaRadial() {
          var a = area().curve(curveRadialLinear),
              c = a.curve,
              x0 = a.lineX0,
              x1 = a.lineX1,
              y0 = a.lineY0,
              y1 = a.lineY1;
          a.angle = a.x, delete a.x;
          a.startAngle = a.x0, delete a.x0;
          a.endAngle = a.x1, delete a.x1;
          a.radius = a.y, delete a.y;
          a.innerRadius = a.y0, delete a.y0;
          a.outerRadius = a.y1, delete a.y1;
          a.lineStartAngle = function () {
            return lineRadial(x0());
          }, delete a.lineX0;
          a.lineEndAngle = function () {
            return lineRadial(x1());
          }, delete a.lineX1;
          a.lineInnerRadius = function () {
            return lineRadial(y0());
          }, delete a.lineY0;
          a.lineOuterRadius = function () {
            return lineRadial(y1());
          }, delete a.lineY1;

          a.curve = function (_) {
            return arguments.length ? c(curveRadial(_)) : c()._curve;
          };

          return a;
        }

        function pointRadial(x, y) {
          return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
        }

        var slice = Array.prototype.slice;

        function linkSource(d) {
          return d.source;
        }

        function linkTarget(d) {
          return d.target;
        }

        function link(curve) {
          var source = linkSource,
              target = linkTarget,
              x$$1 = x,
              y$$1 = y,
              context = null;

          function link() {
            var buffer,
                argv = slice.call(arguments),
                s = source.apply(this, argv),
                t = target.apply(this, argv);
            if (!context) context = buffer = d3Path.path();
            curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
            if (buffer) return context = null, buffer + "" || null;
          }

          link.source = function (_) {
            return arguments.length ? (source = _, link) : source;
          };

          link.target = function (_) {
            return arguments.length ? (target = _, link) : target;
          };

          link.x = function (_) {
            return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
          };

          link.y = function (_) {
            return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
          };

          link.context = function (_) {
            return arguments.length ? (context = _ == null ? null : _, link) : context;
          };

          return link;
        }

        function curveHorizontal(context, x0, y0, x1, y1) {
          context.moveTo(x0, y0);
          context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
        }

        function curveVertical(context, x0, y0, x1, y1) {
          context.moveTo(x0, y0);
          context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
        }

        function curveRadial$1(context, x0, y0, x1, y1) {
          var p0 = pointRadial(x0, y0),
              p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
              p2 = pointRadial(x1, y0),
              p3 = pointRadial(x1, y1);
          context.moveTo(p0[0], p0[1]);
          context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }

        function linkHorizontal() {
          return link(curveHorizontal);
        }

        function linkVertical() {
          return link(curveVertical);
        }

        function linkRadial() {
          var l = link(curveRadial$1);
          l.angle = l.x, delete l.x;
          l.radius = l.y, delete l.y;
          return l;
        }

        var circle = {
          draw: function draw(context, size) {
            var r = Math.sqrt(size / pi);
            context.moveTo(r, 0);
            context.arc(0, 0, r, 0, tau);
          }
        };
        var cross = {
          draw: function draw(context, size) {
            var r = Math.sqrt(size / 5) / 2;
            context.moveTo(-3 * r, -r);
            context.lineTo(-r, -r);
            context.lineTo(-r, -3 * r);
            context.lineTo(r, -3 * r);
            context.lineTo(r, -r);
            context.lineTo(3 * r, -r);
            context.lineTo(3 * r, r);
            context.lineTo(r, r);
            context.lineTo(r, 3 * r);
            context.lineTo(-r, 3 * r);
            context.lineTo(-r, r);
            context.lineTo(-3 * r, r);
            context.closePath();
          }
        };
        var tan30 = Math.sqrt(1 / 3),
            tan30_2 = tan30 * 2;
        var diamond = {
          draw: function draw(context, size) {
            var y = Math.sqrt(size / tan30_2),
                x = y * tan30;
            context.moveTo(0, -y);
            context.lineTo(x, 0);
            context.lineTo(0, y);
            context.lineTo(-x, 0);
            context.closePath();
          }
        };
        var ka = 0.89081309152928522810,
            kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10),
            kx = Math.sin(tau / 10) * kr,
            ky = -Math.cos(tau / 10) * kr;
        var star = {
          draw: function draw(context, size) {
            var r = Math.sqrt(size * ka),
                x = kx * r,
                y = ky * r;
            context.moveTo(0, -r);
            context.lineTo(x, y);

            for (var i = 1; i < 5; ++i) {
              var a = tau * i / 5,
                  c = Math.cos(a),
                  s = Math.sin(a);
              context.lineTo(s * r, -c * r);
              context.lineTo(c * x - s * y, s * x + c * y);
            }

            context.closePath();
          }
        };
        var square = {
          draw: function draw(context, size) {
            var w = Math.sqrt(size),
                x = -w / 2;
            context.rect(x, x, w, w);
          }
        };
        var sqrt3 = Math.sqrt(3);
        var triangle = {
          draw: function draw(context, size) {
            var y = -Math.sqrt(size / (sqrt3 * 3));
            context.moveTo(0, y * 2);
            context.lineTo(-sqrt3 * y, -y);
            context.lineTo(sqrt3 * y, -y);
            context.closePath();
          }
        };
        var c = -0.5,
            s = Math.sqrt(3) / 2,
            k = 1 / Math.sqrt(12),
            a = (k / 2 + 1) * 3;
        var wye = {
          draw: function draw(context, size) {
            var r = Math.sqrt(size / a),
                x0 = r / 2,
                y0 = r * k,
                x1 = x0,
                y1 = r * k + r,
                x2 = -x1,
                y2 = y1;
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
            context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
            context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
            context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
            context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
            context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
            context.closePath();
          }
        };
        var symbols = [circle, cross, diamond, square, star, triangle, wye];

        function symbol() {
          var type = constant(circle),
              size = constant(64),
              context = null;

          function symbol() {
            var buffer;
            if (!context) context = buffer = d3Path.path();
            type.apply(this, arguments).draw(context, +size.apply(this, arguments));
            if (buffer) return context = null, buffer + "" || null;
          }

          symbol.type = function (_) {
            return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
          };

          symbol.size = function (_) {
            return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
          };

          symbol.context = function (_) {
            return arguments.length ? (context = _ == null ? null : _, symbol) : context;
          };

          return symbol;
        }

        function noop() {}

        function _point(that, x, y) {
          that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
        }

        function Basis(context) {
          this._context = context;
        }

        Basis.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._y0 = this._y1 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 3:
                _point(this, this._x1, this._y1);

              // proceed

              case 2:
                this._context.lineTo(this._x1, this._y1);

                break;
            }

            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;

                this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);

              // proceed

              default:
                _point(this, x, y);

                break;
            }

            this._x0 = this._x1, this._x1 = x;
            this._y0 = this._y1, this._y1 = y;
          }
        };

        function basis(context) {
          return new Basis(context);
        }

        function BasisClosed(context) {
          this._context = context;
        }

        BasisClosed.prototype = {
          areaStart: noop,
          areaEnd: noop,
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 1:
                {
                  this._context.moveTo(this._x2, this._y2);

                  this._context.closePath();

                  break;
                }

              case 2:
                {
                  this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);

                  this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);

                  this._context.closePath();

                  break;
                }

              case 3:
                {
                  this.point(this._x2, this._y2);
                  this.point(this._x3, this._y3);
                  this.point(this._x4, this._y4);
                  break;
                }
            }
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._x2 = x, this._y2 = y;
                break;

              case 1:
                this._point = 2;
                this._x3 = x, this._y3 = y;
                break;

              case 2:
                this._point = 3;
                this._x4 = x, this._y4 = y;

                this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);

                break;

              default:
                _point(this, x, y);

                break;
            }

            this._x0 = this._x1, this._x1 = x;
            this._y0 = this._y1, this._y1 = y;
          }
        };

        function basisClosed(context) {
          return new BasisClosed(context);
        }

        function BasisOpen(context) {
          this._context = context;
        }

        BasisOpen.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._y0 = this._y1 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;
                var x0 = (this._x0 + 4 * this._x1 + x) / 6,
                    y0 = (this._y0 + 4 * this._y1 + y) / 6;
                this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
                break;

              case 3:
                this._point = 4;
              // proceed

              default:
                _point(this, x, y);

                break;
            }

            this._x0 = this._x1, this._x1 = x;
            this._y0 = this._y1, this._y1 = y;
          }
        };

        function basisOpen(context) {
          return new BasisOpen(context);
        }

        function Bundle(context, beta) {
          this._basis = new Basis(context);
          this._beta = beta;
        }

        Bundle.prototype = {
          lineStart: function lineStart() {
            this._x = [];
            this._y = [];

            this._basis.lineStart();
          },
          lineEnd: function lineEnd() {
            var x = this._x,
                y = this._y,
                j = x.length - 1;

            if (j > 0) {
              var x0 = x[0],
                  y0 = y[0],
                  dx = x[j] - x0,
                  dy = y[j] - y0,
                  i = -1,
                  t;

              while (++i <= j) {
                t = i / j;

                this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
              }
            }

            this._x = this._y = null;

            this._basis.lineEnd();
          },
          point: function point(x, y) {
            this._x.push(+x);

            this._y.push(+y);
          }
        };

        var bundle = function custom(beta) {
          function bundle(context) {
            return beta === 1 ? new Basis(context) : new Bundle(context, beta);
          }

          bundle.beta = function (beta) {
            return custom(+beta);
          };

          return bundle;
        }(0.85);

        function point$1(that, x, y) {
          that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
        }

        function Cardinal(context, tension) {
          this._context = context;
          this._k = (1 - tension) / 6;
        }

        Cardinal.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x2, this._y2);

                break;

              case 3:
                point$1(this, this._x1, this._y1);
                break;
            }

            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
                this._x1 = x, this._y1 = y;
                break;

              case 2:
                this._point = 3;
              // proceed

              default:
                point$1(this, x, y);
                break;
            }

            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var cardinal = function custom(tension) {
          function cardinal(context) {
            return new Cardinal(context, tension);
          }

          cardinal.tension = function (tension) {
            return custom(+tension);
          };

          return cardinal;
        }(0);

        function CardinalClosed(context, tension) {
          this._context = context;
          this._k = (1 - tension) / 6;
        }

        CardinalClosed.prototype = {
          areaStart: noop,
          areaEnd: noop,
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 1:
                {
                  this._context.moveTo(this._x3, this._y3);

                  this._context.closePath();

                  break;
                }

              case 2:
                {
                  this._context.lineTo(this._x3, this._y3);

                  this._context.closePath();

                  break;
                }

              case 3:
                {
                  this.point(this._x3, this._y3);
                  this.point(this._x4, this._y4);
                  this.point(this._x5, this._y5);
                  break;
                }
            }
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;

              case 1:
                this._point = 2;

                this._context.moveTo(this._x4 = x, this._y4 = y);

                break;

              case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;

              default:
                point$1(this, x, y);
                break;
            }

            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var cardinalClosed = function custom(tension) {
          function cardinal$$1(context) {
            return new CardinalClosed(context, tension);
          }

          cardinal$$1.tension = function (tension) {
            return custom(+tension);
          };

          return cardinal$$1;
        }(0);

        function CardinalOpen(context, tension) {
          this._context = context;
          this._k = (1 - tension) / 6;
        }

        CardinalOpen.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;

              case 3:
                this._point = 4;
              // proceed

              default:
                point$1(this, x, y);
                break;
            }

            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var cardinalOpen = function custom(tension) {
          function cardinal$$1(context) {
            return new CardinalOpen(context, tension);
          }

          cardinal$$1.tension = function (tension) {
            return custom(+tension);
          };

          return cardinal$$1;
        }(0);

        function point$2(that, x, y) {
          var x1 = that._x1,
              y1 = that._y1,
              x2 = that._x2,
              y2 = that._y2;

          if (that._l01_a > epsilon) {
            var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
                n = 3 * that._l01_a * (that._l01_a + that._l12_a);
            x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
            y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
          }

          if (that._l23_a > epsilon) {
            var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
                m = 3 * that._l23_a * (that._l23_a + that._l12_a);
            x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
            y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
          }

          that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
        }

        function CatmullRom(context, alpha) {
          this._context = context;
          this._alpha = alpha;
        }

        CatmullRom.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
            this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x2, this._y2);

                break;

              case 3:
                this.point(this._x2, this._y2);
                break;
            }

            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            if (this._point) {
              var x23 = this._x2 - x,
                  y23 = this._y2 - y;
              this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
            }

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;
              // proceed

              default:
                point$2(this, x, y);
                break;
            }

            this._l01_a = this._l12_a, this._l12_a = this._l23_a;
            this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var catmullRom = function custom(alpha) {
          function catmullRom(context) {
            return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
          }

          catmullRom.alpha = function (alpha) {
            return custom(+alpha);
          };

          return catmullRom;
        }(0.5);

        function CatmullRomClosed(context, alpha) {
          this._context = context;
          this._alpha = alpha;
        }

        CatmullRomClosed.prototype = {
          areaStart: noop,
          areaEnd: noop,
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
            this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 1:
                {
                  this._context.moveTo(this._x3, this._y3);

                  this._context.closePath();

                  break;
                }

              case 2:
                {
                  this._context.lineTo(this._x3, this._y3);

                  this._context.closePath();

                  break;
                }

              case 3:
                {
                  this.point(this._x3, this._y3);
                  this.point(this._x4, this._y4);
                  this.point(this._x5, this._y5);
                  break;
                }
            }
          },
          point: function point(x, y) {
            x = +x, y = +y;

            if (this._point) {
              var x23 = this._x2 - x,
                  y23 = this._y2 - y;
              this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
            }

            switch (this._point) {
              case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;

              case 1:
                this._point = 2;

                this._context.moveTo(this._x4 = x, this._y4 = y);

                break;

              case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;

              default:
                point$2(this, x, y);
                break;
            }

            this._l01_a = this._l12_a, this._l12_a = this._l23_a;
            this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var catmullRomClosed = function custom(alpha) {
          function catmullRom$$1(context) {
            return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
          }

          catmullRom$$1.alpha = function (alpha) {
            return custom(+alpha);
          };

          return catmullRom$$1;
        }(0.5);

        function CatmullRomOpen(context, alpha) {
          this._context = context;
          this._alpha = alpha;
        }

        CatmullRomOpen.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
            this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            if (this._point) {
              var x23 = this._x2 - x,
                  y23 = this._y2 - y;
              this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
            }

            switch (this._point) {
              case 0:
                this._point = 1;
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;

              case 3:
                this._point = 4;
              // proceed

              default:
                point$2(this, x, y);
                break;
            }

            this._l01_a = this._l12_a, this._l12_a = this._l23_a;
            this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
            this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
          }
        };

        var catmullRomOpen = function custom(alpha) {
          function catmullRom$$1(context) {
            return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
          }

          catmullRom$$1.alpha = function (alpha) {
            return custom(+alpha);
          };

          return catmullRom$$1;
        }(0.5);

        function LinearClosed(context) {
          this._context = context;
        }

        LinearClosed.prototype = {
          areaStart: noop,
          areaEnd: noop,
          lineStart: function lineStart() {
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (this._point) this._context.closePath();
          },
          point: function point(x, y) {
            x = +x, y = +y;
            if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
          }
        };

        function linearClosed(context) {
          return new LinearClosed(context);
        }

        function sign(x) {
          return x < 0 ? -1 : 1;
        } // Calculate the slopes of the tangents (Hermite-type interpolation) based on
        // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
        // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
        // NOV(II), P. 443, 1990.


        function slope3(that, x2, y2) {
          var h0 = that._x1 - that._x0,
              h1 = x2 - that._x1,
              s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
              s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
              p = (s0 * h1 + s1 * h0) / (h0 + h1);
          return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
        } // Calculate a one-sided slope.


        function slope2(that, t) {
          var h = that._x1 - that._x0;
          return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
        } // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
        // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
        // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


        function point$3(that, t0, t1) {
          var x0 = that._x0,
              y0 = that._y0,
              x1 = that._x1,
              y1 = that._y1,
              dx = (x1 - x0) / 3;

          that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
        }

        function MonotoneX(context) {
          this._context = context;
        }

        MonotoneX.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            switch (this._point) {
              case 2:
                this._context.lineTo(this._x1, this._y1);

                break;

              case 3:
                point$3(this, this._t0, slope2(this, this._t0));
                break;
            }

            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            this._line = 1 - this._line;
          },
          point: function point(x, y) {
            var t1 = NaN;
            x = +x, y = +y;
            if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
                break;

              case 2:
                this._point = 3;
                point$3(this, slope2(this, t1 = slope3(this, x, y)), t1);
                break;

              default:
                point$3(this, this._t0, t1 = slope3(this, x, y));
                break;
            }

            this._x0 = this._x1, this._x1 = x;
            this._y0 = this._y1, this._y1 = y;
            this._t0 = t1;
          }
        };

        function MonotoneY(context) {
          this._context = new ReflectContext(context);
        }

        (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
          MonotoneX.prototype.point.call(this, y, x);
        };

        function ReflectContext(context) {
          this._context = context;
        }

        ReflectContext.prototype = {
          moveTo: function moveTo(x, y) {
            this._context.moveTo(y, x);
          },
          closePath: function closePath() {
            this._context.closePath();
          },
          lineTo: function lineTo(x, y) {
            this._context.lineTo(y, x);
          },
          bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
            this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
          }
        };

        function monotoneX(context) {
          return new MonotoneX(context);
        }

        function monotoneY(context) {
          return new MonotoneY(context);
        }

        function Natural(context) {
          this._context = context;
        }

        Natural.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x = [];
            this._y = [];
          },
          lineEnd: function lineEnd() {
            var x = this._x,
                y = this._y,
                n = x.length;

            if (n) {
              this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);

              if (n === 2) {
                this._context.lineTo(x[1], y[1]);
              } else {
                var px = controlPoints(x),
                    py = controlPoints(y);

                for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
                  this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
                }
              }
            }

            if (this._line || this._line !== 0 && n === 1) this._context.closePath();
            this._line = 1 - this._line;
            this._x = this._y = null;
          },
          point: function point(x, y) {
            this._x.push(+x);

            this._y.push(+y);
          }
        }; // See https://www.particleincell.com/2012/bezier-splines/ for derivation.

        function controlPoints(x) {
          var i,
              n = x.length - 1,
              m,
              a = new Array(n),
              b = new Array(n),
              r = new Array(n);
          a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];

          for (i = 1; i < n - 1; ++i) {
            a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
          }

          a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];

          for (i = 1; i < n; ++i) {
            m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
          }

          a[n - 1] = r[n - 1] / b[n - 1];

          for (i = n - 2; i >= 0; --i) {
            a[i] = (r[i] - a[i + 1]) / b[i];
          }

          b[n - 1] = (x[n] + a[n - 1]) / 2;

          for (i = 0; i < n - 1; ++i) {
            b[i] = 2 * x[i + 1] - a[i + 1];
          }

          return [a, b];
        }

        function natural(context) {
          return new Natural(context);
        }

        function Step(context, t) {
          this._context = context;
          this._t = t;
        }

        Step.prototype = {
          areaStart: function areaStart() {
            this._line = 0;
          },
          areaEnd: function areaEnd() {
            this._line = NaN;
          },
          lineStart: function lineStart() {
            this._x = this._y = NaN;
            this._point = 0;
          },
          lineEnd: function lineEnd() {
            if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
            if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
            if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
          },
          point: function point(x, y) {
            x = +x, y = +y;

            switch (this._point) {
              case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;

              case 1:
                this._point = 2;
              // proceed

              default:
                {
                  if (this._t <= 0) {
                    this._context.lineTo(this._x, y);

                    this._context.lineTo(x, y);
                  } else {
                    var x1 = this._x * (1 - this._t) + x * this._t;

                    this._context.lineTo(x1, this._y);

                    this._context.lineTo(x1, y);
                  }

                  break;
                }
            }

            this._x = x, this._y = y;
          }
        };

        function step(context) {
          return new Step(context, 0.5);
        }

        function stepBefore(context) {
          return new Step(context, 0);
        }

        function stepAfter(context) {
          return new Step(context, 1);
        }

        function none(series, order) {
          if (!((n = series.length) > 1)) return;

          for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
            s0 = s1, s1 = series[order[i]];

            for (j = 0; j < m; ++j) {
              s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
            }
          }
        }

        function none$1(series) {
          var n = series.length,
              o = new Array(n);

          while (--n >= 0) {
            o[n] = n;
          }

          return o;
        }

        function stackValue(d, key) {
          return d[key];
        }

        function stack() {
          var keys = constant([]),
              order = none$1,
              offset = none,
              value = stackValue;

          function stack(data) {
            var kz = keys.apply(this, arguments),
                i,
                m = data.length,
                n = kz.length,
                sz = new Array(n),
                oz;

            for (i = 0; i < n; ++i) {
              for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
                si[j] = sij = [0, +value(data[j], ki, j, data)];
                sij.data = data[j];
              }

              si.key = ki;
            }

            for (i = 0, oz = order(sz); i < n; ++i) {
              sz[oz[i]].index = i;
            }

            offset(sz, oz);
            return sz;
          }

          stack.keys = function (_) {
            return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
          };

          stack.value = function (_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
          };

          stack.order = function (_) {
            return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
          };

          stack.offset = function (_) {
            return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
          };

          return stack;
        }

        function expand(series, order) {
          if (!((n = series.length) > 0)) return;

          for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
            for (y = i = 0; i < n; ++i) {
              y += series[i][j][1] || 0;
            }

            if (y) for (i = 0; i < n; ++i) {
              series[i][j][1] /= y;
            }
          }

          none(series, order);
        }

        function diverging(series, order) {
          if (!((n = series.length) > 1)) return;

          for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
            for (yp = yn = 0, i = 0; i < n; ++i) {
              if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
                d[0] = yp, d[1] = yp += dy;
              } else if (dy < 0) {
                d[1] = yn, d[0] = yn += dy;
              } else {
                d[0] = yp;
              }
            }
          }
        }

        function silhouette(series, order) {
          if (!((n = series.length) > 0)) return;

          for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
            for (var i = 0, y = 0; i < n; ++i) {
              y += series[i][j][1] || 0;
            }

            s0[j][1] += s0[j][0] = -y / 2;
          }

          none(series, order);
        }

        function wiggle(series, order) {
          if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;

          for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
            for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
              var si = series[order[i]],
                  sij0 = si[j][1] || 0,
                  sij1 = si[j - 1][1] || 0,
                  s3 = (sij0 - sij1) / 2;

              for (var k = 0; k < i; ++k) {
                var sk = series[order[k]],
                    skj0 = sk[j][1] || 0,
                    skj1 = sk[j - 1][1] || 0;
                s3 += skj0 - skj1;
              }

              s1 += sij0, s2 += s3 * sij0;
            }

            s0[j - 1][1] += s0[j - 1][0] = y;
            if (s1) y -= s2 / s1;
          }

          s0[j - 1][1] += s0[j - 1][0] = y;
          none(series, order);
        }

        function ascending(series) {
          var sums = series.map(sum);
          return none$1(series).sort(function (a, b) {
            return sums[a] - sums[b];
          });
        }

        function sum(series) {
          var s = 0,
              i = -1,
              n = series.length,
              v;

          while (++i < n) {
            if (v = +series[i][1]) s += v;
          }

          return s;
        }

        function descending$1(series) {
          return ascending(series).reverse();
        }

        function insideOut(series) {
          var n = series.length,
              i,
              j,
              sums = series.map(sum),
              order = none$1(series).sort(function (a, b) {
            return sums[b] - sums[a];
          }),
              top = 0,
              bottom = 0,
              tops = [],
              bottoms = [];

          for (i = 0; i < n; ++i) {
            j = order[i];

            if (top < bottom) {
              top += sums[j];
              tops.push(j);
            } else {
              bottom += sums[j];
              bottoms.push(j);
            }
          }

          return bottoms.reverse().concat(tops);
        }

        function reverse(series) {
          return none$1(series).reverse();
        }

        exports.arc = arc;
        exports.area = area;
        exports.line = line;
        exports.pie = pie;
        exports.areaRadial = areaRadial;
        exports.radialArea = areaRadial;
        exports.lineRadial = lineRadial$1;
        exports.radialLine = lineRadial$1;
        exports.pointRadial = pointRadial;
        exports.linkHorizontal = linkHorizontal;
        exports.linkVertical = linkVertical;
        exports.linkRadial = linkRadial;
        exports.symbol = symbol;
        exports.symbols = symbols;
        exports.symbolCircle = circle;
        exports.symbolCross = cross;
        exports.symbolDiamond = diamond;
        exports.symbolSquare = square;
        exports.symbolStar = star;
        exports.symbolTriangle = triangle;
        exports.symbolWye = wye;
        exports.curveBasisClosed = basisClosed;
        exports.curveBasisOpen = basisOpen;
        exports.curveBasis = basis;
        exports.curveBundle = bundle;
        exports.curveCardinalClosed = cardinalClosed;
        exports.curveCardinalOpen = cardinalOpen;
        exports.curveCardinal = cardinal;
        exports.curveCatmullRomClosed = catmullRomClosed;
        exports.curveCatmullRomOpen = catmullRomOpen;
        exports.curveCatmullRom = catmullRom;
        exports.curveLinearClosed = linearClosed;
        exports.curveLinear = curveLinear;
        exports.curveMonotoneX = monotoneX;
        exports.curveMonotoneY = monotoneY;
        exports.curveNatural = natural;
        exports.curveStep = step;
        exports.curveStepAfter = stepAfter;
        exports.curveStepBefore = stepBefore;
        exports.stack = stack;
        exports.stackOffsetExpand = expand;
        exports.stackOffsetDiverging = diverging;
        exports.stackOffsetNone = none;
        exports.stackOffsetSilhouette = silhouette;
        exports.stackOffsetWiggle = wiggle;
        exports.stackOrderAscending = ascending;
        exports.stackOrderDescending = descending$1;
        exports.stackOrderInsideOut = insideOut;
        exports.stackOrderNone = none$1;
        exports.stackOrderReverse = reverse;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {
      "d3-path": 6
    }],
    9: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-time-format/ v2.1.3 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-time')) : typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) : factory(global.d3 = global.d3 || {}, global.d3);
      })(this, function (exports, d3Time) {
        'use strict';

        function localDate(d) {
          if (0 <= d.y && d.y < 100) {
            var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
            date.setFullYear(d.y);
            return date;
          }

          return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
        }

        function utcDate(d) {
          if (0 <= d.y && d.y < 100) {
            var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
            date.setUTCFullYear(d.y);
            return date;
          }

          return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
        }

        function newYear(y) {
          return {
            y: y,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
          };
        }

        function formatLocale(locale) {
          var locale_dateTime = locale.dateTime,
              locale_date = locale.date,
              locale_time = locale.time,
              locale_periods = locale.periods,
              locale_weekdays = locale.days,
              locale_shortWeekdays = locale.shortDays,
              locale_months = locale.months,
              locale_shortMonths = locale.shortMonths;
          var periodRe = formatRe(locale_periods),
              periodLookup = formatLookup(locale_periods),
              weekdayRe = formatRe(locale_weekdays),
              weekdayLookup = formatLookup(locale_weekdays),
              shortWeekdayRe = formatRe(locale_shortWeekdays),
              shortWeekdayLookup = formatLookup(locale_shortWeekdays),
              monthRe = formatRe(locale_months),
              monthLookup = formatLookup(locale_months),
              shortMonthRe = formatRe(locale_shortMonths),
              shortMonthLookup = formatLookup(locale_shortMonths);
          var formats = {
            "a": formatShortWeekday,
            "A": formatWeekday,
            "b": formatShortMonth,
            "B": formatMonth,
            "c": null,
            "d": formatDayOfMonth,
            "e": formatDayOfMonth,
            "f": formatMicroseconds,
            "H": formatHour24,
            "I": formatHour12,
            "j": formatDayOfYear,
            "L": formatMilliseconds,
            "m": formatMonthNumber,
            "M": formatMinutes,
            "p": formatPeriod,
            "Q": formatUnixTimestamp,
            "s": formatUnixTimestampSeconds,
            "S": formatSeconds,
            "u": formatWeekdayNumberMonday,
            "U": formatWeekNumberSunday,
            "V": formatWeekNumberISO,
            "w": formatWeekdayNumberSunday,
            "W": formatWeekNumberMonday,
            "x": null,
            "X": null,
            "y": formatYear,
            "Y": formatFullYear,
            "Z": formatZone,
            "%": formatLiteralPercent
          };
          var utcFormats = {
            "a": formatUTCShortWeekday,
            "A": formatUTCWeekday,
            "b": formatUTCShortMonth,
            "B": formatUTCMonth,
            "c": null,
            "d": formatUTCDayOfMonth,
            "e": formatUTCDayOfMonth,
            "f": formatUTCMicroseconds,
            "H": formatUTCHour24,
            "I": formatUTCHour12,
            "j": formatUTCDayOfYear,
            "L": formatUTCMilliseconds,
            "m": formatUTCMonthNumber,
            "M": formatUTCMinutes,
            "p": formatUTCPeriod,
            "Q": formatUnixTimestamp,
            "s": formatUnixTimestampSeconds,
            "S": formatUTCSeconds,
            "u": formatUTCWeekdayNumberMonday,
            "U": formatUTCWeekNumberSunday,
            "V": formatUTCWeekNumberISO,
            "w": formatUTCWeekdayNumberSunday,
            "W": formatUTCWeekNumberMonday,
            "x": null,
            "X": null,
            "y": formatUTCYear,
            "Y": formatUTCFullYear,
            "Z": formatUTCZone,
            "%": formatLiteralPercent
          };
          var parses = {
            "a": parseShortWeekday,
            "A": parseWeekday,
            "b": parseShortMonth,
            "B": parseMonth,
            "c": parseLocaleDateTime,
            "d": parseDayOfMonth,
            "e": parseDayOfMonth,
            "f": parseMicroseconds,
            "H": parseHour24,
            "I": parseHour24,
            "j": parseDayOfYear,
            "L": parseMilliseconds,
            "m": parseMonthNumber,
            "M": parseMinutes,
            "p": parsePeriod,
            "Q": parseUnixTimestamp,
            "s": parseUnixTimestampSeconds,
            "S": parseSeconds,
            "u": parseWeekdayNumberMonday,
            "U": parseWeekNumberSunday,
            "V": parseWeekNumberISO,
            "w": parseWeekdayNumberSunday,
            "W": parseWeekNumberMonday,
            "x": parseLocaleDate,
            "X": parseLocaleTime,
            "y": parseYear,
            "Y": parseFullYear,
            "Z": parseZone,
            "%": parseLiteralPercent
          }; // These recursive directive definitions must be deferred.

          formats.x = newFormat(locale_date, formats);
          formats.X = newFormat(locale_time, formats);
          formats.c = newFormat(locale_dateTime, formats);
          utcFormats.x = newFormat(locale_date, utcFormats);
          utcFormats.X = newFormat(locale_time, utcFormats);
          utcFormats.c = newFormat(locale_dateTime, utcFormats);

          function newFormat(specifier, formats) {
            return function (date) {
              var string = [],
                  i = -1,
                  j = 0,
                  n = specifier.length,
                  c,
                  pad,
                  format;
              if (!(date instanceof Date)) date = new Date(+date);

              while (++i < n) {
                if (specifier.charCodeAt(i) === 37) {
                  string.push(specifier.slice(j, i));
                  if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
                  if (format = formats[c]) c = format(date, pad);
                  string.push(c);
                  j = i + 1;
                }
              }

              string.push(specifier.slice(j, i));
              return string.join("");
            };
          }

          function newParse(specifier, newDate) {
            return function (string) {
              var d = newYear(1900),
                  i = parseSpecifier(d, specifier, string += "", 0),
                  week,
                  day;
              if (i != string.length) return null; // If a UNIX timestamp is specified, return it.

              if ("Q" in d) return new Date(d.Q); // The am-pm flag is 0 for AM, and 1 for PM.

              if ("p" in d) d.H = d.H % 12 + d.p * 12; // Convert day-of-week and week-of-year to day-of-year.

              if ("V" in d) {
                if (d.V < 1 || d.V > 53) return null;
                if (!("w" in d)) d.w = 1;

                if ("Z" in d) {
                  week = utcDate(newYear(d.y)), day = week.getUTCDay();
                  week = day > 4 || day === 0 ? d3Time.utcMonday.ceil(week) : d3Time.utcMonday(week);
                  week = d3Time.utcDay.offset(week, (d.V - 1) * 7);
                  d.y = week.getUTCFullYear();
                  d.m = week.getUTCMonth();
                  d.d = week.getUTCDate() + (d.w + 6) % 7;
                } else {
                  week = newDate(newYear(d.y)), day = week.getDay();
                  week = day > 4 || day === 0 ? d3Time.timeMonday.ceil(week) : d3Time.timeMonday(week);
                  week = d3Time.timeDay.offset(week, (d.V - 1) * 7);
                  d.y = week.getFullYear();
                  d.m = week.getMonth();
                  d.d = week.getDate() + (d.w + 6) % 7;
                }
              } else if ("W" in d || "U" in d) {
                if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
                day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
                d.m = 0;
                d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
              } // If a time zone is specified, all fields are interpreted as UTC and then
              // offset according to the specified time zone.


              if ("Z" in d) {
                d.H += d.Z / 100 | 0;
                d.M += d.Z % 100;
                return utcDate(d);
              } // Otherwise, all fields are in local time.


              return newDate(d);
            };
          }

          function parseSpecifier(d, specifier, string, j) {
            var i = 0,
                n = specifier.length,
                m = string.length,
                c,
                parse;

            while (i < n) {
              if (j >= m) return -1;
              c = specifier.charCodeAt(i++);

              if (c === 37) {
                c = specifier.charAt(i++);
                parse = parses[c in pads ? specifier.charAt(i++) : c];
                if (!parse || (j = parse(d, string, j)) < 0) return -1;
              } else if (c != string.charCodeAt(j++)) {
                return -1;
              }
            }

            return j;
          }

          function parsePeriod(d, string, i) {
            var n = periodRe.exec(string.slice(i));
            return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
          }

          function parseShortWeekday(d, string, i) {
            var n = shortWeekdayRe.exec(string.slice(i));
            return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
          }

          function parseWeekday(d, string, i) {
            var n = weekdayRe.exec(string.slice(i));
            return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
          }

          function parseShortMonth(d, string, i) {
            var n = shortMonthRe.exec(string.slice(i));
            return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
          }

          function parseMonth(d, string, i) {
            var n = monthRe.exec(string.slice(i));
            return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
          }

          function parseLocaleDateTime(d, string, i) {
            return parseSpecifier(d, locale_dateTime, string, i);
          }

          function parseLocaleDate(d, string, i) {
            return parseSpecifier(d, locale_date, string, i);
          }

          function parseLocaleTime(d, string, i) {
            return parseSpecifier(d, locale_time, string, i);
          }

          function formatShortWeekday(d) {
            return locale_shortWeekdays[d.getDay()];
          }

          function formatWeekday(d) {
            return locale_weekdays[d.getDay()];
          }

          function formatShortMonth(d) {
            return locale_shortMonths[d.getMonth()];
          }

          function formatMonth(d) {
            return locale_months[d.getMonth()];
          }

          function formatPeriod(d) {
            return locale_periods[+(d.getHours() >= 12)];
          }

          function formatUTCShortWeekday(d) {
            return locale_shortWeekdays[d.getUTCDay()];
          }

          function formatUTCWeekday(d) {
            return locale_weekdays[d.getUTCDay()];
          }

          function formatUTCShortMonth(d) {
            return locale_shortMonths[d.getUTCMonth()];
          }

          function formatUTCMonth(d) {
            return locale_months[d.getUTCMonth()];
          }

          function formatUTCPeriod(d) {
            return locale_periods[+(d.getUTCHours() >= 12)];
          }

          return {
            format: function format(specifier) {
              var f = newFormat(specifier += "", formats);

              f.toString = function () {
                return specifier;
              };

              return f;
            },
            parse: function parse(specifier) {
              var p = newParse(specifier += "", localDate);

              p.toString = function () {
                return specifier;
              };

              return p;
            },
            utcFormat: function utcFormat(specifier) {
              var f = newFormat(specifier += "", utcFormats);

              f.toString = function () {
                return specifier;
              };

              return f;
            },
            utcParse: function utcParse(specifier) {
              var p = newParse(specifier, utcDate);

              p.toString = function () {
                return specifier;
              };

              return p;
            }
          };
        }

        var pads = {
          "-": "",
          "_": " ",
          "0": "0"
        },
            numberRe = /^\s*\d+/,
            // note: ignores next directive
        percentRe = /^%/,
            requoteRe = /[\\^$*+?|[\]().{}]/g;

        function pad(value, fill, width) {
          var sign = value < 0 ? "-" : "",
              string = (sign ? -value : value) + "",
              length = string.length;
          return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
        }

        function requote(s) {
          return s.replace(requoteRe, "\\$&");
        }

        function formatRe(names) {
          return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
        }

        function formatLookup(names) {
          var map = {},
              i = -1,
              n = names.length;

          while (++i < n) {
            map[names[i].toLowerCase()] = i;
          }

          return map;
        }

        function parseWeekdayNumberSunday(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 1));
          return n ? (d.w = +n[0], i + n[0].length) : -1;
        }

        function parseWeekdayNumberMonday(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 1));
          return n ? (d.u = +n[0], i + n[0].length) : -1;
        }

        function parseWeekNumberSunday(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.U = +n[0], i + n[0].length) : -1;
        }

        function parseWeekNumberISO(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.V = +n[0], i + n[0].length) : -1;
        }

        function parseWeekNumberMonday(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.W = +n[0], i + n[0].length) : -1;
        }

        function parseFullYear(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 4));
          return n ? (d.y = +n[0], i + n[0].length) : -1;
        }

        function parseYear(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
        }

        function parseZone(d, string, i) {
          var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
          return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
        }

        function parseMonthNumber(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
        }

        function parseDayOfMonth(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.d = +n[0], i + n[0].length) : -1;
        }

        function parseDayOfYear(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 3));
          return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
        }

        function parseHour24(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.H = +n[0], i + n[0].length) : -1;
        }

        function parseMinutes(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.M = +n[0], i + n[0].length) : -1;
        }

        function parseSeconds(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 2));
          return n ? (d.S = +n[0], i + n[0].length) : -1;
        }

        function parseMilliseconds(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 3));
          return n ? (d.L = +n[0], i + n[0].length) : -1;
        }

        function parseMicroseconds(d, string, i) {
          var n = numberRe.exec(string.slice(i, i + 6));
          return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
        }

        function parseLiteralPercent(d, string, i) {
          var n = percentRe.exec(string.slice(i, i + 1));
          return n ? i + n[0].length : -1;
        }

        function parseUnixTimestamp(d, string, i) {
          var n = numberRe.exec(string.slice(i));
          return n ? (d.Q = +n[0], i + n[0].length) : -1;
        }

        function parseUnixTimestampSeconds(d, string, i) {
          var n = numberRe.exec(string.slice(i));
          return n ? (d.Q = +n[0] * 1000, i + n[0].length) : -1;
        }

        function formatDayOfMonth(d, p) {
          return pad(d.getDate(), p, 2);
        }

        function formatHour24(d, p) {
          return pad(d.getHours(), p, 2);
        }

        function formatHour12(d, p) {
          return pad(d.getHours() % 12 || 12, p, 2);
        }

        function formatDayOfYear(d, p) {
          return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
        }

        function formatMilliseconds(d, p) {
          return pad(d.getMilliseconds(), p, 3);
        }

        function formatMicroseconds(d, p) {
          return formatMilliseconds(d, p) + "000";
        }

        function formatMonthNumber(d, p) {
          return pad(d.getMonth() + 1, p, 2);
        }

        function formatMinutes(d, p) {
          return pad(d.getMinutes(), p, 2);
        }

        function formatSeconds(d, p) {
          return pad(d.getSeconds(), p, 2);
        }

        function formatWeekdayNumberMonday(d) {
          var day = d.getDay();
          return day === 0 ? 7 : day;
        }

        function formatWeekNumberSunday(d, p) {
          return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
        }

        function formatWeekNumberISO(d, p) {
          var day = d.getDay();
          d = day >= 4 || day === 0 ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
          return pad(d3Time.timeThursday.count(d3Time.timeYear(d), d) + (d3Time.timeYear(d).getDay() === 4), p, 2);
        }

        function formatWeekdayNumberSunday(d) {
          return d.getDay();
        }

        function formatWeekNumberMonday(d, p) {
          return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
        }

        function formatYear(d, p) {
          return pad(d.getFullYear() % 100, p, 2);
        }

        function formatFullYear(d, p) {
          return pad(d.getFullYear() % 10000, p, 4);
        }

        function formatZone(d) {
          var z = d.getTimezoneOffset();
          return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
        }

        function formatUTCDayOfMonth(d, p) {
          return pad(d.getUTCDate(), p, 2);
        }

        function formatUTCHour24(d, p) {
          return pad(d.getUTCHours(), p, 2);
        }

        function formatUTCHour12(d, p) {
          return pad(d.getUTCHours() % 12 || 12, p, 2);
        }

        function formatUTCDayOfYear(d, p) {
          return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
        }

        function formatUTCMilliseconds(d, p) {
          return pad(d.getUTCMilliseconds(), p, 3);
        }

        function formatUTCMicroseconds(d, p) {
          return formatUTCMilliseconds(d, p) + "000";
        }

        function formatUTCMonthNumber(d, p) {
          return pad(d.getUTCMonth() + 1, p, 2);
        }

        function formatUTCMinutes(d, p) {
          return pad(d.getUTCMinutes(), p, 2);
        }

        function formatUTCSeconds(d, p) {
          return pad(d.getUTCSeconds(), p, 2);
        }

        function formatUTCWeekdayNumberMonday(d) {
          var dow = d.getUTCDay();
          return dow === 0 ? 7 : dow;
        }

        function formatUTCWeekNumberSunday(d, p) {
          return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
        }

        function formatUTCWeekNumberISO(d, p) {
          var day = d.getUTCDay();
          d = day >= 4 || day === 0 ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
          return pad(d3Time.utcThursday.count(d3Time.utcYear(d), d) + (d3Time.utcYear(d).getUTCDay() === 4), p, 2);
        }

        function formatUTCWeekdayNumberSunday(d) {
          return d.getUTCDay();
        }

        function formatUTCWeekNumberMonday(d, p) {
          return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
        }

        function formatUTCYear(d, p) {
          return pad(d.getUTCFullYear() % 100, p, 2);
        }

        function formatUTCFullYear(d, p) {
          return pad(d.getUTCFullYear() % 10000, p, 4);
        }

        function formatUTCZone() {
          return "+0000";
        }

        function formatLiteralPercent() {
          return "%";
        }

        function formatUnixTimestamp(d) {
          return +d;
        }

        function formatUnixTimestampSeconds(d) {
          return Math.floor(+d / 1000);
        }

        var locale;
        defaultLocale({
          dateTime: "%x, %X",
          date: "%-m/%-d/%Y",
          time: "%-I:%M:%S %p",
          periods: ["AM", "PM"],
          days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        });

        function defaultLocale(definition) {
          locale = formatLocale(definition);
          exports.timeFormat = locale.format;
          exports.timeParse = locale.parse;
          exports.utcFormat = locale.utcFormat;
          exports.utcParse = locale.utcParse;
          return locale;
        }

        var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

        function formatIsoNative(date) {
          return date.toISOString();
        }

        var formatIso = Date.prototype.toISOString ? formatIsoNative : exports.utcFormat(isoSpecifier);

        function parseIsoNative(string) {
          var date = new Date(string);
          return isNaN(date) ? null : date;
        }

        var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : exports.utcParse(isoSpecifier);
        exports.timeFormatDefaultLocale = defaultLocale;
        exports.timeFormatLocale = formatLocale;
        exports.isoFormat = formatIso;
        exports.isoParse = parseIso;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {
      "d3-time": 10
    }],
    10: [function (_dereq_, module, exports) {
      // https://d3js.org/d3-time/ v1.0.10 Copyright 2018 Mike Bostock
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.d3 = global.d3 || {});
      })(this, function (exports) {
        'use strict';

        var t0 = new Date(),
            t1 = new Date();

        function newInterval(floori, offseti, count, field) {
          function interval(date) {
            return floori(date = new Date(+date)), date;
          }

          interval.floor = interval;

          interval.ceil = function (date) {
            return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
          };

          interval.round = function (date) {
            var d0 = interval(date),
                d1 = interval.ceil(date);
            return date - d0 < d1 - date ? d0 : d1;
          };

          interval.offset = function (date, step) {
            return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
          };

          interval.range = function (start, stop, step) {
            var range = [],
                previous;
            start = interval.ceil(start);
            step = step == null ? 1 : Math.floor(step);
            if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date

            do {
              range.push(previous = new Date(+start)), offseti(start, step), floori(start);
            } while (previous < start && start < stop);

            return range;
          };

          interval.filter = function (test) {
            return newInterval(function (date) {
              if (date >= date) while (floori(date), !test(date)) {
                date.setTime(date - 1);
              }
            }, function (date, step) {
              if (date >= date) {
                if (step < 0) while (++step <= 0) {
                  while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty

                } else while (--step >= 0) {
                  while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty

                }
              }
            });
          };

          if (count) {
            interval.count = function (start, end) {
              t0.setTime(+start), t1.setTime(+end);
              floori(t0), floori(t1);
              return Math.floor(count(t0, t1));
            };

            interval.every = function (step) {
              step = Math.floor(step);
              return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
                return field(d) % step === 0;
              } : function (d) {
                return interval.count(0, d) % step === 0;
              });
            };
          }

          return interval;
        }

        var millisecond = newInterval(function () {// noop
        }, function (date, step) {
          date.setTime(+date + step);
        }, function (start, end) {
          return end - start;
        }); // An optimized implementation for this simple case.

        millisecond.every = function (k) {
          k = Math.floor(k);
          if (!isFinite(k) || !(k > 0)) return null;
          if (!(k > 1)) return millisecond;
          return newInterval(function (date) {
            date.setTime(Math.floor(date / k) * k);
          }, function (date, step) {
            date.setTime(+date + step * k);
          }, function (start, end) {
            return (end - start) / k;
          });
        };

        var milliseconds = millisecond.range;
        var durationSecond = 1e3;
        var durationMinute = 6e4;
        var durationHour = 36e5;
        var durationDay = 864e5;
        var durationWeek = 6048e5;
        var second = newInterval(function (date) {
          date.setTime(Math.floor(date / durationSecond) * durationSecond);
        }, function (date, step) {
          date.setTime(+date + step * durationSecond);
        }, function (start, end) {
          return (end - start) / durationSecond;
        }, function (date) {
          return date.getUTCSeconds();
        });
        var seconds = second.range;
        var minute = newInterval(function (date) {
          date.setTime(Math.floor(date / durationMinute) * durationMinute);
        }, function (date, step) {
          date.setTime(+date + step * durationMinute);
        }, function (start, end) {
          return (end - start) / durationMinute;
        }, function (date) {
          return date.getMinutes();
        });
        var minutes = minute.range;
        var hour = newInterval(function (date) {
          var offset = date.getTimezoneOffset() * durationMinute % durationHour;
          if (offset < 0) offset += durationHour;
          date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
        }, function (date, step) {
          date.setTime(+date + step * durationHour);
        }, function (start, end) {
          return (end - start) / durationHour;
        }, function (date) {
          return date.getHours();
        });
        var hours = hour.range;
        var day = newInterval(function (date) {
          date.setHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setDate(date.getDate() + step);
        }, function (start, end) {
          return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
        }, function (date) {
          return date.getDate() - 1;
        });
        var days = day.range;

        function weekday(i) {
          return newInterval(function (date) {
            date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
            date.setHours(0, 0, 0, 0);
          }, function (date, step) {
            date.setDate(date.getDate() + step * 7);
          }, function (start, end) {
            return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
          });
        }

        var sunday = weekday(0);
        var monday = weekday(1);
        var tuesday = weekday(2);
        var wednesday = weekday(3);
        var thursday = weekday(4);
        var friday = weekday(5);
        var saturday = weekday(6);
        var sundays = sunday.range;
        var mondays = monday.range;
        var tuesdays = tuesday.range;
        var wednesdays = wednesday.range;
        var thursdays = thursday.range;
        var fridays = friday.range;
        var saturdays = saturday.range;
        var month = newInterval(function (date) {
          date.setDate(1);
          date.setHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setMonth(date.getMonth() + step);
        }, function (start, end) {
          return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
        }, function (date) {
          return date.getMonth();
        });
        var months = month.range;
        var year = newInterval(function (date) {
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setFullYear(date.getFullYear() + step);
        }, function (start, end) {
          return end.getFullYear() - start.getFullYear();
        }, function (date) {
          return date.getFullYear();
        }); // An optimized implementation for this simple case.

        year.every = function (k) {
          return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
            date.setFullYear(Math.floor(date.getFullYear() / k) * k);
            date.setMonth(0, 1);
            date.setHours(0, 0, 0, 0);
          }, function (date, step) {
            date.setFullYear(date.getFullYear() + step * k);
          });
        };

        var years = year.range;
        var utcMinute = newInterval(function (date) {
          date.setUTCSeconds(0, 0);
        }, function (date, step) {
          date.setTime(+date + step * durationMinute);
        }, function (start, end) {
          return (end - start) / durationMinute;
        }, function (date) {
          return date.getUTCMinutes();
        });
        var utcMinutes = utcMinute.range;
        var utcHour = newInterval(function (date) {
          date.setUTCMinutes(0, 0, 0);
        }, function (date, step) {
          date.setTime(+date + step * durationHour);
        }, function (start, end) {
          return (end - start) / durationHour;
        }, function (date) {
          return date.getUTCHours();
        });
        var utcHours = utcHour.range;
        var utcDay = newInterval(function (date) {
          date.setUTCHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setUTCDate(date.getUTCDate() + step);
        }, function (start, end) {
          return (end - start) / durationDay;
        }, function (date) {
          return date.getUTCDate() - 1;
        });
        var utcDays = utcDay.range;

        function utcWeekday(i) {
          return newInterval(function (date) {
            date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
            date.setUTCHours(0, 0, 0, 0);
          }, function (date, step) {
            date.setUTCDate(date.getUTCDate() + step * 7);
          }, function (start, end) {
            return (end - start) / durationWeek;
          });
        }

        var utcSunday = utcWeekday(0);
        var utcMonday = utcWeekday(1);
        var utcTuesday = utcWeekday(2);
        var utcWednesday = utcWeekday(3);
        var utcThursday = utcWeekday(4);
        var utcFriday = utcWeekday(5);
        var utcSaturday = utcWeekday(6);
        var utcSundays = utcSunday.range;
        var utcMondays = utcMonday.range;
        var utcTuesdays = utcTuesday.range;
        var utcWednesdays = utcWednesday.range;
        var utcThursdays = utcThursday.range;
        var utcFridays = utcFriday.range;
        var utcSaturdays = utcSaturday.range;
        var utcMonth = newInterval(function (date) {
          date.setUTCDate(1);
          date.setUTCHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setUTCMonth(date.getUTCMonth() + step);
        }, function (start, end) {
          return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
        }, function (date) {
          return date.getUTCMonth();
        });
        var utcMonths = utcMonth.range;
        var utcYear = newInterval(function (date) {
          date.setUTCMonth(0, 1);
          date.setUTCHours(0, 0, 0, 0);
        }, function (date, step) {
          date.setUTCFullYear(date.getUTCFullYear() + step);
        }, function (start, end) {
          return end.getUTCFullYear() - start.getUTCFullYear();
        }, function (date) {
          return date.getUTCFullYear();
        }); // An optimized implementation for this simple case.

        utcYear.every = function (k) {
          return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
            date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
            date.setUTCMonth(0, 1);
            date.setUTCHours(0, 0, 0, 0);
          }, function (date, step) {
            date.setUTCFullYear(date.getUTCFullYear() + step * k);
          });
        };

        var utcYears = utcYear.range;
        exports.timeInterval = newInterval;
        exports.timeMillisecond = millisecond;
        exports.timeMilliseconds = milliseconds;
        exports.utcMillisecond = millisecond;
        exports.utcMilliseconds = milliseconds;
        exports.timeSecond = second;
        exports.timeSeconds = seconds;
        exports.utcSecond = second;
        exports.utcSeconds = seconds;
        exports.timeMinute = minute;
        exports.timeMinutes = minutes;
        exports.timeHour = hour;
        exports.timeHours = hours;
        exports.timeDay = day;
        exports.timeDays = days;
        exports.timeWeek = sunday;
        exports.timeWeeks = sundays;
        exports.timeSunday = sunday;
        exports.timeSundays = sundays;
        exports.timeMonday = monday;
        exports.timeMondays = mondays;
        exports.timeTuesday = tuesday;
        exports.timeTuesdays = tuesdays;
        exports.timeWednesday = wednesday;
        exports.timeWednesdays = wednesdays;
        exports.timeThursday = thursday;
        exports.timeThursdays = thursdays;
        exports.timeFriday = friday;
        exports.timeFridays = fridays;
        exports.timeSaturday = saturday;
        exports.timeSaturdays = saturdays;
        exports.timeMonth = month;
        exports.timeMonths = months;
        exports.timeYear = year;
        exports.timeYears = years;
        exports.utcMinute = utcMinute;
        exports.utcMinutes = utcMinutes;
        exports.utcHour = utcHour;
        exports.utcHours = utcHours;
        exports.utcDay = utcDay;
        exports.utcDays = utcDays;
        exports.utcWeek = utcSunday;
        exports.utcWeeks = utcSundays;
        exports.utcSunday = utcSunday;
        exports.utcSundays = utcSundays;
        exports.utcMonday = utcMonday;
        exports.utcMondays = utcMondays;
        exports.utcTuesday = utcTuesday;
        exports.utcTuesdays = utcTuesdays;
        exports.utcWednesday = utcWednesday;
        exports.utcWednesdays = utcWednesdays;
        exports.utcThursday = utcThursday;
        exports.utcThursdays = utcThursdays;
        exports.utcFriday = utcFriday;
        exports.utcFridays = utcFridays;
        exports.utcSaturday = utcSaturday;
        exports.utcSaturdays = utcSaturdays;
        exports.utcMonth = utcMonth;
        exports.utcMonths = utcMonths;
        exports.utcYear = utcYear;
        exports.utcYears = utcYears;
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
      });
    }, {}],
    11: [function (_dereq_, module, exports) {
      (function (global) {
        !function (e) {
          if ("object" == _typeof2(exports) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).fitAspect = e();
          }
        }(function () {
          return function a(o, s, d) {
            function c(t, e) {
              if (!s[t]) {
                if (!o[t]) {
                  var i = "function" == typeof _dereq_ && _dereq_;
                  if (!e && i) return i(t, !0);
                  if (p) return p(t, !0);
                  var n = new Error("Cannot find module '" + t + "'");
                  throw n.code = "MODULE_NOT_FOUND", n;
                }

                var r = s[t] = {
                  exports: {}
                };
                o[t][0].call(r.exports, function (e) {
                  return c(o[t][1][e] || e);
                }, r, r.exports, a, o, s, d);
              }

              return s[t].exports;
            }

            for (var p = "function" == typeof _dereq_ && _dereq_, e = 0; e < d.length; e++) {
              c(d[e]);
            }

            return c;
          }({
            1: [function (e, t, i) {
              "use strict";

              var n = [{
                names: ["square", "1:1", "instagram"],
                description: "Square",
                decimal: 1,
                orientation: "landscape"
              }, {
                names: ["4:3", "fullscreen", "four three", "1.33:1", "ipad", "pythagorean"],
                description: "Traditional TVs",
                decimal: 1.333333,
                orientation: "landscape"
              }, {
                names: ["a4", "√2:1", "paper", "lichtenberg", "1:1.41"],
                description: "A4 paper",
                decimal: 1.41
              }, {
                names: ["imax", "1.43:1"],
                description: "IMAX film",
                decimal: 1.43,
                orientation: "landscape"
              }, {
                names: ["3:2", "35mm", "photo", "1.5:1", "1.5"],
                description: "35mm photos",
                decimal: 1.5,
                orientation: "landscape"
              }, {
                names: ["business card", "bank card", "1.58:1"],
                description: "Bank Cards",
                decimal: 1.58577,
                orientation: "landscape"
              }, {
                names: ["golden", "kepler", "1.618", "1.6:1"],
                description: "Golden ratio",
                decimal: 1.61803,
                orientation: "landscape"
              }, {
                names: ["16:9", "hd", "hdtv", "fhd", "tv", "computer", "iphone", "4k", "8k", "1.78:1"],
                description: "HD video",
                decimal: 1.77777,
                orientation: "landscape"
              }, {
                names: ["widescreen", "1.85:1"],
                description: "Movie-theatres",
                decimal: 1.85,
                orientation: "landscape"
              }, {
                names: ["2:1", "univisium", "mobile", "18:9"],
                description: "2:1",
                decimal: 2,
                orientation: "landscape"
              }, {
                names: ["cinemascope", "widescreen", "wide", "2.35:1", "2.39:1"],
                description: "Widescreen",
                decimal: 2.35,
                orientation: "landscape"
              }, {
                names: ["silver", "1 + √2", "2.41:1"],
                description: "Silver ratio",
                decimal: 2.41,
                orientation: "landscape"
              }],
                  r = n.map(function (e) {
                return (e = Object.assign({}, e)).decimal = 1 / e.decimal, e.orientation = "portrait", e;
              }),
                  a = {};
              n.forEach(function (t) {
                t.names.forEach(function (e) {
                  a[e] = t;
                });
              }), t.exports = {
                lookup: a,
                portraits: r,
                list: n
              };
            }, {}],
            2: [function (e, t, i) {
              "use strict";

              var n = e("./aspects");

              t.exports = function (e, t) {
                var i = e / t;
                return (i = parseInt(100 * i, 10) / 100) < 1 ? function (e, t) {
                  for (var i = 0; i < t.length; i += 1) {
                    if (e > t[i].decimal) {
                      if (t[i - 1]) {
                        var n = Math.abs(e - t[i].decimal);
                        if (Math.abs(e - t[i - 1].decimal) < n) return t[i - 1];
                      }

                      return t[i];
                    }
                  }

                  return t[t.length - 1];
                }(i, n.portraits) : function (e, t) {
                  for (var i = 0; i < t.length; i += 1) {
                    if (e <= t[i].decimal) {
                      if (t[i - 1]) {
                        var n = Math.abs(e - t[i].decimal);
                        if (Math.abs(e - t[i - 1].decimal) < n) return t[i - 1];
                      }

                      return t[i];
                    }
                  }

                  return t[t.length - 1];
                }(i, n.list);
              };
            }, {
              "./aspects": 1
            }],
            3: [function (i, n, e) {
              (function (e) {
                "use strict";

                var f = i("./find-best-ratio"),
                    u = i("./parse-ratio"),
                    t = function t() {
                  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};

                  if ("number" == typeof e.width && "number" == typeof e.height) {
                    var t = f(e.width, e.height),
                        i = 1 / t.decimal,
                        n = e.width * i,
                        r = (n - e.height) / e.height;
                    return r = parseInt(1e3 * r, 10) / 10, n = Math.round(n), {
                      aspect: t,
                      percent_change: r,
                      width: e.width,
                      height: n
                    };
                  }

                  var a = u(e.aspect || e.ratio || "");
                  if (null === a) return console.error("find-aspect-ratio error: Could not find a given aspect ratio."), e;

                  if ("number" == typeof e.width) {
                    var o = 1 / a.decimal,
                        s = e.orientation || "landscape";
                    "portrait" === s && (o = 1 / o);
                    var d = e.width * o;
                    return d = Math.round(d), {
                      aspect: a,
                      width: e.width,
                      height: d,
                      orientation: s
                    };
                  }

                  if ("number" != typeof e.height) return console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."), e;
                  var c = a.decimal,
                      p = e.orientation || "landscape";
                  "portrait" === p && (c = 1 / c);
                  var l = e.height * c;
                  return {
                    aspect: a,
                    width: l = Math.round(l),
                    height: e.height,
                    orientation: p
                  };
                };

                "undefined" != typeof self ? self.nlp = t : "undefined" != typeof window ? window.nlp = t : void 0 !== e && (e.nlp = t), void 0 !== n && (n.exports = t);
              }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            }, {
              "./find-best-ratio": 2,
              "./parse-ratio": 4
            }],
            4: [function (e, t, i) {
              "use strict";

              var n = e("./aspects"),
                  r = /^[0-9\.]+:[0-9\.]+$/;

              t.exports = function (e) {
                if (e = (e = (e = (e = e.toLowerCase()).trim()).replace(" ratio", "")).replace("-", " "), !0 === n.lookup.hasOwnProperty(e)) return n.lookup[e];
                if (!0 !== r.test(e)) return null;
                var t = e.split(":");
                return {
                  description: "custom",
                  decimal: parseFloat(t[0]) / parseFloat(t[1])
                };
              };
            }, {
              "./aspects": 1
            }]
          }, {}, [3])(3);
        });
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    12: [function (_dereq_, module, exports) {
      !function (t, n) {
        "object" == _typeof2(exports) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(t.flubber = t.flubber || {});
      }(this, function (t) {
        "use strict";

        function n(t) {
          return 10 === t || 13 === t || 8232 === t || 8233 === t || 32 === t || 9 === t || 11 === t || 12 === t || 160 === t || t >= 5760 && an.indexOf(t) >= 0;
        }

        function e(t) {
          switch (32 | t) {
            case 109:
            case 122:
            case 108:
            case 104:
            case 118:
            case 99:
            case 115:
            case 113:
            case 116:
            case 97:
            case 114:
              return !0;
          }

          return !1;
        }

        function r(t) {
          return t >= 48 && t <= 57;
        }

        function i(t) {
          return t >= 48 && t <= 57 || 43 === t || 45 === t || 46 === t;
        }

        function a(t) {
          this.index = 0, this.path = t, this.max = t.length, this.result = [], this.param = 0, this.err = "", this.segmentStart = 0, this.data = [];
        }

        function o(t) {
          for (; t.index < t.max && n(t.path.charCodeAt(t.index));) {
            t.index++;
          }
        }

        function s(t) {
          var n,
              e = t.index,
              i = e,
              a = t.max,
              o = !1,
              s = !1,
              h = !1,
              u = !1;
          if (i >= a) return void (t.err = "SvgPath: missed param (at pos " + i + ")");
          if (n = t.path.charCodeAt(i), 43 !== n && 45 !== n || (i++, n = i < a ? t.path.charCodeAt(i) : 0), !r(n) && 46 !== n) return void (t.err = "SvgPath: param should start with 0..9 or `.` (at pos " + i + ")");

          if (46 !== n) {
            if (o = 48 === n, i++, n = i < a ? t.path.charCodeAt(i) : 0, o && i < a && n && r(n)) return void (t.err = "SvgPath: numbers started with `0` such as `09` are ilegal (at pos " + e + ")");

            for (; i < a && r(t.path.charCodeAt(i));) {
              i++, s = !0;
            }

            n = i < a ? t.path.charCodeAt(i) : 0;
          }

          if (46 === n) {
            for (u = !0, i++; r(t.path.charCodeAt(i));) {
              i++, h = !0;
            }

            n = i < a ? t.path.charCodeAt(i) : 0;
          }

          if (101 === n || 69 === n) {
            if (u && !s && !h) return void (t.err = "SvgPath: invalid float exponent (at pos " + i + ")");
            if (i++, n = i < a ? t.path.charCodeAt(i) : 0, 43 !== n && 45 !== n || i++, !(i < a && r(t.path.charCodeAt(i)))) return void (t.err = "SvgPath: invalid float exponent (at pos " + i + ")");

            for (; i < a && r(t.path.charCodeAt(i));) {
              i++;
            }
          }

          t.index = i, t.param = parseFloat(t.path.slice(e, i)) + 0;
        }

        function h(t) {
          var n, e;
          n = t.path[t.segmentStart], e = n.toLowerCase();
          var r = t.data;
          if ("m" === e && r.length > 2 && (t.result.push([n, r[0], r[1]]), r = r.slice(2), e = "l", n = "m" === n ? "l" : "L"), "r" === e) t.result.push([n].concat(r));else for (; r.length >= rn[e] && (t.result.push([n].concat(r.splice(0, rn[e]))), rn[e]);) {
            ;
          }
        }

        function u(t) {
          var n,
              r,
              a,
              u,
              c = t.max;
          if (t.segmentStart = t.index, n = t.path.charCodeAt(t.index), !e(n)) return void (t.err = "SvgPath: bad command " + t.path[t.index] + " (at pos " + t.index + ")");
          if (a = rn[t.path[t.index].toLowerCase()], t.index++, o(t), t.data = [], !a) return void h(t);

          for (r = !1;;) {
            for (u = a; u > 0; u--) {
              if (s(t), t.err.length) return;
              t.data.push(t.param), o(t), r = !1, t.index < c && 44 === t.path.charCodeAt(t.index) && (t.index++, o(t), r = !0);
            }

            if (!r) {
              if (t.index >= t.max) break;
              if (!i(t.path.charCodeAt(t.index))) break;
            }
          }

          h(t);
        }

        function c(t, n) {
          return [t[0] * n[0] + t[2] * n[1], t[1] * n[0] + t[3] * n[1], t[0] * n[2] + t[2] * n[3], t[1] * n[2] + t[3] * n[3], t[0] * n[4] + t[2] * n[5] + t[4], t[1] * n[4] + t[3] * n[5] + t[5]];
        }

        function f() {
          if (!(this instanceof f)) return new f();
          this.queue = [], this.cache = null;
        }

        function l(t, n, e, r) {
          var i = t * r - n * e < 0 ? -1 : 1,
              a = Math.sqrt(t * t + n * n),
              o = Math.sqrt(t * t + n * n),
              s = t * e + n * r,
              h = s / (a * o);
          return h > 1 && (h = 1), h < -1 && (h = -1), i * Math.acos(h);
        }

        function p(t, n, e, r, i, a, o, s, h, u) {
          var c = u * (t - e) / 2 + h * (n - r) / 2,
              f = -h * (t - e) / 2 + u * (n - r) / 2,
              p = o * o,
              g = s * s,
              v = c * c,
              x = f * f,
              y = p * g - p * x - g * v;
          y < 0 && (y = 0), y /= p * x + g * v, y = Math.sqrt(y) * (i === a ? -1 : 1);
          var d = y * o / s * f,
              m = y * -s / o * c,
              M = u * d - h * m + (t + e) / 2,
              w = h * d + u * m + (n + r) / 2,
              b = (c - d) / o,
              L = (f - m) / s,
              A = (-c - d) / o,
              q = (-f - m) / s,
              k = l(1, 0, b, L),
              P = l(b, L, A, q);
          return 0 === a && P > 0 && (P -= ln), 1 === a && P < 0 && (P += ln), [M, w, k, P];
        }

        function g(t, n) {
          var e = 4 / 3 * Math.tan(n / 4),
              r = Math.cos(t),
              i = Math.sin(t),
              a = Math.cos(t + n),
              o = Math.sin(t + n);
          return [r, i, r - i * e, i + r * e, a + o * e, o - a * e, a, o];
        }

        function v(t, n, e) {
          if (!(this instanceof v)) return new v(t, n, e);
          this.rx = t, this.ry = n, this.ax = e;
        }

        function x(t) {
          if (!(this instanceof x)) return new x(t);
          var n = on(t);
          this.segments = n.segments, this.err = n.err, this.__stack = [];
        }

        function y(t) {
          var n = t.match(wn);
          return n ? n.map(Number) : [];
        }

        function d(t, n, e, r, i, a, o, s) {
          this.a = {
            x: t,
            y: n
          }, this.b = {
            x: e,
            y: r
          }, this.c = {
            x: i,
            y: a
          }, this.d = {
            x: o,
            y: s
          }, null !== o && void 0 !== o && null !== s && void 0 !== s ? (this.getArcLength = _, this.getPoint = L, this.getDerivative = M) : (this.getArcLength = A, this.getPoint = b, this.getDerivative = m), this.init();
        }

        function m(t, n, e) {
          return {
            x: 2 * (1 - e) * (t[1] - t[0]) + 2 * e * (t[2] - t[1]),
            y: 2 * (1 - e) * (n[1] - n[0]) + 2 * e * (n[2] - n[1])
          };
        }

        function M(t, n, e) {
          return b([3 * (t[1] - t[0]), 3 * (t[2] - t[1]), 3 * (t[3] - t[2])], [3 * (n[1] - n[0]), 3 * (n[2] - n[1]), 3 * (n[3] - n[2])], e);
        }

        function w(t, n, e, r, i) {
          for (var a = 1, o = t / n, s = (t - e(r, i, o)) / n; a > .001;) {
            var h = e(r, i, o + s),
                u = e(r, i, o - s),
                c = Math.abs(t - h) / n,
                f = Math.abs(t - u) / n;
            c < a ? (a = c, o += s) : f < a ? (a = f, o -= s) : s /= 2;
          }

          return o;
        }

        function b(t, n, e) {
          return {
            x: (1 - e) * (1 - e) * t[0] + 2 * (1 - e) * e * t[1] + e * e * t[2],
            y: (1 - e) * (1 - e) * n[0] + 2 * (1 - e) * e * n[1] + e * e * n[2]
          };
        }

        function L(t, n, e) {
          return {
            x: (1 - e) * (1 - e) * (1 - e) * t[0] + 3 * (1 - e) * (1 - e) * e * t[1] + 3 * (1 - e) * e * e * t[2] + e * e * e * t[3],
            y: (1 - e) * (1 - e) * (1 - e) * n[0] + 3 * (1 - e) * (1 - e) * e * n[1] + 3 * (1 - e) * e * e * n[2] + e * e * e * n[3]
          };
        }

        function A(t, n, e) {
          void 0 === e && (e = 1);
          var r = t[0] - 2 * t[1] + t[2],
              i = n[0] - 2 * n[1] + n[2],
              a = 2 * t[1] - 2 * t[0],
              o = 2 * n[1] - 2 * n[0],
              s = 4 * (r * r + i * i),
              h = 4 * (r * a + i * o),
              u = a * a + o * o;
          if (0 === s) return e * Math.sqrt(Math.pow(t[2] - t[0], 2) + Math.pow(n[2] - n[0], 2));
          var c = h / (2 * s),
              f = u / s,
              l = e + c,
              p = f - c * c;
          return Math.sqrt(s) / 2 * (l * Math.sqrt(l * l + p) - c * Math.sqrt(c * c + p) + p * Math.log(Math.abs((l + Math.sqrt(l * l + p)) / (c + Math.sqrt(c * c + p)))));
        }

        function q(t, n) {
          return qn[t][n];
        }

        function k(t, n, e) {
          var r,
              i,
              a,
              o = e.length - 1;
          if (0 === o) return 0;

          if (0 === t) {
            for (i = 0, a = 0; a <= o; a++) {
              i += q(o, a) * Math.pow(1 - n, o - a) * Math.pow(n, a) * e[a];
            }

            return i;
          }

          for (r = new Array(o), a = 0; a < o; a++) {
            r[a] = o * (e[a + 1] - e[a]);
          }

          return k(t - 1, n, r);
        }

        function P(t, n, e) {
          var r = k(1, e, t),
              i = k(1, e, n),
              a = r * r + i * i;
          return Math.sqrt(a);
        }

        function _(t, n, e) {
          var r, i, a, o;
          void 0 === e && (e = 1);

          for (r = e / 2, i = 0, a = 0; a < 20; a++) {
            o = r * Ln[20][a] + r, i += An[20][a] * P(t, n, o);
          }

          return r * i;
        }

        function E(t, n, e, r) {
          var i = t * r - n * e < 0 ? -1 : 1,
              a = t * e + n * r;
          return a > 1 && (a = 1), a < -1 && (a = -1), i * Math.acos(a);
        }

        function S(t, n, e, r, i, a, o, s, h, u) {
          var c = u * (t - e) / 2 + h * (n - r) / 2,
              f = -h * (t - e) / 2 + u * (n - r) / 2,
              l = o * o,
              p = s * s,
              g = c * c,
              v = f * f,
              x = l * p - l * v - p * g;
          x < 0 && (x = 0), x /= l * v + p * g, x = Math.sqrt(x) * (i === a ? -1 : 1);
          var y = x * o / s * f,
              d = x * -s / o * c,
              m = u * y - h * d + (t + e) / 2,
              M = h * y + u * d + (n + r) / 2,
              w = (c - y) / o,
              b = (f - d) / s,
              L = (-c - y) / o,
              A = (-f - d) / s,
              q = E(1, 0, w, b),
              k = E(w, b, L, A);
          return 0 === a && k > 0 && (k -= kn), 1 === a && k < 0 && (k += kn), [m, M, q, k];
        }

        function C(t, n) {
          var e = 4 / 3 * Math.tan(n / 4),
              r = Math.cos(t),
              i = Math.sin(t),
              a = Math.cos(t + n),
              o = Math.sin(t + n);
          return [r, i, r - i * e, i + r * e, a + o * e, o - a * e, a, o];
        }

        function Z(t, n, e, r, i, a, o, s, h) {
          var u = 0,
              c = [],
              f = [];
          Pn(t, n, e, r, i, a, o, s, h).forEach(function (t) {
            var n = new bn(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]),
                e = n.getTotalLength();
            u += e, c.push(e), f.push(n);
          }), this.length = u, this.partialLengths = c, this.curves = f;
        }

        function T(t, n, e, r) {
          this.x0 = t, this.x1 = n, this.y0 = e, this.y1 = r;
        }

        function F(t, n) {
          return Math.sqrt((t[0] - n[0]) * (t[0] - n[0]) + (t[1] - n[1]) * (t[1] - n[1]));
        }

        function z(t, n, e) {
          return [t[0] + (n[0] - t[0]) * e, t[1] + (n[1] - t[1]) * e];
        }

        function j(t, n) {
          return F(t, n) < 1e-9;
        }

        function I(t, n, e) {
          var r = t.map(function (t, e) {
            return V(t, n[e]);
          });
          return function (t) {
            var n = r.map(function (n) {
              return n(t);
            });
            return e ? H(n) : n;
          };
        }

        function V(t, n) {
          return function (e) {
            return t.map(function (t, r) {
              return t + e * (n[r] - t);
            });
          };
        }

        function X(t) {
          return "number" == typeof t && isFinite(t);
        }

        function Y(t) {
          return G(t) ? nn(t) : [(t[0][0] + t[t.length - 1][0]) / 2, (t[0][1] + t[t.length - 1][1]) / 2];
        }

        function G(t) {
          for (var n = 0; n < t.length - 2; n++) {
            var e = t[n],
                r = t[n + 1],
                i = t[n + 2];
            if (e[0] * (r[1] - i[1]) + r[0] * (i[1] - e[1]) + i[0] * (e[1] - r[1])) return !0;
          }

          return !1;
        }

        function O(t) {
          return new yn(t).abs();
        }

        function D(t) {
          return t.toString().split("M").map(function (t, n) {
            return t = t.trim(), n && t ? "M" + t : t;
          }).filter(function (t) {
            return t;
          });
        }

        function H(t) {
          return "M" + t.join("L") + "Z";
        }

        function N(t) {
          return D(O(t));
        }

        function Q(t, n) {
          var e = O(t);
          return U(e) || R(e, n);
        }

        function U(t) {
          var n = t.segments || [],
              e = [];
          if (!n.length || "M" !== n[0][0]) return !1;

          for (var r = 0; r < n.length; r++) {
            var i = n[r],
                a = i[0],
                o = i[1],
                s = i[2];
            if ("M" === a && r || "Z" === a) break;
            if ("M" === a || "L" === a) e.push([o, s]);else if ("H" === a) e.push([o, e[e.length - 1][1]]);else {
              if ("V" !== a) return !1;
              e.push([e[e.length - 1][0], o]);
            }
          }

          return !!e.length && {
            ring: e
          };
        }

        function R(t, n) {
          var e,
              r,
              i = D(t)[0],
              a = [],
              o = 3;
          if (!i) throw new TypeError(Cn);
          r = B(i), e = r.getTotalLength(), n && X(n) && n > 0 && (o = Math.max(o, Math.ceil(e / n)));

          for (var s = 0; s < o; s++) {
            var h = r.getPointAtLength(e * s / o);
            a.push([h.x, h.y]);
          }

          return {
            ring: a,
            skipBisect: !0
          };
        }

        function B(t) {
          if ("undefined" != typeof window && window && window.document) try {
            var n = window.document.createElementNS("http://www.w3.org/2000/svg", "path");
            return n.setAttributeNS(null, "d", t), n;
          } catch (t) {}
          return Sn(t);
        }

        function W(t, n) {
          for (var e = t.length + n, r = en(t) / n, i = 0, a = 0, o = r / 2; t.length < e;) {
            var s = t[i],
                h = t[(i + 1) % t.length],
                u = F(s, h);
            o <= a + u ? (t.splice(i + 1, 0, u ? z(s, h, (o - a) / u) : s.slice(0)), o += r) : (a += u, i++);
          }
        }

        function $(t, n) {
          void 0 === n && (n = 1 / 0);

          for (var e = 0; e < t.length; e++) {
            for (var r = t[e], i = e === t.length - 1 ? t[0] : t[e + 1]; F(r, i) > n;) {
              i = z(r, i, .5), t.splice(e + 1, 0, i);
            }
          }
        }

        function J(t, n) {
          var e, r, i;

          if ("string" == typeof t) {
            var a = Q(t, n);
            t = a.ring, i = a.skipBisect;
          } else if (!Array.isArray(t)) throw new TypeError(Cn);

          if (e = t.slice(0), !K(e)) throw new TypeError(Cn);
          return e.length > 1 && j(e[0], e[e.length - 1]) && e.pop(), r = tn(e), r > 0 && e.reverse(), !i && n && X(n) && n > 0 && $(e, n), e;
        }

        function K(t) {
          return t.every(function (t) {
            return Array.isArray(t) && t.length >= 2 && X(t[0]) && X(t[1]);
          });
        }

        function tt(t, n, e) {
          var r;
          return r = t.length - n.length, W(t, r < 0 ? -1 * r : 0), W(n, r > 0 ? r : 0), Tn(t, n), I(t, n, e);
        }

        function nt(t, n, e) {
          e = e || 2;
          var r = n && n.length,
              i = r ? n[0] * e : t.length,
              a = et(t, 0, i, e, !0),
              o = [];
          if (!a) return o;
          var s, h, u, c, f, l, p;

          if (r && (a = ut(t, n, a, e)), t.length > 80 * e) {
            s = u = t[0], h = c = t[1];

            for (var g = e; g < i; g += e) {
              f = t[g], l = t[g + 1], f < s && (s = f), l < h && (h = l), f > u && (u = f), l > c && (c = l);
            }

            p = Math.max(u - s, c - h);
          }

          return it(a, o, e, s, h, p), o;
        }

        function et(t, n, e, r, i) {
          var a, o;
          if (i === Et(t, n, e, r) > 0) for (a = n; a < e; a += r) {
            o = kt(a, t[a], t[a + 1], o);
          } else for (a = e - r; a >= n; a -= r) {
            o = kt(a, t[a], t[a + 1], o);
          }
          return o && Mt(o, o.next) && (Pt(o), o = o.next), o;
        }

        function rt(t, n) {
          if (!t) return t;
          n || (n = t);
          var e,
              r = t;

          do {
            if (e = !1, r.steiner || !Mt(r, r.next) && 0 !== mt(r.prev, r, r.next)) r = r.next;else {
              if (Pt(r), (r = n = r.prev) === r.next) return null;
              e = !0;
            }
          } while (e || r !== n);

          return n;
        }

        function it(t, n, e, r, i, a, o) {
          if (t) {
            !o && a && pt(t, r, i, a);

            for (var s, h, u = t; t.prev !== t.next;) {
              if (s = t.prev, h = t.next, a ? ot(t, r, i, a) : at(t)) n.push(s.i / e), n.push(t.i / e), n.push(h.i / e), Pt(t), t = h.next, u = h.next;else if ((t = h) === u) {
                o ? 1 === o ? (t = st(t, n, e), it(t, n, e, r, i, a, 2)) : 2 === o && ht(t, n, e, r, i, a) : it(rt(t), n, e, r, i, a, 1);
                break;
              }
            }
          }
        }

        function at(t) {
          var n = t.prev,
              e = t,
              r = t.next;
          if (mt(n, e, r) >= 0) return !1;

          for (var i = t.next.next; i !== t.prev;) {
            if (yt(n.x, n.y, e.x, e.y, r.x, r.y, i.x, i.y) && mt(i.prev, i, i.next) >= 0) return !1;
            i = i.next;
          }

          return !0;
        }

        function ot(t, n, e, r) {
          var i = t.prev,
              a = t,
              o = t.next;
          if (mt(i, a, o) >= 0) return !1;

          for (var s = i.x < a.x ? i.x < o.x ? i.x : o.x : a.x < o.x ? a.x : o.x, h = i.y < a.y ? i.y < o.y ? i.y : o.y : a.y < o.y ? a.y : o.y, u = i.x > a.x ? i.x > o.x ? i.x : o.x : a.x > o.x ? a.x : o.x, c = i.y > a.y ? i.y > o.y ? i.y : o.y : a.y > o.y ? a.y : o.y, f = vt(s, h, n, e, r), l = vt(u, c, n, e, r), p = t.nextZ; p && p.z <= l;) {
            if (p !== t.prev && p !== t.next && yt(i.x, i.y, a.x, a.y, o.x, o.y, p.x, p.y) && mt(p.prev, p, p.next) >= 0) return !1;
            p = p.nextZ;
          }

          for (p = t.prevZ; p && p.z >= f;) {
            if (p !== t.prev && p !== t.next && yt(i.x, i.y, a.x, a.y, o.x, o.y, p.x, p.y) && mt(p.prev, p, p.next) >= 0) return !1;
            p = p.prevZ;
          }

          return !0;
        }

        function st(t, n, e) {
          var r = t;

          do {
            var i = r.prev,
                a = r.next.next;
            !Mt(i, a) && wt(i, r, r.next, a) && Lt(i, a) && Lt(a, i) && (n.push(i.i / e), n.push(r.i / e), n.push(a.i / e), Pt(r), Pt(r.next), r = t = a), r = r.next;
          } while (r !== t);

          return r;
        }

        function ht(t, n, e, r, i, a) {
          var o = t;

          do {
            for (var s = o.next.next; s !== o.prev;) {
              if (o.i !== s.i && dt(o, s)) {
                var h = qt(o, s);
                return o = rt(o, o.next), h = rt(h, h.next), it(o, n, e, r, i, a), void it(h, n, e, r, i, a);
              }

              s = s.next;
            }

            o = o.next;
          } while (o !== t);
        }

        function ut(t, n, e, r) {
          var i,
              a,
              o,
              s,
              h,
              u = [];

          for (i = 0, a = n.length; i < a; i++) {
            o = n[i] * r, s = i < a - 1 ? n[i + 1] * r : t.length, h = et(t, o, s, r, !1), h === h.next && (h.steiner = !0), u.push(xt(h));
          }

          for (u.sort(ct), i = 0; i < u.length; i++) {
            ft(u[i], e), e = rt(e, e.next);
          }

          return e;
        }

        function ct(t, n) {
          return t.x - n.x;
        }

        function ft(t, n) {
          if (n = lt(t, n)) {
            var e = qt(n, t);
            rt(e, e.next);
          }
        }

        function lt(t, n) {
          var e,
              r = n,
              i = t.x,
              a = t.y,
              o = -1 / 0;

          do {
            if (a <= r.y && a >= r.next.y) {
              var s = r.x + (a - r.y) * (r.next.x - r.x) / (r.next.y - r.y);

              if (s <= i && s > o) {
                if (o = s, s === i) {
                  if (a === r.y) return r;
                  if (a === r.next.y) return r.next;
                }

                e = r.x < r.next.x ? r : r.next;
              }
            }

            r = r.next;
          } while (r !== n);

          if (!e) return null;
          if (i === o) return e.prev;
          var h,
              u = e,
              c = e.x,
              f = e.y,
              l = 1 / 0;

          for (r = e.next; r !== u;) {
            i >= r.x && r.x >= c && yt(a < f ? i : o, a, c, f, a < f ? o : i, a, r.x, r.y) && ((h = Math.abs(a - r.y) / (i - r.x)) < l || h === l && r.x > e.x) && Lt(r, t) && (e = r, l = h), r = r.next;
          }

          return e;
        }

        function pt(t, n, e, r) {
          var i = t;

          do {
            null === i.z && (i.z = vt(i.x, i.y, n, e, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
          } while (i !== t);

          i.prevZ.nextZ = null, i.prevZ = null, gt(i);
        }

        function gt(t) {
          var n,
              e,
              r,
              i,
              a,
              o,
              s,
              h,
              u = 1;

          do {
            for (e = t, t = null, a = null, o = 0; e;) {
              for (o++, r = e, s = 0, n = 0; n < u && (s++, r = r.nextZ); n++) {
                ;
              }

              for (h = u; s > 0 || h > 0 && r;) {
                0 === s ? (i = r, r = r.nextZ, h--) : 0 !== h && r ? e.z <= r.z ? (i = e, e = e.nextZ, s--) : (i = r, r = r.nextZ, h--) : (i = e, e = e.nextZ, s--), a ? a.nextZ = i : t = i, i.prevZ = a, a = i;
              }

              e = r;
            }

            a.nextZ = null, u *= 2;
          } while (o > 1);

          return t;
        }

        function vt(t, n, e, r, i) {
          return t = 32767 * (t - e) / i, n = 32767 * (n - r) / i, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), n = 16711935 & (n | n << 8), n = 252645135 & (n | n << 4), n = 858993459 & (n | n << 2), n = 1431655765 & (n | n << 1), t | n << 1;
        }

        function xt(t) {
          var n = t,
              e = t;

          do {
            n.x < e.x && (e = n), n = n.next;
          } while (n !== t);

          return e;
        }

        function yt(t, n, e, r, i, a, o, s) {
          return (i - o) * (n - s) - (t - o) * (a - s) >= 0 && (t - o) * (r - s) - (e - o) * (n - s) >= 0 && (e - o) * (a - s) - (i - o) * (r - s) >= 0;
        }

        function dt(t, n) {
          return t.next.i !== n.i && t.prev.i !== n.i && !bt(t, n) && Lt(t, n) && Lt(n, t) && At(t, n);
        }

        function mt(t, n, e) {
          return (n.y - t.y) * (e.x - n.x) - (n.x - t.x) * (e.y - n.y);
        }

        function Mt(t, n) {
          return t.x === n.x && t.y === n.y;
        }

        function wt(t, n, e, r) {
          return !!(Mt(t, n) && Mt(e, r) || Mt(t, r) && Mt(e, n)) || mt(t, n, e) > 0 != mt(t, n, r) > 0 && mt(e, r, t) > 0 != mt(e, r, n) > 0;
        }

        function bt(t, n) {
          var e = t;

          do {
            if (e.i !== t.i && e.next.i !== t.i && e.i !== n.i && e.next.i !== n.i && wt(e, e.next, t, n)) return !0;
            e = e.next;
          } while (e !== t);

          return !1;
        }

        function Lt(t, n) {
          return mt(t.prev, t, t.next) < 0 ? mt(t, n, t.next) >= 0 && mt(t, t.prev, n) >= 0 : mt(t, n, t.prev) < 0 || mt(t, t.next, n) < 0;
        }

        function At(t, n) {
          var e = t,
              r = !1,
              i = (t.x + n.x) / 2,
              a = (t.y + n.y) / 2;

          do {
            e.y > a != e.next.y > a && i < (e.next.x - e.x) * (a - e.y) / (e.next.y - e.y) + e.x && (r = !r), e = e.next;
          } while (e !== t);

          return r;
        }

        function qt(t, n) {
          var e = new _t(t.i, t.x, t.y),
              r = new _t(n.i, n.x, n.y),
              i = t.next,
              a = n.prev;
          return t.next = n, n.prev = t, e.next = i, i.prev = e, r.next = e, e.prev = r, a.next = r, r.prev = a, r;
        }

        function kt(t, n, e, r) {
          var i = new _t(t, n, e);
          return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
        }

        function Pt(t) {
          t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
        }

        function _t(t, n, e) {
          this.i = t, this.x = n, this.y = e, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
        }

        function Et(t, n, e, r) {
          for (var i = 0, a = n, o = e - r; a < e; a += r) {
            i += (t[o] - t[a]) * (t[a + 1] + t[o + 1]), o = a;
          }

          return i;
        }

        function St(t, n) {
          var e = n.id,
              r = n.bbox,
              i = null == n.properties ? {} : n.properties,
              a = Ct(t, n);
          return null == e && null == r ? {
            type: "Feature",
            properties: i,
            geometry: a
          } : null == r ? {
            type: "Feature",
            id: e,
            properties: i,
            geometry: a
          } : {
            type: "Feature",
            id: e,
            bbox: r,
            properties: i,
            geometry: a
          };
        }

        function Ct(t, n) {
          function e(t, n) {
            n.length && n.pop();

            for (var e = u[t < 0 ? ~t : t], r = 0, i = e.length; r < i; ++r) {
              n.push(h(e[r], r));
            }

            t < 0 && Vn(n, i);
          }

          function r(t) {
            return h(t);
          }

          function i(t) {
            for (var n = [], r = 0, i = t.length; r < i; ++r) {
              e(t[r], n);
            }

            return n.length < 2 && n.push(n[0]), n;
          }

          function a(t) {
            for (var n = i(t); n.length < 4;) {
              n.push(n[0]);
            }

            return n;
          }

          function o(t) {
            return t.map(a);
          }

          function s(t) {
            var n,
                e = t.type;

            switch (e) {
              case "GeometryCollection":
                return {
                  type: e,
                  geometries: t.geometries.map(s)
                };

              case "Point":
                n = r(t.coordinates);
                break;

              case "MultiPoint":
                n = t.coordinates.map(r);
                break;

              case "LineString":
                n = i(t.arcs);
                break;

              case "MultiLineString":
                n = t.arcs.map(i);
                break;

              case "Polygon":
                n = o(t.arcs);
                break;

              case "MultiPolygon":
                n = t.arcs.map(o);
                break;

              default:
                return null;
            }

            return {
              type: e,
              coordinates: n
            };
          }

          var h = In(t.transform),
              u = t.arcs;
          return s(n);
        }

        function Zt(t) {
          for (var n, e = -1, r = t.length, i = t[r - 1], a = 0; ++e < r;) {
            n = i, i = t[e], a += n[0] * i[1] - n[1] * i[0];
          }

          return Math.abs(a);
        }

        function Tt(t, n) {
          function e(t) {
            switch (t.type) {
              case "GeometryCollection":
                t.geometries.forEach(e);
                break;

              case "Polygon":
                r(t.arcs);
                break;

              case "MultiPolygon":
                t.arcs.forEach(r);
            }
          }

          function r(t) {
            t.forEach(function (n) {
              n.forEach(function (n) {
                (a[n = n < 0 ? ~n : n] || (a[n] = [])).push(t);
              });
            }), o.push(t);
          }

          function i(n) {
            return Zt(Ct(t, {
              type: "Polygon",
              arcs: [n]
            }).coordinates[0]);
          }

          var a = {},
              o = [],
              s = [];
          return n.forEach(e), o.forEach(function (t) {
            if (!t._) {
              var n = [],
                  e = [t];

              for (t._ = 1, s.push(n); t = e.pop();) {
                n.push(t), t.forEach(function (t) {
                  t.forEach(function (t) {
                    a[t < 0 ? ~t : t].forEach(function (t) {
                      t._ || (t._ = 1, e.push(t));
                    });
                  });
                });
              }
            }
          }), o.forEach(function (t) {
            delete t._;
          }), {
            type: "MultiPolygon",
            arcs: s.map(function (n) {
              var e,
                  r = [];
              if (n.forEach(function (t) {
                t.forEach(function (t) {
                  t.forEach(function (t) {
                    a[t < 0 ? ~t : t].length < 2 && r.push(t);
                  });
                });
              }), r = Yn(t, r), (e = r.length) > 1) for (var o, s, h = 1, u = i(r[0]); h < e; ++h) {
                (o = i(r[h])) > u && (s = r[0], r[0] = r[h], r[h] = s, u = o);
              }
              return r;
            })
          };
        }

        function Ft(t) {
          return function (n, e) {
            return Dn(t(n), e);
          };
        }

        function zt(t, n) {
          var e = {},
              r = {
            type: "Topology",
            objects: {
              triangles: {
                type: "GeometryCollection",
                geometries: []
              }
            },
            arcs: []
          };
          return t.forEach(function (t) {
            var i = [];
            t.forEach(function (t, a) {
              var o = t[0] < t[1] ? t.join(",") : t[1] + "," + t[0],
                  s = t.map(function (t) {
                return n[t];
              });
              o in e ? i.push(~e[o]) : (i.push(e[o] = r.arcs.length), r.arcs.push(s));
            }), r.objects.triangles.geometries.push({
              type: "Polygon",
              area: Math.abs(tn(t.map(function (t) {
                return n[t[0]];
              }))),
              arcs: [i]
            });
          }), r.objects.triangles.geometries.sort(function (t, n) {
            return t.area - n.area;
          }), r;
        }

        function jt(t, n) {
          for (var e = t.objects.triangles.geometries, r = Hn(function (t) {
            return t.area;
          }).left; e.length > n;) {
            !function () {
              var n = e[0],
                  i = On(e)[0][0],
                  a = e[i],
                  o = Tt(t, [n, a]);
              o.area = n.area + a.area, o.type = "Polygon", o.arcs = o.arcs[0], e.splice(i, 1), e.shift(), e.splice(r(e, o.area), 0, o);
            }();
          }

          if (n > e.length) throw new RangeError("Can't collapse topology into " + n + " pieces.");
          return Xn(t, t.objects.triangles).features.map(function (t) {
            return t.geometry.coordinates[0].pop(), t.geometry.coordinates[0];
          });
        }

        function It(t) {
          for (var n = zn(t.reduce(function (t, n) {
            return t.concat([n[0]], [n[1]]);
          }, [])), e = [], r = 0, i = n.length; r < i; r += 3) {
            e.push([[n[r], n[r + 1]], [n[r + 1], n[r + 2]], [n[r + 2], n[r]]]);
          }

          return e;
        }

        function Vt(t, n, e) {
          function r(t, n, o) {
            void 0 === n && (n = []), void 0 === o && (o = 0);

            for (var s = 0; s < t.length; s++) {
              var h = t.splice(s, 1),
                  u = e[h[0]][n.length];
              o + u < i && (t.length ? r(t.slice(), n.concat(h), o + u) : (i = o + u, a = n.concat(h))), t.length && t.splice(s, 0, h[0]);
            }
          }

          var i = 1 / 0,
              a = t.map(function (t, n) {
            return n;
          });
          return r(a), a;
        }

        function Xt(t, n) {
          var e = F(Y(t), Y(n));
          return e * e;
        }

        function Yt(t, n, e) {
          void 0 === e && (e = {});
          var r = e.maxSegmentLength;
          void 0 === r && (r = 10);
          var i = e.string;
          void 0 === i && (i = !0);
          var a = e.single;
          void 0 === a && (a = !1);
          var o = J(t, r);
          o.length < n.length + 2 && W(o, n.length + 2 - o.length);
          var s,
              h = Qn(o, n.length),
              u = n.map(function (t) {
            return J(t, r);
          }),
              c = "string" == typeof t && t;
          return a && !n.every(function (t) {
            return "string" == typeof t;
          }) || (s = n.slice(0)), Dt(h, u, {
            match: !0,
            string: i,
            single: a,
            t0: c,
            t1: s
          });
        }

        function Gt(t, n, e) {
          void 0 === e && (e = {});
          var r = e.maxSegmentLength;
          void 0 === r && (r = 10);
          var i = e.string;
          void 0 === i && (i = !0);
          var a = e.single;
          void 0 === a && (a = !1);
          var o = Yt(n, t, {
            maxSegmentLength: r,
            string: i,
            single: a
          });
          return a ? function (t) {
            return o(1 - t);
          } : o.map(function (t) {
            return function (n) {
              return t(1 - n);
            };
          });
        }

        function Ot(t, n, e) {
          void 0 === e && (e = {});
          var r = e.maxSegmentLength;
          void 0 === r && (r = 10);
          var i = e.string;
          void 0 === i && (i = !0);
          var a = e.single;
          if (void 0 === a && (a = !1), !Array.isArray(t) || !Array.isArray(n) || t.length !== n.length || !t.length) throw new TypeError(Zn);

          var o,
              s,
              h = function h(t) {
            return J(t, r);
          },
              u = t.map(h),
              c = n.map(h);

          return a ? (t.every(function (t) {
            return "string" == typeof t;
          }) && (o = t.slice(0)), n.every(function (t) {
            return "string" == typeof t;
          }) && (s = n.slice(0))) : (o = t.slice(0), s = n.slice(0)), Dt(u, c, {
            string: i,
            single: a,
            t0: o,
            t1: s,
            match: !1
          });
        }

        function Dt(t, n, e) {
          void 0 === e && (e = {});
          var r = e.string,
              i = e.single,
              a = e.t0,
              o = e.t1,
              s = e.match,
              h = s ? Un(t, n) : t.map(function (t, n) {
            return n;
          }),
              u = h.map(function (e, i) {
            return tt(t[e], n[i], r);
          });

          if (s && Array.isArray(a) && (a = h.map(function (t) {
            return a[t];
          })), i && r && (Array.isArray(a) && (a = a.join(" ")), Array.isArray(o) && (o = o.join(" "))), i) {
            var c = r ? function (t) {
              return u.map(function (n) {
                return n(t);
              }).join(" ");
            } : function (t) {
              return u.map(function (n) {
                return n(t);
              });
            };
            return r && (a || o) ? function (t) {
              return t < 1e-4 && a || 1 - t < 1e-4 && o || c(t);
            } : c;
          }

          return r ? (a = Array.isArray(a) ? a.map(function (t) {
            return "string" == typeof t && t;
          }) : [], o = Array.isArray(o) ? o.map(function (t) {
            return "string" == typeof t && t;
          }) : [], u.map(function (t, n) {
            return a[n] || o[n] ? function (e) {
              return e < 1e-4 && a[n] || 1 - e < 1e-4 && o[n] || t(e);
            } : t;
          })) : u;
        }

        function Ht(t, n, e, r, i) {
          return Rt(Bt(t, n, e), r, Jt(t, n, e), 2 * Math.PI * e, i);
        }

        function Nt(t, n, e, r, i) {
          var a = Ht(n, e, r, t, i);
          return function (t) {
            return a(1 - t);
          };
        }

        function Qt(t, n, e, r, i, a) {
          return Rt(Wt(t, n, e, r), i, Kt(t, n, e, r), 2 * e + 2 * r, a);
        }

        function Ut(t, n, e, r, i, a) {
          var o = Qt(n, e, r, i, t, a);
          return function (t) {
            return o(1 - t);
          };
        }

        function Rt(t, n, e, r, i) {
          void 0 === i && (i = {});
          var a = i.maxSegmentLength;
          void 0 === a && (a = 10);
          var o = i.string;
          void 0 === o && (o = !0);
          var s,
              h,
              u = J(n, a);
          return X(r) && u.length < r / a && W(u, Math.ceil(r / a - u.length)), s = t(u), h = I(s, u, o), o ? function (t) {
            return t < 1e-4 ? e : h(t);
          } : h;
        }

        function Bt(t, n, e) {
          return function (r) {
            var i = Y(r),
                a = en(r.concat([r[0]])),
                o = Math.atan2(r[0][1] - i[1], r[0][0] - i[0]),
                s = 0;
            return r.map(function (i, h) {
              var u;
              return h && (s += F(i, r[h - 1])), u = o + 2 * Math.PI * (a ? s / a : h / r.length), [Math.cos(u) * e + t, Math.sin(u) * e + n];
            });
          };
        }

        function Wt(t, n, e, r) {
          return function (i) {
            var a = Y(i),
                o = en(i.concat([i[0]])),
                s = Math.atan2(i[0][1] - a[1], i[0][0] - a[0]),
                h = 0;
            s < 0 && (s = 2 * Math.PI + s);
            var u = s / (2 * Math.PI);
            return i.map(function (a, s) {
              s && (h += F(a, i[s - 1]));
              var c = $t((u + (o ? h / o : s / i.length)) % 1);
              return [t + c[0] * e, n + c[1] * r];
            });
          };
        }

        function $t(t) {
          return t <= 1 / 8 ? [1, .5 + 4 * t] : t <= 3 / 8 ? [1.5 - 4 * t, 1] : t <= 5 / 8 ? [0, 2.5 - 4 * t] : t <= 7 / 8 ? [4 * t - 2.5, 0] : [1, 4 * t - 3.5];
        }

        function Jt(t, n, e) {
          var r = t - e + "," + n,
              i = t + e + "," + n,
              a = "A" + e + "," + e + ",0,1,1,";
          return "M" + r + a + i + a + r + "Z";
        }

        function Kt(t, n, e, r) {
          var i = t + e,
              a = n + r;
          return "M" + t + "," + n + "L" + i + "," + n + "L" + i + "," + a + "L" + t + "," + a + "Z";
        }

        var tn = function tn(t) {
          for (var n, e = -1, r = t.length, i = t[r - 1], a = 0; ++e < r;) {
            n = i, i = t[e], a += n[1] * i[0] - n[0] * i[1];
          }

          return a / 2;
        },
            nn = function nn(t) {
          for (var n, e, r = -1, i = t.length, a = 0, o = 0, s = t[i - 1], h = 0; ++r < i;) {
            n = s, s = t[r], h += e = n[0] * s[1] - s[0] * n[1], a += (n[0] + s[0]) * e, o += (n[1] + s[1]) * e;
          }

          return h *= 3, [a / h, o / h];
        },
            en = function en(t) {
          for (var n, e, r = -1, i = t.length, a = t[i - 1], o = a[0], s = a[1], h = 0; ++r < i;) {
            n = o, e = s, a = t[r], o = a[0], s = a[1], n -= o, e -= s, h += Math.sqrt(n * n + e * e);
          }

          return h;
        },
            rn = {
          a: 7,
          c: 6,
          h: 1,
          l: 2,
          m: 2,
          r: 4,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          z: 0
        },
            an = [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279],
            on = function on(t) {
          var n = new a(t),
              e = n.max;

          for (o(n); n.index < e && !n.err.length;) {
            u(n);
          }

          return n.err.length ? n.result = [] : n.result.length && ("mM".indexOf(n.result[0][0]) < 0 ? (n.err = "SvgPath: string should start with `M` or `m`", n.result = []) : n.result[0][0] = "M"), {
            err: n.err,
            segments: n.result
          };
        };

        f.prototype.matrix = function (t) {
          return 1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3] && 0 === t[4] && 0 === t[5] ? this : (this.cache = null, this.queue.push(t), this);
        }, f.prototype.translate = function (t, n) {
          return 0 === t && 0 === n || (this.cache = null, this.queue.push([1, 0, 0, 1, t, n])), this;
        }, f.prototype.scale = function (t, n) {
          return 1 === t && 1 === n || (this.cache = null, this.queue.push([t, 0, 0, n, 0, 0])), this;
        }, f.prototype.rotate = function (t, n, e) {
          var r, i, a;
          return 0 !== t && (this.translate(n, e), r = t * Math.PI / 180, i = Math.cos(r), a = Math.sin(r), this.queue.push([i, a, -a, i, 0, 0]), this.cache = null, this.translate(-n, -e)), this;
        }, f.prototype.skewX = function (t) {
          return 0 !== t && (this.cache = null, this.queue.push([1, 0, Math.tan(t * Math.PI / 180), 1, 0, 0])), this;
        }, f.prototype.skewY = function (t) {
          return 0 !== t && (this.cache = null, this.queue.push([1, Math.tan(t * Math.PI / 180), 0, 1, 0, 0])), this;
        }, f.prototype.toArray = function () {
          var t = this;
          if (this.cache) return this.cache;
          if (!this.queue.length) return this.cache = [1, 0, 0, 1, 0, 0], this.cache;
          if (this.cache = this.queue[0], 1 === this.queue.length) return this.cache;

          for (var n = 1; n < this.queue.length; n++) {
            t.cache = c(t.cache, t.queue[n]);
          }

          return this.cache;
        }, f.prototype.calc = function (t, n, e) {
          var r;
          return this.queue.length ? (this.cache || (this.cache = this.toArray()), r = this.cache, [t * r[0] + n * r[2] + (e ? 0 : r[4]), t * r[1] + n * r[3] + (e ? 0 : r[5])]) : [t, n];
        };

        var sn = f,
            hn = {
          matrix: !0,
          scale: !0,
          rotate: !0,
          translate: !0,
          skewX: !0,
          skewY: !0
        },
            un = /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,
            cn = /[\s,]+/,
            fn = function fn(t) {
          var n,
              e,
              r = new sn();
          return t.split(un).forEach(function (t) {
            if (t.length) {
              if (void 0 !== hn[t]) return void (n = t);

              switch (e = t.split(cn).map(function (t) {
                return +t || 0;
              }), n) {
                case "matrix":
                  return void (6 === e.length && r.matrix(e));

                case "scale":
                  return void (1 === e.length ? r.scale(e[0], e[0]) : 2 === e.length && r.scale(e[0], e[1]));

                case "rotate":
                  return void (1 === e.length ? r.rotate(e[0], 0, 0) : 3 === e.length && r.rotate(e[0], e[1], e[2]));

                case "translate":
                  return void (1 === e.length ? r.translate(e[0], 0) : 2 === e.length && r.translate(e[0], e[1]));

                case "skewX":
                  return void (1 === e.length && r.skewX(e[0]));

                case "skewY":
                  return void (1 === e.length && r.skewY(e[0]));
              }
            }
          }), r;
        },
            ln = 2 * Math.PI,
            pn = function pn(t, n, e, r, i, a, o, s, h) {
          var u = Math.sin(h * ln / 360),
              c = Math.cos(h * ln / 360),
              f = c * (t - e) / 2 + u * (n - r) / 2,
              l = -u * (t - e) / 2 + c * (n - r) / 2;
          if (0 === f && 0 === l) return [];
          if (0 === o || 0 === s) return [];
          o = Math.abs(o), s = Math.abs(s);
          var v = f * f / (o * o) + l * l / (s * s);
          v > 1 && (o *= Math.sqrt(v), s *= Math.sqrt(v));
          var x = p(t, n, e, r, i, a, o, s, u, c),
              y = [],
              d = x[2],
              m = x[3],
              M = Math.max(Math.ceil(Math.abs(m) / (ln / 4)), 1);
          m /= M;

          for (var w = 0; w < M; w++) {
            y.push(g(d, m)), d += m;
          }

          return y.map(function (t) {
            for (var n = 0; n < t.length; n += 2) {
              var e = t[n + 0],
                  r = t[n + 1];
              e *= o, r *= s;
              var i = c * e - u * r,
                  a = u * e + c * r;
              t[n + 0] = i + x[0], t[n + 1] = a + x[1];
            }

            return t;
          });
        },
            gn = Math.PI / 180;

        v.prototype.transform = function (t) {
          var n = Math.cos(this.ax * gn),
              e = Math.sin(this.ax * gn),
              r = [this.rx * (t[0] * n + t[2] * e), this.rx * (t[1] * n + t[3] * e), this.ry * (-t[0] * e + t[2] * n), this.ry * (-t[1] * e + t[3] * n)],
              i = r[0] * r[0] + r[2] * r[2],
              a = r[1] * r[1] + r[3] * r[3],
              o = ((r[0] - r[3]) * (r[0] - r[3]) + (r[2] + r[1]) * (r[2] + r[1])) * ((r[0] + r[3]) * (r[0] + r[3]) + (r[2] - r[1]) * (r[2] - r[1])),
              s = (i + a) / 2;
          if (o < 1e-10 * s) return this.rx = this.ry = Math.sqrt(s), this.ax = 0, this;
          var h = r[0] * r[1] + r[2] * r[3];
          o = Math.sqrt(o);
          var u = s + o / 2,
              c = s - o / 2;
          return this.ax = Math.abs(h) < 1e-10 && Math.abs(u - a) < 1e-10 ? 90 : 180 * Math.atan(Math.abs(h) > Math.abs(u - a) ? (u - i) / h : h / (u - a)) / Math.PI, this.ax >= 0 ? (this.rx = Math.sqrt(u), this.ry = Math.sqrt(c)) : (this.ax += 90, this.rx = Math.sqrt(c), this.ry = Math.sqrt(u)), this;
        }, v.prototype.isDegenerate = function () {
          return this.rx < 1e-10 * this.ry || this.ry < 1e-10 * this.rx;
        };
        var vn = v;
        x.prototype.__matrix = function (t) {
          var n,
              e = this;
          t.queue.length && this.iterate(function (r, i, a, o) {
            var s, h, u, c;

            switch (r[0]) {
              case "v":
                s = t.calc(0, r[1], !0), h = 0 === s[0] ? ["v", s[1]] : ["l", s[0], s[1]];
                break;

              case "V":
                s = t.calc(a, r[1], !1), h = s[0] === t.calc(a, o, !1)[0] ? ["V", s[1]] : ["L", s[0], s[1]];
                break;

              case "h":
                s = t.calc(r[1], 0, !0), h = 0 === s[1] ? ["h", s[0]] : ["l", s[0], s[1]];
                break;

              case "H":
                s = t.calc(r[1], o, !1), h = s[1] === t.calc(a, o, !1)[1] ? ["H", s[0]] : ["L", s[0], s[1]];
                break;

              case "a":
              case "A":
                var f = t.toArray(),
                    l = vn(r[1], r[2], r[3]).transform(f);

                if (f[0] * f[3] - f[1] * f[2] < 0 && (r[5] = r[5] ? "0" : "1"), s = t.calc(r[6], r[7], "a" === r[0]), "A" === r[0] && r[6] === a && r[7] === o || "a" === r[0] && 0 === r[6] && 0 === r[7]) {
                  h = ["a" === r[0] ? "l" : "L", s[0], s[1]];
                  break;
                }

                h = l.isDegenerate() ? ["a" === r[0] ? "l" : "L", s[0], s[1]] : [r[0], l.rx, l.ry, l.ax, r[4], r[5], s[0], s[1]];
                break;

              case "m":
                c = i > 0, s = t.calc(r[1], r[2], c), h = ["m", s[0], s[1]];
                break;

              default:
                for (u = r[0], h = [u], c = u.toLowerCase() === u, n = 1; n < r.length; n += 2) {
                  s = t.calc(r[n], r[n + 1], c), h.push(s[0], s[1]);
                }

            }

            e.segments[i] = h;
          }, !0);
        }, x.prototype.__evaluateStack = function () {
          var t,
              n,
              e = this;

          if (this.__stack.length) {
            if (1 === this.__stack.length) return this.__matrix(this.__stack[0]), void (this.__stack = []);

            for (t = sn(), n = this.__stack.length; --n >= 0;) {
              t.matrix(e.__stack[n].toArray());
            }

            this.__matrix(t), this.__stack = [];
          }
        }, x.prototype.toString = function () {
          var t,
              n,
              e = this,
              r = [];

          this.__evaluateStack();

          for (var i = 0; i < this.segments.length; i++) {
            n = e.segments[i][0], t = i > 0 && "m" !== n && "M" !== n && n === e.segments[i - 1][0], r = r.concat(t ? e.segments[i].slice(1) : e.segments[i]);
          }

          return r.join(" ").replace(/ ?([achlmqrstvz]) ?/gi, "$1").replace(/ \-/g, "-").replace(/zm/g, "z m");
        }, x.prototype.translate = function (t, n) {
          return this.__stack.push(sn().translate(t, n || 0)), this;
        }, x.prototype.scale = function (t, n) {
          return this.__stack.push(sn().scale(t, n || 0 === n ? n : t)), this;
        }, x.prototype.rotate = function (t, n, e) {
          return this.__stack.push(sn().rotate(t, n || 0, e || 0)), this;
        }, x.prototype.skewX = function (t) {
          return this.__stack.push(sn().skewX(t)), this;
        }, x.prototype.skewY = function (t) {
          return this.__stack.push(sn().skewY(t)), this;
        }, x.prototype.matrix = function (t) {
          return this.__stack.push(sn().matrix(t)), this;
        }, x.prototype.transform = function (t) {
          return t.trim() ? (this.__stack.push(fn(t)), this) : this;
        }, x.prototype.round = function (t) {
          var n,
              e = 0,
              r = 0,
              i = 0,
              a = 0;
          return t = t || 0, this.__evaluateStack(), this.segments.forEach(function (o) {
            var s = o[0].toLowerCase() === o[0];

            switch (o[0]) {
              case "H":
              case "h":
                return s && (o[1] += i), i = o[1] - o[1].toFixed(t), void (o[1] = +o[1].toFixed(t));

              case "V":
              case "v":
                return s && (o[1] += a), a = o[1] - o[1].toFixed(t), void (o[1] = +o[1].toFixed(t));

              case "Z":
              case "z":
                return i = e, void (a = r);

              case "M":
              case "m":
                return s && (o[1] += i, o[2] += a), i = o[1] - o[1].toFixed(t), a = o[2] - o[2].toFixed(t), e = i, r = a, o[1] = +o[1].toFixed(t), void (o[2] = +o[2].toFixed(t));

              case "A":
              case "a":
                return s && (o[6] += i, o[7] += a), i = o[6] - o[6].toFixed(t), a = o[7] - o[7].toFixed(t), o[1] = +o[1].toFixed(t), o[2] = +o[2].toFixed(t), o[3] = +o[3].toFixed(t + 2), o[6] = +o[6].toFixed(t), void (o[7] = +o[7].toFixed(t));

              default:
                return n = o.length, s && (o[n - 2] += i, o[n - 1] += a), i = o[n - 2] - o[n - 2].toFixed(t), a = o[n - 1] - o[n - 1].toFixed(t), void o.forEach(function (n, e) {
                  e && (o[e] = +o[e].toFixed(t));
                });
            }
          }), this;
        }, x.prototype.iterate = function (t, n) {
          var e,
              r,
              i,
              a = this.segments,
              o = {},
              s = !1,
              h = 0,
              u = 0,
              c = 0,
              f = 0;
          if (n || this.__evaluateStack(), a.forEach(function (n, e) {
            var r = t(n, e, h, u);
            Array.isArray(r) && (o[e] = r, s = !0);
            var i = n[0] === n[0].toLowerCase();

            switch (n[0]) {
              case "m":
              case "M":
                return h = n[1] + (i ? h : 0), u = n[2] + (i ? u : 0), c = h, void (f = u);

              case "h":
              case "H":
                return void (h = n[1] + (i ? h : 0));

              case "v":
              case "V":
                return void (u = n[1] + (i ? u : 0));

              case "z":
              case "Z":
                return h = c, void (u = f);

              default:
                h = n[n.length - 2] + (i ? h : 0), u = n[n.length - 1] + (i ? u : 0);
            }
          }), !s) return this;

          for (i = [], e = 0; e < a.length; e++) {
            if (void 0 !== o[e]) for (r = 0; r < o[e].length; r++) {
              i.push(o[e][r]);
            } else i.push(a[e]);
          }

          return this.segments = i, this;
        }, x.prototype.abs = function () {
          return this.iterate(function (t, n, e, r) {
            var i,
                a = t[0],
                o = a.toUpperCase();
            if (a !== o) switch (t[0] = o, a) {
              case "v":
                return void (t[1] += r);

              case "a":
                return t[6] += e, void (t[7] += r);

              default:
                for (i = 1; i < t.length; i++) {
                  t[i] += i % 2 ? e : r;
                }

            }
          }, !0), this;
        }, x.prototype.rel = function () {
          return this.iterate(function (t, n, e, r) {
            var i,
                a = t[0],
                o = a.toLowerCase();
            if (a !== o && (0 !== n || "M" !== a)) switch (t[0] = o, a) {
              case "V":
                return void (t[1] -= r);

              case "A":
                return t[6] -= e, void (t[7] -= r);

              default:
                for (i = 1; i < t.length; i++) {
                  t[i] -= i % 2 ? e : r;
                }

            }
          }, !0), this;
        }, x.prototype.unarc = function () {
          return this.iterate(function (t, n, e, r) {
            var i,
                a,
                o,
                s = [],
                h = t[0];
            return "A" !== h && "a" !== h ? null : ("a" === h ? (a = e + t[6], o = r + t[7]) : (a = t[6], o = t[7]), i = pn(e, r, a, o, t[4], t[5], t[1], t[2], t[3]), 0 === i.length ? [["a" === t[0] ? "l" : "L", t[6], t[7]]] : (i.forEach(function (t) {
              s.push(["C", t[2], t[3], t[4], t[5], t[6], t[7]]);
            }), s));
          }), this;
        }, x.prototype.unshort = function () {
          var t,
              n,
              e,
              r,
              i,
              a = this.segments;
          return this.iterate(function (o, s, h, u) {
            var c,
                f = o[0],
                l = f.toUpperCase();
            s && ("T" === l ? (c = "t" === f, e = a[s - 1], "Q" === e[0] ? (t = e[1] - h, n = e[2] - u) : "q" === e[0] ? (t = e[1] - e[3], n = e[2] - e[4]) : (t = 0, n = 0), r = -t, i = -n, c || (r += h, i += u), a[s] = [c ? "q" : "Q", r, i, o[1], o[2]]) : "S" === l && (c = "s" === f, e = a[s - 1], "C" === e[0] ? (t = e[3] - h, n = e[4] - u) : "c" === e[0] ? (t = e[3] - e[5], n = e[4] - e[6]) : (t = 0, n = 0), r = -t, i = -n, c || (r += h, i += u), a[s] = [c ? "c" : "C", r, i, o[1], o[2], o[3], o[4]]));
          }), this;
        };

        var xn = x,
            yn = xn,
            dn = {
          a: 7,
          c: 6,
          h: 1,
          l: 2,
          m: 2,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          z: 0
        },
            mn = /([astvzqmhlc])([^astvzqmhlc]*)/gi,
            Mn = function Mn(t) {
          var n = [];
          return t.replace(mn, function (t, e, r) {
            var i = e.toLowerCase();

            for (r = y(r), "m" === i && r.length > 2 && (n.push([e].concat(r.splice(0, 2))), i = "l", e = "m" === e ? "l" : "L"); r.length >= 0;) {
              if (r.length === dn[i]) return r.unshift(e), n.push(r);
              if (r.length < dn[i]) throw new Error("malformed path data");
              n.push([e].concat(r.splice(0, dn[i])));
            }
          }), n;
        },
            wn = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,
            bn = function bn(t, n, e, r, i, a, o, s) {
          return new d(t, n, e, r, i, a, o, s);
        };

        d.prototype = {
          constructor: d,
          init: function init() {
            this.length = this.getArcLength([this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y]);
          },
          getTotalLength: function getTotalLength() {
            return this.length;
          },
          getPointAtLength: function getPointAtLength(t) {
            var n = w(t, this.length, this.getArcLength, [this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y]);
            return this.getPoint([this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y], n);
          },
          getTangentAtLength: function getTangentAtLength(t) {
            var n = w(t, this.length, this.getArcLength, [this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y]),
                e = this.getDerivative([this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y], n),
                r = Math.sqrt(e.x * e.x + e.y * e.y);
            return r > 0 ? {
              x: e.x / r,
              y: e.y / r
            } : {
              x: 0,
              y: 0
            };
          },
          getPropertiesAtLength: function getPropertiesAtLength(t) {
            var n,
                e = w(t, this.length, this.getArcLength, [this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y]),
                r = this.getDerivative([this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y], e),
                i = Math.sqrt(r.x * r.x + r.y * r.y);
            n = i > 0 ? {
              x: r.x / i,
              y: r.y / i
            } : {
              x: 0,
              y: 0
            };
            var a = this.getPoint([this.a.x, this.b.x, this.c.x, this.d.x], [this.a.y, this.b.y, this.c.y, this.d.y], e);
            return {
              x: a.x,
              y: a.y,
              tangentX: n.x,
              tangentY: n.y
            };
          }
        };

        var Ln = [[], [], [-.5773502691896257, .5773502691896257], [0, -.7745966692414834, .7745966692414834], [-.33998104358485626, .33998104358485626, -.8611363115940526, .8611363115940526], [0, -.5384693101056831, .5384693101056831, -.906179845938664, .906179845938664], [.6612093864662645, -.6612093864662645, -.2386191860831969, .2386191860831969, -.932469514203152, .932469514203152], [0, .4058451513773972, -.4058451513773972, -.7415311855993945, .7415311855993945, -.9491079123427585, .9491079123427585], [-.1834346424956498, .1834346424956498, -.525532409916329, .525532409916329, -.7966664774136267, .7966664774136267, -.9602898564975363, .9602898564975363], [0, -.8360311073266358, .8360311073266358, -.9681602395076261, .9681602395076261, -.3242534234038089, .3242534234038089, -.6133714327005904, .6133714327005904], [-.14887433898163122, .14887433898163122, -.4333953941292472, .4333953941292472, -.6794095682990244, .6794095682990244, -.8650633666889845, .8650633666889845, -.9739065285171717, .9739065285171717], [0, -.26954315595234496, .26954315595234496, -.5190961292068118, .5190961292068118, -.7301520055740494, .7301520055740494, -.8870625997680953, .8870625997680953, -.978228658146057, .978228658146057], [-.1252334085114689, .1252334085114689, -.3678314989981802, .3678314989981802, -.5873179542866175, .5873179542866175, -.7699026741943047, .7699026741943047, -.9041172563704749, .9041172563704749, -.9815606342467192, .9815606342467192], [0, -.2304583159551348, .2304583159551348, -.44849275103644687, .44849275103644687, -.6423493394403402, .6423493394403402, -.8015780907333099, .8015780907333099, -.9175983992229779, .9175983992229779, -.9841830547185881, .9841830547185881], [-.10805494870734367, .10805494870734367, -.31911236892788974, .31911236892788974, -.5152486363581541, .5152486363581541, -.6872929048116855, .6872929048116855, -.827201315069765, .827201315069765, -.9284348836635735, .9284348836635735, -.9862838086968123, .9862838086968123], [0, -.20119409399743451, .20119409399743451, -.3941513470775634, .3941513470775634, -.5709721726085388, .5709721726085388, -.7244177313601701, .7244177313601701, -.8482065834104272, .8482065834104272, -.937273392400706, .937273392400706, -.9879925180204854, .9879925180204854], [-.09501250983763744, .09501250983763744, -.2816035507792589, .2816035507792589, -.45801677765722737, .45801677765722737, -.6178762444026438, .6178762444026438, -.755404408355003, .755404408355003, -.8656312023878318, .8656312023878318, -.9445750230732326, .9445750230732326, -.9894009349916499, .9894009349916499], [0, -.17848418149584785, .17848418149584785, -.3512317634538763, .3512317634538763, -.5126905370864769, .5126905370864769, -.6576711592166907, .6576711592166907, -.7815140038968014, .7815140038968014, -.8802391537269859, .8802391537269859, -.9506755217687678, .9506755217687678, -.9905754753144174, .9905754753144174], [-.0847750130417353, .0847750130417353, -.2518862256915055, .2518862256915055, -.41175116146284263, .41175116146284263, -.5597708310739475, .5597708310739475, -.6916870430603532, .6916870430603532, -.8037049589725231, .8037049589725231, -.8926024664975557, .8926024664975557, -.9558239495713977, .9558239495713977, -.9915651684209309, .9915651684209309], [0, -.16035864564022537, .16035864564022537, -.31656409996362983, .31656409996362983, -.46457074137596094, .46457074137596094, -.600545304661681, .600545304661681, -.7209661773352294, .7209661773352294, -.8227146565371428, .8227146565371428, -.9031559036148179, .9031559036148179, -.96020815213483, .96020815213483, -.9924068438435844, .9924068438435844], [-.07652652113349734, .07652652113349734, -.22778585114164507, .22778585114164507, -.37370608871541955, .37370608871541955, -.5108670019508271, .5108670019508271, -.636053680726515, .636053680726515, -.7463319064601508, .7463319064601508, -.8391169718222188, .8391169718222188, -.912234428251326, .912234428251326, -.9639719272779138, .9639719272779138, -.9931285991850949, .9931285991850949], [0, -.1455618541608951, .1455618541608951, -.2880213168024011, .2880213168024011, -.4243421202074388, .4243421202074388, -.5516188358872198, .5516188358872198, -.6671388041974123, .6671388041974123, -.7684399634756779, .7684399634756779, -.8533633645833173, .8533633645833173, -.9200993341504008, .9200993341504008, -.9672268385663063, .9672268385663063, -.9937521706203895, .9937521706203895], [-.06973927331972223, .06973927331972223, -.20786042668822127, .20786042668822127, -.34193582089208424, .34193582089208424, -.469355837986757, .469355837986757, -.5876404035069116, .5876404035069116, -.6944872631866827, .6944872631866827, -.7878168059792081, .7878168059792081, -.8658125777203002, .8658125777203002, -.926956772187174, .926956772187174, -.9700604978354287, .9700604978354287, -.9942945854823992, .9942945854823992], [0, -.1332568242984661, .1332568242984661, -.26413568097034495, .26413568097034495, -.3903010380302908, .3903010380302908, -.5095014778460075, .5095014778460075, -.6196098757636461, .6196098757636461, -.7186613631319502, .7186613631319502, -.8048884016188399, .8048884016188399, -.8767523582704416, .8767523582704416, -.9329710868260161, .9329710868260161, -.9725424712181152, .9725424712181152, -.9947693349975522, .9947693349975522], [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213]],
            An = [[], [], [1, 1], [.8888888888888888, .5555555555555556, .5555555555555556], [.6521451548625461, .6521451548625461, .34785484513745385, .34785484513745385], [.5688888888888889, .47862867049936647, .47862867049936647, .23692688505618908, .23692688505618908], [.3607615730481386, .3607615730481386, .46791393457269104, .46791393457269104, .17132449237917036, .17132449237917036], [.4179591836734694, .3818300505051189, .3818300505051189, .27970539148927664, .27970539148927664, .1294849661688697, .1294849661688697], [.362683783378362, .362683783378362, .31370664587788727, .31370664587788727, .22238103445337448, .22238103445337448, .10122853629037626, .10122853629037626], [.3302393550012598, .1806481606948574, .1806481606948574, .08127438836157441, .08127438836157441, .31234707704000286, .31234707704000286, .26061069640293544, .26061069640293544], [.29552422471475287, .29552422471475287, .26926671930999635, .26926671930999635, .21908636251598204, .21908636251598204, .1494513491505806, .1494513491505806, .06667134430868814, .06667134430868814], [.2729250867779006, .26280454451024665, .26280454451024665, .23319376459199048, .23319376459199048, .18629021092773426, .18629021092773426, .1255803694649046, .1255803694649046, .05566856711617366, .05566856711617366], [.24914704581340277, .24914704581340277, .2334925365383548, .2334925365383548, .20316742672306592, .20316742672306592, .16007832854334622, .16007832854334622, .10693932599531843, .10693932599531843, .04717533638651183, .04717533638651183], [.2325515532308739, .22628318026289723, .22628318026289723, .2078160475368885, .2078160475368885, .17814598076194574, .17814598076194574, .13887351021978725, .13887351021978725, .09212149983772845, .09212149983772845, .04048400476531588, .04048400476531588], [.2152638534631578, .2152638534631578, .2051984637212956, .2051984637212956, .18553839747793782, .18553839747793782, .15720316715819355, .15720316715819355, .12151857068790319, .12151857068790319, .08015808715976021, .08015808715976021, .03511946033175186, .03511946033175186], [.2025782419255613, .19843148532711158, .19843148532711158, .1861610000155622, .1861610000155622, .16626920581699392, .16626920581699392, .13957067792615432, .13957067792615432, .10715922046717194, .10715922046717194, .07036604748810812, .07036604748810812, .03075324199611727, .03075324199611727], [.1894506104550685, .1894506104550685, .18260341504492358, .18260341504492358, .16915651939500254, .16915651939500254, .14959598881657674, .14959598881657674, .12462897125553388, .12462897125553388, .09515851168249279, .09515851168249279, .062253523938647894, .062253523938647894, .027152459411754096, .027152459411754096], [.17944647035620653, .17656270536699264, .17656270536699264, .16800410215645004, .16800410215645004, .15404576107681028, .15404576107681028, .13513636846852548, .13513636846852548, .11188384719340397, .11188384719340397, .08503614831717918, .08503614831717918, .0554595293739872, .0554595293739872, .02414830286854793, .02414830286854793], [.1691423829631436, .1691423829631436, .16427648374583273, .16427648374583273, .15468467512626524, .15468467512626524, .14064291467065065, .14064291467065065, .12255520671147846, .12255520671147846, .10094204410628717, .10094204410628717, .07642573025488905, .07642573025488905, .0497145488949698, .0497145488949698, .02161601352648331, .02161601352648331], [.1610544498487837, .15896884339395434, .15896884339395434, .15276604206585967, .15276604206585967, .1426067021736066, .1426067021736066, .12875396253933621, .12875396253933621, .11156664554733399, .11156664554733399, .09149002162245, .09149002162245, .06904454273764123, .06904454273764123, .0448142267656996, .0448142267656996, .019461788229726478, .019461788229726478], [.15275338713072584, .15275338713072584, .14917298647260374, .14917298647260374, .14209610931838204, .14209610931838204, .13168863844917664, .13168863844917664, .11819453196151841, .11819453196151841, .10193011981724044, .10193011981724044, .08327674157670475, .08327674157670475, .06267204833410907, .06267204833410907, .04060142980038694, .04060142980038694, .017614007139152118, .017614007139152118], [.14608113364969041, .14452440398997005, .14452440398997005, .13988739479107315, .13988739479107315, .13226893863333747, .13226893863333747, .12183141605372853, .12183141605372853, .10879729916714838, .10879729916714838, .09344442345603386, .09344442345603386, .0761001136283793, .0761001136283793, .057134425426857205, .057134425426857205, .036953789770852494, .036953789770852494, .016017228257774335, .016017228257774335], [.13925187285563198, .13925187285563198, .13654149834601517, .13654149834601517, .13117350478706238, .13117350478706238, .12325237681051242, .12325237681051242, .11293229608053922, .11293229608053922, .10041414444288096, .10041414444288096, .08594160621706773, .08594160621706773, .06979646842452049, .06979646842452049, .052293335152683286, .052293335152683286, .03377490158481415, .03377490158481415, .0146279952982722, .0146279952982722], [.13365457218610619, .1324620394046966, .1324620394046966, .12890572218808216, .12890572218808216, .12304908430672953, .12304908430672953, .11499664022241136, .11499664022241136, .10489209146454141, .10489209146454141, .09291576606003515, .09291576606003515, .07928141177671895, .07928141177671895, .06423242140852585, .06423242140852585, .04803767173108467, .04803767173108467, .030988005856979445, .030988005856979445, .013411859487141771, .013411859487141771], [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872]],
            qn = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]],
            kn = 2 * Math.PI,
            Pn = function Pn(t, n, e, r, i, a, o, s, h) {
          var u = Math.sin(i * kn / 360),
              c = Math.cos(i * kn / 360),
              f = c * (t - s) / 2 + u * (n - h) / 2,
              l = -u * (t - s) / 2 + c * (n - h) / 2;
          if (0 === f && 0 === l) return [];
          if (0 === e || 0 === r) return [];
          e = Math.abs(e), r = Math.abs(r);
          var p = f * f / (e * e) + l * l / (r * r);
          p > 1 && (e *= Math.sqrt(p), r *= Math.sqrt(p));
          var g = S(t, n, s, h, a, o, e, r, u, c),
              v = [],
              x = g[2],
              y = g[3],
              d = Math.max(Math.ceil(Math.abs(y) / (kn / 4)), 1);
          y /= d;

          for (var m = 0; m < d; m++) {
            v.push(C(x, y)), x += y;
          }

          return v.map(function (t) {
            for (var n = 0; n < t.length; n += 2) {
              var i = t[n + 0],
                  a = t[n + 1];
              i *= e, a *= r;
              var o = c * i - u * a,
                  s = u * i + c * a;
              t[n + 0] = o + g[0], t[n + 1] = s + g[1];
            }

            return t;
          });
        },
            _n = function _n(t, n, e, r, i, a, o, s, h) {
          return new Z(t, n, e, r, i, a, o, s, h);
        };

        Z.prototype = {
          constructor: Z,
          init: function init() {},
          getTotalLength: function getTotalLength() {
            return this.length;
          },
          getPointAtLength: function getPointAtLength(t) {
            var n = this;
            t < 0 ? t = 0 : t > this.length && (t = this.length);

            for (var e = this.partialLengths.length - 1; this.partialLengths[e] >= t && this.partialLengths[e] > 0;) {
              e--;
            }

            e < this.partialLengths.length - 1 && e++;

            for (var r = 0, i = 0; i < e; i++) {
              r += n.partialLengths[i];
            }

            return this.curves[e].getPointAtLength(t - r);
          },
          getTangentAtLength: function getTangentAtLength(t) {
            var n = this;
            t < 0 ? t = 0 : t > this.length && (t = this.length);

            for (var e = this.partialLengths.length - 1; this.partialLengths[e] >= t && this.partialLengths[e] > 0;) {
              e--;
            }

            e < this.partialLengths.length - 1 && e++;

            for (var r = 0, i = 0; i < e; i++) {
              r += n.partialLengths[i];
            }

            return this.curves[e].getTangentAtLength(t - r);
          },
          getPropertiesAtLength: function getPropertiesAtLength(t) {
            var n = this.getTangentAtLength(t),
                e = this.getPointAtLength(t);
            return {
              x: e.x,
              y: e.y,
              tangentX: n.x,
              tangentY: n.y
            };
          }
        };

        var En = function En(t, n, e, r) {
          return new T(t, n, e, r);
        };

        T.prototype.getTotalLength = function () {
          return Math.sqrt(Math.pow(this.x0 - this.x1, 2) + Math.pow(this.y0 - this.y1, 2));
        }, T.prototype.getPointAtLength = function (t) {
          var n = t / Math.sqrt(Math.pow(this.x0 - this.x1, 2) + Math.pow(this.y0 - this.y1, 2)),
              e = (this.x1 - this.x0) * n,
              r = (this.y1 - this.y0) * n;
          return {
            x: this.x0 + e,
            y: this.y0 + r
          };
        }, T.prototype.getTangentAtLength = function () {
          var t = Math.sqrt((this.x1 - this.x0) * (this.x1 - this.x0) + (this.y1 - this.y0) * (this.y1 - this.y0));
          return {
            x: (this.x1 - this.x0) / t,
            y: (this.y1 - this.y0) / t
          };
        }, T.prototype.getPropertiesAtLength = function (t) {
          var n = this.getPointAtLength(t),
              e = this.getTangentAtLength();
          return {
            x: n.x,
            y: n.y,
            tangentX: e.x,
            tangentY: e.y
          };
        };

        var Sn = function Sn(t) {
          function n(t) {
            if (!t) return null;

            for (var a, o = Mn(t), s = [0, 0], h = [0, 0], u = 0; u < o.length; u++) {
              "M" === o[u][0] ? (s = [o[u][1], o[u][2]], i.push(null)) : "m" === o[u][0] ? (s = [o[u][1] + s[0], o[u][2] + s[1]], i.push(null)) : "L" === o[u][0] ? (e += Math.sqrt(Math.pow(s[0] - o[u][1], 2) + Math.pow(s[1] - o[u][2], 2)), i.push(new En(s[0], o[u][1], s[1], o[u][2])), s = [o[u][1], o[u][2]]) : "l" === o[u][0] ? (e += Math.sqrt(Math.pow(o[u][1], 2) + Math.pow(o[u][2], 2)), i.push(new En(s[0], o[u][1] + s[0], s[1], o[u][2] + s[1])), s = [o[u][1] + s[0], o[u][2] + s[1]]) : "H" === o[u][0] ? (e += Math.abs(s[0] - o[u][1]), i.push(new En(s[0], o[u][1], s[1], s[1])), s[0] = o[u][1]) : "h" === o[u][0] ? (e += Math.abs(o[u][1]), i.push(new En(s[0], s[0] + o[u][1], s[1], s[1])), s[0] = o[u][1] + s[0]) : "V" === o[u][0] ? (e += Math.abs(s[1] - o[u][1]), i.push(new En(s[0], s[0], s[1], o[u][1])), s[1] = o[u][1]) : "v" === o[u][0] ? (e += Math.abs(o[u][1]), i.push(new En(s[0], s[0], s[1], s[1] + o[u][1])), s[1] = o[u][1] + s[1]) : "z" === o[u][0] || "Z" === o[u][0] ? (e += Math.sqrt(Math.pow(o[0][1] - s[0], 2) + Math.pow(o[0][2] - s[1], 2)), i.push(new En(s[0], o[0][1], s[1], o[0][2])), s = [o[0][1], o[0][2]]) : "C" === o[u][0] ? (a = new bn(s[0], s[1], o[u][1], o[u][2], o[u][3], o[u][4], o[u][5], o[u][6]), e += a.getTotalLength(), s = [o[u][5], o[u][6]], i.push(a)) : "c" === o[u][0] ? (a = new bn(s[0], s[1], s[0] + o[u][1], s[1] + o[u][2], s[0] + o[u][3], s[1] + o[u][4], s[0] + o[u][5], s[1] + o[u][6]), e += a.getTotalLength(), s = [o[u][5] + s[0], o[u][6] + s[1]], i.push(a)) : "S" === o[u][0] ? (a = u > 0 && ["C", "c", "S", "s"].indexOf(o[u - 1][0]) > -1 ? new bn(s[0], s[1], 2 * s[0] - o[u - 1][o[u - 1].length - 4], 2 * s[1] - o[u - 1][o[u - 1].length - 3], o[u][1], o[u][2], o[u][3], o[u][4]) : new bn(s[0], s[1], s[0], s[1], o[u][1], o[u][2], o[u][3], o[u][4]), e += a.getTotalLength(), s = [o[u][3], o[u][4]], i.push(a)) : "s" === o[u][0] ? (a = u > 0 && ["C", "c", "S", "s"].indexOf(o[u - 1][0]) > -1 ? new bn(s[0], s[1], s[0] + a.d.x - a.c.x, s[1] + a.d.y - a.c.y, s[0] + o[u][1], s[1] + o[u][2], s[0] + o[u][3], s[1] + o[u][4]) : new bn(s[0], s[1], s[0], s[1], s[0] + o[u][1], s[1] + o[u][2], s[0] + o[u][3], s[1] + o[u][4]), e += a.getTotalLength(), s = [o[u][3] + s[0], o[u][4] + s[1]], i.push(a)) : "Q" === o[u][0] ? (a = new bn(s[0], s[1], o[u][1], o[u][2], o[u][3], o[u][4]), e += a.getTotalLength(), i.push(a), s = [o[u][3], o[u][4]], h = [o[u][1], o[u][2]]) : "q" === o[u][0] ? (a = new bn(s[0], s[1], s[0] + o[u][1], s[1] + o[u][2], s[0] + o[u][3], s[1] + o[u][4]), e += a.getTotalLength(), h = [s[0] + o[u][1], s[1] + o[u][2]], s = [o[u][3] + s[0], o[u][4] + s[1]], i.push(a)) : "T" === o[u][0] ? (a = u > 0 && ["Q", "q", "T", "t"].indexOf(o[u - 1][0]) > -1 ? new bn(s[0], s[1], 2 * s[0] - h[0], 2 * s[1] - h[1], o[u][1], o[u][2]) : new En(s[0], o[u][1], s[1], o[u][2]), i.push(a), e += a.getTotalLength(), h = [2 * s[0] - h[0], 2 * s[1] - h[1]], s = [o[u][1], o[u][2]]) : "t" === o[u][0] ? (a = u > 0 && ["Q", "q", "T", "t"].indexOf(o[u - 1][0]) > -1 ? new bn(s[0], s[1], 2 * s[0] - h[0], 2 * s[1] - h[1], s[0] + o[u][1], s[1] + o[u][2]) : new En(s[0], s[0] + o[u][1], s[1], s[1] + o[u][2]), e += a.getTotalLength(), h = [2 * s[0] - h[0], 2 * s[1] - h[1]], s = [o[u][1] + s[0], o[u][2] + s[0]], i.push(a)) : "A" === o[u][0] ? (a = new _n(s[0], s[1], o[u][1], o[u][2], o[u][3], o[u][4], o[u][5], o[u][6], o[u][7]), e += a.getTotalLength(), s = [o[u][6], o[u][7]], i.push(a)) : "a" === o[u][0] && (a = new _n(s[0], s[1], o[u][1], o[u][2], o[u][3], o[u][4], o[u][5], s[0] + o[u][6], s[1] + o[u][7]), e += a.getTotalLength(), s = [s[0] + o[u][6], s[1] + o[u][7]], i.push(a)), r.push(e);
            }

            return n;
          }

          var e = 0,
              r = [],
              i = [];
          n.getTotalLength = function () {
            return e;
          }, n.getPointAtLength = function (t) {
            var n = a(t);
            return i[n.i].getPointAtLength(n.fraction);
          }, n.getTangentAtLength = function (t) {
            var n = a(t);
            return i[n.i].getTangentAtLength(n.fraction);
          }, n.getPropertiesAtLength = function (t) {
            var n = a(t);
            return i[n.i].getPropertiesAtLength(n.fraction);
          };

          var a = function a(t) {
            t < 0 ? t = 0 : t > e && (t = e);

            for (var n = r.length - 1; r[n] >= t && r[n] > 0;) {
              n--;
            }

            return n++, {
              fraction: t - r[n - 1],
              i: n
            };
          };

          return n(t);
        },
            Cn = 'All shapes must be supplied as arrays of [x, y] points or an SVG path string (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).\nExample valid ways of supplying a shape would be:\n[[0, 0], [10, 0], [10, 10]]\n"M0,0 L10,0 L10,10Z"\n',
            Zn = "flubber.all() expects two arrays of equal length as arguments. Each element in both arrays should be an array of [x, y] points or an SVG path string (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).",
            Tn = function Tn(t, n) {
          for (var e, r, i, a = t.length, o = 1 / 0, s = 0; s < a; s++) {
            !function (i) {
              r = 0, n.forEach(function (n, e) {
                var o = F(t[(i + e) % a], n);
                r += o * o;
              }), r < o && (o = r, e = i);
            }(s);
          }

          e && (i = t.splice(0, e), t.splice.apply(t, [t.length, 0].concat(i)));
        },
            Fn = function Fn(t, n, e) {
          void 0 === e && (e = {});
          var r = e.maxSegmentLength;
          void 0 === r && (r = 10);
          var i = e.string;
          void 0 === i && (i = !0);
          var a = J(t, r),
              o = J(n, r),
              s = tt(a, o, i);
          return !i || "string" != typeof t && "string" != typeof n ? s : function (e) {
            return e < 1e-4 && "string" == typeof t ? t : 1 - e < 1e-4 && "string" == typeof n ? n : s(e);
          };
        },
            zn = nt;

        nt.deviation = function (t, n, e, r) {
          var i = n && n.length,
              a = i ? n[0] * e : t.length,
              o = Math.abs(Et(t, 0, a, e));
          if (i) for (var s = 0, h = n.length; s < h; s++) {
            var u = n[s] * e,
                c = s < h - 1 ? n[s + 1] * e : t.length;
            o -= Math.abs(Et(t, u, c, e));
          }
          var f = 0;

          for (s = 0; s < r.length; s += 3) {
            var l = r[s] * e,
                p = r[s + 1] * e,
                g = r[s + 2] * e;
            f += Math.abs((t[l] - t[g]) * (t[p + 1] - t[l + 1]) - (t[l] - t[p]) * (t[g + 1] - t[l + 1]));
          }

          return 0 === o && 0 === f ? 0 : Math.abs((f - o) / o);
        }, nt.flatten = function (t) {
          for (var n = t[0][0].length, e = {
            vertices: [],
            holes: [],
            dimensions: n
          }, r = 0, i = 0; i < t.length; i++) {
            for (var a = 0; a < t[i].length; a++) {
              for (var o = 0; o < n; o++) {
                e.vertices.push(t[i][a][o]);
              }
            }

            i > 0 && (r += t[i - 1].length, e.holes.push(r));
          }

          return e;
        };

        var jn = function jn(t) {
          return t;
        },
            In = function In(t) {
          if (null == t) return jn;
          var n,
              e,
              r = t.scale[0],
              i = t.scale[1],
              a = t.translate[0],
              o = t.translate[1];
          return function (t, s) {
            s || (n = e = 0);
            var h = 2,
                u = t.length,
                c = new Array(u);

            for (c[0] = (n += t[0]) * r + a, c[1] = (e += t[1]) * i + o; h < u;) {
              c[h] = t[h], ++h;
            }

            return c;
          };
        },
            Vn = function Vn(t, n) {
          for (var e, r = t.length, i = r - n; i < --r;) {
            e = t[i], t[i++] = t[r], t[r] = e;
          }
        },
            Xn = function Xn(t, n) {
          return "GeometryCollection" === n.type ? {
            type: "FeatureCollection",
            features: n.geometries.map(function (n) {
              return St(t, n);
            })
          } : St(t, n);
        },
            Yn = function Yn(t, n) {
          function e(n) {
            var e,
                r = t.arcs[n < 0 ? ~n : n],
                i = r[0];
            return t.transform ? (e = [0, 0], r.forEach(function (t) {
              e[0] += t[0], e[1] += t[1];
            })) : e = r[r.length - 1], n < 0 ? [e, i] : [i, e];
          }

          function r(t, n) {
            for (var e in t) {
              var r = t[e];
              delete n[r.start], delete r.start, delete r.end, r.forEach(function (t) {
                i[t < 0 ? ~t : t] = 1;
              }), s.push(r);
            }
          }

          var i = {},
              a = {},
              o = {},
              s = [],
              h = -1;
          return n.forEach(function (e, r) {
            var i,
                a = t.arcs[e < 0 ? ~e : e];
            a.length < 3 && !a[1][0] && !a[1][1] && (i = n[++h], n[h] = e, n[r] = i);
          }), n.forEach(function (t) {
            var n,
                r,
                i = e(t),
                s = i[0],
                h = i[1];
            if (n = o[s]) {
              if (delete o[n.end], n.push(t), n.end = h, r = a[h]) {
                delete a[r.start];
                var u = r === n ? n : n.concat(r);
                a[u.start = n.start] = o[u.end = r.end] = u;
              } else a[n.start] = o[n.end] = n;
            } else if (n = a[h]) {
              if (delete a[n.start], n.unshift(t), n.start = s, r = o[s]) {
                delete o[r.end];
                var c = r === n ? n : r.concat(n);
                a[c.start = r.start] = o[c.end = n.end] = c;
              } else a[n.start] = o[n.end] = n;
            } else n = [t], a[n.start = s] = o[n.end = h] = n;
          }), r(o, a), r(a, o), n.forEach(function (t) {
            i[t < 0 ? ~t : t] || s.push([t]);
          }), s;
        },
            Gn = function Gn(t, n) {
          for (var e = 0, r = t.length; e < r;) {
            var i = e + r >>> 1;
            t[i] < n ? e = i + 1 : r = i;
          }

          return e;
        },
            On = function On(t) {
          function n(t, n) {
            t.forEach(function (t) {
              t < 0 && (t = ~t);
              var e = i[t];
              e ? e.push(n) : i[t] = [n];
            });
          }

          function e(t, e) {
            t.forEach(function (t) {
              n(t, e);
            });
          }

          function r(t, n) {
            "GeometryCollection" === t.type ? t.geometries.forEach(function (t) {
              r(t, n);
            }) : t.type in o && o[t.type](t.arcs, n);
          }

          var i = {},
              a = t.map(function () {
            return [];
          }),
              o = {
            LineString: n,
            MultiLineString: e,
            Polygon: e,
            MultiPolygon: function MultiPolygon(t, n) {
              t.forEach(function (t) {
                e(t, n);
              });
            }
          };
          t.forEach(r);

          for (var s in i) {
            for (var h = i[s], u = h.length, c = 0; c < u; ++c) {
              for (var f = c + 1; f < u; ++f) {
                var l,
                    p = h[c],
                    g = h[f];
                (l = a[p])[s = Gn(l, g)] !== g && l.splice(s, 0, g), (l = a[g])[s = Gn(l, p)] !== p && l.splice(s, 0, p);
              }
            }
          }

          return a;
        },
            Dn = function Dn(t, n) {
          return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
        },
            Hn = function Hn(t) {
          return 1 === t.length && (t = Ft(t)), {
            left: function left(n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
                var a = r + i >>> 1;
                t(n[a], e) < 0 ? r = a + 1 : i = a;
              }

              return r;
            },
            right: function right(n, e, r, i) {
              for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
                var a = r + i >>> 1;
                t(n[a], e) > 0 ? i = a : r = a + 1;
              }

              return r;
            }
          };
        },
            Nn = Hn(Dn),
            Qn = (Nn.right, Math.sqrt(50), Math.sqrt(10), Math.sqrt(2), function (t, n) {
          return jt(zt(It(t), t), n);
        }),
            Un = function Un(t, n) {
          if (t.length > 8) return t.map(function (t, n) {
            return n;
          });
          var e = t.map(function (t) {
            return n.map(function (n) {
              return Xt(t, n);
            });
          });
          return Vt(t, n, e);
        };

        t.interpolate = Fn, t.separate = Yt, t.combine = Gt, t.interpolateAll = Ot, t.splitPathString = N, t.toPathString = H, t.fromCircle = Ht, t.toCircle = Nt, t.fromRect = Qt, t.toRect = Ut, Object.defineProperty(t, "__esModule", {
          value: !0
        });
      });
    }, {}],
    13: [function (_dereq_, module, exports) {
      !function (e, t) {
        "object" == _typeof2(exports) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.htm = t();
      }(this, function () {
        var e = {},
            t = document.createElement("template"),
            n = /(\$_h\[\d+\])/g;

        function r(e, t) {
          var r = e.match(n),
              i = JSON.stringify(e);

          if (null != r) {
            if (r[0] === e) return e;
            i = i.replace(n, '"' + t + "$1" + t + '"').replace(/"[+,]"/g, ""), "," == t && (i = "[" + i + "]");
          }

          return i;
        }

        return function (n) {
          return (e[n] || (e[n] = function (e) {
            for (var n = e[0], i = 1; i < e.length;) {
              n += "$_h[" + i + "]" + e[i++];
            }

            return t.innerHTML = n.replace(/<(?:(\/)\/|(\/?)(\$_h\[\d+\]))/g, "<$1$2c c@=$3").replace(/<([\w:-]+)(?:\s[^<>]*?)?(\/?)>/g, function (e, t, n) {
              return e.replace(/(?:'.*?'|".*?"|([A-Z]))/g, function (e, t) {
                return t ? ":::" + t : e;
              }) + (n ? "</" + t + ">" : "");
            }).trim(), Function("h", "$_h", "return " + function e(t) {
              if (1 != t.nodeType) return 3 == t.nodeType && t.data ? r(t.data, ",") : "null";

              for (var n = "", i = r(t.localName, n), u = "", a = ",({", o = 0; o < t.attributes.length; o++) {
                var c = t.attributes[o].name,
                    f = t.attributes[o].value;
                "c@" == c ? i = f : "..." == c.substring(0, 3) ? (u = "", a = ",Object.assign({", n += "}," + c.substring(3) + ",{") : (n += u + '"' + c.replace(/:::(\w)/g, function (e, t) {
                  return t.toUpperCase();
                }) + '":' + (!f || r(f, "+")), u = ",");
              }

              n = "h(" + i + a + n + "})";

              for (var l = t.firstChild; l;) {
                n += "," + e(l), l = l.nextSibling;
              }

              return n + ")";
            }((t.content || t).firstChild));
          }(n)))(this, arguments);
        };
      });
    }, {}],
    14: [function (_dereq_, module, exports) {
      !function () {
        'use strict';

        function h(nodeName, attributes) {
          var lastSimple,
              child,
              simple,
              i,
              children = EMPTY_CHILDREN;

          for (i = arguments.length; i-- > 2;) {
            stack.push(arguments[i]);
          }

          if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
          }

          while (stack.length) {
            if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--;) {
              stack.push(child[i]);
            } else {
              if ('boolean' == typeof child) child = null;
              if (simple = 'function' != typeof nodeName) if (null == child) child = '';else if ('number' == typeof child) child = String(child);else if ('string' != typeof child) simple = !1;
              if (simple && lastSimple) children[children.length - 1] += child;else if (children === EMPTY_CHILDREN) children = [child];else children.push(child);
              lastSimple = simple;
            }
          }

          var p = new VNode();
          p.nodeName = nodeName;
          p.children = children;
          p.attributes = null == attributes ? void 0 : attributes;
          p.key = null == attributes ? void 0 : attributes.key;
          if (void 0 !== options.vnode) options.vnode(p);
          return p;
        }

        function extend(obj, props) {
          for (var i in props) {
            obj[i] = props[i];
          }

          return obj;
        }

        function applyRef(ref, value) {
          if (null != ref) if ('function' == typeof ref) ref(value);else ref.current = value;
        }

        function cloneElement(vnode, props) {
          return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
        }

        function enqueueRender(component) {
          if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
        }

        function rerender() {
          var p;

          while (p = items.pop()) {
            if (p.__d) renderComponent(p);
          }
        }

        function isSameNodeType(node, vnode, hydrating) {
          if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
          if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);else return hydrating || node._componentConstructor === vnode.nodeName;
        }

        function isNamedNode(node, nodeName) {
          return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
        }

        function getNodeProps(vnode) {
          var props = extend({}, vnode.attributes);
          props.children = vnode.children;
          var defaultProps = vnode.nodeName.defaultProps;
          if (void 0 !== defaultProps) for (var i in defaultProps) {
            if (void 0 === props[i]) props[i] = defaultProps[i];
          }
          return props;
        }

        function createNode(nodeName, isSvg) {
          var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
          node.__n = nodeName;
          return node;
        }

        function removeNode(node) {
          var parentNode = node.parentNode;
          if (parentNode) parentNode.removeChild(node);
        }

        function setAccessor(node, name, old, value, isSvg) {
          if ('className' === name) name = 'class';
          if ('key' === name) ;else if ('ref' === name) {
            applyRef(old, null);
            applyRef(value, node);
          } else if ('class' === name && !isSvg) node.className = value || '';else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';

            if (value && 'object' == _typeof2(value)) {
              if ('string' != typeof old) for (var i in old) {
                if (!(i in value)) node.style[i] = '';
              }

              for (var i in value) {
                node.style[i] = 'number' == typeof value[i] && !1 === IS_NON_DIMENSIONAL.test(i) ? value[i] + 'px' : value[i];
              }
            }
          } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
          } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);

            if (value) {
              if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);

            (node.__l || (node.__l = {}))[name] = value;
          } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            try {
              node[name] = null == value ? '' : value;
            } catch (e) {}

            if ((null == value || !1 === value) && 'spellcheck' != name) node.removeAttribute(name);
          } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
            if (null == value || !1 === value) {
              if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
            } else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
          }
        }

        function eventProxy(e) {
          return this.__l[e.type](options.event && options.event(e) || e);
        }

        function flushMounts() {
          var c;

          while (c = mounts.shift()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
          }
        }

        function diff(dom, vnode, context, mountAll, parent, componentRoot) {
          if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
          }

          var ret = idiff(dom, vnode, context, mountAll, componentRoot);
          if (parent && ret.parentNode !== parent) parent.appendChild(ret);

          if (! --diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
          }

          return ret;
        }

        function idiff(dom, vnode, context, mountAll, componentRoot) {
          var out = dom,
              prevSvgMode = isSvgMode;
          if (null == vnode || 'boolean' == typeof vnode) vnode = '';

          if ('string' == typeof vnode || 'number' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
              if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
              out = document.createTextNode(vnode);

              if (dom) {
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
              }
            }

            out.__preactattr_ = !0;
            return out;
          }

          var vnodeName = vnode.nodeName;
          if ('function' == typeof vnodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
          isSvgMode = 'svg' === vnodeName ? !0 : 'foreignObject' === vnodeName ? !1 : isSvgMode;
          vnodeName = String(vnodeName);

          if (!dom || !isNamedNode(dom, vnodeName)) {
            out = createNode(vnodeName, isSvgMode);

            if (dom) {
              while (dom.firstChild) {
                out.appendChild(dom.firstChild);
              }

              if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
              recollectNodeTree(dom, !0);
            }
          }

          var fc = out.firstChild,
              props = out.__preactattr_,
              vchildren = vnode.children;

          if (null == props) {
            props = out.__preactattr_ = {};

            for (var a = out.attributes, i = a.length; i--;) {
              props[a[i].name] = a[i].value;
            }
          }

          if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
          } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);

          diffAttributes(out, vnode.attributes, props);
          isSvgMode = prevSvgMode;
          return out;
        }

        function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
          var j,
              c,
              f,
              vchild,
              child,
              originalChildren = dom.childNodes,
              children = [],
              keyed = {},
              keyedLen = 0,
              min = 0,
              len = originalChildren.length,
              childrenLen = 0,
              vlen = vchildren ? vchildren.length : 0;
          if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i],
                props = _child.__preactattr_,
                key = vlen && props ? _child._component ? _child._component.__k : props.key : null;

            if (null != key) {
              keyedLen++;
              keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
          }
          if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;

            if (null != key) {
              if (keyedLen && void 0 !== keyed[key]) {
                child = keyed[key];
                keyed[key] = void 0;
                keyedLen--;
              }
            } else if (min < childrenLen) for (j = min; j < childrenLen; j++) {
              if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
              }
            }

            child = idiff(child, vchild, context, mountAll);
            f = originalChildren[i];
            if (child && child !== dom && child !== f) if (null == f) dom.appendChild(child);else if (child === f.nextSibling) removeNode(f);else dom.insertBefore(child, f);
          }
          if (keyedLen) for (var i in keyed) {
            if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
          }

          while (min <= childrenLen) {
            if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
          }
        }

        function recollectNodeTree(node, unmountOnly) {
          var component = node._component;
          if (component) unmountComponent(component);else {
            if (null != node.__preactattr_) applyRef(node.__preactattr_.ref, null);
            if (!1 === unmountOnly || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
          }
        }

        function removeChildren(node) {
          node = node.lastChild;

          while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
          }
        }

        function diffAttributes(dom, attrs, old) {
          var name;

          for (name in old) {
            if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
          }

          for (name in attrs) {
            if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
          }
        }

        function createComponent(Ctor, props, context) {
          var inst,
              i = recyclerComponents.length;

          if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
          } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
          }

          while (i--) {
            if (recyclerComponents[i].constructor === Ctor) {
              inst.__b = recyclerComponents[i].__b;
              recyclerComponents.splice(i, 1);
              return inst;
            }
          }

          return inst;
        }

        function doRender(props, state, context) {
          return this.constructor(props, context);
        }

        function setComponentProps(component, props, renderMode, context, mountAll) {
          if (!component.__x) {
            component.__x = !0;
            component.__r = props.ref;
            component.__k = props.key;
            delete props.ref;
            delete props.key;
            if (void 0 === component.constructor.getDerivedStateFromProps) if (!component.base || mountAll) {
              if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);

            if (context && context !== component.context) {
              if (!component.__c) component.__c = component.context;
              component.context = context;
            }

            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== renderMode) if (1 === renderMode || !1 !== options.syncComponentUpdates || !component.base) renderComponent(component, 1, mountAll);else enqueueRender(component);
            applyRef(component.__r, component);
          }
        }

        function renderComponent(component, renderMode, mountAll, isChild) {
          if (!component.__x) {
            var rendered,
                inst,
                cbase,
                props = component.props,
                state = component.state,
                context = component.context,
                previousProps = component.__p || props,
                previousState = component.__s || state,
                previousContext = component.__c || context,
                isUpdate = component.base,
                nextBase = component.__b,
                initialBase = isUpdate || nextBase,
                initialChildComponent = component._component,
                skip = !1,
                snapshot = previousContext;

            if (component.constructor.getDerivedStateFromProps) {
              state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
              component.state = state;
            }

            if (isUpdate) {
              component.props = previousProps;
              component.state = previousState;
              component.context = previousContext;
              if (2 !== renderMode && component.shouldComponentUpdate && !1 === component.shouldComponentUpdate(props, state, context)) skip = !0;else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
              component.props = props;
              component.state = state;
              component.context = context;
            }

            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;

            if (!skip) {
              rendered = component.render(props, state, context);
              if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
              if (isUpdate && component.getSnapshotBeforeUpdate) snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
              var toUnmount,
                  base,
                  childComponent = rendered && rendered.nodeName;

              if ('function' == typeof childComponent) {
                var childProps = getNodeProps(rendered);
                inst = initialChildComponent;
                if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1);else {
                  toUnmount = inst;
                  component._component = inst = createComponent(childComponent, childProps, context);
                  inst.__b = inst.__b || nextBase;
                  inst.__u = component;
                  setComponentProps(inst, childProps, 0, context, !1);
                  renderComponent(inst, 1, mountAll, !0);
                }
                base = inst.base;
              } else {
                cbase = initialBase;
                toUnmount = initialChildComponent;
                if (toUnmount) cbase = component._component = null;

                if (initialBase || 1 === renderMode) {
                  if (cbase) cbase._component = null;
                  base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                }
              }

              if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                var baseParent = initialBase.parentNode;

                if (baseParent && base !== baseParent) {
                  baseParent.replaceChild(base, initialBase);

                  if (!toUnmount) {
                    initialBase._component = null;
                    recollectNodeTree(initialBase, !1);
                  }
                }
              }

              if (toUnmount) unmountComponent(toUnmount);
              component.base = base;

              if (base && !isChild) {
                var componentRef = component,
                    t = component;

                while (t = t.__u) {
                  (componentRef = t).base = base;
                }

                base._component = componentRef;
                base._componentConstructor = componentRef.constructor;
              }
            }

            if (!isUpdate || mountAll) mounts.push(component);else if (!skip) {
              if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, snapshot);
              if (options.afterUpdate) options.afterUpdate(component);
            }

            while (component.__h.length) {
              component.__h.pop().call(component);
            }

            if (!diffLevel && !isChild) flushMounts();
          }
        }

        function buildComponentFromVNode(dom, vnode, context, mountAll) {
          var c = dom && dom._component,
              originalComponent = c,
              oldDom = dom,
              isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
              isOwner = isDirectOwner,
              props = getNodeProps(vnode);

          while (c && !isOwner && (c = c.__u)) {
            isOwner = c.constructor === vnode.nodeName;
          }

          if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
          } else {
            if (originalComponent && !isDirectOwner) {
              unmountComponent(originalComponent);
              dom = oldDom = null;
            }

            c = createComponent(vnode.nodeName, props, context);

            if (dom && !c.__b) {
              c.__b = dom;
              oldDom = null;
            }

            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;

            if (oldDom && dom !== oldDom) {
              oldDom._component = null;
              recollectNodeTree(oldDom, !1);
            }
          }

          return dom;
        }

        function unmountComponent(component) {
          if (options.beforeUnmount) options.beforeUnmount(component);
          var base = component.base;
          component.__x = !0;
          if (component.componentWillUnmount) component.componentWillUnmount();
          component.base = null;
          var inner = component._component;
          if (inner) unmountComponent(inner);else if (base) {
            if (null != base.__preactattr_) applyRef(base.__preactattr_.ref, null);
            component.__b = base;
            removeNode(base);
            recyclerComponents.push(component);
            removeChildren(base);
          }
          applyRef(component.__r, null);
        }

        function Component(props, context) {
          this.__d = !0;
          this.context = context;
          this.props = props;
          this.state = this.state || {};
          this.__h = [];
        }

        function render(vnode, parent, merge) {
          return diff(merge, vnode, {}, !1, parent, !1);
        }

        function createRef() {
          return {};
        }

        var VNode = function VNode() {};

        var options = {};
        var stack = [];
        var EMPTY_CHILDREN = [];
        var defer = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
        var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
        var items = [];
        var mounts = [];
        var diffLevel = 0;
        var isSvgMode = !1;
        var hydrating = !1;
        var recyclerComponents = [];
        extend(Component.prototype, {
          setState: function setState(state, callback) {
            if (!this.__s) this.__s = this.state;
            this.state = extend(extend({}, this.state), 'function' == typeof state ? state(this.state, this.props) : state);
            if (callback) this.__h.push(callback);
            enqueueRender(this);
          },
          forceUpdate: function forceUpdate(callback) {
            if (callback) this.__h.push(callback);
            renderComponent(this, 2);
          },
          render: function render() {}
        });
        var preact = {
          h: h,
          createElement: h,
          cloneElement: cloneElement,
          createRef: createRef,
          Component: Component,
          render: render,
          rerender: rerender,
          options: options
        };
        if ('undefined' != typeof module) module.exports = preact;else self.preact = preact;
      }();
    }, {}],
    15: [function (_dereq_, module, exports) {
      (function (global) {
        /* spacetime v4.5.1
          
        */
        !function (n) {
          if ("object" == _typeof2(exports) && "undefined" != typeof module) module.exports = n();else if ("function" == typeof define && define.amd) define([], n);else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).spacetime = n();
          }
        }(function () {
          return function a(i, s, u) {
            function c(t, n) {
              if (!s[t]) {
                if (!i[t]) {
                  var e = "function" == typeof _dereq_ && _dereq_;
                  if (!n && e) return e(t, !0);
                  if (h) return h(t, !0);
                  var r = new Error("Cannot find module '" + t + "'");
                  throw r.code = "MODULE_NOT_FOUND", r;
                }

                var o = s[t] = {
                  exports: {}
                };
                i[t][0].call(o.exports, function (n) {
                  return c(i[t][1][n] || n);
                }, o, o.exports, a, i, s, u);
              }

              return s[t].exports;
            }

            for (var h = "function" == typeof _dereq_ && _dereq_, n = 0; n < u.length; n++) {
              c(u[n]);
            }

            return c;
          }({
            1: [function (n, t, e) {
              "use strict";

              var o,
                  a,
                  r = n("./zonefile.2018.json"),
                  i = {
                Australia: !0,
                Chile: !0,
                Brazil: !0,
                Antarctica: !0
              },
                  s = (o = r, a = {}, Object.keys(o).forEach(function (r) {
                Object.keys(o[r]).forEach(function (n) {
                  var t = r + "/" + n,
                      e = o[r][n];
                  a[t] = {
                    o: e[0],
                    h: e[1]
                  }, e[2] && (a[t].dst = e[2]), !0 === i[r] && (a[t].h = "s");
                });
              }), a["Etc/UTC"] = {
                o: 0,
                h: "n"
              }, a.UTC = a["Etc/UTC"], a);
              t.exports = s;
            }, {
              "./zonefile.2018.json": 2
            }],
            2: [function (n, t, e) {
              t.exports = {
                Africa: {
                  Abidjan: [0, "n"],
                  Accra: [0, "n"],
                  Addis_Ababa: [3, "n"],
                  Algiers: [1, "n"],
                  Asmara: [3, "n"],
                  Asmera: [3, "n"],
                  Bamako: [0, "n"],
                  Bangui: [1, "n"],
                  Banjul: [0, "n"],
                  Bissau: [0, "n"],
                  Blantyre: [2, "n"],
                  Brazzaville: [1, "n"],
                  Bujumbura: [2, "n"],
                  Cairo: [2, "n"],
                  Casablanca: [1, "n", "07/02:03->10/29:02"],
                  Ceuta: [2, "n", "03/25:02->10/28:03"],
                  Conakry: [0, "n"],
                  Dakar: [0, "n"],
                  Dar_es_Salaam: [3, "n"],
                  Djibouti: [3, "n"],
                  Douala: [1, "n"],
                  El_Aaiun: [1, "n", "07/02:03->10/29:02"],
                  Freetown: [0, "n"],
                  Gaborone: [2, "s"],
                  Harare: [2, "s"],
                  Johannesburg: [2, "s"],
                  Juba: [3, "n"],
                  Kampala: [3, "n"],
                  Khartoum: [2, "n"],
                  Kigali: [2, "n"],
                  Kinshasa: [1, "s"],
                  Lagos: [1, "n"],
                  Libreville: [1, "n"],
                  Lome: [0, "n"],
                  Luanda: [1, "s"],
                  Lubumbashi: [2, "s"],
                  Lusaka: [2, "s"],
                  Malabo: [1, "n"],
                  Maputo: [2, "s"],
                  Maseru: [2, "s"],
                  Mbabane: [2, "s"],
                  Mogadishu: [3, "n"],
                  Monrovia: [0, "n"],
                  Nairobi: [3, "n"],
                  Ndjamena: [1, "n"],
                  Niamey: [1, "n"],
                  Nouakchott: [0, "n"],
                  Ouagadougou: [0, "n"],
                  "Porto-Novo": [1, "n"],
                  Sao_Tome: [0, "n"],
                  Timbuktu: [0, "n"],
                  Tripoli: [2, "n"],
                  Tunis: [1, "n"],
                  Windhoek: [1, "s", "04/02:01->09/03:03"]
                },
                America: {
                  Adak: [-9, "n", "03/11:02->11/04:02"],
                  Anchorage: [-8, "n", "03/11:02->11/04:02"],
                  Anguilla: [-4, "n"],
                  Antigua: [-4, "n"],
                  Araguaina: [-3, "n"],
                  Argentina: [-3, "s"],
                  Aruba: [-4, "n"],
                  Asuncion: [-4, "s", "03/24:24->10/07:00"],
                  Atikokan: [-5, "n"],
                  Atka: [-9, "n", "03/11:02->11/04:02"],
                  Bahia: [-3, "n"],
                  Bahia_Banderas: [-5, "n", "04/01:02->10/28:02"],
                  Barbados: [-4, "n"],
                  Belem: [-3, "n"],
                  Belize: [-6, "n"],
                  "Blanc-Sablon": [-4, "n"],
                  Boa_Vista: [-4, "n"],
                  Bogota: [-5, "n"],
                  Boise: [-6, "n", "03/11:02->11/04:02"],
                  Buenos_Aires: [-3, "s"],
                  Cambridge_Bay: [-6, "n", "03/11:02->11/04:02"],
                  Campo_Grande: [-4, "s", "02/17:24->11/04:00"],
                  Cancun: [-5, "n"],
                  Caracas: [-4, "n"],
                  Catamarca: [-3, "n"],
                  Cayenne: [-3, "n"],
                  Cayman: [-5, "n"],
                  Chicago: [-5, "n", "03/11:02->11/04:02"],
                  Chihuahua: [-6, "n", "04/01:02->10/28:02"],
                  Coral_Harbour: [-5, "n"],
                  Cordoba: [-3, "s"],
                  Costa_Rica: [-6, "n"],
                  Creston: [-7, "n"],
                  Cuiaba: [-4, "s", "02/17:24->11/04:00"],
                  Curacao: [-4, "n"],
                  Danmarkshavn: [0, "n"],
                  Dawson: [-7, "n", "03/11:02->11/04:02"],
                  Dawson_Creek: [-7, "n"],
                  Denver: [-6, "n", "03/11:02->11/04:02"],
                  Detroit: [-4, "n", "03/11:02->11/04:02"],
                  Dominica: [-4, "n"],
                  Edmonton: [-6, "n", "03/11:02->11/04:02"],
                  Eirunepe: [-5, "n"],
                  El_Salvador: [-6, "n"],
                  Ensenada: [-7, "n", "03/11:02->11/04:02"],
                  Fort_Wayne: [-4, "n", "03/11:02->11/04:02"],
                  Fortaleza: [-3, "n"],
                  Glace_Bay: [-3, "n", "03/11:02->11/04:02"],
                  Godthab: [-2, "n", "03/24:22->10/27:23"],
                  Goose_Bay: [-3, "n", "03/11:02->11/04:02"],
                  Grand_Turk: [-4, "n", "03/11:02->11/04:02"],
                  Grenada: [-4, "n"],
                  Guadeloupe: [-4, "n"],
                  Guatemala: [-6, "n"],
                  Guayaquil: [-5, "n"],
                  Guyana: [-4, "n"],
                  Halifax: [-3, "n", "03/11:02->11/04:02"],
                  Havana: [-4, "n", "03/11:00->11/04:01"],
                  Hermosillo: [-7, "n"],
                  Indiana: [-4, "n", "03/12:03->11/05:01"],
                  Indianapolis: [-4, "n", "03/11:02->11/04:02"],
                  Inuvik: [-6, "n", "03/11:02->11/04:02"],
                  Iqaluit: [-4, "n", "03/11:02->11/04:02"],
                  Jamaica: [-5, "n"],
                  Jujuy: [-3, "n"],
                  Juneau: [-8, "n", "03/11:02->11/04:02"],
                  Kentucky: [-4, "n", "03/12:03->11/05:01"],
                  Knox_IN: [-5, "n", "03/11:02->11/04:02"],
                  Kralendijk: [-4, "n"],
                  La_Paz: [-4, "s"],
                  Lima: [-5, "s"],
                  Los_Angeles: [-7, "n", "03/11:02->11/04:02"],
                  Louisville: [-4, "n", "03/11:02->11/04:02"],
                  Lower_Princes: [-4, "n"],
                  Maceio: [-3, "n"],
                  Managua: [-6, "n"],
                  Manaus: [-4, "s"],
                  Marigot: [-4, "n"],
                  Martinique: [-4, "n"],
                  Matamoros: [-5, "n", "03/11:02->11/04:02"],
                  Mazatlan: [-6, "n", "04/01:02->10/28:02"],
                  Mendoza: [-3, "n"],
                  Menominee: [-5, "n", "03/11:02->11/04:02"],
                  Merida: [-5, "n", "04/01:02->10/28:02"],
                  Metlakatla: [-8, "n", "03/11:02->11/04:02"],
                  Mexico_City: [-5, "n", "04/01:02->10/28:02"],
                  Miquelon: [-2, "n", "03/11:02->11/04:02"],
                  Moncton: [-3, "n", "03/11:02->11/04:02"],
                  Monterrey: [-5, "n", "04/01:02->10/28:02"],
                  Montevideo: [-3, "s"],
                  Montreal: [-4, "n", "03/11:02->11/04:02"],
                  Montserrat: [-4, "n"],
                  Nassau: [-4, "n", "03/11:02->11/04:02"],
                  New_York: [-4, "n", "03/11:02->11/04:02"],
                  Nipigon: [-4, "n", "03/11:02->11/04:02"],
                  Nome: [-8, "n", "03/11:02->11/04:02"],
                  Noronha: [-2, "n"],
                  North_Dakota: [-5, "n", "03/12:03->11/05:01"],
                  Ojinaga: [-6, "n", "03/11:02->11/04:02"],
                  Panama: [-5, "n"],
                  Pangnirtung: [-4, "n", "03/11:02->11/04:02"],
                  Paramaribo: [-3, "n"],
                  Phoenix: [-7, "n"],
                  "Port-au-Prince": [-4, "n", "03/11:02->11/04:02"],
                  Port_of_Spain: [-4, "n"],
                  Porto_Acre: [-5, "n"],
                  Porto_Velho: [-4, "n"],
                  Puerto_Rico: [-4, "n"],
                  Punta_Arenas: [-3, "s"],
                  Rainy_River: [-5, "n", "03/11:02->11/04:02"],
                  Rankin_Inlet: [-5, "n", "03/11:02->11/04:02"],
                  Recife: [-3, "n"],
                  Regina: [-6, "n"],
                  Resolute: [-5, "n", "03/11:02->11/04:02"],
                  Rio_Branco: [-5, "n"],
                  Rosario: [-3, "n"],
                  Santa_Isabel: [-7, "n", "03/11:02->11/04:02"],
                  Santarem: [-3, "n"],
                  Santiago: [-4, "s", "05/12:24->08/12:00"],
                  Santo_Domingo: [-4, "n"],
                  Sao_Paulo: [-3, "s", "02/17:24->11/04:00"],
                  Scoresbysund: [0, "n", "03/25:00->10/28:01"],
                  Shiprock: [-6, "n", "03/11:02->11/04:02"],
                  Sitka: [-8, "n", "03/11:02->11/04:02"],
                  St_Barthelemy: [-4, "n"],
                  St_Johns: [-2.5, "n", "03/11:02->11/04:02"],
                  St_Kitts: [-4, "n"],
                  St_Lucia: [-4, "n"],
                  St_Thomas: [-4, "n"],
                  St_Vincent: [-4, "n"],
                  Swift_Current: [-6, "n"],
                  Tegucigalpa: [-6, "n"],
                  Thule: [-3, "n", "03/11:02->11/04:02"],
                  Thunder_Bay: [-4, "n", "03/11:02->11/04:02"],
                  Tijuana: [-7, "n", "03/11:02->11/04:02"],
                  Toronto: [-4, "n", "03/11:02->11/04:02"],
                  Tortola: [-4, "n"],
                  Vancouver: [-7, "n", "03/11:02->11/04:02"],
                  Virgin: [-4, "n"],
                  Whitehorse: [-7, "n", "03/11:02->11/04:02"],
                  Winnipeg: [-5, "n", "03/11:02->11/04:02"],
                  Yakutat: [-8, "n", "03/11:02->11/04:02"],
                  Yellowknife: [-6, "n", "03/11:02->11/04:02"]
                },
                Antarctica: {
                  Casey: [8, "s"],
                  Davis: [7, "s"],
                  DumontDUrville: [10, "s"],
                  Macquarie: [11, "s"],
                  Mawson: [5, "s"],
                  McMurdo: [12, "s", "04/01:03->09/30:02"],
                  Palmer: [-4, "s", "05/13:23->08/13:01"],
                  Rothera: [-3, "s"],
                  South_Pole: [12, "s", "04/01:03->09/30:02"],
                  Syowa: [3, "s"],
                  Troll: [2, "s", "03/25:02->10/28:02"],
                  Vostok: [6, "s"]
                },
                Arctic: {
                  Longyearbyen: [2, "n", "03/25:02->10/28:03"]
                },
                Asia: {
                  Aden: [3, "n"],
                  Almaty: [6, "n"],
                  Amman: [3, "n", "03/30:00->10/26:01"],
                  Anadyr: [12, "n"],
                  Aqtau: [5, "n"],
                  Aqtobe: [5, "n"],
                  Ashgabat: [5, "n"],
                  Ashkhabad: [5, "n"],
                  Atyrau: [5, "n"],
                  Baghdad: [3, "n"],
                  Bahrain: [3, "n"],
                  Baku: [5, "n"],
                  Bangkok: [7, "n"],
                  Barnaul: [7, "n"],
                  Beirut: [3, "n", "03/25:00->10/27:24"],
                  Bishkek: [6, "n"],
                  Brunei: [8, "n"],
                  Calcutta: [5.5, "n"],
                  Chita: [9, "n"],
                  Choibalsan: [8, "n"],
                  Chongqing: [8, "n"],
                  Chungking: [8, "n"],
                  Colombo: [5.5, "n"],
                  Dacca: [6, "n"],
                  Damascus: [3, "n", "03/30:00->10/25:24"],
                  Dhaka: [6, "n"],
                  Dili: [9, "s"],
                  Dubai: [4, "n"],
                  Dushanbe: [5, "n"],
                  Gaza: [3, "n", "03/24:01->10/27:01"],
                  Harbin: [8, "n"],
                  Hebron: [3, "n", "03/24:01->10/27:01"],
                  Ho_Chi_Minh: [7, "n"],
                  Hong_Kong: [8, "n"],
                  Hovd: [7, "n"],
                  Irkutsk: [8, "n"],
                  Istanbul: [3, "n"],
                  Jakarta: [7, "s"],
                  Jayapura: [9, "n"],
                  Jerusalem: [3, "n", "03/23:02->10/28:02"],
                  Kabul: [4.5, "n"],
                  Kamchatka: [12, "n"],
                  Karachi: [5, "n"],
                  Kashgar: [6, "n"],
                  Kathmandu: [5.75, "n"],
                  Katmandu: [5.75, "n"],
                  Khandyga: [9, "n"],
                  Kolkata: [5.5, "n"],
                  Krasnoyarsk: [7, "n"],
                  Kuala_Lumpur: [8, "s"],
                  Kuching: [8, "n"],
                  Kuwait: [3, "n"],
                  Macao: [8, "n"],
                  Macau: [8, "n"],
                  Magadan: [11, "n"],
                  Makassar: [8, "s"],
                  Manila: [8, "n"],
                  Muscat: [4, "n"],
                  Nicosia: [3, "n", "03/25:03->10/28:04"],
                  Novokuznetsk: [7, "n"],
                  Novosibirsk: [7, "n"],
                  Omsk: [6, "n"],
                  Oral: [5, "n"],
                  Phnom_Penh: [7, "n"],
                  Pontianak: [7, "n"],
                  Pyongyang: [9, "n"],
                  Qatar: [3, "n"],
                  Qyzylorda: [6, "n"],
                  Rangoon: [6.5, "n"],
                  Riyadh: [3, "n"],
                  Saigon: [7, "n"],
                  Sakhalin: [11, "n"],
                  Samarkand: [5, "n"],
                  Seoul: [9, "n"],
                  Shanghai: [8, "n"],
                  Singapore: [8, "s"],
                  Srednekolymsk: [12, "n"],
                  Taipei: [8, "n"],
                  Tashkent: [5, "n"],
                  Tbilisi: [4, "n"],
                  Tehran: [4.5, "n", "03/22:00->09/21:24"],
                  Tel_Aviv: [3, "n", "03/23:02->10/28:02"],
                  Thimbu: [6, "n"],
                  Thimphu: [6, "n"],
                  Tokyo: [9, "n"],
                  Ujung_Pandang: [8, "n"],
                  Ulaanbaatar: [8, "n"],
                  Ulan_Bator: [8, "n", "03/25:03->09/29:23"],
                  Urumqi: [6, "n"],
                  "Ust-Nera": [10, "n"],
                  Vientiane: [7, "n"],
                  Vladivostok: [10, "n"],
                  Yakutsk: [10, "n"],
                  Yekaterinburg: [5, "n"],
                  Yerevan: [4, "n"]
                },
                Atlantic: {
                  Azores: [0, "n", "03/25:00->10/28:01"],
                  Bermuda: [-3, "n", "03/11:02->11/04:02"],
                  Canary: [1, "n", "03/25:01->10/28:02"],
                  Cape_Verde: [-1, "n"],
                  Faeroe: [1, "n", "03/25:01->10/28:02"],
                  Faroe: [1, "n", "03/25:01->10/28:02"],
                  Jan_Mayen: [2, "n", "03/25:02->10/28:03"],
                  Madeira: [1, "n", "03/25:01->10/28:02"],
                  Reykjavik: [0, "n"],
                  South_Georgia: [-2, "n"],
                  St_Helena: [0, "n"],
                  Stanley: [-3, "n"]
                },
                Australia: {
                  ACT: [10, "s", "04/01:03->10/07:02"],
                  Adelaide: [9.5, "s", "04/01:03->10/07:02"],
                  Brisbane: [10, "s"],
                  Broken_Hill: [9.5, "s", "04/01:03->10/07:02"],
                  Canberra: [10, "s", "04/01:03->10/07:02"],
                  Currie: [10, "s", "04/01:03->10/07:02"],
                  Darwin: [9.5, "s"],
                  Eucla: [8.75, "s"],
                  Hobart: [10, "s", "04/01:03->10/07:02"],
                  LHI: [10.5, "s", "04/01:01->10/07:02"],
                  Lindeman: [10, "s"],
                  Lord_Howe: [10.5, "s", "04/01:01->10/07:02"],
                  Melbourne: [10, "s", "04/01:03->10/07:02"],
                  NSW: [10, "s", "04/01:03->10/07:02"],
                  North: [9.5, "s"],
                  Perth: [8, "s"],
                  Queensland: [10, "s"],
                  South: [9.5, "s", "04/01:03->10/07:02"],
                  Sydney: [10, "s", "04/01:03->10/07:02"],
                  Tasmania: [10, "s", "04/01:03->10/07:02"],
                  Victoria: [10, "s", "04/01:03->10/07:02"],
                  West: [8, "s"],
                  Yancowinna: [9.5, "s", "04/01:03->10/07:02"]
                },
                Brazil: {
                  Acre: [-5, "s"],
                  DeNoronha: [-2, "s"],
                  East: [-3, "s", "02/17:24->11/04:00"],
                  West: [-4, "s"]
                },
                Canada: {
                  Atlantic: [-3, "n", "03/11:02->11/04:02"],
                  Central: [-5, "n", "03/11:02->11/04:02"],
                  "East-Saskatchewan": [-6, "n"],
                  Eastern: [-4, "n", "03/11:02->11/04:02"],
                  Mountain: [-6, "n", "03/11:02->11/04:02"],
                  Newfoundland: [-2.5, "n", "03/11:02->11/04:02"],
                  Pacific: [-7, "n", "03/11:02->11/04:02"],
                  Saskatchewan: [-6, "n"],
                  Yukon: [-7, "n", "03/11:02->11/04:02"]
                },
                Chile: {
                  Continental: [-4, "s", "05/12:24->08/12:00"],
                  EasterIsland: [-6, "s", "05/12:22->08/11:22"]
                },
                Etc: {
                  GMT: [0, "n"],
                  "GMT+0": [0, "n"],
                  "GMT+1": [-1, "n"],
                  "GMT+10": [-10, "n"],
                  "GMT+11": [-11, "n"],
                  "GMT+12": [-12, "n"],
                  "GMT+2": [-2, "n"],
                  "GMT+3": [-3, "n"],
                  "GMT+4": [-4, "n"],
                  "GMT+5": [-5, "n"],
                  "GMT+6": [-6, "n"],
                  "GMT+7": [-7, "n"],
                  "GMT+8": [-8, "n"],
                  "GMT+9": [-9, "n"],
                  "GMT-0": [0, "n"],
                  "GMT-1": [1, "n"],
                  "GMT-10": [10, "n"],
                  "GMT-11": [11, "n"],
                  "GMT-12": [12, "n"],
                  "GMT-13": [13, "n"],
                  "GMT-14": [14, "n"],
                  "GMT-2": [2, "n"],
                  "GMT-3": [3, "n"],
                  "GMT-4": [4, "n"],
                  "GMT-5": [5, "n"],
                  "GMT-6": [6, "n"],
                  "GMT-7": [7, "n"],
                  "GMT-8": [8, "n"],
                  "GMT-9": [9, "n"],
                  GMT0: [0, "n"],
                  Greenwich: [0, "n"],
                  UCT: [0, "n"],
                  UTC: [0, "n"],
                  Universal: [0, "n"],
                  Zulu: [0, "n"]
                },
                Europe: {
                  Amsterdam: [2, "n", "03/25:02->10/28:03"],
                  Andorra: [2, "n", "03/25:02->10/28:03"],
                  Astrakhan: [4, "n"],
                  Athens: [3, "n", "03/25:03->10/28:04"],
                  Belfast: [1, "n", "03/25:01->10/28:02"],
                  Belgrade: [2, "n", "03/25:02->10/28:03"],
                  Berlin: [2, "n", "03/25:02->10/28:03"],
                  Bratislava: [2, "n", "03/25:02->10/28:03"],
                  Brussels: [2, "n", "03/25:02->10/28:03"],
                  Bucharest: [3, "n", "03/25:03->10/28:04"],
                  Budapest: [2, "n", "03/25:02->10/28:03"],
                  Busingen: [2, "n", "03/25:02->10/28:03"],
                  Chisinau: [3, "n", "03/25:02->10/28:03"],
                  Copenhagen: [2, "n", "03/25:02->10/28:03"],
                  Dublin: [1, "n", "03/25:01->10/28:02"],
                  Gibraltar: [2, "n", "03/25:02->10/28:03"],
                  Guernsey: [1, "n", "03/25:01->10/28:02"],
                  Helsinki: [3, "n", "03/25:03->10/28:04"],
                  Isle_of_Man: [1, "n", "03/25:01->10/28:02"],
                  Istanbul: [3, "n"],
                  Jersey: [1, "n", "03/25:01->10/28:02"],
                  Kaliningrad: [2, "n"],
                  Kirov: [3, "n"],
                  Kiev: [3, "n", "03/25:03->10/28:04"],
                  Lisbon: [1, "n", "03/25:01->10/28:02"],
                  Ljubljana: [2, "n", "03/25:02->10/28:03"],
                  London: [1, "n", "03/25:01->10/28:02"],
                  Luxembourg: [2, "n", "03/25:02->10/28:03"],
                  Madrid: [2, "n", "03/25:02->10/28:03"],
                  Malta: [2, "n", "03/25:02->10/28:03"],
                  Mariehamn: [3, "n", "03/25:03->10/28:04"],
                  Minsk: [3, "n"],
                  Monaco: [2, "n", "03/25:02->10/28:03"],
                  Moscow: [3, "n"],
                  Nicosia: [3, "n", "03/25:03->10/28:04"],
                  Oslo: [2, "n", "03/25:02->10/28:03"],
                  Paris: [2, "n", "03/25:02->10/28:03"],
                  Podgorica: [2, "n", "03/25:02->10/28:03"],
                  Prague: [2, "n", "03/25:02->10/28:03"],
                  Riga: [3, "n", "03/25:03->10/28:04"],
                  Rome: [2, "n", "03/25:02->10/28:03"],
                  Samara: [4, "n"],
                  Saratov: [4, "n"],
                  San_Marino: [2, "n", "03/25:02->10/28:03"],
                  Sarajevo: [2, "n", "03/25:02->10/28:03"],
                  Simferopol: [3, "n"],
                  Skopje: [2, "n", "03/25:02->10/28:03"],
                  Sofia: [3, "n", "03/25:03->10/28:04"],
                  Stockholm: [2, "n", "03/25:02->10/28:03"],
                  Tallinn: [3, "n", "03/25:03->10/28:04"],
                  Tirane: [2, "n", "03/25:02->10/28:03"],
                  Tiraspol: [3, "n", "03/25:02->10/28:03"],
                  Ulyanovsk: [4, "n"],
                  Uzhgorod: [3, "n", "03/25:03->10/28:04"],
                  Vaduz: [2, "n", "03/25:02->10/28:03"],
                  Vatican: [2, "n", "03/25:02->10/28:03"],
                  Vienna: [2, "n", "03/25:02->10/28:03"],
                  Vilnius: [3, "n", "03/25:03->10/28:04"],
                  Volgograd: [3, "n"],
                  Warsaw: [2, "n", "03/25:02->10/28:03"],
                  Zagreb: [2, "n", "03/25:02->10/28:03"],
                  Zaporozhye: [3, "n", "03/25:03->10/28:04"],
                  Zurich: [2, "n", "03/25:02->10/28:03"]
                },
                Indian: {
                  Antananarivo: [3, "s"],
                  Chagos: [6, "n"],
                  Christmas: [7, "n"],
                  Cocos: [6.5, "n"],
                  Comoro: [3, "n"],
                  Kerguelen: [5, "s"],
                  Mahe: [4, "n"],
                  Maldives: [5, "n"],
                  Mauritius: [4, "n"],
                  Mayotte: [3, "n"],
                  Reunion: [4, "s"]
                },
                Mexico: {
                  BajaNorte: [-7, "n", "03/11:02->11/04:02"],
                  BajaSur: [-6, "n", "04/01:02->10/28:02"],
                  General: [-5, "n", "04/01:02->10/28:02"]
                },
                Pacific: {
                  Apia: [13, "s", "04/01:04->09/30:03"],
                  Auckland: [12, "s", "04/01:03->09/30:02"],
                  Chatham: [12.75, "s", "04/07:03->09/29:02"],
                  Chuuk: [10, "n"],
                  Easter: [-6, "s", "05/12:22->08/11:22"],
                  Efate: [11, "n"],
                  Enderbury: [13, "n"],
                  Fakaofo: [13, "n"],
                  Fiji: [12, "s", "01/14:03->11/04:02"],
                  Funafuti: [12, "n"],
                  Galapagos: [-6, "n"],
                  Gambier: [-9, "n"],
                  Guadalcanal: [11, "n"],
                  Guam: [10, "n"],
                  Honolulu: [-10, "n"],
                  Johnston: [-10, "n"],
                  Kiritimati: [14, "n"],
                  Kosrae: [11, "n"],
                  Kwajalein: [12, "n"],
                  Majuro: [12, "n"],
                  Marquesas: [-9.5, "n"],
                  Midway: [-11, "n"],
                  Nauru: [12, "n"],
                  Niue: [-11, "n"],
                  Norfolk: [11.5, "n"],
                  Noumea: [11, "n"],
                  Pago_Pago: [-11, "n"],
                  Palau: [9, "n"],
                  Pitcairn: [-8, "n"],
                  Pohnpei: [11, "n"],
                  Ponape: [11, "n"],
                  Port_Moresby: [10, "n"],
                  Rarotonga: [-10, "n"],
                  Saipan: [10, "n"],
                  Samoa: [-11, "n"],
                  Tahiti: [-10, "n"],
                  Tarawa: [12, "n"],
                  Tongatapu: [13, "s", "01/15:02->11/05:03"],
                  Truk: [10, "n"],
                  Wake: [12, "n"],
                  Wallis: [12, "n"],
                  Yap: [10, "n"]
                }
              };
            }, {}],
            3: [function (n, t, e) {
              var r,
                  o,
                  a = t.exports = {};

              function i() {
                throw new Error("setTimeout has not been defined");
              }

              function s() {
                throw new Error("clearTimeout has not been defined");
              }

              function u(t) {
                if (r === setTimeout) return setTimeout(t, 0);
                if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0);

                try {
                  return r(t, 0);
                } catch (n) {
                  try {
                    return r.call(null, t, 0);
                  } catch (n) {
                    return r.call(this, t, 0);
                  }
                }
              }

              !function () {
                try {
                  r = "function" == typeof setTimeout ? setTimeout : i;
                } catch (n) {
                  r = i;
                }

                try {
                  o = "function" == typeof clearTimeout ? clearTimeout : s;
                } catch (n) {
                  o = s;
                }
              }();
              var c,
                  h = [],
                  d = !1,
                  f = -1;

              function l() {
                d && c && (d = !1, c.length ? h = c.concat(h) : f = -1, h.length && m());
              }

              function m() {
                if (!d) {
                  var n = u(l);
                  d = !0;

                  for (var t = h.length; t;) {
                    for (c = h, h = []; ++f < t;) {
                      c && c[f].run();
                    }

                    f = -1, t = h.length;
                  }

                  c = null, d = !1, function (t) {
                    if (o === clearTimeout) return clearTimeout(t);
                    if ((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(t);

                    try {
                      o(t);
                    } catch (n) {
                      try {
                        return o.call(null, t);
                      } catch (n) {
                        return o.call(this, t);
                      }
                    }
                  }(n);
                }
              }

              function p(n, t) {
                this.fun = n, this.array = t;
              }

              function y() {}

              a.nextTick = function (n) {
                var t = new Array(arguments.length - 1);
                if (1 < arguments.length) for (var e = 1; e < arguments.length; e++) {
                  t[e - 1] = arguments[e];
                }
                h.push(new p(n, t)), 1 !== h.length || d || u(m);
              }, p.prototype.run = function () {
                this.fun.apply(null, this.array);
              }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = y, a.addListener = y, a.once = y, a.off = y, a.removeListener = y, a.removeAllListeners = y, a.emit = y, a.prependListener = y, a.prependOnceListener = y, a.listeners = function (n) {
                return [];
              }, a.binding = function (n) {
                throw new Error("process.binding is not supported");
              }, a.cwd = function () {
                return "/";
              }, a.chdir = function (n) {
                throw new Error("process.chdir is not supported");
              }, a.umask = function () {
                return 0;
              };
            }, {}],
            4: [function (n, t, e) {
              t.exports = {
                name: "spacetime",
                version: "4.5.1",
                description: "represent dates in remote timezones",
                main: "./spacetime.js",
                license: "Apache-2.0",
                scripts: {
                  precommit: "lint-staged",
                  build: "node ./scripts/build.js",
                  "build:tz": "node ./scripts/updateZonefile.js",
                  demo: "node ./scripts/demo.js",
                  watch: "amble ./scratch.js",
                  test: "TESTENV=dev tape ./test/**/*.test.js | tap-dancer",
                  "test-spec": "TESTENV=dev tape ./test/**/*.test.js | tap-spec",
                  t: "TESTENV=dev tape ./test/**/immutable.test.js",
                  testb: "TESTENV=prod tape ./test/**/*.test.js | tap-dancer",
                  lint: "eslint .",
                  size: "./node_modules/.bin/size-limit",
                  coverage: "node ./scripts/coverage.js"
                },
                repository: {
                  type: "git",
                  url: "https://github.com/smallwins/spacetime.git"
                },
                files: ["spacetime.js", "immutable.js"],
                dependencies: {},
                devDependencies: {
                  amble: "0.0.6",
                  "babel-cli": "6.26.0",
                  "babel-preset-env": "1.7.0",
                  babelify: "8.0.0",
                  browserify: "16.2.3",
                  derequire: "2.0.6",
                  eslint: "5.6.1",
                  nyc: "13.0.1",
                  shelljs: "0.8.2",
                  "tap-dancer": "0.0.3",
                  "tap-spec": "^5.0.0",
                  tape: "4.9.1",
                  timekeeper: "2.1.2",
                  "uglify-js": "3.4.9"
                },
                "size-limit": [{
                  path: "./spacetime.js",
                  limit: "16 KB"
                }]
              };
            }, {}],
            5: [function (n, t, e) {
              "use strict";

              var r = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                  o = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
              t.exports = {
                short: function short() {
                  return r;
                },
                long: function long() {
                  return o;
                },
                set: function set(n) {
                  r = n.short, o = n.long;
                }
              };
            }, {}],
            6: [function (n, t, e) {
              "use strict";

              var r = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                date: 864e5,
                month: 25488e5,
                week: 6048e5,
                year: 3154e7
              };
              Object.keys(r).forEach(function (n) {
                r[n + "s"] = r[n];
              }), t.exports = r;
            }, {}],
            7: [function (n, t, e) {
              "use strict";

              t.exports = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }, {}],
            8: [function (n, t, e) {
              "use strict";

              var r = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"],
                  o = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
              t.exports = {
                short: function short() {
                  return r;
                },
                long: function long() {
                  return o;
                },
                mapping: function mapping() {
                  return function () {
                    for (var n = {}, t = 0; t < r.length; t++) {
                      n[r[t]] = t;
                    }

                    for (var e = 0; e < o.length; e++) {
                      n[o[e]] = e;
                    }

                    return n;
                  }();
                },
                set: function set(n) {
                  r = n.short, o = n.long;
                }
              };
            }, {}],
            9: [function (n, t, e) {
              "use strict";

              t.exports = [null, [0, 1], [3, 1], [6, 1], [9, 1]];
            }, {}],
            10: [function (n, t, e) {
              "use strict";

              t.exports = {
                north: [["spring", 2, 1], ["summer", 5, 1], ["fall", 8, 1], ["autumn", 8, 1], ["winter", 11, 1]],
                south: [["fall", 2, 1], ["autumn", 2, 1], ["winter", 5, 1], ["spring", 8, 1], ["summer", 11, 1]]
              };
            }, {}],
            11: [function (n, t, e) {
              "use strict";

              var s = n("./spacetime");

              e.whereIts = function (n, t) {
                var r = new s(null),
                    o = new s(null);
                r.time(n), t ? o.time(t) : o = r.clone().add(59, "minutes");
                var a = r.hour(),
                    i = o.hour();
                return Object.keys(r.timezones).filter(function (n) {
                  var t = new s(null, n),
                      e = t.hour();
                  return a <= e && e <= i && !(e === a && t.minute() < r.minute()) && !(e === i && t.minute() > o.minute());
                });
              };
            }, {
              "./spacetime": 37
            }],
            12: [function (n, t, e) {
              "use strict";

              e.isLeapYear = function (n) {
                return n % 4 == 0 && n % 100 != 0 || n % 400 == 0;
              }, e.isDate = function (n) {
                return "[object Date]" === Object.prototype.toString.call(n) && !isNaN(n.valueOf());
              }, e.isArray = function (n) {
                return "[object Array]" === Object.prototype.toString.call(n);
              }, e.isObject = function (n) {
                return "[object Object]" === Object.prototype.toString.call(n);
              }, e.zeroPad = function (n, t) {
                return (n += "").length >= (t = t || 2) ? n : new Array(t - n.length + 1).join("0") + n;
              }, e.titleCase = function (n) {
                return n ? n[0].toUpperCase() + n.substr(1).toLowerCase() : "";
              }, e.ordinal = function (n) {
                var t = n % 10,
                    e = n % 100;
                return 1 === t && 11 !== e ? n + "st" : 2 === t && 12 !== e ? n + "nd" : 3 === t && 13 !== e ? n + "rd" : n + "th";
              }, e.toCardinal = function (n) {
                return n = (n = String(n)).replace(/([0-9])(st|nd|rd|th)$/i, "$1"), parseInt(n, 10);
              }, e.normalize = function (n) {
                return "day" === (n = (n = n.toLowerCase()).replace(/s$/, "")) ? "date" : n;
              }, e.getEpoch = function (n) {
                return "number" == typeof n ? n : e.isDate(n) ? n.getTime() : n.epoch ? n.epoch : null;
              }, e.beADate = function (n, t) {
                return !1 === e.isObject(n) ? t.clone().set(n) : n;
              };
            }, {}],
            13: [function (n, t, e) {
              "use strict";

              var r = n("./spacetime"),
                  o = n("./findTz").whereIts,
                  a = n("../package.json"),
                  i = function i(n, t, e) {
                return new r(n, t, e);
              };

              i.now = function (n, t) {
                return new r(new Date().getTime(), n, t);
              }, i.today = function (n, t) {
                return new r(new Date().getTime(), n, t).startOf("day");
              }, i.tomorrow = function (n, t) {
                return new r(new Date().getTime(), n, t).add(1, "day").startOf("day");
              }, i.yesterday = function (n, t) {
                return new r(new Date().getTime(), n, t).subtract(1, "day").startOf("day");
              }, i.extend = function (t) {
                return Object.keys(t).forEach(function (n) {
                  r.prototype[n] = t[n];
                }), this;
              }, i.whereIts = o, i.version = a.version, i.plugin = i.extend, t.exports = i;
            }, {
              "../package.json": 4,
              "./findTz": 11,
              "./spacetime": 37
            }],
            14: [function (n, t, e) {
              "use strict";

              var r = n("../data/monthLengths"),
                  o = n("../fns").isLeapYear;

              t.exports = function (n) {
                if (!0 !== r.hasOwnProperty(n.month)) return !1;
                if (1 === n.month) return !!(o(n.year) && n.date <= 29) || n.date <= 28;
                var t = r[n.month] || 0;
                return n.date <= t;
              };
            }, {
              "../data/monthLengths": 7,
              "../fns": 12
            }],
            15: [function (n, t, e) {
              "use strict";

              var a = n("./strParse"),
                  i = n("../fns"),
                  s = n("./named-dates");

              t.exports = function (n, t, e) {
                if ("number" != typeof t) {
                  if (n.epoch = Date.now(), null != t) if (!0 !== i.isDate(t)) {
                    if (!0 !== i.isArray(t)) {
                      if (!0 === i.isObject(t)) return t.epoch ? void (n.epoch = t.epoch) : void function (n, t) {
                        for (var e = Object.keys(t), r = 0; r < e.length; r++) {
                          var o = e[r];

                          if (void 0 !== n[o]) {
                            var a = t[o] || 0;
                            n[o](a);
                          }
                        }
                      }(n, t);
                      if ("string" == typeof t) if (t = t.trim().replace(/ +/g, " "), !0 !== s.hasOwnProperty(t)) {
                        for (var r = 0; r < a.length; r++) {
                          var o = t.match(a[r].reg);
                          if (o) return void a[r].parse(n, o, e);
                        }

                        !1 === n.silent && console.warn("Warning: couldn't parse date-string: '" + t + "'"), n.epoch = null;
                      } else n = s[t](n);
                    } else !function (n, t) {
                      for (var e = ["year", "month", "date", "hour", "minute", "second", "millisecond"], r = 0; r < t.length; r++) {
                        var o = t[r] || 0;
                        n[e[r]](o);
                      }
                    }(n, t);
                  } else n.epoch = t.getTime();
                } else 0 < (n.epoch = t) && t < 25e8 && !1 === n.silent && (console.warn("  - Warning: You are setting the date to January 1970."), console.warn("       -   did input seconds instead of milliseconds?"));
              };
            }, {
              "../fns": 12,
              "./named-dates": 16,
              "./strParse": 18
            }],
            16: [function (n, t, e) {
              "use strict";

              var r = {
                now: function now(n) {
                  return n.epoch = Date.now(), n;
                },
                tonight: function tonight(n) {
                  return n.epoch = Date.now(), n.hour(18), n;
                },
                today: function today(n) {
                  return n.epoch = Date.now(), n;
                },
                tomorrow: function tomorrow(n) {
                  return n.epoch = Date.now(), n.add(1, "day"), n.startOf("day"), n;
                },
                yesterday: function yesterday(n) {
                  return n.epoch = Date.now(), n.subtract(1, "day"), n.startOf("day"), n;
                },
                christmas: function christmas(n) {
                  var t = new Date().getFullYear();
                  return n.set([t, 11, 25, 18, 0, 0]), n;
                },
                "new years": function newYears(n) {
                  var t = new Date().getFullYear();
                  return n.set([t, 11, 31, 18, 0, 0]), n;
                }
              };
              r["new years eve"] = r["new years"], t.exports = r;
            }, {}],
            17: [function (n, t, e) {
              (function (i) {
                "use strict";

                t.exports = function (n, t, e) {
                  if (!t) return n;
                  "Z" === t && (t = "+0000"), !0 === /:00/.test(t) && (t = t.replace(/:00/, "")), !0 === /:00/.test(t) && (t = t.replace(/:00/, ".5"));
                  var r = parseInt(t, 10);
                  if (100 < Math.abs(r) && (r /= 100), n.timezone().current.offset === r) return n;
                  0 <= (r *= -1) && (r = "+" + r);
                  var o = "Etc/GMT" + r,
                      a = n.timezones;
                  return a[o] && (e && a[e] && a[e].o !== a[o].o && !1 === n.silent && void 0 !== i && i.env && !i.env.TESTENV && (console.warn("  - Setting timezone to: '" + o + "'"), console.warn("     from ISO string '" + t + "'"), console.warn("     overwriting given timezone: '" + e + "'\n")), n.tz = o), n;
                };
              }).call(this, n("_process"));
            }, {
              _process: 3
            }],
            18: [function (n, t, e) {
              "use strict";

              var i = n("../methods/set/walk"),
                  o = n("../data/months"),
                  s = n("./parseOffset"),
                  u = n("./hasDate"),
                  a = n("../fns"),
                  c = function c(n, t) {
                var e = (t = t.replace(/^\s+/, "")).match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
                e && (n.hour(e[1]), n.minute(e[2]), e[3] && n.seconds(e[3]), e[4] && n.millisecond(e[4]));
              },
                  h = function h(n) {
                n = n || "";
                var t = parseInt(n.trim(), 10);
                return t = t || new Date().getFullYear();
              },
                  r = [{
                reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
                parse: function parse(n, t, e, r) {
                  var o = parseInt(t[2], 10) - 1,
                      a = {
                    year: t[1],
                    month: o,
                    date: t[3]
                  };
                  !1 !== u(a) ? (s(n, t[5], e, r), i(n, a), c(n, t[4])) : n.epoch = null;
                }
              }, {
                reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
                parse: function parse(n, t) {
                  var e = {
                    year: t[1],
                    month: parseInt(t[2], 10) - 1,
                    date: parseInt(t[3], 10)
                  };
                  12 <= e.month && (e.date = parseInt(t[2], 10), e.month = parseInt(t[3], 10) - 1), !1 !== u(e) ? i(n, e) : n.epoch = null;
                }
              }, {
                reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
                parse: function parse(n, t) {
                  var e = parseInt(t[1], 10) - 1,
                      r = parseInt(t[2], 10);
                  12 <= e && (e = parseInt(t[2], 10) - 1, r = parseInt(t[1], 10));
                  var o = {
                    year: t[3] || new Date().getFullYear(),
                    month: e,
                    date: r
                  };
                  !1 !== u(o) ? i(n, o) : n.epoch = null;
                }
              }, {
                reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,
                parse: function parse(n, t) {
                  var e = o.mapping()[t[1].toLowerCase()],
                      r = {
                    year: h(t[3]),
                    month: e,
                    date: a.toCardinal(t[2] || "")
                  };
                  !1 !== u(r) ? (i(n, r), t[4] && c(n, t[4])) : n.epoch = null;
                }
              }, {
                reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
                parse: function parse(n, t) {
                  var e = o.mapping()[t[2].toLowerCase()],
                      r = {
                    year: h(t[3]),
                    month: e,
                    date: a.toCardinal(t[1])
                  };
                  !1 !== u(r) ? i(n, r) : n.epoch = null;
                }
              }, {
                reg: /^[0-9]{4}$/i,
                parse: function parse(n, t) {
                  var e = h(t[0]),
                      r = new Date(),
                      o = {
                    year: e,
                    month: r.getMonth(),
                    date: r.getDate()
                  };
                  !1 !== u(o) ? i(n, o) : n.epoch = null;
                }
              }, {
                reg: /^[0-9,]+ ?b\.?c\.?$/i,
                parse: function parse(n, t) {
                  var e = t[0] || "";
                  e = (e = e.replace(/^([0-9,]+) ?b\.?c\.?$/i, "-$1")).replace(/,/g, "");
                  var r = parseInt(e.trim(), 10),
                      o = new Date(),
                      a = {
                    year: r,
                    month: o.getMonth(),
                    date: o.getDate()
                  };
                  !1 !== u(a) ? i(n, a) : n.epoch = null;
                }
              }];

              t.exports = r;
            }, {
              "../data/months": 8,
              "../fns": 12,
              "../methods/set/walk": 34,
              "./hasDate": 14,
              "./parseOffset": 17
            }],
            19: [function (n, t, e) {
              "use strict";

              var r = n("./methods/format"),
                  o = n("./methods/progress"),
                  a = n("./methods/nearest"),
                  i = n("./methods/diff"),
                  s = n("./methods/since"),
                  u = n("./methods/startOf"),
                  c = n("./timezone/index"),
                  h = n("./input"),
                  d = n("./fns"),
                  f = {
                set: function set(n) {
                  return h(this, n), this;
                },
                timezone: function timezone() {
                  return c(this);
                },
                isDST: function isDST() {
                  return c(this).current.isDST;
                },
                hasDST: function hasDST() {
                  return c(this).hasDst;
                },
                offset: function offset() {
                  return c(this).current.offset / 60;
                },
                hemisphere: function hemisphere() {
                  return c(this).hemisphere;
                },
                format: function format(n) {
                  return r(this, n);
                },
                startOf: function startOf(n) {
                  return u.startOf(this, n);
                },
                endOf: function endOf(n) {
                  return u.endOf(this, n);
                },
                leapYear: function leapYear() {
                  var n = this.year();
                  return d.isLeapYear(n);
                },
                progress: function progress() {
                  return o(this);
                },
                nearest: function nearest(n) {
                  return a(this, n);
                },
                diff: function diff(n, t) {
                  return i(this, n, t);
                },
                since: function since(n) {
                  return n || (n = this.clone().set()), s(this, n);
                },
                isValid: function isValid() {
                  return !(!this.epoch && 0 !== this.epoch) && !isNaN(this.d.getTime());
                },
                goto: function goto(n) {
                  return this.tz = n, this;
                },
                isAwake: function isAwake() {
                  var n = this.hour();
                  return !(n < 8 || 22 < n);
                },
                isAsleep: function isAsleep() {
                  return !this.isAwake();
                },
                log: function log() {
                  return console.log(""), console.log(r(this, "nice-short")), this;
                },
                logYear: function logYear() {
                  return console.log(""), console.log(r(this, "full-short")), this;
                },
                debug: function debug() {
                  var n = this.timezone(),
                      t = this.format("MM") + " " + this.format("date-ordinal") + " " + this.year();
                  return t += "\n     - " + this.format("time"), console.log("\n\n", t + "\n     - " + n.name + " (" + n.current.offset + ")"), this;
                }
              };
              f.inDST = f.isDST, f.round = f.nearest, t.exports = f;
            }, {
              "./fns": 12,
              "./input": 15,
              "./methods/diff": 22,
              "./methods/format": 23,
              "./methods/nearest": 26,
              "./methods/progress": 27,
              "./methods/since": 35,
              "./methods/startOf": 36,
              "./timezone/index": 39
            }],
            20: [function (n, t, e) {
              "use strict";

              var a = n("./set/walk"),
                  i = n("../data/milliseconds"),
                  s = n("../data/monthLengths"),
                  u = n("../fns"),
                  r = ["millisecond", "second", "minute", "hour", "date", "month"],
                  c = {
                second: r.slice(0, 1),
                minute: r.slice(0, 2),
                quarterhour: r.slice(0, 2),
                hour: r.slice(0, 3),
                date: r.slice(0, 4),
                month: r.slice(0, 4),
                quarter: r.slice(0, 4),
                season: r.slice(0, 4),
                year: r
              };
              c.week = c.date, c.season = c.date, c.quarter = c.date;
              var h = {
                month: !0,
                quarter: !0,
                season: !0,
                year: !0
              };

              t.exports = function (n) {
                n.prototype.add = function (n, t) {
                  var e = this.clone();
                  t = u.normalize(t), i[t] ? this.epoch += i[t] * n : "week" === t ? this.epoch += i.day * (7 * n) : "quarter" === t || "season" === t ? this.epoch += i.month * (4 * n) : "season" === t ? this.epoch += i.month * (4 * n) : "quarterhour" === t && (this.epoch += 15 * i.minute);
                  var r = {};

                  if (c[t] && c[t].forEach(function (n) {
                    r[n] = e[n]();
                  }), "month" === t ? (r.month = e.month() + n, r = function (n, t) {
                    if (0 < n.month) {
                      var e = parseInt(n.month / 12, 10);
                      n.year = t.year() + e, n.month = n.month % 12;
                    } else if (n.month < 0) {
                      var r = Math.floor(Math.abs(n.month) / 13, 10);
                      r = Math.abs(r) + 1, n.year = t.year() - r, n.month = n.month % 12, n.month = n.month + 12, 12 === n.month && (n.month = 0);
                    }

                    return n;
                  }(r, e)) : "date" === t && 0 !== n && e.isSame(this, "day") ? r.date = e.date() + n : "year" === t && this.year() === e.year() && (this.epoch += i.week), h[t]) {
                    var o = s[r.month];
                    r.date = e.date(), r.date > o && (r.date = o);
                  }

                  return a(this, r), this;
                }, n.prototype.subtract = function (n, t) {
                  return this.add(-1 * n, t), this;
                }, n.prototype.minus = n.prototype.subtract, n.prototype.plus = n.prototype.add;
              };
            }, {
              "../data/milliseconds": 6,
              "../data/monthLengths": 7,
              "../fns": 12,
              "./set/walk": 34
            }],
            21: [function (n, t, e) {
              "use strict";

              var o = n("../fns");

              t.exports = function (t) {
                var e = {
                  isAfter: function isAfter(n) {
                    n = o.beADate(n, this);
                    var t = o.getEpoch(n);
                    return null === t ? null : this.epoch > t;
                  },
                  isBefore: function isBefore(n) {
                    n = o.beADate(n, this);
                    var t = o.getEpoch(n);
                    return null === t ? null : this.epoch < t;
                  },
                  isEqual: function isEqual(n) {
                    n = o.beADate(n, this);
                    var t = o.getEpoch(n);
                    return null === t ? null : this.epoch === t;
                  },
                  isBetween: function isBetween(n, t) {
                    n = o.beADate(n, this), t = o.beADate(t, this);
                    var e = o.getEpoch(n);
                    if (null === e) return null;
                    var r = o.getEpoch(t);
                    return null === r ? null : e < this.epoch && this.epoch < r;
                  }
                };
                Object.keys(e).forEach(function (n) {
                  t.prototype[n] = e[n];
                });
              };
            }, {
              "../fns": 12
            }],
            22: [function (n, t, e) {
              "use strict";

              var r = n("../fns"),
                  o = function o() {},
                  a = function a(n, t, e) {
                var r = 0;

                for (n = n.clone(); n.isBefore(t);) {
                  n.add(1, e), r += 1;
                }

                return n.isSame(t, e) || (r -= 1), r;
              },
                  i = function i(n, t) {
                var e = t.epoch - n.epoch,
                    r = {
                  milliseconds: e,
                  seconds: parseInt(e / 1e3, 10)
                };
                return r.minutes = parseInt(r.seconds / 60, 10), r.hours = parseInt(r.minutes / 60, 10), r;
              },
                  s = function s(n, t, e) {
                return t = r.beADate(t, n), e ? (e = r.normalize(e), !0 !== /s$/.test(e) && (e += "s"), "milliseconds" === e || "seconds" === e || "minutes" === e ? i(n, t)[e] : n.isBefore(t) ? a(n, t, e) : -1 * a(t, n, e)) : o(n, t);
              };

              o = function o(n, t) {
                var e = i(n, t);
                return e.years = s(n, t, "year"), e.months = s(n, t, "month"), e.weeks = s(n, t, "week"), e.days = s(n, t, "day"), 0 === e.years && (e.hours = s(n, t, "hour")), e;
              }, t.exports = s;
            }, {
              "../fns": 12
            }],
            23: [function (n, t, e) {
              "use strict";

              var h = n("../../fns"),
                  r = n("../../data/months"),
                  o = n("../../data/days"),
                  a = n("./unixFmt"),
                  i = {
                day: function day(n) {
                  return h.titleCase(o.long()[n.day()]);
                },
                "day-short": function dayShort(n) {
                  return h.titleCase(o.short()[n.day()]);
                },
                date: function date(n) {
                  return "" + n.date();
                },
                "date-ordinal": function dateOrdinal(n) {
                  return h.ordinal(n.date());
                },
                month: function month(n) {
                  return h.titleCase(r.long()[n.month()]);
                },
                "month-short": function monthShort(n) {
                  return h.titleCase(r.short()[n.month()]);
                },
                time: function time(n) {
                  return n.h12() + ":" + h.zeroPad(n.minute()) + n.ampm();
                },
                "time-24h": function time24h(n) {
                  return n.hour() + ":" + h.zeroPad(n.minute());
                },
                year: function year(n) {
                  var t = n.year();
                  return t < 0 ? (t = Math.abs(t), t + " BC") : "" + t;
                },
                "year-short": function yearShort(n) {
                  return "'" + ("" + n.year()).substr(2, 4);
                },
                "numeric-us": function numericUs(n) {
                  return h.zeroPad(n.month() + 1) + "/" + h.zeroPad(n.date()) + "/" + n.year();
                },
                "numeric-uk": function numericUk(n) {
                  return h.zeroPad(n.date()) + "/" + h.zeroPad(n.month() + 1) + "/" + n.year();
                },
                "numeric-cn": function numericCn(n) {
                  return n.year() + "/" + h.zeroPad(n.month() + 1) + "/" + h.zeroPad(n.date());
                },
                iso: function iso(n) {
                  var t,
                      e,
                      r = h.zeroPad(n.month() + 1),
                      o = h.zeroPad(n.date()),
                      a = h.zeroPad(n.h24()),
                      i = h.zeroPad(n.minute()),
                      s = h.zeroPad(n.second()),
                      u = h.zeroPad(n.millisecond(), 3),
                      c = (t = n.timezone().current.offset, e = "00", t % 1 == .5 && (e = "30", t = Math.floor(t)), "+00:00" == (t = (t = t < 0 ? (t *= -1, "-" + (t = h.zeroPad(t, 2))) : "+" + (t = h.zeroPad(t, 2))) + ":" + e) && (t = "Z"), t);
                  return n.year() + "-" + r + "-" + o + "T" + a + ":" + i + ":" + s + "." + u + c;
                },
                "iso-short": function isoShort(n) {
                  var t = h.zeroPad(n.month() + 1),
                      e = h.zeroPad(n.date());
                  return n.year() + "-" + t + "-" + e;
                },
                "iso-utc": function isoUtc(n) {
                  return new Date(n.epoch).toISOString();
                },
                nice: function nice(n) {
                  return i.month(n) + " " + i["date-ordinal"](n) + ", " + i.time(n);
                },
                "nice-day": function niceDay(n) {
                  return i.day(n) + " " + i.month(n) + " " + i["date-ordinal"](n) + ", " + i.time(n);
                },
                "nice-short": function niceShort(n) {
                  return i["month-short"](n) + " " + i["date-ordinal"](n) + ", " + i.time(n);
                },
                full: function full(n) {
                  return i.day(n) + " " + i.month(n) + " " + i["date-ordinal"](n) + ", " + n.year();
                },
                "full-short": function fullShort(n) {
                  return i["day-short"](n) + " " + i["month-short"](n) + " " + i["date-ordinal"](n) + ", " + n.year();
                }
              };
              i.ordinal = i["date-ordinal"], i["date-short"] = i.date, i["time-12h"] = i.time, i["time-12"] = i.time, i["time-h12"] = i["time-12h"], i["time-h24"] = i["time-24h"], i["time-24"] = i["time-24h"], i.numeric = i["numeric-us"], i.mdy = i["numeric-us"], i.dmy = i["numeric-uk"], i.ymd = i["numeric-cn"], i["little-endian"] = i["numeric-uk"], i["big-endian"] = i["numeric-cn"];

              t.exports = function (e, n) {
                return !0 !== e.isValid() ? "" : i && i[n] ? i[n](e) : "string" == typeof n ? a(n, e) : Object.keys(i).reduce(function (n, t) {
                  return n[t] = i[t](e), n;
                }, {});
              };
            }, {
              "../../data/days": 5,
              "../../data/months": 8,
              "../../fns": 12,
              "./unixFmt": 24
            }],
            24: [function (n, t, e) {
              "use strict";

              var r = n("../../fns").zeroPad,
                  i = {
                G: function G(n) {
                  return n.era();
                },
                GG: function GG(n) {
                  return n.era();
                },
                GGG: function GGG(n) {
                  return n.era();
                },
                GGGG: function GGGG(n) {
                  return "AD" === n.era() ? "Anno Domini" : "Before Christ";
                },
                y: function y(n) {
                  return n.year();
                },
                yy: function yy(n) {
                  return parseInt(String(n.year()).substr(2, 4), 10);
                },
                yyy: function yyy(n) {
                  return n.year();
                },
                yyyy: function yyyy(n) {
                  return n.year();
                },
                yyyyy: function yyyyy(n) {
                  return "0" + n.year();
                },
                Q: function Q(n) {
                  return n.quarter();
                },
                QQ: function QQ(n) {
                  return n.quarter();
                },
                QQQ: function QQQ(n) {
                  return n.quarter();
                },
                QQQQ: function QQQQ(n) {
                  return n.quarter();
                },
                M: function M(n) {
                  return n.month() + 1;
                },
                MM: function MM(n) {
                  return r(n.month() + 1);
                },
                MMM: function MMM(n) {
                  return n.format("month-short");
                },
                MMMM: function MMMM(n) {
                  return n.format("month");
                },
                w: function w(n) {
                  return n.week();
                },
                ww: function ww(n) {
                  return r(n.week());
                },
                d: function d(n) {
                  return n.date();
                },
                dd: function dd(n) {
                  return r(n.date());
                },
                D: function D(n) {
                  return n.dayOfYear();
                },
                DD: function DD(n) {
                  return r(n.dayOfYear());
                },
                DDD: function DDD(n) {
                  return r(n.dayOfYear(), 3);
                },
                E: function E(n) {
                  return n.format("day-short");
                },
                EE: function EE(n) {
                  return n.format("day-short");
                },
                EEE: function EEE(n) {
                  return n.format("day-short");
                },
                EEEE: function EEEE(n) {
                  return n.format("day");
                },
                EEEEE: function EEEEE(n) {
                  return n.format("day")[0];
                },
                e: function e(n) {
                  return n.day();
                },
                ee: function ee(n) {
                  return n.day();
                },
                eee: function eee(n) {
                  return n.format("day-short");
                },
                eeee: function eeee(n) {
                  return n.format("day");
                },
                eeeee: function eeeee(n) {
                  return n.format("day")[0];
                },
                a: function a(n) {
                  return n.ampm().toUpperCase();
                },
                aa: function aa(n) {
                  return n.ampm().toUpperCase();
                },
                aaa: function aaa(n) {
                  return n.ampm().toUpperCase();
                },
                aaaa: function aaaa(n) {
                  return n.ampm().toUpperCase();
                },
                h: function h(n) {
                  return n.h12();
                },
                hh: function hh(n) {
                  return r(n.h12());
                },
                H: function H(n) {
                  return n.hour();
                },
                HH: function HH(n) {
                  return r(n.hour());
                },
                m: function m(n) {
                  return n.minute();
                },
                mm: function mm(n) {
                  return r(n.minute());
                },
                s: function s(n) {
                  return n.second();
                },
                ss: function ss(n) {
                  return r(n.second());
                },
                A: function A(n) {
                  return n.epoch - n.startOf("day").epoch;
                },
                z: function z(n) {
                  return n.tz;
                },
                zz: function zz(n) {
                  return n.tz;
                },
                zzz: function zzz(n) {
                  return n.tz;
                },
                zzzz: function zzzz(n) {
                  return n.tz;
                },
                Z: function Z(n) {
                  return n.timezone().current.offset + "00";
                },
                ZZ: function ZZ(n) {
                  return n.timezone().current.offset + "00";
                },
                ZZZ: function ZZZ(n) {
                  return n.timezone().current.offset + "00";
                },
                ZZZZ: function ZZZZ(n) {
                  return n.timezone().current.offset + ":00";
                }
              },
                  o = function o(n, t, e) {
                for (var r = n, o = t, a = 0; a < e; a += 1) {
                  i[r] = i[o], r += n, o += t;
                }
              };

              o("q", "Q", 4), o("L", "M", 4), o("Y", "y", 4), o("c", "e", 4), o("k", "H", 2), o("K", "h", 2), o("S", "s", 2), o("v", "z", 4), o("V", "Z", 4);

              t.exports = function (n, e) {
                for (var t = n.split(""), r = [t[0]], o = !1, a = 1; a < t.length; a += 1) {
                  if ("'" === t[a]) {
                    if (!0 != (o = !o) || !t[a + 1] || "'" !== t[a + 1]) continue;
                    o = !0;
                  }

                  !0 === o || t[a] === r[r.length - 1][0] ? r[r.length - 1] += t[a] : r.push(t[a]);
                }

                return r.reduce(function (n, t) {
                  return void 0 !== i[t] ? n += i[t](e) || "" : n += t, n;
                }, "");
              };
            }, {
              "../../fns": 12
            }],
            25: [function (n, t, e) {
              "use strict";

              var r = n("../fns"),
                  o = n("../data/days"),
                  a = n("../data/months");

              t.exports = function (t) {
                var e = {
                  i18n: function i18n(n) {
                    if (!(r.isObject(n) && r.isObject(n.days) && r.isObject(n.months) && r.isArray(n.days.short) && r.isArray(n.days.long) && r.isArray(n.months.short) && r.isArray(n.months.long))) throw new Error("Invalid i18n payload passed.");
                    o.set(n.days), a.set(n.months);
                  }
                };
                Object.keys(e).forEach(function (n) {
                  t.prototype[n] = e[n];
                });
              };
            }, {
              "../data/days": 5,
              "../data/months": 8,
              "../fns": 12
            }],
            26: [function (n, t, e) {
              "use strict";

              t.exports = function (n, t) {
                t = (t = t.toLowerCase()).replace(/s$/, "");
                var e = n.progress();
                return void 0 !== e[t] ? (.5 < e[t] && n.add(1, t), n.startOf(t)) : console.warn("no known unit '" + t + "'"), n;
              };
            }, {}],
            27: [function (n, t, e) {
              "use strict";

              t.exports = function (o) {
                var a = {};
                return ["year", "season", "quarter", "month", "week", "day", "quarterHour", "hour", "minute"].forEach(function (n) {
                  var t = o.clone().startOf(n),
                      e = o.clone().endOf(n).epoch - t.epoch,
                      r = (o.epoch - t.epoch) / e;
                  a[n] = parseFloat(r.toFixed(2));
                }), a;
              };
            }, {}],
            28: [function (n, t, e) {
              "use strict";

              var o = n("../../data/quarters"),
                  a = n("../../data/seasons"),
                  i = n("../set/set"),
                  s = function s(n) {
                n.minute(0), n.second(0), n.millisecond(1);
              };

              t.exports = {
                time: function time(n) {
                  return void 0 !== n ? (this.epoch = i.time(this, n), this) : this.format("time-h12");
                },
                week: function week(n) {
                  if (void 0 !== n) return this.month(0), this.date(1), this.day("monday"), s(this), "december" === this.monthName() && this.add(1, "week"), n -= 1, this.add(n, "weeks"), this;
                  var t = this.clone();
                  t.month(0), t.date(1), s(t), t.day("monday"), "december" === t.monthName() && t.add(1, "week");
                  var e = this.epoch;
                  if (t.epoch > e) return 1;

                  for (var r = 0; r < 52; r++) {
                    if (t.epoch > e) return r;
                    t.add(1, "week");
                  }

                  return 52;
                },
                quarter: function quarter(n) {
                  if (void 0 !== n && ("string" == typeof n && (n = n.replace(/^q/i, ""), n = parseInt(n, 10)), o[n])) {
                    var t = o[n][0];
                    return this.month(t), this.date(1), this.hour(0), s(this), this;
                  }

                  for (var e = this.d.getMonth(), r = 1; r < o.length; r++) {
                    if (e < o[r][0]) return r - 1;
                  }

                  return 4;
                },
                hourFloat: function hourFloat(n) {
                  if (void 0 !== n) {
                    var t = n % 1;
                    t *= 60;
                    var e = parseInt(n, 10);
                    return this.epoch = i.hours(this, e), this.epoch = i.minutes(this, t), this;
                  }

                  var r = this.d,
                      o = r.getHours(),
                      a = r.getMinutes();
                  return o + (a /= 60);
                },
                season: function season(n) {
                  var t = "north";

                  if ("South" === this.timezone().hemisphere && (t = "south"), void 0 !== n) {
                    for (var e = 0; e < a[t].length; e++) {
                      n === a[t][e][0] && (this.month(a[t][e][1]), this.date(1), this.hour(0), s(this));
                    }

                    return this;
                  }

                  for (var r = this.d.getMonth(), o = 0; o < a[t].length - 1; o++) {
                    if (r >= a[t][o][1] && r < a[t][o + 1][1]) return a[t][o][0];
                  }

                  return "winter";
                }
              };
            }, {
              "../../data/quarters": 9,
              "../../data/seasons": 10,
              "../set/set": 33
            }],
            29: [function (n, t, e) {
              "use strict";

              var r = n("./normal"),
                  o = n("./destructive"),
                  a = n("./tricky");

              t.exports = function (t) {
                Object.keys(r).forEach(function (n) {
                  t.prototype[n] = r[n];
                }), Object.keys(o).forEach(function (n) {
                  t.prototype[n] = o[n];
                }), Object.keys(a).forEach(function (n) {
                  t.prototype[n] = a[n];
                });
              };
            }, {
              "./destructive": 28,
              "./normal": 30,
              "./tricky": 31
            }],
            30: [function (n, t, e) {
              "use strict";

              var a = n("../set/set"),
                  r = n("../set/walk"),
                  o = {
                millisecond: function millisecond(n) {
                  return void 0 !== n ? (this.epoch = a.milliseconds(this, n), this) : this.d.getMilliseconds();
                },
                second: function second(n) {
                  return void 0 !== n ? (this.epoch = a.seconds(this, n), this) : this.d.getSeconds();
                },
                minute: function minute(n) {
                  return void 0 !== n ? (this.epoch = a.minutes(this, n), this) : this.d.getMinutes();
                },
                hour: function hour(n) {
                  var t = this.d;
                  return void 0 !== n ? (this.epoch = a.hours(this, n), r(this, {
                    hour: n
                  }), this) : t.getHours();
                },
                hour12: function hour12(n) {
                  var t = this.d;

                  if (void 0 !== n) {
                    var e = (n = "" + n).match(/^([0-9]+)(am|pm)$/);

                    if (e) {
                      var r = parseInt(e[1], 10);
                      "pm" === e[2] && (r += 12), this.epoch = a.hours(this, r);
                    }

                    return this;
                  }

                  var o = t.getHours();
                  return 12 < o && (o -= 12), 0 === o && (o = 12), o;
                },
                date: function date(n) {
                  return void 0 !== n ? (this.epoch = a.date(this, n), this) : this.d.getDate();
                },
                month: function month(n) {
                  return void 0 !== n ? (this.epoch = a.month(this, n), this) : this.d.getMonth();
                },
                year: function year(n) {
                  return void 0 !== n ? (this.epoch = a.year(this, n), this) : this.d.getFullYear();
                },
                dayTime: function dayTime(n) {
                  if (void 0 !== n) {
                    var t = {
                      morning: "7:00am",
                      breakfast: "7:00am",
                      noon: "12:00am",
                      lunch: "12:00pm",
                      afternoon: "2:00pm",
                      evening: "6:00pm",
                      dinner: "6:00pm",
                      night: "11:00pm",
                      midnight: "23:59pm"
                    };
                    return t[n = (n = n || "").toLowerCase()] && this.time(t[n]), this;
                  }

                  var e = this.hour();
                  return e < 6 ? "night" : e < 12 ? "morning" : e < 17 ? "afternoon" : e < 22 ? "evening" : "night";
                },
                dayOfYear: function dayOfYear(n) {
                  if (void 0 !== n) return this.epoch = a.dayOfYear(this, n), this;

                  for (var t = 0, e = this.d.getMonth(), r = void 0, o = 1; o <= e; o++) {
                    (r = new Date()).setDate(1), r.setYear(this.d.getFullYear()), r.setHours(1), r.setMinutes(1), r.setMonth(o), r.setHours(-2), t += r.getDate();
                  }

                  return t + this.d.getDate();
                },
                era: function era(n) {
                  if (void 0 === n) return this.d.getFullYear() < 0 ? "BC" : "AD";
                  n = n.toLowerCase();
                  var t = this.d.getFullYear();
                  return "bc" === n && 0 < t && (this.epoch = a.year(this, -1 * t)), "ad" === n && t < 0 && (this.epoch = a.year(this, -1 * t)), this;
                },
                from: function from(n) {
                  return (n = this.clone().set(n)).since(this);
                },
                fromNow: function fromNow() {
                  return this.clone().set(Date.now()).since(this);
                }
              };
              o.milliseconds = o.millisecond, o.seconds = o.second, o.minutes = o.minute, o.hours = o.hour, o.hour24 = o.hour, o.h12 = o.hour12, o.h24 = o.hour24, o.days = o.day, t.exports = o;
            }, {
              "../set/set": 33,
              "../set/walk": 34
            }],
            31: [function (n, t, e) {
              "use strict";

              var i = n("../../data/days"),
                  r = n("../../data/months"),
                  s = n("../set/walk");
              t.exports = {
                day: function day(n) {
                  if (void 0 === n) return this.d.getDay();
                  var t = this.clone(),
                      e = n;
                  "string" == typeof n && (n = n.toLowerCase(), -1 === (e = i.short().indexOf(n)) && (e = i.long().indexOf(n)));
                  var r = this.d.getDay(),
                      o = r - e,
                      a = this.subtract(24 * o, "hours");
                  return s(a, {
                    hour: t.hour(),
                    minute: t.minute(),
                    second: t.second()
                  }), this.epoch = a.epoch, a;
                },
                ampm: function ampm(n) {
                  var t = "am";
                  return 12 <= this.hour() && (t = "pm"), void 0 === n ? t : (n === t || ("am" === n ? this.subtract(12, "hours") : this.add(12, "hours")), this);
                },
                dayName: function dayName(n) {
                  return void 0 === n ? i.long()[this.day()] : (this.day(n), this);
                },
                monthName: function monthName(n) {
                  return void 0 === n ? r.long()[this.month()] : (this.month(n), this);
                }
              };
            }, {
              "../../data/days": 5,
              "../../data/months": 8,
              "../set/walk": 34
            }],
            32: [function (n, t, e) {
              "use strict";

              var r = {
                millisecond: function millisecond(n) {
                  return n.epoch;
                },
                second: function second(n) {
                  return [n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second()].join("-");
                },
                minute: function minute(n) {
                  return [n.year(), n.month(), n.date(), n.hour(), n.minute()].join("-");
                },
                hour: function hour(n) {
                  return [n.year(), n.month(), n.date(), n.hour()].join("-");
                },
                day: function day(n) {
                  return [n.year(), n.month(), n.date()].join("-");
                },
                week: function week(n) {
                  return [n.year(), n.week()].join("-");
                },
                month: function month(n) {
                  return [n.year(), n.month()].join("-");
                },
                quarter: function quarter(n) {
                  return [n.year(), n.quarter()].join("-");
                },
                year: function year(n) {
                  return n.year();
                }
              };
              r.date = r.day;

              t.exports = function (e) {
                e.prototype.isSame = function (n, t) {
                  return "string" != typeof n && "number" != typeof n || (n = new e(n, this.timezone.name)), t = t.replace(/s$/, ""), r[t] ? r[t](this) === r[t](n) : null;
                };
              };
            }, {}],
            33: [function (n, t, e) {
              "use strict";

              var o = n("../../data/milliseconds"),
                  r = n("../../data/months"),
                  a = n("../../data/monthLengths"),
                  i = n("./walk"),
                  s = function s(n) {
                return "string" == typeof n && (n = parseInt(n, 10)), n;
              },
                  u = ["year", "month", "date", "hour", "minute", "second", "millisecond"],
                  c = function c(n, t, e) {
                for (var r = u.indexOf(e), o = u.slice(r, u.length), a = 0; a < o.length; a++) {
                  var i = t[o[a]]();
                  n[o[a]](i);
                }

                return n;
              };

              t.exports = {
                milliseconds: function milliseconds(n, t) {
                  t = s(t);
                  var e = n.millisecond() - t;
                  return n.epoch - e;
                },
                seconds: function seconds(n, t) {
                  t = s(t);
                  var e = (n.second() - t) * o.second;
                  return n.epoch - e;
                },
                minutes: function minutes(n, t) {
                  t = s(t);
                  var e = n.clone(),
                      r = (n.minute() - t) * o.minute;
                  return n.epoch -= r, c(n, e, "second"), n.epoch;
                },
                hours: function hours(n, t) {
                  t = s(t);
                  var e = n.clone(),
                      r = (n.hour() - t) * o.hour;
                  return n.epoch -= r, c(n, e, "minute"), n.epoch;
                },
                time: function time(n, t) {
                  var e = t.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

                  if (!e) {
                    if (!(e = t.match(/([0-9]{1,2})(am|pm)/))) return n.epoch;
                    e.splice(2, 0, "0");
                  }

                  var r = !1,
                      o = parseInt(e[1], 10),
                      a = parseInt(e[2], 10);
                  return 12 < o && (r = !0), !1 === r && ("am" === e[3] && 12 === o && (o = 0), "pm" === e[3] && o < 12 && (o += 12)), n.hour(o), n.minute(a), n.second(0), n.millisecond(0), n.epoch;
                },
                date: function date(n, t) {
                  return t = s(t), i(n, {
                    date: t
                  }), n.epoch;
                },
                month: function month(n, t) {
                  "string" == typeof t && (t = r.mapping()[t.toLowerCase()]), t = s(t);
                  var e = n.date();
                  return e > a[t] && (e = a[t]), i(n, {
                    month: t,
                    date: e
                  }), n.epoch;
                },
                year: function year(n, t) {
                  return t = s(t), i(n, {
                    year: t
                  }), n.epoch;
                },
                dayOfYear: function dayOfYear(n, t) {
                  t = s(t);
                  var e = n.clone(),
                      r = (t - n.dayOfYear()) * o.day;
                  return n.epoch += r, c(n, e, "hour"), n.epoch;
                }
              };
            }, {
              "../../data/milliseconds": 6,
              "../../data/monthLengths": 7,
              "../../data/months": 8,
              "./walk": 34
            }],
            34: [function (n, t, e) {
              "use strict";

              var h = n("../../data/milliseconds"),
                  r = function r(n, t, e, _r, o) {
                var a = n.d[e]();

                if (a !== t) {
                  var i = null === o ? null : n.d[o](),
                      s = n.epoch,
                      u = t - a;
                  n.epoch += h[_r] * u;

                  for (var c = h[_r] / 2; n.d[e]() < t;) {
                    n.epoch += c;
                  }

                  for (; n.d[e]() > t;) {
                    n.epoch -= c;
                  }

                  null !== o && i !== n.d[o]() && (n.epoch = s);
                }
              },
                  s = {
                year: {
                  valid: function valid(n) {
                    return -4e3 < n && n < 4e3;
                  },
                  walkTo: function walkTo(n, t) {
                    return r(n, t, "getFullYear", "year", null);
                  }
                },
                month: {
                  valid: function valid(n) {
                    return 0 <= n && n <= 11;
                  },
                  walkTo: function walkTo(n, t) {
                    var e = n.d.getMonth(),
                        r = n.epoch,
                        o = n.d.getYear();

                    if (e !== t) {
                      var a = t - e;

                      for (n.epoch += h.day * (28 * a), o !== n.d.getYear() && (n.epoch = r); n.d.getMonth() < t;) {
                        n.epoch += h.day;
                      }

                      for (; n.d.getMonth() > t;) {
                        n.epoch -= h.day;
                      }
                    }
                  }
                },
                date: {
                  valid: function valid(n) {
                    return 0 < n && n <= 31;
                  },
                  walkTo: function walkTo(n, t) {
                    return r(n, t, "getDate", "day", "getMonth");
                  }
                },
                hour: {
                  valid: function valid(n) {
                    return 0 <= n && n < 24;
                  },
                  walkTo: function walkTo(n, t) {
                    return r(n, t, "getHours", "hour", "getDate");
                  }
                },
                minute: {
                  valid: function valid(n) {
                    return 0 <= n && n < 60;
                  },
                  walkTo: function walkTo(n, t) {
                    return r(n, t, "getMinutes", "minute", "getHours");
                  }
                },
                second: {
                  valid: function valid(n) {
                    return 0 <= n && n < 60;
                  },
                  walkTo: function walkTo(n, t) {
                    return r(n, t, "getSeconds", "second", "getMinutes");
                  }
                },
                millisecond: {
                  valid: function valid(n) {
                    return 0 <= n && n < 1e3;
                  },
                  walkTo: function walkTo(n, t) {
                    n.milliseconds(t);
                  }
                }
              };

              t.exports = function (n, t) {
                for (var e = Object.keys(s), r = n.clone(), o = 0; o < e.length; o++) {
                  var a = e[o],
                      i = t[a];
                  if (void 0 === i && (i = r[a]()), "string" == typeof i && (i = parseInt(i, 10)), !s[a].valid(i)) return n.epoch = null, void console.warn("invalid " + a + ": " + i);
                  s[a].walkTo(n, i);
                }
              };
            }, {
              "../../data/milliseconds": 6
            }],
            35: [function (n, t, e) {
              "use strict";

              var r = n("../fns"),
                  d = {
                months: {
                  almost: 10,
                  over: 4
                },
                days: {
                  almost: 25,
                  over: 10
                },
                hours: {
                  almost: 20,
                  over: 8
                },
                minutes: {
                  almost: 50,
                  over: 20
                },
                seconds: {
                  almost: 50,
                  over: 20
                }
              };

              function f(n, t) {
                return 1 === n && (t = t.slice(0, -1)), n + " " + t;
              }

              t.exports = function (n, t) {
                var s = function (n, t) {
                  var e = n.isBefore(t),
                      r = e ? t : n,
                      o = e ? n : t;
                  o = o.clone();
                  var a = {
                    years: 0,
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                  };
                  return Object.keys(a).forEach(function (n) {
                    if (!o.isSame(r, n)) {
                      var t = o.diff(r, n);
                      o.add(t, n), o.epoch > r.epoch + 10 && (o.subtract(1, n), t -= 1), a[n] = t;
                    }
                  }), e && Object.keys(a).forEach(function (n) {
                    0 !== a[n] && (a[n] *= -1);
                  }), a;
                }(n, t = r.beADate(t, n));

                if (!0 === Object.keys(s).every(function (n) {
                  return !s[n];
                })) return {
                  diff: s,
                  rounded: "now",
                  qualified: "now",
                  precise: "now"
                };
                var u = void 0,
                    c = void 0,
                    e = void 0,
                    h = [];
                return Object.keys(s).forEach(function (n, t, e) {
                  var r = Math.abs(s[n]);

                  if (0 !== r) {
                    var o = f(r, n);

                    if (h.push(o), !u) {
                      if (u = c = o, 4 < t) return;
                      var a = e[t + 1],
                          i = Math.abs(s[a]);
                      i > d[a].almost ? (u = f(r + 1, n), c = "almost " + u) : i > d[a].over && (c = "over " + o);
                    }
                  }
                }), e = h.splice(0, 2).join(", "), !0 === n.isAfter(t) ? (u += " ago", c += " ago", e += " ago") : (u = "in " + u, c = "in " + c, e = "in " + e), {
                  diff: s,
                  rounded: u,
                  qualified: c,
                  precise: e
                };
              };
            }, {
              "../fns": 12
            }],
            36: [function (n, t, e) {
              "use strict";

              var a = n("../data/seasons"),
                  r = n("../data/quarters"),
                  i = n("./set/walk"),
                  o = {
                minute: function minute(n) {
                  return i(n, {
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                quarterHour: function quarterHour(n) {
                  var t = n.minutes();
                  return 45 <= t ? n.minutes(45) : 30 <= t ? n.minutes(30) : 15 <= t ? n.minutes(15) : n.minutes(0), i(n, {
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                hour: function hour(n) {
                  return i(n, {
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                day: function day(n) {
                  return i(n, {
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                week: function week(n) {
                  var t = n.clone();
                  return n.day(1), n.isAfter(t) && n.subtract(1, "week"), i(n, {
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                month: function month(n) {
                  return i(n, {
                    date: 1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                quarter: function quarter(n) {
                  var t = n.quarter();
                  return r[t] && i(n, {
                    month: r[t][0],
                    date: r[t][1],
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                },
                season: function season(n) {
                  var t = n.season(),
                      e = "north";
                  "South" === n.timezone().hemisphere && (e = "south");

                  for (var r = 0; r < a[e].length; r++) {
                    if (a[e][r][0] === t) {
                      var o = n.year();
                      return "winter" === t && n.month() < 3 && (o -= 1), i(n, {
                        year: o,
                        month: a[e][r][1],
                        date: a[e][r][2],
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                      }), n;
                    }
                  }

                  return n;
                },
                year: function year(n) {
                  return i(n, {
                    month: 0,
                    date: 1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  }), n;
                }
              };
              o.date = o.day;
              t.exports = {
                startOf: function startOf(n, t) {
                  return o[t] ? o[t](n) : "summer" === t || "winter" === t ? (n.season(t), o.season(n)) : n;
                },
                endOf: function endOf(n, t) {
                  return o[t] && ((n = o[t](n)).add(1, t), n.subtract(1, "milliseconds")), n;
                }
              };
            }, {
              "../data/quarters": 9,
              "../data/seasons": 10,
              "./set/walk": 34
            }],
            37: [function (n, t, e) {
              "use strict";

              var r = n("./timezone/guessTz"),
                  o = n("./timezone/index"),
                  a = n("./input"),
                  i = n("./methods"),
                  s = n("../data"),
                  u = function u(n, t, e) {
                e = e || {}, this.tz = t || r(), this.silent = e.silent || !1, Object.defineProperty(this, "d", {
                  get: function get() {
                    var n = o(this) || {},
                        t = (new Date(this.epoch).getTimezoneOffset() || 0) + 60 * n.current.offset;
                    t = 60 * t * 1e3;
                    var e = this.epoch + t;
                    return new Date(e);
                  }
                }), Object.defineProperty(this, "timezones", {
                  get: function get() {
                    return s;
                  },
                  set: function set(n) {
                    return s = n;
                  }
                }), a(this, n, t, e);
              };

              Object.keys(i).forEach(function (n) {
                u.prototype[n] = i[n];
              }), u.prototype.clone = function () {
                return new u(this.epoch, this.tz, {
                  silent: this.silent
                });
              }, n("./methods/query")(u), n("./methods/add")(u), n("./methods/same")(u), n("./methods/compare")(u), n("./methods/i18n")(u), t.exports = u;
            }, {
              "../data": 1,
              "./input": 15,
              "./methods": 19,
              "./methods/add": 20,
              "./methods/compare": 21,
              "./methods/i18n": 25,
              "./methods/query": 29,
              "./methods/same": 32,
              "./timezone/guessTz": 38,
              "./timezone/index": 39
            }],
            38: [function (n, t, e) {
              "use strict";

              t.exports = function () {
                var n = function () {
                  if ("undefined" == typeof Intl || void 0 === Intl.DateTimeFormat) return null;
                  var n = Intl.DateTimeFormat();
                  if (void 0 === n || void 0 === n.resolvedOptions) return null;
                  var t = n.resolvedOptions().timeZone;
                  return !t || -1 === t.indexOf("/") && "UTC" === t ? null : t;
                }();

                return null === n ? "Asia/Shanghai" : n;
              };
            }, {}],
            39: [function (n, t, e) {
              "use strict";

              var c = n("./summerTime");

              t.exports = function (n) {
                var t = n.tz || "",
                    e = n.timezones,
                    r = t.split("/");
                if (!1 === e.hasOwnProperty(t) && 2 < r.length && (t = r[0] + "/" + r[1]), !1 === e.hasOwnProperty(t)) return console.warn("Warn: could not find given or local timezone - '" + t + "'"), {
                  current: {
                    epochShift: 0
                  }
                };
                var o,
                    a = {
                  name: t,
                  hasDst: Boolean(e[t].dst),
                  hemisphere: "s" === e[t].h ? "South" : "North",
                  change: {},
                  current: {}
                };

                if (!0 === a.hasDst) {
                  var i = (o = e[t].dst) ? o.split("->") : [];
                  a.change = {
                    start: i[0],
                    back: i[1]
                  };
                }

                var s = e[t].o,
                    u = s;
                return !0 === a.hasDst && (u = "North" === a.hemisphere ? s - 1 : e[t].o + 1), !1 === a.hasDst ? (a.current.offset = s, a.current.isDST = !1) : !0 === c(n, a, s) ? (a.current.offset = s, a.current.isDST = "North" === a.hemisphere) : (a.current.offset = u, a.current.isDST = "South" === a.hemisphere), a;
              };
            }, {
              "./summerTime": 40
            }],
            40: [function (n, t, e) {
              "use strict";

              var s = n("../fns").zeroPad;

              t.exports = function (n, t, e) {
                if (!0 !== t.hasDst || !t.change.start || !t.change.back) return !1;
                var r = new Date(n.epoch),
                    o = (r.getTimezoneOffset() || 0) + 60 * e;
                o = 60 * o * 1e3, r = new Date(n.epoch + o);
                var a,
                    i = s((a = r).getMonth() + 1) + "/" + s(a.getDate()) + ":" + s(a.getHours());
                return i >= t.change.start && i < t.change.back;
              };
            }, {
              "../fns": 12
            }]
          }, {}, [13])(13);
        });
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    16: [function (_dereq_, module, exports) {
      (function (global) {
        !function (e) {
          if ("object" == _typeof2(exports) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).spencerColor = e();
          }
        }(function () {
          return function i(f, c, u) {
            function d(r, e) {
              if (!c[r]) {
                if (!f[r]) {
                  var n = "function" == typeof _dereq_ && _dereq_;
                  if (!e && n) return n(r, !0);
                  if (s) return s(r, !0);
                  var o = new Error("Cannot find module '" + r + "'");
                  throw o.code = "MODULE_NOT_FOUND", o;
                }

                var t = c[r] = {
                  exports: {}
                };
                f[r][0].call(t.exports, function (e) {
                  return d(f[r][1][e] || e);
                }, t, t.exports, i, f, c, u);
              }

              return c[r].exports;
            }

            for (var s = "function" == typeof _dereq_ && _dereq_, e = 0; e < u.length; e++) {
              d(u[e]);
            }

            return d;
          }({
            1: [function (e, r, n) {
              "use strict";

              r.exports = {
                blue: "#6699cc",
                green: "#6accb2",
                yellow: "#e1e6b3",
                red: "#cc7066",
                pink: "#e6b8b3",
                brown: "#9c896c",
                orange: "#cc8a66",
                purple: "#d8b3e6",
                navy: "#335799",
                olive: "#7f9c6c",
                burnt: "#603a39",
                beige: "#e6d7b3",
                fuscia: "#603960"
              };
            }, {}],
            2: [function (e, r, n) {
              "use strict";

              r.exports = {
                white: "#fbfbfb",
                grey: "#4d4d4d",
                dim: "#d7d5d2",
                lightgrey: "#949a9e",
                dark: "#443d3d",
                bluegrey: "#606c74",
                black: "#333333"
              };
            }, {}],
            3: [function (e, r, n) {
              "use strict";

              var o = e("./greys"),
                  t = e("./colors");
              r.exports = Object.assign({}, t, o);
            }, {
              "./colors": 1,
              "./greys": 2
            }]
          }, {}, [3])(3);
        });
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    17: [function (_dereq_, module, exports) {
      (function (global, factory) {
        _typeof2(exports) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.vhtml = factory();
      })(this, function () {
        'use strict';

        var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

        var esc = function esc(str) {
          return String(str).replace(/[&<>"']/g, function (s) {
            return '&' + map[s] + ';';
          });
        };

        var map = {
          '&': 'amp',
          '<': 'lt',
          '>': 'gt',
          '"': 'quot',
          "'": 'apos'
        };
        var sanitized = {};

        function h(name, attrs) {
          var stack = [];

          for (var i = arguments.length; i-- > 2;) {
            stack.push(arguments[i]);
          }

          if (typeof name === 'function') {
            (attrs || (attrs = {})).children = stack.reverse();
            return name(attrs);
          }

          var s = '<' + name;
          if (attrs) for (var _i in attrs) {
            if (attrs[_i] !== false && attrs[_i] != null) {
              s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
            }
          }

          if (emptyTags.indexOf(name) === -1) {
            s += '>';

            while (stack.length) {
              var child = stack.pop();

              if (child) {
                if (child.pop) {
                  for (var _i2 = child.length; _i2--;) {
                    stack.push(child[_i2]);
                  }
                } else {
                  s += sanitized[child] === true ? child : esc(child);
                }
              }
            }

            s += '</' + name + '>';
          } else {
            s += '>';
          }

          sanitized[s] = true;
          return s;
        }

        return h;
      });
    }, {}],
    18: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["<svg ...", ">\n      ", "\n    </svg>"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<div>", "</div>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      var fitAspect = _dereq_('fit-aspect-ratio');

      var Component = _dereq_('preact').Component;

      var htm = _dereq_('htm');

      var vhtml = _dereq_('vhtml');

      var methods = _dereq_('./methods');

      var YScale = _dereq_('./scales/YScale');

      var XScale = _dereq_('./scales/Scale');

      var XAxis = _dereq_('./axis/XAxis');

      var YAxis = _dereq_('./axis/YAxis');

      var Shape = _dereq_('./shapes/Shape');

      var Line = _dereq_('./shapes/Line');

      var Text = _dereq_('./shapes/Text');

      var Dot = _dereq_('./shapes/Dot');

      var Slider = _dereq_('./inputs/Slider');

      var World =
      /*#__PURE__*/
      function (_Component) {
        _inherits(World, _Component);

        function World() {
          var _this;

          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _classCallCheck(this, World);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(World).call(this, obj));
          _this.aspect = obj.aspect || '3:4';
          var res = fitAspect(obj);
          _this.width = res.width || 600;
          _this.height = res.height || 400;
          _this.shapes = []; //give the points a little bit of space.

          _this.wiggle_room = 1.05;
          _this.x = new XScale(obj, _assertThisInitialized(_assertThisInitialized(_this)));
          _this.y = new YScale(obj, _assertThisInitialized(_assertThisInitialized(_this)));
          _this.xAxis = new XAxis({}, _assertThisInitialized(_assertThisInitialized(_this)));
          _this.yAxis = new YAxis({}, _assertThisInitialized(_assertThisInitialized(_this)));
          _this.html = htm.bind(vhtml);
          _this.inputs = [];
          _this.state = {};
          _this.state.time = Date.now();
          return _this;
        }

        _createClass(World, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this2 = this;

            console.log('mount'); // update time every second

            this.timer = setInterval(function () {
              _this2.setState({
                time: Date.now()
              });
            }, 1000);
          }
        }, {
          key: "bind",
          value: function bind(fn) {
            this.html = htm.bind(fn);
          }
        }, {
          key: "line",
          value: function line(obj) {
            var line = new Line(obj, this);
            this.shapes.push(line);
            return line;
          }
        }, {
          key: "dot",
          value: function dot(obj) {
            var dot = new Dot(obj, this);
            this.shapes.push(dot);
            return dot;
          }
        }, {
          key: "text",
          value: function text(obj) {
            var text = new Text(obj, this);
            this.shapes.push(text);
            return text;
          }
        }, {
          key: "shape",
          value: function shape(obj) {
            var shape = new Shape(obj, this);
            this.shapes.push(shape);
            return shape;
          }
        }, {
          key: "slider",
          value: function slider(obj) {
            var slider = new Slider(obj, this);
            this.inputs.push(slider);
            return slider;
          }
        }, {
          key: "render",
          value: function render() {
            console.log('render');
            var h = this.html;
            return h(_templateObject(), this.state.time);
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.html;
            var shapes = this.shapes.sort(function (a, b) {
              return a._order > b._order ? 1 : -1;
            });
            var elements = [];

            if (this.xAxis) {
              elements.push(this.xAxis.build());
            }

            if (this.yAxis) {
              elements.push(this.yAxis.build());
            }

            elements = elements.concat(shapes.map(function (shape) {
              return shape.build();
            }));
            var attrs = {
              width: this.width,
              height: this.height,
              viewBox: "0,0,".concat(this.width, ",").concat(this.height),
              preserveAspectRatio: 'xMidYMid meet',
              style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;

            };
            return h(_templateObject2(), attrs, elements);
          }
        }]);

        return World;
      }(Component);

      Object.keys(methods).forEach(function (k) {
        World.prototype[k] = methods[k];
      });
      module.exports = World;
    }, {
      "./axis/XAxis": 21,
      "./axis/YAxis": 22,
      "./inputs/Slider": 25,
      "./methods": 26,
      "./scales/Scale": 28,
      "./scales/YScale": 29,
      "./shapes/Dot": 30,
      "./shapes/Line": 31,
      "./shapes/Shape": 32,
      "./shapes/Text": 33,
      "fit-aspect-ratio": 11,
      "htm": 13,
      "preact": 14,
      "vhtml": 17
    }],
    19: [function (_dereq_, module, exports) {
      "use strict";

      var extent = function extent(arr) {
        var min = null;
        var max = null;
        arr.forEach(function (a) {
          if (min === null || a < min) {
            min = a;
          }

          if (max === null || a > max) {
            max = a;
          }
        });
        return {
          min: min,
          max: max
        };
      };
      /* eslint no-bitwise: 0 */


      var uuid = function uuid() {
        return (Math.random() + 1).toString(36).substring(7); // return 'xxxxx'.replace(/[xy]/g, function(c) {
        //   var r = Math.random() * 16 | 0,
        //     v = c === 'x' ? r : (r & 0x3 | 0x8);
        //   return v.toString(16);
        // });
      };

      module.exports = {
        extent: extent,
        uuid: uuid
      };
    }, {}],
    20: [function (_dereq_, module, exports) {
      "use strict";

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      var _ticks = _dereq_('./_ticks');

      var defaults = {
        stroke: '#d7d5d2',
        'stroke-width': 1
      };

      var Axis =
      /*#__PURE__*/
      function () {
        function Axis() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Axis);

          this.world = world;
          this.attrs = Object.assign({}, defaults, obj);
          this.scale = null;
          this._ticks = 6;
          this._show = true;
        }

        _createClass(Axis, [{
          key: "remove",
          value: function remove() {
            this._show = false;
          }
        }, {
          key: "show",
          value: function show() {
            this._show = true;
          }
        }, {
          key: "ticks",
          value: function ticks(n) {
            if (n !== undefined) {
              this._ticks = n;
            }

            if (this.scale.format() === 'date') {
              return _ticks.date(this, this._ticks);
            }

            return _ticks.generic(this, this._ticks);
          }
        }]);

        return Axis;
      }();

      module.exports = Axis;
    }, {
      "./_ticks": 23
    }],
    21: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["<g>\n      ", "\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" ...", "/>\n    </g>"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<text x=\"", "\" y=\"", "\" fill=\"", "\" text-anchor=\"middle\" style=\"font-size:12px;\">\n        ", "\n      </text>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var Axis = _dereq_('./Axis');

      var XAxis =
      /*#__PURE__*/
      function (_Axis) {
        _inherits(XAxis, _Axis);

        function XAxis() {
          var _this;

          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, XAxis);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(XAxis).call(this, obj, world));
          _this.scale = world.x;
          return _this;
        }

        _createClass(XAxis, [{
          key: "drawTicks",
          value: function drawTicks(y) {
            var _this2 = this;

            var h = this.world.html;
            return this.ticks().map(function (o) {
              return h(_templateObject(), o.pos, y + 15, _this2.attrs.stroke, o.label);
            });
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.world.html;

            if (this._show === false) {
              return '';
            }

            var attrs = this.attrs;
            var width = this.world.width;
            var y = this.world.height;
            var ticks = this.drawTicks(y);
            return h(_templateObject2(), ticks, 0, y, width, y, attrs);
          }
        }]);

        return XAxis;
      }(Axis);

      module.exports = XAxis;
    }, {
      "./Axis": 20
    }],
    22: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["<g>\n      ", "\n      <line x1=\"", "\" y1=\"", "\" x2=\"", "\" y2=\"", "\" ...", "/>\n    </g>"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<text x=\"", "\" y=\"", "\" dy=\"0\" dx=\"-6\" fill=\"", "\" text-anchor=\"end\" style=\"font-size:12px;\">\n        ", "\n      </text>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var Axis = _dereq_('./Axis');

      var YAxis =
      /*#__PURE__*/
      function (_Axis) {
        _inherits(YAxis, _Axis);

        function YAxis() {
          var _this;

          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, YAxis);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(YAxis).call(this, obj, world));
          _this.scale = world.y;
          return _this;
        }

        _createClass(YAxis, [{
          key: "drawTicks",
          value: function drawTicks(x) {
            var _this2 = this;

            var h = this.world.html;
            return this.ticks().map(function (o) {
              return h(_templateObject(), x, o.pos, _this2.attrs.stroke, o.label);
            });
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.world.html;

            if (this._show === false) {
              return '';
            }

            var attrs = this.attrs;
            var height = this.world.height;
            var x = 0;
            var ticks = this.drawTicks(x);
            return h(_templateObject2(), ticks, x, 0, x, height, attrs);
          }
        }]);

        return YAxis;
      }(Axis);

      module.exports = YAxis;
    }, {
      "./Axis": 20
    }],
    23: [function (_dereq_, module, exports) {
      "use strict";

      var spacetime = _dereq_('spacetime');

      var memo = {};
      var day = 60 * 60 * 24 * 1000;
      var month = day * 30;
      var year = day * 368;

      var generic = function generic(axis) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
        n = n === 0 ? 0 : n - 1;
        var scale = axis.scale;
        var total = scale.max - scale.min;
        var ticks = [];

        for (var i = 0; i <= n; i += 1) {
          var dec = i / n;
          var num = dec * total + scale.min;
          ticks.push({
            num: num,
            pos: scale.scale(num),
            label: parseInt(num, 10)
          });
        }

        return ticks;
      };

      var chooseFmt = function chooseFmt(scale) {
        var diff = scale.max - scale.min;

        if (diff > year) {
          return 'MMM yyyy';
        }

        if (diff > month) {
          return 'MMM'; // Sept
        }

        if (diff < day) {
          return 'h:mm a';
        }

        return 'MMM d';
      };

      var date = function date(axis) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
        var ticks = generic(axis, n);
        var fmt = chooseFmt(axis.scale);
        ticks = ticks.map(function (o) {
          if (memo[o.num]) {
            o.label = memo[o.num];
          } else {
            o.label = spacetime(o.num).format(fmt);
          }

          return o;
        });
        return ticks;
      };

      module.exports = {
        generic: generic,
        date: date
      };
    }, {
      "spacetime": 15
    }],
    24: [function (_dereq_, module, exports) {
      "use strict";

      var World = _dereq_('./World'); //


      var somehow = function somehow(obj) {
        return new World(obj);
      };

      module.exports = somehow;
    }, {
      "./World": 18
    }],
    25: [function (_dereq_, module, exports) {
      "use strict";

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["<div style=\"", "\">\n        <div style=\"", "\">", "</div>\n        ", "\n        <input type=\"range\" id=\"", "\" style=\"", "\" value=", " ...", ">\n      </div>"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<div style=\"", "\"> ", "</div>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      var fns = _dereq_('../_fns');

      var colors = _dereq_('spencer-color');

      var defaults = {
        min: -100,
        max: 100,
        step: 1,
        size: 200
      };

      var Slider =
      /*#__PURE__*/
      function () {
        function Slider() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Slider);

          if (typeof obj === 'string') {
            this.id = obj;
            obj = {};
          }

          this.world = world;
          this.data = obj.data || [];
          this.attrs = Object.assign({}, defaults, obj);
          this.style = {};
          this._title = '';

          this.onChange = function () {};

          this._labels = [];
          this._value = obj.value;

          if (this._value === undefined) {
            this._value = 50;
          }

          this.id = obj.id || fns.uuid();

          this.callback = function (e) {
            console.log(e.target.value);
          };

          this.world.state[this.id] = this._value;
        }

        _createClass(Slider, [{
          key: "labels",
          value: function labels(data) {
            this._labels = data.map(function (a) {
              return {
                value: a[1],
                label: a[0]
              };
            });
            return this;
          }
        }, {
          key: "place",
          value: function place() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var _this$attrs = this.attrs,
                max = _this$attrs.max,
                min = _this$attrs.min,
                size = _this$attrs.size;
            var range = max - min;
            var spot = x - min;
            var percent = spot / range;
            return percent * size;
          }
        }, {
          key: "makeLabels",
          value: function makeLabels() {
            var _this = this;

            var h = this.world.html;
            return this._labels.map(function (o) {
              var y = _this.place(o.value);

              var style = "position:absolute; top:".concat(y, "px; font-size:10px; color:").concat(colors.lightgrey, "; left:10px;");
              return h(_templateObject(), style, o.label);
            });
          }
        }, {
          key: "title",
          value: function title(str) {
            this._title = str;
          }
        }, {
          key: "build",
          value: function build() {
            var _this2 = this;

            var h = this.world.html;
            var size = this.attrs.size;
            var styles = {
              box: "position:relative; height:".concat(size, "px; width:100px;"),
              input: "transform: rotate(90deg); width:".concat(size, "px;  transform-origin: 0% 0%;"),
              title: "position:absolute; top:-20px; left:-20px; color:".concat(colors.lightgrey, "; font-size:14px;")
            };
            setTimeout(function () {
              var el = document.getElementById(_this2.id);
              el.addEventListener('input', function (e) {
                _this2.world.state[_this2.id] = e.target.value;

                _this2.callback(e);
              });
            }, 50);
            return h(_templateObject2(), styles.box, styles.title, this._title, this.makeLabels(), this.id, styles.input, this._value, this.attrs);
          }
        }]);

        return Slider;
      }();

      module.exports = Slider;
    }, {
      "../_fns": 19,
      "spencer-color": 16
    }],
    26: [function (_dereq_, module, exports) {
      "use strict";

      var _require = _dereq_('./parse'),
          parseX = _require.parseX,
          parseY = _require.parseY;

      var fns = _dereq_('./_fns');

      var has = function has(x) {
        return x !== undefined && x !== null;
      };

      var methods = {
        //add new minimums
        from: function from(x, y) {
          if (has(x) === true) {
            x = parseX(x, this);
            this.x.min = x;
            this.x.rescale();
          }

          if (has(y) === true) {
            y = parseY(y, this).value;
            this.y.min = y;
            this.y.rescale();
          }

          return this;
        },
        //add new maximums
        to: function to(x, y) {
          if (has(x) === true) {
            x = parseX(x, this).value;
            this.c.max = x;
            this.c.rescale();
          }

          if (has(y) === true) {
            y = parseX(y, this).value;
            this.y.max = y;
            this.y.rescale();
          }

          return this;
        },
        fit: function fit(x, y) {
          // if (!has(x) && !has(y)) {
          var arr = this.shapes.map(function (s) {
            return s.extent();
          });
          var minX = fns.extent(arr.map(function (o) {
            return o.x.min;
          }).filter(function (n) {
            return n !== null;
          })).min || 0;
          var minY = fns.extent(arr.map(function (o) {
            return o.y.min;
          }).filter(function (n) {
            return n !== null;
          })).min || 0;
          var maxY = fns.extent(arr.map(function (o) {
            return o.y.max;
          }).filter(function (n) {
            return n !== null;
          })).max || 0;
          var maxX = fns.extent(arr.map(function (o) {
            return o.x.max;
          }).filter(function (n) {
            return n !== null;
          })).max || 0; //keep graphs from 0, if you can...

          this.x.min = minX > 0 ? 0 : minX;
          this.x.max = maxX;

          if (this.x.format() === 'date') {
            this.x.min = minX;
            this.x.max = maxX;
          }

          this.x.rescale();
          this.y.min = minY > 0 ? 0 : minY;
          this.y.max = maxY;

          if (this.y.format() === 'date') {
            this.y.min = minY;
            this.y.max = maxY;
          }

          this.y.rescale(); // }

          if (has(x) === true) {
            x = parseX(x, this).value;

            if (x > this.x.max) {
              this.x.max = x;
            } else if (x < this.x.min) {
              this.x.min = x;
            }

            this.x.rescale();
          }

          if (has(y) === true) {
            y = parseY(y, this).value;

            if (y > this.y.max) {
              this.y.max = y;
            } else if (y < this.y.min) {
              this.y.min = y;
            }

            this.y.rescale();
          }

          return this;
        }
      };
      module.exports = methods;
    }, {
      "./_fns": 19,
      "./parse": 27
    }],
    27: [function (_dereq_, module, exports) {
      "use strict";

      var spacetime = _dereq_('spacetime'); //


      var parse = function parse(str) {
        if (typeof str === 'number') {
          return {
            type: 'number',
            value: str
          };
        } //support pixels


        if (/[0-9]px$/.test(str)) {
          return {
            type: 'pixel',
            value: Number(str.replace(/px/, ''))
          };
        } //support percentages


        if (/[0-9]%$/.test(str)) {
          var _num = Number(str.replace(/%/, ''));

          return {
            type: 'percent',
            value: _num
          };
        } //try a straight-up number


        var num = Number(str);

        if (!isNaN(num)) {
          return {
            type: 'number',
            value: num
          };
        } //try a date


        var s = spacetime(str);

        if (s.isValid()) {
          return {
            type: 'date',
            value: s.epoch
          };
        }

        console.warn('Counldn\'t parse: ' + str);
        return {
          type: 'unknown',
          value: null
        };
      };

      var parseX = function parseX(str, world) {
        var res = parse(str);

        if (res.type === 'date') {
          world.x.format(res.type);
        }

        return res;
      };

      var parseY = function parseY(str, world) {
        var res = parse(str);

        if (res.type === 'date') {
          world.y.format(res.type);
        }

        return res;
      };

      module.exports = {
        parseX: parseX,
        parseY: parseY
      };
    }, {
      "spacetime": 15
    }],
    28: [function (_dereq_, module, exports) {
      "use strict";

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      var scaleLinear = _dereq_('d3-scale').scaleLinear;

      var _require = _dereq_('../parse'),
          parseX = _require.parseX; // const spacetime = require('spacetime')


      var has = function has(x) {
        return x !== undefined && x !== null;
      };

      var Scale =
      /*#__PURE__*/
      function () {
        function Scale(data, world) {
          _classCallCheck(this, Scale);

          this.world = world;
          this.min = 0;
          this.max = 1;
          this.from = 0;
          this.to = world.width;
          this._format = 'number';
          this.parse = parseX;
          this.rescale();
        }

        _createClass(Scale, [{
          key: "rescale",
          value: function rescale() {
            //give it a little bit of room..
            var max = this.max; //* this.world.wiggle_room

            this.scale = scaleLinear().range([this.from, this.to]).domain([this.min, max]);
          }
        }, {
          key: "fit",
          value: function fit(a, b) {
            if (has(a) === true) {
              var num = this.parse(a, this.world).value;
              this.min = num;
            }

            if (has(b) === true) {
              var _num = this.parse(b, this.world).value;
              this.max = _num;
            }

            this.rescale();
          }
        }, {
          key: "place",
          value: function place(obj) {
            //from=top
            //to=bottom
            if (obj.type === 'pixel') {
              if (this.is_y) {
                return this.to - obj.value; //flip grid
              }

              return obj.value;
            }

            if (obj.type === 'percent') {
              var num = this.byPercent(obj.value);
              return this.scale(num);
            }

            return this.scale(obj.value);
          }
        }, {
          key: "byPercent",
          value: function byPercent() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            num = num / 100;
            var diff = this.max - this.min;
            return diff * num + this.min;
          }
        }, {
          key: "format",
          value: function format(_format) {
            if (_format === undefined) {
              return this._format;
            }

            this._format = _format;
            return this;
          }
        }]);

        return Scale;
      }();

      module.exports = Scale;
    }, {
      "../parse": 27,
      "d3-scale": 7
    }],
    29: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var Scale = _dereq_('./Scale');

      var scaleLinear = _dereq_('d3-scale').scaleLinear;

      var _require = _dereq_('../parse'),
          parseY = _require.parseY;

      var YScale =
      /*#__PURE__*/
      function (_Scale) {
        _inherits(YScale, _Scale);

        function YScale(data, world) {
          var _this;

          _classCallCheck(this, YScale);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(YScale).call(this, data, world)); //use height instead of width

          _this.to = world.height;
          _this.is_y = true;
          _this.parse = parseY;

          _this.rescale();

          return _this;
        }

        _createClass(YScale, [{
          key: "rescale",
          value: function rescale() {
            var max = this.max; //* this.world.wiggle_room

            this.scale = scaleLinear().range([this.from, this.to]).domain([max, this.min]);
          }
        }]);

        return YScale;
      }(Scale);

      module.exports = YScale;
    }, {
      "../parse": 27,
      "./Scale": 28,
      "d3-scale": 7
    }],
    30: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<circle ...", " />"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var colors = _dereq_('spencer-color'); // const d3Shape = require('d3-shape')


      var Shape = _dereq_('./Shape');

      var defaults = {
        fill: colors.blue,
        stroke: 'none'
      };

      var Dot =
      /*#__PURE__*/
      function (_Shape) {
        _inherits(Dot, _Shape);

        function Dot() {
          var _this;

          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Dot);

          obj = Object.assign({}, defaults, obj);
          _this = _possibleConstructorReturn(this, _getPrototypeOf(Dot).call(this, obj, world));
          _this._radius = obj.radius || 5;
          return _this;
        }

        _createClass(Dot, [{
          key: "radius",
          value: function radius(r) {
            this._radius = r;
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.world.html;
            var point = this.points()[0];
            var attrs = Object.assign({}, this.attrs, {
              cx: point[0],
              cy: point[1],
              r: this._radius
            });
            return h(_templateObject(), attrs);
          }
        }]);

        return Dot;
      }(Shape);

      module.exports = Dot;
    }, {
      "./Shape": 32,
      "spencer-color": 16
    }],
    31: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var colors = _dereq_('spencer-color');

      var d3Shape = _dereq_('d3-shape');

      var Shape = _dereq_('./Shape'); // const {parseX, parseY} = require('../parse')


      var defaults = {
        fill: 'none',
        stroke: colors.blue,
        'stroke-width': 4,
        'stroke-linecap': 'round'
      };

      var Line =
      /*#__PURE__*/
      function (_Shape) {
        _inherits(Line, _Shape);

        function Line() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Line);

          obj = Object.assign({}, defaults, obj);
          return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, obj, world));
        }

        _createClass(Line, [{
          key: "color",
          value: function color(_color) {
            this.attrs.stroke = colors[_color] || _color;
            return this;
          }
        }, {
          key: "dotted",
          value: function dotted(n) {
            if (n === true) {
              n = 4;
            }

            this.attrs['stroke-dasharray'] = n || 4;
            return this;
          }
        }, {
          key: "width",
          value: function width(num) {
            this.attrs['stroke-width'] = num; //parseX(num, this.world)

            return this;
          }
        }, {
          key: "path",
          value: function path() {
            var points = this.points();
            return d3Shape.line().x(function (d) {
              return d[0];
            }).y(function (d) {
              return d[1];
            }).curve(d3Shape.curveMonotoneX)(points);
          }
        }]);

        return Line;
      }(Shape);

      module.exports = Line;
    }, {
      "./Shape": 32,
      "d3-shape": 8,
      "spencer-color": 16
    }],
    32: [function (_dereq_, module, exports) {
      "use strict";

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<path ...", " style=\"", "\"/>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      var flubber = _dereq_('flubber');

      var colors = _dereq_('spencer-color'); // const {parseX, parseY} = require('../parse')


      var fns = _dereq_('../_fns');

      var parseInput = _dereq_('./lib/parseInput');

      var defaults = {
        fill: 'red',
        stroke: colors.blue,
        'shape-rendering': 'optimizeQuality'
      };

      var Shape =
      /*#__PURE__*/
      function () {
        function Shape() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Shape);

          this.world = world;
          this.data = obj.data || [];
          this.attrs = Object.assign({}, defaults, obj);
          this.style = {};
          this._shape = 1;
        }

        _createClass(Shape, [{
          key: "at",
          value: function at(x, y) {
            if ((x || x === 0) && (y || y === 0)) {
              //hmm
              this.set([[x, y]]);
              return this;
            } //vertical line


            if (x || x === 0) {
              this.set([[x, '0%'], [x, '100%']]);
            } //horizontal line


            if (y || y === 0) {
              this.set([['0%', y], ['100%', y]]);
            }

            return this;
          }
        }, {
          key: "extent",
          value: function extent() {
            // let points = this.points()
            // let xArr = points.map((a) => a[0])
            // let yArr = points.map((a) => a[1])
            var xArr = [];
            var yArr = [];
            this.data.forEach(function (o) {
              if (o.x.type !== 'pixel') {
                xArr.push(o.x.value);
              }

              if (o.y.type !== 'pixel') {
                yArr.push(o.y.value);
              }
            }); // this.data.map((o) => o.x.value)
            // let yArr = this.data.map((o) => o.y.value)

            return {
              x: fns.extent(xArr),
              y: fns.extent(yArr)
            };
          }
        }, {
          key: "color",
          value: function color(_color) {
            this.attrs.fill = colors[_color] || _color;
            return this;
          }
        }, {
          key: "opacity",
          value: function opacity(n) {
            this.attrs.opacity = n;
            return this;
          }
        }, {
          key: "set",
          value: function set(str) {
            this.data = parseInput(str, this.world);
            return this;
          } //x,y coordinates

        }, {
          key: "points",
          value: function points() {
            var _this$world = this.world,
                x = _this$world.x,
                y = _this$world.y;
            var points = this.data.map(function (o) {
              return [x.place(o.x), y.place(o.y)];
            });
            return points;
          }
        }, {
          key: "path",
          value: function path() {
            return flubber.toPathString(this.points());
          }
        }, {
          key: "drawSyle",
          value: function drawSyle() {
            var _this = this;

            return Object.keys(this.style).map(function (k) {
              return "".concat(k, ":").concat(_this.style[k], ";");
            }).join(' ');
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.world.html;
            var attrs = Object.assign({}, this.attrs, {
              d: this.path()
            });
            return h(_templateObject(), attrs, this.drawSyle());
          }
        }]);

        return Shape;
      }();

      module.exports = Shape;
    }, {
      "../_fns": 19,
      "./lib/parseInput": 34,
      "flubber": 12,
      "spencer-color": 16
    }],
    33: [function (_dereq_, module, exports) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["<g transform=\"translate(", " ", ")\" style=\"", "\">\n      <text id=\"fun\" ...", ">\n        ", "\n      </text>\n    </g>"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["<tspan x=\"0\" dy=\"1.2em\">", "</tspan>"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      var Shape = _dereq_('./Shape');

      var colors = _dereq_('spencer-color');

      var defaults = {
        fill: 'grey',
        stroke: 'none',
        'stroke-width': 1,
        'stroke-linecap': 'round'
      };

      var Text =
      /*#__PURE__*/
      function (_Shape) {
        _inherits(Text, _Shape);

        function Text() {
          var _this;

          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var world = arguments.length > 1 ? arguments[1] : undefined;

          _classCallCheck(this, Text);

          var text = [];

          if (typeof obj === 'string') {
            text = [obj];
            obj = {};
          } else if (Array.isArray(obj)) {
            text = obj;
            obj = [];
          }

          obj = Object.assign({}, defaults, obj);
          _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, obj, world));
          _this.textLines = text;
          _this._order = 0;
          _this.data = [{
            x: {
              value: 50,
              type: 'percent'
            },
            y: {
              value: 50,
              type: 'percent'
            }
          }];
          _this._dodge = {
            x: 0,
            y: 4
          };
          _this._underline = '';
          return _this;
        }

        _createClass(Text, [{
          key: "before",
          value: function before(x, y) {
            this.attrs['text-anchor'] = "end";
            this.set([[x, y]]);
          }
        }, {
          key: "after",
          value: function after(x, y) {
            this.attrs['text-anchor'] = "start";
            this.set([[x, y]]);
          }
        }, {
          key: "center",
          value: function center(x, y) {
            this.attrs['text-anchor'] = "middle";
            this.set([[x, y]]);
          }
        }, {
          key: "color",
          value: function color(_color) {
            this.attrs.stroke = colors[_color] || _color;
            return this;
          }
        }, {
          key: "dy",
          value: function dy() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this._dodge.y += n * -1;
            return this;
          }
        }, {
          key: "dx",
          value: function dx() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this._dodge.x += n;
            return this;
          }
        }, {
          key: "dodge",
          value: function dodge(x, y) {
            x = x || this._dodge.x;
            y = y || this._dodge.y;
            this._dodge.x = x * -1;
            this._dodge.y = y * -1;
            return this;
          }
        }, {
          key: "font",
          value: function font(num) {
            if (typeof num === 'number') {
              num += 'px';
            }

            this.style['font-size'] = num;
            return this;
          }
        }, {
          key: "extent",
          value: function extent() {
            // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
            // let width = longest.length * 8
            // let height = this.textLines.length * 20
            var d = this.data[0] || {};
            return {
              x: {
                min: d.x,
                max: d.x
              },
              y: {
                min: d.y,
                // - height,
                max: d.y
              }
            };
          }
        }, {
          key: "text",
          value: function text(_text) {
            if (typeof _text === 'string') {
              this.textLines = [_text];
            } else {
              this.textLines = _text;
            }
          }
        }, {
          key: "path",
          value: function path() {
            return '';
          }
        }, {
          key: "estimate",
          value: function estimate() {
            //calculate height
            var height = 24;

            if (this.style['font-size']) {
              var num = this.style['font-size'].replace('px', '');
              num = Number(num);
              height = num * 1.5;
            } //calculate width


            var width = 0;
            this.textLines.forEach(function (str) {
              var w = str.length * 6;

              if (w > width) {
                width = w;
              }
            });
            return {
              height: height,
              width: width
            };
          }
        }, {
          key: "position",
          value: function position() {
            var point = this.points()[0];
            var res = {
              x: 0,
              y: 0
            };

            if (!point) {
              return res;
            }

            var _this$estimate = this.estimate(),
                height = _this$estimate.height,
                width = _this$estimate.width;

            res.height = height;
            res.width = width;
            res.y = point[1] + this._dodge.y - height;
            res.x = point[0] + 2 + this._dodge.x;
            return res;
          }
        }, {
          key: "build",
          value: function build() {
            var h = this.world.html;
            var inside = this.textLines.map(function (str) {
              return h(_templateObject(), str);
            });

            var _this$position = this.position(),
                x = _this$position.x,
                y = _this$position.y;

            return h(_templateObject2(), x, y, this.drawSyle(), this.attrs, inside);
          }
        }]);

        return Text;
      }(Shape);

      module.exports = Text;
    }, {
      "./Shape": 32,
      "spencer-color": 16
    }],
    34: [function (_dereq_, module, exports) {
      "use strict";

      var _require = _dereq_('../../parse'),
          parseX = _require.parseX,
          parseY = _require.parseY; //a very-flexible input language


      var parseStr = function parseStr() {
        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var world = arguments.length > 1 ? arguments[1] : undefined;
        var lines = str.split(/\n/g);
        lines = lines.filter(function (l) {
          return l;
        });
        lines = lines.map(function (line) {
          var split = line.split(/(,|\t) ?/);
          var x = parseX(split[0], world);
          var y = parseX(split[2], world);
          return {
            x: x,
            y: y
          };
        });
        return lines;
      };

      var parseInput = function parseInput(set, world) {
        if (typeof set === 'string') {
          return parseStr(set, world);
        }

        return set.map(function (a) {
          var x = parseX(a[0], world);
          var y = parseY(a[1], world);
          return {
            x: x,
            y: y
          };
        });
      };

      module.exports = parseInput;
    }, {
      "../../parse": 27
    }]
  }, {}, [24])(24);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  Boston: {
    nhl: ['Bruins'],
    mlb: ['Red Sox'],
    nba: ['Celtics'],
    nfl: ['Patriots'],
    mls: ['Revolution']
  },
  'Buffalo, New York': {
    nhl: ['Sabres'],
    nfl: ['Bills']
  },
  Detroit: {
    nhl: ['Red Wings'],
    mlb: ['Tigers'],
    nba: ['Pistons'],
    nfl: ['Lions']
  },
  Miami: {
    nhl: ['Panthers'],
    mlb: ['Marlins'],
    nba: ['Heat'],
    nfl: ['Dolphins']
  },
  Montreal: {
    nhl: ['Canadiens'],
    mls: ['Impact']
  },
  Ottawa: {
    nhl: ['Senators']
  },
  'Tampa, Florida': {
    nhl: ['Lightning'],
    mlb: ['Rays'],
    nfl: ['Buccaneers']
  },
  Toronto: {
    nhl: ['Maple Leafs'],
    mlb: ['Blue Jays'],
    nba: ['Raptors'],
    mls: ['Toronto FC']
  },
  'Raleigh, North Carolina': {
    nhl: ['Hurricanes']
  },
  'Columbus, Ohio': {
    nhl: ['Blue Jackets'],
    mls: ['Crew SC']
  },
  'Newark, New Jersey': {
    nhl: ['Devils'],
    nfl: ['Jets', 'Giants'],
    mls: ['Red Bulls']
  },
  'New York City': {
    nhl: ['Islanders', 'Rangers'],
    mlb: ['Yankees', 'Mets'],
    nba: ['Brooklyn Nets', 'Knicks'],
    mls: ['NY City FC']
  },
  Philadelphia: {
    nhl: ['Flyers'],
    mlb: ['Phillies'],
    nba: ['76ers'],
    nfl: ['Eagles'],
    mls: ['Union']
  },
  Pittsburgh: {
    nhl: ['Penguins'],
    mlb: ['Pirates'],
    nfl: ['Steelers']
  },
  'Washington, D.C.': {
    nhl: ['Capitals'],
    mlb: ['Nationals'],
    nba: ['Wizards'],
    nfl: ['Redskins'],
    mls: ['D.C. United']
  },
  Chicago: {
    nhl: ['Blackhawks'],
    mlb: ['White Sox', 'Cubs'],
    nba: ['Bulls'],
    nfl: ['Bears'],
    mls: ['Fire Soccer Club']
  },
  Denver: {
    nhl: ['Avalanche'],
    mlb: ['Rockies'],
    nba: ['Nuggets'],
    nfl: ['Broncos'],
    mls: ['Rapids']
  },
  Dallas: {
    nhl: ['Stars'],
    mlb: ['Texas Rangers'],
    nba: ['Mavericks'],
    nfl: ['Cowboys'],
    mls: ['FC Dallas']
  },
  Minneapolis: {
    nhl: ['Wild'],
    mlb: ['Twins'],
    nba: ['Timberwolves'],
    nfl: ['Vikings'],
    mls: ['United FC']
  },
  'Nashville, Tennessee': {
    nhl: ['Predators'],
    nfl: ['Titans']
  },
  'St. Louis': {
    nhl: ['Blues'],
    mlb: ['Cardinals']
  },
  Winnipeg: {
    nhl: ['Jets']
  },
  'Los Angeles': {
    nhl: ['Anaheim Ducks', 'Kings'],
    mlb: ['Angels', 'Dodgers'],
    nba: ['Clippers', 'Lakers'],
    nfl: ['Chargers', 'Rams'],
    mls: ['LA Galaxy', 'LA FC']
  },
  'Phoenix, Arizona': {
    nhl: ['Coyotes'],
    mlb: ['Diamondbacks'],
    nba: ['Phoenix Suns'],
    nfl: ['Cardinals']
  },
  Calgary: {
    nhl: ['Flames']
  },
  Edmonton: {
    nhl: ['Oilers']
  },
  'San Jose, California': {
    nhl: ['Sharks'],
    mls: ['Earthquakes']
  },
  Vancouver: {
    nhl: ['Canucks'],
    mls: ['Whitecaps FC']
  },
  'Las Vegas': {
    nhl: ['Golden Knights']
  },
  Baltimore: {
    mlb: ['Orioles'],
    nfl: ['Ravens']
  },
  Cleveland: {
    mlb: ['Indians'],
    nba: ['Cavaliers'],
    nfl: ['Browns']
  },
  'Kansas City, Missouri': {
    mlb: ['Royals'],
    nfl: ['Chiefs'],
    mls: ['Sporting Kansas City']
  },
  Houston: {
    mlb: ['Astros'],
    nba: ['Rockets'],
    nfl: ['Texans'],
    mls: ['Dynamo']
  },
  'Oakland, California': {
    mlb: ['Athletics'],
    nba: ['Golden State Warriors'],
    nfl: ['Raiders']
  },
  Seattle: {
    mlb: ['Mariners'],
    nfl: ['Seahawks'],
    mls: ['Sounders FC']
  },
  Atlanta: {
    mlb: ['Braves'],
    nba: ['Hawks'],
    nfl: ['Falcons'],
    mls: ['United FC']
  },
  Cincinnati: {
    mlb: ['Reds'],
    nfl: ['Bengals']
  },
  Milwaukee: {
    mlb: ['Brewers'],
    nba: ['Bucks']
  },
  'San Diego': {
    mlb: ['San Diego Padres']
  },
  'San Francisco': {
    mlb: ['Giants'],
    nfl: ['49ers']
  },
  Indianapolis: {
    nba: ['Indiana Pacers'],
    nfl: ['Colts']
  },
  'Charlotte, North Carolina': {
    nba: ['Hornets'],
    nfl: ['Panthers']
  },
  'Orlando, Florida': {
    nba: ['Magic'],
    mls: ['Orlando City SC']
  },
  'Oklahoma City': {
    nba: ['Thunder']
  },
  'Portland, Oregon': {
    nba: ['Trail Blazers'],
    mls: ['Timbers']
  },
  'Salt Lake City': {
    nba: ['Utah Jazz'],
    mls: ['Real Salt Lake']
  },
  'Sacramento, California': {
    nba: ['Kings']
  },
  'Memphis, Tennessee': {
    nba: ['Grizzlies']
  },
  'New Orleans': {
    nba: ['Pelicans'],
    nfl: ['Saints']
  },
  'San Antonio': {
    nba: ['Spurs']
  },
  'Jacksonville, Florida': {
    nfl: ['Jaguars']
  },
  'Green Bay, Wisconsin': {
    nfl: ['Packers']
  }
};

},{}],3:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  "Buffalo, New York": 42,
  "Detroit": 42,
  "Miami": 25,
  "Montreal": 45,
  "Boston": 42,
  "Columbus, Ohio": 39,
  "Ottawa": 45,
  "Raleigh, North Carolina": 35,
  "Toronto": 43,
  "Tampa, Florida": 27,
  "Pittsburgh": 40,
  "Philadelphia": 39,
  "Newark, New Jersey": 40,
  "Washington, D.C.": 38,
  "New York City": 40,
  "Chicago": 41,
  "Denver": 39,
  "Nashville, Tennessee": 36,
  "Dallas": 32,
  "Minneapolis": 44,
  "Los Angeles": 34,
  "St. Louis": 38,
  "Phoenix, Arizona": 33,
  "Winnipeg": 49,
  "Calgary": 51,
  "Vancouver": 49,
  "Las Vegas": 36,
  "San Jose, California": 37,
  "Edmonton": 53,
  "Baltimore": 39,
  "Cleveland": 41,
  "Houston": 29,
  "Kansas City, Missouri": 39,
  "Oakland, California": 37,
  "Seattle": 47,
  "Atlanta": 33,
  "San Diego": 32,
  "San Francisco": 37,
  "Milwaukee": 43,
  "Cincinnati": 39,
  "Portland, Oregon": 45,
  "Charlotte, North Carolina": 35,
  "Indianapolis": 39,
  "Oklahoma City": 35,
  "Orlando, Florida": 28,
  "Sacramento, California": 38,
  "Memphis, Tennessee": 35,
  "Salt Lake City": 40,
  "New Orleans": 29,
  "San Antonio": 29,
  "Jacksonville, Florida": 30,
  "Green Bay, Wisconsin": 44
};

},{}],4:[function(_dereq_,module,exports){
"use strict";

var colors = _dereq_('spencer-color');

var leagues = {
  mls: {
    color: colors.brown,
    start: 'March 3 2018',
    end: 'October 28 2018',
    playoff: 'Dec 8 2018'
  },
  nfl: {
    color: colors.orange,
    start: 'September 6 2018',
    end: 'Dec 30 2018',
    playoff: 'February 3 2018'
  },
  mlb: {
    color: colors.blue,
    start: 'March 29 2018',
    end: 'October 1 2018',
    playoff: 'Oct 28 2018'
  },
  nhl: {
    color: colors.red,
    start: 'October 3 2018',
    end: 'April 6 2018',
    playoff: 'June 13 2018'
  },
  nba: {
    color: colors.green,
    start: 'October 16 2018',
    end: 'April 10 2018',
    playoff: 'June 8 2018'
  }
};
module.exports = leagues;

},{"spencer-color":9}],5:[function(_dereq_,module,exports){
"use strict";

var el = document.querySelector('#stage');

var somehow = _dereq_('./assets/somehow'); // const somehow = require('/Users/spencer/mountain/somehow/src/index.js');


var spacetime = _dereq_('spacetime');

var cities = _dereq_('./data/cities');

var leagues = _dereq_('./data/leagues');

var latitudes = _dereq_('./data/latitudes');

var yearEnd = spacetime('Dec 31 2018');
var yearStart = spacetime('Jan 1 2018').format('iso');
var draw = {
  nhl: function nhl(w, label, y) {
    var _leagues$nhl = leagues.nhl,
        color = _leagues$nhl.color,
        start = _leagues$nhl.start,
        end = _leagues$nhl.end,
        playoff = _leagues$nhl.playoff;
    w.line().color(color).set([[start, y], [yearEnd, y]]);
    w.line().color(color).set([[yearStart, y], [end, y]]);
    w.line().color(color).opacity(0.4).dotted(5).set([[end, y], [playoff, y]]);
  },
  mlb: function mlb(w, label, y) {
    var _leagues$mlb = leagues.mlb,
        color = _leagues$mlb.color,
        start = _leagues$mlb.start,
        end = _leagues$mlb.end,
        playoff = _leagues$mlb.playoff;
    w.line().color(color).set([[start, y], [end, y]]);
    w.line().color(color).opacity(0.4).dotted(5).set([[end, y], [playoff, y]]);
  },
  nba: function nba(w, label, y) {
    var _leagues$nba = leagues.nba,
        color = _leagues$nba.color,
        start = _leagues$nba.start,
        end = _leagues$nba.end,
        playoff = _leagues$nba.playoff;
    w.line().color(color).set([[start, y], [yearEnd, y]]);
    w.line().color(color).set([[yearStart, y], [end, y]]);
    w.line().color(color).opacity(0.4).dotted(5).set([[end, y], [playoff, y]]);
  },
  nfl: function nfl(w, label, y) {
    var _leagues$nfl = leagues.nfl,
        color = _leagues$nfl.color,
        start = _leagues$nfl.start,
        end = _leagues$nfl.end,
        playoff = _leagues$nfl.playoff;
    w.line().color(color).set([[end, y], [start, y]]);
    w.line().color(color).opacity(0.4).dotted(5).set([[yearStart, y], [playoff, y]]);
  },
  mls: function mls(w, label, y) {
    var _leagues$mls = leagues.mls,
        color = _leagues$mls.color,
        start = _leagues$mls.start,
        end = _leagues$mls.end,
        playoff = _leagues$mls.playoff;
    w.line().color(color).set([[start, y], [end, y]]);
    w.line().color(color).opacity(0.4).dotted(5).set([[end, y], [playoff, y]]);
  }
};

var drawCity = function drawCity(name) {
  if (!latitudes[name]) {
    console.log(name);
  }

  var w = somehow({
    height: 200,
    aspect: 'widescreen'
  });
  var city = cities[name];
  var lat = w.text(latitudes[name] + '° ');
  lat.font(11);
  lat.set('-150px, 50%');
  var cityName = w.text(name);
  cityName.set('-125px, 50%');
  var i = 1;
  Object.keys(leagues).forEach(function (k) {
    var league = leagues[k];
    city[k] = city[k] || [];
    city[k].forEach(function (team) {
      var y = i * 10 + 'px';
      draw[k](w, team, y); //draw the main-line
      // if (k === 'nhl' || k === 'nba' || k === 'nfl') {
      //   drawTwoLines(w, league.start, league.end, y, team, league.color);
      // } else {
      //   drawLine(w, league.start, league.end, y, team, league.color);
      // }
      //draw the playoff line
      // drawPlayoff(w, league.end, league.playoff, y, team, league.color);
      //normalize their team name

      team = w.text(team);
      team.font(10);
      team.color('lightgrey');
      team.set("110%, ".concat(i * 10 + 3, "px"));
      var leg = w.line();
      leg.width(2);
      leg.color(league.color);
      y = i * 10 + 6 + 'px';
      leg.set("108%, ".concat(y, "\n        109%, ").concat(y));
      i += 1;
    });
  });
  var now = w.line();
  now.color('lightgrey');
  now.dotted(true);
  now.width(1);
  var iso = spacetime.now().format('iso');
  var y = i * 10 + 25 + 'px';
  now.set("".concat(iso, ", 0px\n    ").concat(iso, ", ").concat(y));
  w.y.fit(0, 9);
  w.x.fit('Jan 1 2018', 'Dec 31 2018');
  w.xAxis.ticks(12);
  w.yAxis.remove();
  return w.build();
};

var chosen = Object.keys(cities);
chosen = chosen.sort(function (a, b) {
  return latitudes[a] < latitudes[b] ? 1 : -1;
});
el.innerHTML = chosen.map(function (k) {
  return drawCity(k);
}).join(' '); // drawCity('Boston');
// drawCity('Toronto');

},{"./assets/somehow":1,"./data/cities":2,"./data/latitudes":3,"./data/leagues":4,"spacetime":6}],6:[function(_dereq_,module,exports){
(function (global){
/* spacetime v4.5.1
  
*/

!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spacetime=n()}}(function(){return function a(i,s,u){function c(t,n){if(!s[t]){if(!i[t]){var e="function"==typeof _dereq_&&_dereq_;if(!n&&e)return e(t,!0);if(h)return h(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=s[t]={exports:{}};i[t][0].call(o.exports,function(n){return c(i[t][1][n]||n)},o,o.exports,a,i,s,u)}return s[t].exports}for(var h="function"==typeof _dereq_&&_dereq_,n=0;n<u.length;n++)c(u[n]);return c}({1:[function(n,t,e){"use strict";var o,a,r=n("./zonefile.2018.json"),i={Australia:!0,Chile:!0,Brazil:!0,Antarctica:!0},s=(o=r,a={},Object.keys(o).forEach(function(r){Object.keys(o[r]).forEach(function(n){var t=r+"/"+n,e=o[r][n];a[t]={o:e[0],h:e[1]},e[2]&&(a[t].dst=e[2]),!0===i[r]&&(a[t].h="s")})}),a["Etc/UTC"]={o:0,h:"n"},a.UTC=a["Etc/UTC"],a);t.exports=s},{"./zonefile.2018.json":2}],2:[function(n,t,e){t.exports={Africa:{Abidjan:[0,"n"],Accra:[0,"n"],Addis_Ababa:[3,"n"],Algiers:[1,"n"],Asmara:[3,"n"],Asmera:[3,"n"],Bamako:[0,"n"],Bangui:[1,"n"],Banjul:[0,"n"],Bissau:[0,"n"],Blantyre:[2,"n"],Brazzaville:[1,"n"],Bujumbura:[2,"n"],Cairo:[2,"n"],Casablanca:[1,"n","07/02:03->10/29:02"],Ceuta:[2,"n","03/25:02->10/28:03"],Conakry:[0,"n"],Dakar:[0,"n"],Dar_es_Salaam:[3,"n"],Djibouti:[3,"n"],Douala:[1,"n"],El_Aaiun:[1,"n","07/02:03->10/29:02"],Freetown:[0,"n"],Gaborone:[2,"s"],Harare:[2,"s"],Johannesburg:[2,"s"],Juba:[3,"n"],Kampala:[3,"n"],Khartoum:[2,"n"],Kigali:[2,"n"],Kinshasa:[1,"s"],Lagos:[1,"n"],Libreville:[1,"n"],Lome:[0,"n"],Luanda:[1,"s"],Lubumbashi:[2,"s"],Lusaka:[2,"s"],Malabo:[1,"n"],Maputo:[2,"s"],Maseru:[2,"s"],Mbabane:[2,"s"],Mogadishu:[3,"n"],Monrovia:[0,"n"],Nairobi:[3,"n"],Ndjamena:[1,"n"],Niamey:[1,"n"],Nouakchott:[0,"n"],Ouagadougou:[0,"n"],"Porto-Novo":[1,"n"],Sao_Tome:[0,"n"],Timbuktu:[0,"n"],Tripoli:[2,"n"],Tunis:[1,"n"],Windhoek:[1,"s","04/02:01->09/03:03"]},America:{Adak:[-9,"n","03/11:02->11/04:02"],Anchorage:[-8,"n","03/11:02->11/04:02"],Anguilla:[-4,"n"],Antigua:[-4,"n"],Araguaina:[-3,"n"],Argentina:[-3,"s"],Aruba:[-4,"n"],Asuncion:[-4,"s","03/24:24->10/07:00"],Atikokan:[-5,"n"],Atka:[-9,"n","03/11:02->11/04:02"],Bahia:[-3,"n"],Bahia_Banderas:[-5,"n","04/01:02->10/28:02"],Barbados:[-4,"n"],Belem:[-3,"n"],Belize:[-6,"n"],"Blanc-Sablon":[-4,"n"],Boa_Vista:[-4,"n"],Bogota:[-5,"n"],Boise:[-6,"n","03/11:02->11/04:02"],Buenos_Aires:[-3,"s"],Cambridge_Bay:[-6,"n","03/11:02->11/04:02"],Campo_Grande:[-4,"s","02/17:24->11/04:00"],Cancun:[-5,"n"],Caracas:[-4,"n"],Catamarca:[-3,"n"],Cayenne:[-3,"n"],Cayman:[-5,"n"],Chicago:[-5,"n","03/11:02->11/04:02"],Chihuahua:[-6,"n","04/01:02->10/28:02"],Coral_Harbour:[-5,"n"],Cordoba:[-3,"s"],Costa_Rica:[-6,"n"],Creston:[-7,"n"],Cuiaba:[-4,"s","02/17:24->11/04:00"],Curacao:[-4,"n"],Danmarkshavn:[0,"n"],Dawson:[-7,"n","03/11:02->11/04:02"],Dawson_Creek:[-7,"n"],Denver:[-6,"n","03/11:02->11/04:02"],Detroit:[-4,"n","03/11:02->11/04:02"],Dominica:[-4,"n"],Edmonton:[-6,"n","03/11:02->11/04:02"],Eirunepe:[-5,"n"],El_Salvador:[-6,"n"],Ensenada:[-7,"n","03/11:02->11/04:02"],Fort_Wayne:[-4,"n","03/11:02->11/04:02"],Fortaleza:[-3,"n"],Glace_Bay:[-3,"n","03/11:02->11/04:02"],Godthab:[-2,"n","03/24:22->10/27:23"],Goose_Bay:[-3,"n","03/11:02->11/04:02"],Grand_Turk:[-4,"n","03/11:02->11/04:02"],Grenada:[-4,"n"],Guadeloupe:[-4,"n"],Guatemala:[-6,"n"],Guayaquil:[-5,"n"],Guyana:[-4,"n"],Halifax:[-3,"n","03/11:02->11/04:02"],Havana:[-4,"n","03/11:00->11/04:01"],Hermosillo:[-7,"n"],Indiana:[-4,"n","03/12:03->11/05:01"],Indianapolis:[-4,"n","03/11:02->11/04:02"],Inuvik:[-6,"n","03/11:02->11/04:02"],Iqaluit:[-4,"n","03/11:02->11/04:02"],Jamaica:[-5,"n"],Jujuy:[-3,"n"],Juneau:[-8,"n","03/11:02->11/04:02"],Kentucky:[-4,"n","03/12:03->11/05:01"],Knox_IN:[-5,"n","03/11:02->11/04:02"],Kralendijk:[-4,"n"],La_Paz:[-4,"s"],Lima:[-5,"s"],Los_Angeles:[-7,"n","03/11:02->11/04:02"],Louisville:[-4,"n","03/11:02->11/04:02"],Lower_Princes:[-4,"n"],Maceio:[-3,"n"],Managua:[-6,"n"],Manaus:[-4,"s"],Marigot:[-4,"n"],Martinique:[-4,"n"],Matamoros:[-5,"n","03/11:02->11/04:02"],Mazatlan:[-6,"n","04/01:02->10/28:02"],Mendoza:[-3,"n"],Menominee:[-5,"n","03/11:02->11/04:02"],Merida:[-5,"n","04/01:02->10/28:02"],Metlakatla:[-8,"n","03/11:02->11/04:02"],Mexico_City:[-5,"n","04/01:02->10/28:02"],Miquelon:[-2,"n","03/11:02->11/04:02"],Moncton:[-3,"n","03/11:02->11/04:02"],Monterrey:[-5,"n","04/01:02->10/28:02"],Montevideo:[-3,"s"],Montreal:[-4,"n","03/11:02->11/04:02"],Montserrat:[-4,"n"],Nassau:[-4,"n","03/11:02->11/04:02"],New_York:[-4,"n","03/11:02->11/04:02"],Nipigon:[-4,"n","03/11:02->11/04:02"],Nome:[-8,"n","03/11:02->11/04:02"],Noronha:[-2,"n"],North_Dakota:[-5,"n","03/12:03->11/05:01"],Ojinaga:[-6,"n","03/11:02->11/04:02"],Panama:[-5,"n"],Pangnirtung:[-4,"n","03/11:02->11/04:02"],Paramaribo:[-3,"n"],Phoenix:[-7,"n"],"Port-au-Prince":[-4,"n","03/11:02->11/04:02"],Port_of_Spain:[-4,"n"],Porto_Acre:[-5,"n"],Porto_Velho:[-4,"n"],Puerto_Rico:[-4,"n"],Punta_Arenas:[-3,"s"],Rainy_River:[-5,"n","03/11:02->11/04:02"],Rankin_Inlet:[-5,"n","03/11:02->11/04:02"],Recife:[-3,"n"],Regina:[-6,"n"],Resolute:[-5,"n","03/11:02->11/04:02"],Rio_Branco:[-5,"n"],Rosario:[-3,"n"],Santa_Isabel:[-7,"n","03/11:02->11/04:02"],Santarem:[-3,"n"],Santiago:[-4,"s","05/12:24->08/12:00"],Santo_Domingo:[-4,"n"],Sao_Paulo:[-3,"s","02/17:24->11/04:00"],Scoresbysund:[0,"n","03/25:00->10/28:01"],Shiprock:[-6,"n","03/11:02->11/04:02"],Sitka:[-8,"n","03/11:02->11/04:02"],St_Barthelemy:[-4,"n"],St_Johns:[-2.5,"n","03/11:02->11/04:02"],St_Kitts:[-4,"n"],St_Lucia:[-4,"n"],St_Thomas:[-4,"n"],St_Vincent:[-4,"n"],Swift_Current:[-6,"n"],Tegucigalpa:[-6,"n"],Thule:[-3,"n","03/11:02->11/04:02"],Thunder_Bay:[-4,"n","03/11:02->11/04:02"],Tijuana:[-7,"n","03/11:02->11/04:02"],Toronto:[-4,"n","03/11:02->11/04:02"],Tortola:[-4,"n"],Vancouver:[-7,"n","03/11:02->11/04:02"],Virgin:[-4,"n"],Whitehorse:[-7,"n","03/11:02->11/04:02"],Winnipeg:[-5,"n","03/11:02->11/04:02"],Yakutat:[-8,"n","03/11:02->11/04:02"],Yellowknife:[-6,"n","03/11:02->11/04:02"]},Antarctica:{Casey:[8,"s"],Davis:[7,"s"],DumontDUrville:[10,"s"],Macquarie:[11,"s"],Mawson:[5,"s"],McMurdo:[12,"s","04/01:03->09/30:02"],Palmer:[-4,"s","05/13:23->08/13:01"],Rothera:[-3,"s"],South_Pole:[12,"s","04/01:03->09/30:02"],Syowa:[3,"s"],Troll:[2,"s","03/25:02->10/28:02"],Vostok:[6,"s"]},Arctic:{Longyearbyen:[2,"n","03/25:02->10/28:03"]},Asia:{Aden:[3,"n"],Almaty:[6,"n"],Amman:[3,"n","03/30:00->10/26:01"],Anadyr:[12,"n"],Aqtau:[5,"n"],Aqtobe:[5,"n"],Ashgabat:[5,"n"],Ashkhabad:[5,"n"],Atyrau:[5,"n"],Baghdad:[3,"n"],Bahrain:[3,"n"],Baku:[5,"n"],Bangkok:[7,"n"],Barnaul:[7,"n"],Beirut:[3,"n","03/25:00->10/27:24"],Bishkek:[6,"n"],Brunei:[8,"n"],Calcutta:[5.5,"n"],Chita:[9,"n"],Choibalsan:[8,"n"],Chongqing:[8,"n"],Chungking:[8,"n"],Colombo:[5.5,"n"],Dacca:[6,"n"],Damascus:[3,"n","03/30:00->10/25:24"],Dhaka:[6,"n"],Dili:[9,"s"],Dubai:[4,"n"],Dushanbe:[5,"n"],Gaza:[3,"n","03/24:01->10/27:01"],Harbin:[8,"n"],Hebron:[3,"n","03/24:01->10/27:01"],Ho_Chi_Minh:[7,"n"],Hong_Kong:[8,"n"],Hovd:[7,"n"],Irkutsk:[8,"n"],Istanbul:[3,"n"],Jakarta:[7,"s"],Jayapura:[9,"n"],Jerusalem:[3,"n","03/23:02->10/28:02"],Kabul:[4.5,"n"],Kamchatka:[12,"n"],Karachi:[5,"n"],Kashgar:[6,"n"],Kathmandu:[5.75,"n"],Katmandu:[5.75,"n"],Khandyga:[9,"n"],Kolkata:[5.5,"n"],Krasnoyarsk:[7,"n"],Kuala_Lumpur:[8,"s"],Kuching:[8,"n"],Kuwait:[3,"n"],Macao:[8,"n"],Macau:[8,"n"],Magadan:[11,"n"],Makassar:[8,"s"],Manila:[8,"n"],Muscat:[4,"n"],Nicosia:[3,"n","03/25:03->10/28:04"],Novokuznetsk:[7,"n"],Novosibirsk:[7,"n"],Omsk:[6,"n"],Oral:[5,"n"],Phnom_Penh:[7,"n"],Pontianak:[7,"n"],Pyongyang:[9,"n"],Qatar:[3,"n"],Qyzylorda:[6,"n"],Rangoon:[6.5,"n"],Riyadh:[3,"n"],Saigon:[7,"n"],Sakhalin:[11,"n"],Samarkand:[5,"n"],Seoul:[9,"n"],Shanghai:[8,"n"],Singapore:[8,"s"],Srednekolymsk:[12,"n"],Taipei:[8,"n"],Tashkent:[5,"n"],Tbilisi:[4,"n"],Tehran:[4.5,"n","03/22:00->09/21:24"],Tel_Aviv:[3,"n","03/23:02->10/28:02"],Thimbu:[6,"n"],Thimphu:[6,"n"],Tokyo:[9,"n"],Ujung_Pandang:[8,"n"],Ulaanbaatar:[8,"n"],Ulan_Bator:[8,"n","03/25:03->09/29:23"],Urumqi:[6,"n"],"Ust-Nera":[10,"n"],Vientiane:[7,"n"],Vladivostok:[10,"n"],Yakutsk:[10,"n"],Yekaterinburg:[5,"n"],Yerevan:[4,"n"]},Atlantic:{Azores:[0,"n","03/25:00->10/28:01"],Bermuda:[-3,"n","03/11:02->11/04:02"],Canary:[1,"n","03/25:01->10/28:02"],Cape_Verde:[-1,"n"],Faeroe:[1,"n","03/25:01->10/28:02"],Faroe:[1,"n","03/25:01->10/28:02"],Jan_Mayen:[2,"n","03/25:02->10/28:03"],Madeira:[1,"n","03/25:01->10/28:02"],Reykjavik:[0,"n"],South_Georgia:[-2,"n"],St_Helena:[0,"n"],Stanley:[-3,"n"]},Australia:{ACT:[10,"s","04/01:03->10/07:02"],Adelaide:[9.5,"s","04/01:03->10/07:02"],Brisbane:[10,"s"],Broken_Hill:[9.5,"s","04/01:03->10/07:02"],Canberra:[10,"s","04/01:03->10/07:02"],Currie:[10,"s","04/01:03->10/07:02"],Darwin:[9.5,"s"],Eucla:[8.75,"s"],Hobart:[10,"s","04/01:03->10/07:02"],LHI:[10.5,"s","04/01:01->10/07:02"],Lindeman:[10,"s"],Lord_Howe:[10.5,"s","04/01:01->10/07:02"],Melbourne:[10,"s","04/01:03->10/07:02"],NSW:[10,"s","04/01:03->10/07:02"],North:[9.5,"s"],Perth:[8,"s"],Queensland:[10,"s"],South:[9.5,"s","04/01:03->10/07:02"],Sydney:[10,"s","04/01:03->10/07:02"],Tasmania:[10,"s","04/01:03->10/07:02"],Victoria:[10,"s","04/01:03->10/07:02"],West:[8,"s"],Yancowinna:[9.5,"s","04/01:03->10/07:02"]},Brazil:{Acre:[-5,"s"],DeNoronha:[-2,"s"],East:[-3,"s","02/17:24->11/04:00"],West:[-4,"s"]},Canada:{Atlantic:[-3,"n","03/11:02->11/04:02"],Central:[-5,"n","03/11:02->11/04:02"],"East-Saskatchewan":[-6,"n"],Eastern:[-4,"n","03/11:02->11/04:02"],Mountain:[-6,"n","03/11:02->11/04:02"],Newfoundland:[-2.5,"n","03/11:02->11/04:02"],Pacific:[-7,"n","03/11:02->11/04:02"],Saskatchewan:[-6,"n"],Yukon:[-7,"n","03/11:02->11/04:02"]},Chile:{Continental:[-4,"s","05/12:24->08/12:00"],EasterIsland:[-6,"s","05/12:22->08/11:22"]},Etc:{GMT:[0,"n"],"GMT+0":[0,"n"],"GMT+1":[-1,"n"],"GMT+10":[-10,"n"],"GMT+11":[-11,"n"],"GMT+12":[-12,"n"],"GMT+2":[-2,"n"],"GMT+3":[-3,"n"],"GMT+4":[-4,"n"],"GMT+5":[-5,"n"],"GMT+6":[-6,"n"],"GMT+7":[-7,"n"],"GMT+8":[-8,"n"],"GMT+9":[-9,"n"],"GMT-0":[0,"n"],"GMT-1":[1,"n"],"GMT-10":[10,"n"],"GMT-11":[11,"n"],"GMT-12":[12,"n"],"GMT-13":[13,"n"],"GMT-14":[14,"n"],"GMT-2":[2,"n"],"GMT-3":[3,"n"],"GMT-4":[4,"n"],"GMT-5":[5,"n"],"GMT-6":[6,"n"],"GMT-7":[7,"n"],"GMT-8":[8,"n"],"GMT-9":[9,"n"],GMT0:[0,"n"],Greenwich:[0,"n"],UCT:[0,"n"],UTC:[0,"n"],Universal:[0,"n"],Zulu:[0,"n"]},Europe:{Amsterdam:[2,"n","03/25:02->10/28:03"],Andorra:[2,"n","03/25:02->10/28:03"],Astrakhan:[4,"n"],Athens:[3,"n","03/25:03->10/28:04"],Belfast:[1,"n","03/25:01->10/28:02"],Belgrade:[2,"n","03/25:02->10/28:03"],Berlin:[2,"n","03/25:02->10/28:03"],Bratislava:[2,"n","03/25:02->10/28:03"],Brussels:[2,"n","03/25:02->10/28:03"],Bucharest:[3,"n","03/25:03->10/28:04"],Budapest:[2,"n","03/25:02->10/28:03"],Busingen:[2,"n","03/25:02->10/28:03"],Chisinau:[3,"n","03/25:02->10/28:03"],Copenhagen:[2,"n","03/25:02->10/28:03"],Dublin:[1,"n","03/25:01->10/28:02"],Gibraltar:[2,"n","03/25:02->10/28:03"],Guernsey:[1,"n","03/25:01->10/28:02"],Helsinki:[3,"n","03/25:03->10/28:04"],Isle_of_Man:[1,"n","03/25:01->10/28:02"],Istanbul:[3,"n"],Jersey:[1,"n","03/25:01->10/28:02"],Kaliningrad:[2,"n"],Kirov:[3,"n"],Kiev:[3,"n","03/25:03->10/28:04"],Lisbon:[1,"n","03/25:01->10/28:02"],Ljubljana:[2,"n","03/25:02->10/28:03"],London:[1,"n","03/25:01->10/28:02"],Luxembourg:[2,"n","03/25:02->10/28:03"],Madrid:[2,"n","03/25:02->10/28:03"],Malta:[2,"n","03/25:02->10/28:03"],Mariehamn:[3,"n","03/25:03->10/28:04"],Minsk:[3,"n"],Monaco:[2,"n","03/25:02->10/28:03"],Moscow:[3,"n"],Nicosia:[3,"n","03/25:03->10/28:04"],Oslo:[2,"n","03/25:02->10/28:03"],Paris:[2,"n","03/25:02->10/28:03"],Podgorica:[2,"n","03/25:02->10/28:03"],Prague:[2,"n","03/25:02->10/28:03"],Riga:[3,"n","03/25:03->10/28:04"],Rome:[2,"n","03/25:02->10/28:03"],Samara:[4,"n"],Saratov:[4,"n"],San_Marino:[2,"n","03/25:02->10/28:03"],Sarajevo:[2,"n","03/25:02->10/28:03"],Simferopol:[3,"n"],Skopje:[2,"n","03/25:02->10/28:03"],Sofia:[3,"n","03/25:03->10/28:04"],Stockholm:[2,"n","03/25:02->10/28:03"],Tallinn:[3,"n","03/25:03->10/28:04"],Tirane:[2,"n","03/25:02->10/28:03"],Tiraspol:[3,"n","03/25:02->10/28:03"],Ulyanovsk:[4,"n"],Uzhgorod:[3,"n","03/25:03->10/28:04"],Vaduz:[2,"n","03/25:02->10/28:03"],Vatican:[2,"n","03/25:02->10/28:03"],Vienna:[2,"n","03/25:02->10/28:03"],Vilnius:[3,"n","03/25:03->10/28:04"],Volgograd:[3,"n"],Warsaw:[2,"n","03/25:02->10/28:03"],Zagreb:[2,"n","03/25:02->10/28:03"],Zaporozhye:[3,"n","03/25:03->10/28:04"],Zurich:[2,"n","03/25:02->10/28:03"]},Indian:{Antananarivo:[3,"s"],Chagos:[6,"n"],Christmas:[7,"n"],Cocos:[6.5,"n"],Comoro:[3,"n"],Kerguelen:[5,"s"],Mahe:[4,"n"],Maldives:[5,"n"],Mauritius:[4,"n"],Mayotte:[3,"n"],Reunion:[4,"s"]},Mexico:{BajaNorte:[-7,"n","03/11:02->11/04:02"],BajaSur:[-6,"n","04/01:02->10/28:02"],General:[-5,"n","04/01:02->10/28:02"]},Pacific:{Apia:[13,"s","04/01:04->09/30:03"],Auckland:[12,"s","04/01:03->09/30:02"],Chatham:[12.75,"s","04/07:03->09/29:02"],Chuuk:[10,"n"],Easter:[-6,"s","05/12:22->08/11:22"],Efate:[11,"n"],Enderbury:[13,"n"],Fakaofo:[13,"n"],Fiji:[12,"s","01/14:03->11/04:02"],Funafuti:[12,"n"],Galapagos:[-6,"n"],Gambier:[-9,"n"],Guadalcanal:[11,"n"],Guam:[10,"n"],Honolulu:[-10,"n"],Johnston:[-10,"n"],Kiritimati:[14,"n"],Kosrae:[11,"n"],Kwajalein:[12,"n"],Majuro:[12,"n"],Marquesas:[-9.5,"n"],Midway:[-11,"n"],Nauru:[12,"n"],Niue:[-11,"n"],Norfolk:[11.5,"n"],Noumea:[11,"n"],Pago_Pago:[-11,"n"],Palau:[9,"n"],Pitcairn:[-8,"n"],Pohnpei:[11,"n"],Ponape:[11,"n"],Port_Moresby:[10,"n"],Rarotonga:[-10,"n"],Saipan:[10,"n"],Samoa:[-11,"n"],Tahiti:[-10,"n"],Tarawa:[12,"n"],Tongatapu:[13,"s","01/15:02->11/05:03"],Truk:[10,"n"],Wake:[12,"n"],Wallis:[12,"n"],Yap:[10,"n"]}}},{}],3:[function(n,t,e){var r,o,a=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function u(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(n){try{return r.call(null,t,0)}catch(n){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(n){r=i}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(n){o=s}}();var c,h=[],d=!1,f=-1;function l(){d&&c&&(d=!1,c.length?h=c.concat(h):f=-1,h.length&&m())}function m(){if(!d){var n=u(l);d=!0;for(var t=h.length;t;){for(c=h,h=[];++f<t;)c&&c[f].run();f=-1,t=h.length}c=null,d=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(n){try{return o.call(null,t)}catch(n){return o.call(this,t)}}}(n)}}function p(n,t){this.fun=n,this.array=t}function y(){}a.nextTick=function(n){var t=new Array(arguments.length-1);if(1<arguments.length)for(var e=1;e<arguments.length;e++)t[e-1]=arguments[e];h.push(new p(n,t)),1!==h.length||d||u(m)},p.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=y,a.addListener=y,a.once=y,a.off=y,a.removeListener=y,a.removeAllListeners=y,a.emit=y,a.prependListener=y,a.prependOnceListener=y,a.listeners=function(n){return[]},a.binding=function(n){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(n){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},{}],4:[function(n,t,e){t.exports={name:"spacetime",version:"4.5.1",description:"represent dates in remote timezones",main:"./spacetime.js",license:"Apache-2.0",scripts:{precommit:"lint-staged",build:"node ./scripts/build.js","build:tz":"node ./scripts/updateZonefile.js",demo:"node ./scripts/demo.js",watch:"amble ./scratch.js",test:"TESTENV=dev tape ./test/**/*.test.js | tap-dancer","test-spec":"TESTENV=dev tape ./test/**/*.test.js | tap-spec",t:"TESTENV=dev tape ./test/**/immutable.test.js",testb:"TESTENV=prod tape ./test/**/*.test.js | tap-dancer",lint:"eslint .",size:"./node_modules/.bin/size-limit",coverage:"node ./scripts/coverage.js"},repository:{type:"git",url:"https://github.com/smallwins/spacetime.git"},files:["spacetime.js","immutable.js"],dependencies:{},devDependencies:{amble:"0.0.6","babel-cli":"6.26.0","babel-preset-env":"1.7.0",babelify:"8.0.0",browserify:"16.2.3",derequire:"2.0.6",eslint:"5.6.1",nyc:"13.0.1",shelljs:"0.8.2","tap-dancer":"0.0.3","tap-spec":"^5.0.0",tape:"4.9.1",timekeeper:"2.1.2","uglify-js":"3.4.9"},"size-limit":[{path:"./spacetime.js",limit:"16 KB"}]}},{}],5:[function(n,t,e){"use strict";var r=["sun","mon","tue","wed","thu","fri","sat"],o=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];t.exports={short:function(){return r},long:function(){return o},set:function(n){r=n.short,o=n.long}}},{}],6:[function(n,t,e){"use strict";var r={millisecond:1,second:1e3,minute:6e4,hour:36e5,day:864e5,date:864e5,month:25488e5,week:6048e5,year:3154e7};Object.keys(r).forEach(function(n){r[n+"s"]=r[n]}),t.exports=r},{}],7:[function(n,t,e){"use strict";t.exports=[31,28,31,30,31,30,31,31,30,31,30,31]},{}],8:[function(n,t,e){"use strict";var r=["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"],o=["january","february","march","april","may","june","july","august","september","october","november","december"];t.exports={short:function(){return r},long:function(){return o},mapping:function(){return function(){for(var n={},t=0;t<r.length;t++)n[r[t]]=t;for(var e=0;e<o.length;e++)n[o[e]]=e;return n}()},set:function(n){r=n.short,o=n.long}}},{}],9:[function(n,t,e){"use strict";t.exports=[null,[0,1],[3,1],[6,1],[9,1]]},{}],10:[function(n,t,e){"use strict";t.exports={north:[["spring",2,1],["summer",5,1],["fall",8,1],["autumn",8,1],["winter",11,1]],south:[["fall",2,1],["autumn",2,1],["winter",5,1],["spring",8,1],["summer",11,1]]}},{}],11:[function(n,t,e){"use strict";var s=n("./spacetime");e.whereIts=function(n,t){var r=new s(null),o=new s(null);r.time(n),t?o.time(t):o=r.clone().add(59,"minutes");var a=r.hour(),i=o.hour();return Object.keys(r.timezones).filter(function(n){var t=new s(null,n),e=t.hour();return a<=e&&e<=i&&(!(e===a&&t.minute()<r.minute())&&!(e===i&&t.minute()>o.minute()))})}},{"./spacetime":37}],12:[function(n,t,e){"use strict";e.isLeapYear=function(n){return n%4==0&&n%100!=0||n%400==0},e.isDate=function(n){return"[object Date]"===Object.prototype.toString.call(n)&&!isNaN(n.valueOf())},e.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)},e.isObject=function(n){return"[object Object]"===Object.prototype.toString.call(n)},e.zeroPad=function(n,t){return(n+="").length>=(t=t||2)?n:new Array(t-n.length+1).join("0")+n},e.titleCase=function(n){return n?n[0].toUpperCase()+n.substr(1).toLowerCase():""},e.ordinal=function(n){var t=n%10,e=n%100;return 1===t&&11!==e?n+"st":2===t&&12!==e?n+"nd":3===t&&13!==e?n+"rd":n+"th"},e.toCardinal=function(n){return n=(n=String(n)).replace(/([0-9])(st|nd|rd|th)$/i,"$1"),parseInt(n,10)},e.normalize=function(n){return"day"===(n=(n=n.toLowerCase()).replace(/s$/,""))?"date":n},e.getEpoch=function(n){return"number"==typeof n?n:e.isDate(n)?n.getTime():n.epoch?n.epoch:null},e.beADate=function(n,t){return!1===e.isObject(n)?t.clone().set(n):n}},{}],13:[function(n,t,e){"use strict";var r=n("./spacetime"),o=n("./findTz").whereIts,a=n("../package.json"),i=function(n,t,e){return new r(n,t,e)};i.now=function(n,t){return new r((new Date).getTime(),n,t)},i.today=function(n,t){return new r((new Date).getTime(),n,t).startOf("day")},i.tomorrow=function(n,t){return new r((new Date).getTime(),n,t).add(1,"day").startOf("day")},i.yesterday=function(n,t){return new r((new Date).getTime(),n,t).subtract(1,"day").startOf("day")},i.extend=function(t){return Object.keys(t).forEach(function(n){r.prototype[n]=t[n]}),this},i.whereIts=o,i.version=a.version,i.plugin=i.extend,t.exports=i},{"../package.json":4,"./findTz":11,"./spacetime":37}],14:[function(n,t,e){"use strict";var r=n("../data/monthLengths"),o=n("../fns").isLeapYear;t.exports=function(n){if(!0!==r.hasOwnProperty(n.month))return!1;if(1===n.month)return!!(o(n.year)&&n.date<=29)||n.date<=28;var t=r[n.month]||0;return n.date<=t}},{"../data/monthLengths":7,"../fns":12}],15:[function(n,t,e){"use strict";var a=n("./strParse"),i=n("../fns"),s=n("./named-dates");t.exports=function(n,t,e){if("number"!=typeof t){if(n.epoch=Date.now(),null!=t)if(!0!==i.isDate(t))if(!0!==i.isArray(t)){if(!0===i.isObject(t))return t.epoch?void(n.epoch=t.epoch):void function(n,t){for(var e=Object.keys(t),r=0;r<e.length;r++){var o=e[r];if(void 0!==n[o]){var a=t[o]||0;n[o](a)}}}(n,t);if("string"==typeof t)if(t=t.trim().replace(/ +/g," "),!0!==s.hasOwnProperty(t)){for(var r=0;r<a.length;r++){var o=t.match(a[r].reg);if(o)return void a[r].parse(n,o,e)}!1===n.silent&&console.warn("Warning: couldn't parse date-string: '"+t+"'"),n.epoch=null}else n=s[t](n)}else!function(n,t){for(var e=["year","month","date","hour","minute","second","millisecond"],r=0;r<t.length;r++){var o=t[r]||0;n[e[r]](o)}}(n,t);else n.epoch=t.getTime()}else 0<(n.epoch=t)&&t<25e8&&!1===n.silent&&(console.warn("  - Warning: You are setting the date to January 1970."),console.warn("       -   did input seconds instead of milliseconds?"))}},{"../fns":12,"./named-dates":16,"./strParse":18}],16:[function(n,t,e){"use strict";var r={now:function(n){return n.epoch=Date.now(),n},tonight:function(n){return n.epoch=Date.now(),n.hour(18),n},today:function(n){return n.epoch=Date.now(),n},tomorrow:function(n){return n.epoch=Date.now(),n.add(1,"day"),n.startOf("day"),n},yesterday:function(n){return n.epoch=Date.now(),n.subtract(1,"day"),n.startOf("day"),n},christmas:function(n){var t=(new Date).getFullYear();return n.set([t,11,25,18,0,0]),n},"new years":function(n){var t=(new Date).getFullYear();return n.set([t,11,31,18,0,0]),n}};r["new years eve"]=r["new years"],t.exports=r},{}],17:[function(n,t,e){(function(i){"use strict";t.exports=function(n,t,e){if(!t)return n;"Z"===t&&(t="+0000"),!0===/:00/.test(t)&&(t=t.replace(/:00/,"")),!0===/:00/.test(t)&&(t=t.replace(/:00/,".5"));var r=parseInt(t,10);if(100<Math.abs(r)&&(r/=100),n.timezone().current.offset===r)return n;0<=(r*=-1)&&(r="+"+r);var o="Etc/GMT"+r,a=n.timezones;return a[o]&&(e&&a[e]&&a[e].o!==a[o].o&&!1===n.silent&&void 0!==i&&i.env&&!i.env.TESTENV&&(console.warn("  - Setting timezone to: '"+o+"'"),console.warn("     from ISO string '"+t+"'"),console.warn("     overwriting given timezone: '"+e+"'\n")),n.tz=o),n}}).call(this,n("_process"))},{_process:3}],18:[function(n,t,e){"use strict";var i=n("../methods/set/walk"),o=n("../data/months"),s=n("./parseOffset"),u=n("./hasDate"),a=n("../fns"),c=function(n,t){var e=(t=t.replace(/^\s+/,"")).match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);e&&(n.hour(e[1]),n.minute(e[2]),e[3]&&n.seconds(e[3]),e[4]&&n.millisecond(e[4]))},h=function(n){n=n||"";var t=parseInt(n.trim(),10);return t=t||(new Date).getFullYear()},r=[{reg:/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,parse:function(n,t,e,r){var o=parseInt(t[2],10)-1,a={year:t[1],month:o,date:t[3]};!1!==u(a)?(s(n,t[5],e,r),i(n,a),c(n,t[4])):n.epoch=null}},{reg:/^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,parse:function(n,t){var e={year:t[1],month:parseInt(t[2],10)-1,date:parseInt(t[3],10)};12<=e.month&&(e.date=parseInt(t[2],10),e.month=parseInt(t[3],10)-1),!1!==u(e)?i(n,e):n.epoch=null}},{reg:/^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,parse:function(n,t){var e=parseInt(t[1],10)-1,r=parseInt(t[2],10);12<=e&&(e=parseInt(t[2],10)-1,r=parseInt(t[1],10));var o={year:t[3]||(new Date).getFullYear(),month:e,date:r};!1!==u(o)?i(n,o):n.epoch=null}},{reg:/^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,parse:function(n,t){var e=o.mapping()[t[1].toLowerCase()],r={year:h(t[3]),month:e,date:a.toCardinal(t[2]||"")};!1!==u(r)?(i(n,r),t[4]&&c(n,t[4])):n.epoch=null}},{reg:/^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,parse:function(n,t){var e=o.mapping()[t[2].toLowerCase()],r={year:h(t[3]),month:e,date:a.toCardinal(t[1])};!1!==u(r)?i(n,r):n.epoch=null}},{reg:/^[0-9]{4}$/i,parse:function(n,t){var e=h(t[0]),r=new Date,o={year:e,month:r.getMonth(),date:r.getDate()};!1!==u(o)?i(n,o):n.epoch=null}},{reg:/^[0-9,]+ ?b\.?c\.?$/i,parse:function(n,t){var e=t[0]||"";e=(e=e.replace(/^([0-9,]+) ?b\.?c\.?$/i,"-$1")).replace(/,/g,"");var r=parseInt(e.trim(),10),o=new Date,a={year:r,month:o.getMonth(),date:o.getDate()};!1!==u(a)?i(n,a):n.epoch=null}}];t.exports=r},{"../data/months":8,"../fns":12,"../methods/set/walk":34,"./hasDate":14,"./parseOffset":17}],19:[function(n,t,e){"use strict";var r=n("./methods/format"),o=n("./methods/progress"),a=n("./methods/nearest"),i=n("./methods/diff"),s=n("./methods/since"),u=n("./methods/startOf"),c=n("./timezone/index"),h=n("./input"),d=n("./fns"),f={set:function(n){return h(this,n),this},timezone:function(){return c(this)},isDST:function(){return c(this).current.isDST},hasDST:function(){return c(this).hasDst},offset:function(){return c(this).current.offset/60},hemisphere:function(){return c(this).hemisphere},format:function(n){return r(this,n)},startOf:function(n){return u.startOf(this,n)},endOf:function(n){return u.endOf(this,n)},leapYear:function(){var n=this.year();return d.isLeapYear(n)},progress:function(){return o(this)},nearest:function(n){return a(this,n)},diff:function(n,t){return i(this,n,t)},since:function(n){return n||(n=this.clone().set()),s(this,n)},isValid:function(){return!(!this.epoch&&0!==this.epoch)&&!isNaN(this.d.getTime())},goto:function(n){return this.tz=n,this},isAwake:function(){var n=this.hour();return!(n<8||22<n)},isAsleep:function(){return!this.isAwake()},log:function(){return console.log(""),console.log(r(this,"nice-short")),this},logYear:function(){return console.log(""),console.log(r(this,"full-short")),this},debug:function(){var n=this.timezone(),t=this.format("MM")+" "+this.format("date-ordinal")+" "+this.year();return t+="\n     - "+this.format("time"),console.log("\n\n",t+"\n     - "+n.name+" ("+n.current.offset+")"),this}};f.inDST=f.isDST,f.round=f.nearest,t.exports=f},{"./fns":12,"./input":15,"./methods/diff":22,"./methods/format":23,"./methods/nearest":26,"./methods/progress":27,"./methods/since":35,"./methods/startOf":36,"./timezone/index":39}],20:[function(n,t,e){"use strict";var a=n("./set/walk"),i=n("../data/milliseconds"),s=n("../data/monthLengths"),u=n("../fns"),r=["millisecond","second","minute","hour","date","month"],c={second:r.slice(0,1),minute:r.slice(0,2),quarterhour:r.slice(0,2),hour:r.slice(0,3),date:r.slice(0,4),month:r.slice(0,4),quarter:r.slice(0,4),season:r.slice(0,4),year:r};c.week=c.date,c.season=c.date,c.quarter=c.date;var h={month:!0,quarter:!0,season:!0,year:!0};t.exports=function(n){n.prototype.add=function(n,t){var e=this.clone();t=u.normalize(t),i[t]?this.epoch+=i[t]*n:"week"===t?this.epoch+=i.day*(7*n):"quarter"===t||"season"===t?this.epoch+=i.month*(4*n):"season"===t?this.epoch+=i.month*(4*n):"quarterhour"===t&&(this.epoch+=15*i.minute);var r={};if(c[t]&&c[t].forEach(function(n){r[n]=e[n]()}),"month"===t?(r.month=e.month()+n,r=function(n,t){if(0<n.month){var e=parseInt(n.month/12,10);n.year=t.year()+e,n.month=n.month%12}else if(n.month<0){var r=Math.floor(Math.abs(n.month)/13,10);r=Math.abs(r)+1,n.year=t.year()-r,n.month=n.month%12,n.month=n.month+12,12===n.month&&(n.month=0)}return n}(r,e)):"date"===t&&0!==n&&e.isSame(this,"day")?r.date=e.date()+n:"year"===t&&this.year()===e.year()&&(this.epoch+=i.week),h[t]){var o=s[r.month];r.date=e.date(),r.date>o&&(r.date=o)}return a(this,r),this},n.prototype.subtract=function(n,t){return this.add(-1*n,t),this},n.prototype.minus=n.prototype.subtract,n.prototype.plus=n.prototype.add}},{"../data/milliseconds":6,"../data/monthLengths":7,"../fns":12,"./set/walk":34}],21:[function(n,t,e){"use strict";var o=n("../fns");t.exports=function(t){var e={isAfter:function(n){n=o.beADate(n,this);var t=o.getEpoch(n);return null===t?null:this.epoch>t},isBefore:function(n){n=o.beADate(n,this);var t=o.getEpoch(n);return null===t?null:this.epoch<t},isEqual:function(n){n=o.beADate(n,this);var t=o.getEpoch(n);return null===t?null:this.epoch===t},isBetween:function(n,t){n=o.beADate(n,this),t=o.beADate(t,this);var e=o.getEpoch(n);if(null===e)return null;var r=o.getEpoch(t);return null===r?null:e<this.epoch&&this.epoch<r}};Object.keys(e).forEach(function(n){t.prototype[n]=e[n]})}},{"../fns":12}],22:[function(n,t,e){"use strict";var r=n("../fns"),o=function(){},a=function(n,t,e){var r=0;for(n=n.clone();n.isBefore(t);)n.add(1,e),r+=1;return n.isSame(t,e)||(r-=1),r},i=function(n,t){var e=t.epoch-n.epoch,r={milliseconds:e,seconds:parseInt(e/1e3,10)};return r.minutes=parseInt(r.seconds/60,10),r.hours=parseInt(r.minutes/60,10),r},s=function(n,t,e){return t=r.beADate(t,n),e?(e=r.normalize(e),!0!==/s$/.test(e)&&(e+="s"),"milliseconds"===e||"seconds"===e||"minutes"===e?i(n,t)[e]:n.isBefore(t)?a(n,t,e):-1*a(t,n,e)):o(n,t)};o=function(n,t){var e=i(n,t);return e.years=s(n,t,"year"),e.months=s(n,t,"month"),e.weeks=s(n,t,"week"),e.days=s(n,t,"day"),0===e.years&&(e.hours=s(n,t,"hour")),e},t.exports=s},{"../fns":12}],23:[function(n,t,e){"use strict";var h=n("../../fns"),r=n("../../data/months"),o=n("../../data/days"),a=n("./unixFmt"),i={day:function(n){return h.titleCase(o.long()[n.day()])},"day-short":function(n){return h.titleCase(o.short()[n.day()])},date:function(n){return""+n.date()},"date-ordinal":function(n){return h.ordinal(n.date())},month:function(n){return h.titleCase(r.long()[n.month()])},"month-short":function(n){return h.titleCase(r.short()[n.month()])},time:function(n){return n.h12()+":"+h.zeroPad(n.minute())+n.ampm()},"time-24h":function(n){return n.hour()+":"+h.zeroPad(n.minute())},year:function(n){var t=n.year();return t<0?(t=Math.abs(t),t+" BC"):""+t},"year-short":function(n){return"'"+(""+n.year()).substr(2,4)},"numeric-us":function(n){return h.zeroPad(n.month()+1)+"/"+h.zeroPad(n.date())+"/"+n.year()},"numeric-uk":function(n){return h.zeroPad(n.date())+"/"+h.zeroPad(n.month()+1)+"/"+n.year()},"numeric-cn":function(n){return n.year()+"/"+h.zeroPad(n.month()+1)+"/"+h.zeroPad(n.date())},iso:function(n){var t,e,r=h.zeroPad(n.month()+1),o=h.zeroPad(n.date()),a=h.zeroPad(n.h24()),i=h.zeroPad(n.minute()),s=h.zeroPad(n.second()),u=h.zeroPad(n.millisecond(),3),c=(t=n.timezone().current.offset,e="00",t%1==.5&&(e="30",t=Math.floor(t)),"+00:00"==(t=(t=t<0?(t*=-1,"-"+(t=h.zeroPad(t,2))):"+"+(t=h.zeroPad(t,2)))+":"+e)&&(t="Z"),t);return n.year()+"-"+r+"-"+o+"T"+a+":"+i+":"+s+"."+u+c},"iso-short":function(n){var t=h.zeroPad(n.month()+1),e=h.zeroPad(n.date());return n.year()+"-"+t+"-"+e},"iso-utc":function(n){return new Date(n.epoch).toISOString()},nice:function(n){return i.month(n)+" "+i["date-ordinal"](n)+", "+i.time(n)},"nice-day":function(n){return i.day(n)+" "+i.month(n)+" "+i["date-ordinal"](n)+", "+i.time(n)},"nice-short":function(n){return i["month-short"](n)+" "+i["date-ordinal"](n)+", "+i.time(n)},full:function(n){return i.day(n)+" "+i.month(n)+" "+i["date-ordinal"](n)+", "+n.year()},"full-short":function(n){return i["day-short"](n)+" "+i["month-short"](n)+" "+i["date-ordinal"](n)+", "+n.year()}};i.ordinal=i["date-ordinal"],i["date-short"]=i.date,i["time-12h"]=i.time,i["time-12"]=i.time,i["time-h12"]=i["time-12h"],i["time-h24"]=i["time-24h"],i["time-24"]=i["time-24h"],i.numeric=i["numeric-us"],i.mdy=i["numeric-us"],i.dmy=i["numeric-uk"],i.ymd=i["numeric-cn"],i["little-endian"]=i["numeric-uk"],i["big-endian"]=i["numeric-cn"];t.exports=function(e,n){return!0!==e.isValid()?"":i&&i[n]?i[n](e):"string"==typeof n?a(n,e):Object.keys(i).reduce(function(n,t){return n[t]=i[t](e),n},{})}},{"../../data/days":5,"../../data/months":8,"../../fns":12,"./unixFmt":24}],24:[function(n,t,e){"use strict";var r=n("../../fns").zeroPad,i={G:function(n){return n.era()},GG:function(n){return n.era()},GGG:function(n){return n.era()},GGGG:function(n){return"AD"===n.era()?"Anno Domini":"Before Christ"},y:function(n){return n.year()},yy:function(n){return parseInt(String(n.year()).substr(2,4),10)},yyy:function(n){return n.year()},yyyy:function(n){return n.year()},yyyyy:function(n){return"0"+n.year()},Q:function(n){return n.quarter()},QQ:function(n){return n.quarter()},QQQ:function(n){return n.quarter()},QQQQ:function(n){return n.quarter()},M:function(n){return n.month()+1},MM:function(n){return r(n.month()+1)},MMM:function(n){return n.format("month-short")},MMMM:function(n){return n.format("month")},w:function(n){return n.week()},ww:function(n){return r(n.week())},d:function(n){return n.date()},dd:function(n){return r(n.date())},D:function(n){return n.dayOfYear()},DD:function(n){return r(n.dayOfYear())},DDD:function(n){return r(n.dayOfYear(),3)},E:function(n){return n.format("day-short")},EE:function(n){return n.format("day-short")},EEE:function(n){return n.format("day-short")},EEEE:function(n){return n.format("day")},EEEEE:function(n){return n.format("day")[0]},e:function(n){return n.day()},ee:function(n){return n.day()},eee:function(n){return n.format("day-short")},eeee:function(n){return n.format("day")},eeeee:function(n){return n.format("day")[0]},a:function(n){return n.ampm().toUpperCase()},aa:function(n){return n.ampm().toUpperCase()},aaa:function(n){return n.ampm().toUpperCase()},aaaa:function(n){return n.ampm().toUpperCase()},h:function(n){return n.h12()},hh:function(n){return r(n.h12())},H:function(n){return n.hour()},HH:function(n){return r(n.hour())},m:function(n){return n.minute()},mm:function(n){return r(n.minute())},s:function(n){return n.second()},ss:function(n){return r(n.second())},A:function(n){return n.epoch-n.startOf("day").epoch},z:function(n){return n.tz},zz:function(n){return n.tz},zzz:function(n){return n.tz},zzzz:function(n){return n.tz},Z:function(n){return n.timezone().current.offset+"00"},ZZ:function(n){return n.timezone().current.offset+"00"},ZZZ:function(n){return n.timezone().current.offset+"00"},ZZZZ:function(n){return n.timezone().current.offset+":00"}},o=function(n,t,e){for(var r=n,o=t,a=0;a<e;a+=1)i[r]=i[o],r+=n,o+=t};o("q","Q",4),o("L","M",4),o("Y","y",4),o("c","e",4),o("k","H",2),o("K","h",2),o("S","s",2),o("v","z",4),o("V","Z",4);t.exports=function(n,e){for(var t=n.split(""),r=[t[0]],o=!1,a=1;a<t.length;a+=1){if("'"===t[a]){if(!0!=(o=!o)||!t[a+1]||"'"!==t[a+1])continue;o=!0}!0===o||t[a]===r[r.length-1][0]?r[r.length-1]+=t[a]:r.push(t[a])}return r.reduce(function(n,t){return void 0!==i[t]?n+=i[t](e)||"":n+=t,n},"")}},{"../../fns":12}],25:[function(n,t,e){"use strict";var r=n("../fns"),o=n("../data/days"),a=n("../data/months");t.exports=function(t){var e={i18n:function(n){if(!(r.isObject(n)&&r.isObject(n.days)&&r.isObject(n.months)&&r.isArray(n.days.short)&&r.isArray(n.days.long)&&r.isArray(n.months.short)&&r.isArray(n.months.long)))throw new Error("Invalid i18n payload passed.");o.set(n.days),a.set(n.months)}};Object.keys(e).forEach(function(n){t.prototype[n]=e[n]})}},{"../data/days":5,"../data/months":8,"../fns":12}],26:[function(n,t,e){"use strict";t.exports=function(n,t){t=(t=t.toLowerCase()).replace(/s$/,"");var e=n.progress();return void 0!==e[t]?(.5<e[t]&&n.add(1,t),n.startOf(t)):console.warn("no known unit '"+t+"'"),n}},{}],27:[function(n,t,e){"use strict";t.exports=function(o){var a={};return["year","season","quarter","month","week","day","quarterHour","hour","minute"].forEach(function(n){var t=o.clone().startOf(n),e=o.clone().endOf(n).epoch-t.epoch,r=(o.epoch-t.epoch)/e;a[n]=parseFloat(r.toFixed(2))}),a}},{}],28:[function(n,t,e){"use strict";var o=n("../../data/quarters"),a=n("../../data/seasons"),i=n("../set/set"),s=function(n){n.minute(0),n.second(0),n.millisecond(1)};t.exports={time:function(n){return void 0!==n?(this.epoch=i.time(this,n),this):this.format("time-h12")},week:function(n){if(void 0!==n)return this.month(0),this.date(1),this.day("monday"),s(this),"december"===this.monthName()&&this.add(1,"week"),n-=1,this.add(n,"weeks"),this;var t=this.clone();t.month(0),t.date(1),s(t),t.day("monday"),"december"===t.monthName()&&t.add(1,"week");var e=this.epoch;if(t.epoch>e)return 1;for(var r=0;r<52;r++){if(t.epoch>e)return r;t.add(1,"week")}return 52},quarter:function(n){if(void 0!==n&&("string"==typeof n&&(n=n.replace(/^q/i,""),n=parseInt(n,10)),o[n])){var t=o[n][0];return this.month(t),this.date(1),this.hour(0),s(this),this}for(var e=this.d.getMonth(),r=1;r<o.length;r++)if(e<o[r][0])return r-1;return 4},hourFloat:function(n){if(void 0!==n){var t=n%1;t*=60;var e=parseInt(n,10);return this.epoch=i.hours(this,e),this.epoch=i.minutes(this,t),this}var r=this.d,o=r.getHours(),a=r.getMinutes();return o+(a/=60)},season:function(n){var t="north";if("South"===this.timezone().hemisphere&&(t="south"),void 0!==n){for(var e=0;e<a[t].length;e++)n===a[t][e][0]&&(this.month(a[t][e][1]),this.date(1),this.hour(0),s(this));return this}for(var r=this.d.getMonth(),o=0;o<a[t].length-1;o++)if(r>=a[t][o][1]&&r<a[t][o+1][1])return a[t][o][0];return"winter"}}},{"../../data/quarters":9,"../../data/seasons":10,"../set/set":33}],29:[function(n,t,e){"use strict";var r=n("./normal"),o=n("./destructive"),a=n("./tricky");t.exports=function(t){Object.keys(r).forEach(function(n){t.prototype[n]=r[n]}),Object.keys(o).forEach(function(n){t.prototype[n]=o[n]}),Object.keys(a).forEach(function(n){t.prototype[n]=a[n]})}},{"./destructive":28,"./normal":30,"./tricky":31}],30:[function(n,t,e){"use strict";var a=n("../set/set"),r=n("../set/walk"),o={millisecond:function(n){return void 0!==n?(this.epoch=a.milliseconds(this,n),this):this.d.getMilliseconds()},second:function(n){return void 0!==n?(this.epoch=a.seconds(this,n),this):this.d.getSeconds()},minute:function(n){return void 0!==n?(this.epoch=a.minutes(this,n),this):this.d.getMinutes()},hour:function(n){var t=this.d;return void 0!==n?(this.epoch=a.hours(this,n),r(this,{hour:n}),this):t.getHours()},hour12:function(n){var t=this.d;if(void 0!==n){var e=(n=""+n).match(/^([0-9]+)(am|pm)$/);if(e){var r=parseInt(e[1],10);"pm"===e[2]&&(r+=12),this.epoch=a.hours(this,r)}return this}var o=t.getHours();return 12<o&&(o-=12),0===o&&(o=12),o},date:function(n){return void 0!==n?(this.epoch=a.date(this,n),this):this.d.getDate()},month:function(n){return void 0!==n?(this.epoch=a.month(this,n),this):this.d.getMonth()},year:function(n){return void 0!==n?(this.epoch=a.year(this,n),this):this.d.getFullYear()},dayTime:function(n){if(void 0!==n){var t={morning:"7:00am",breakfast:"7:00am",noon:"12:00am",lunch:"12:00pm",afternoon:"2:00pm",evening:"6:00pm",dinner:"6:00pm",night:"11:00pm",midnight:"23:59pm"};return t[n=(n=n||"").toLowerCase()]&&this.time(t[n]),this}var e=this.hour();return e<6?"night":e<12?"morning":e<17?"afternoon":e<22?"evening":"night"},dayOfYear:function(n){if(void 0!==n)return this.epoch=a.dayOfYear(this,n),this;for(var t=0,e=this.d.getMonth(),r=void 0,o=1;o<=e;o++)(r=new Date).setDate(1),r.setYear(this.d.getFullYear()),r.setHours(1),r.setMinutes(1),r.setMonth(o),r.setHours(-2),t+=r.getDate();return t+this.d.getDate()},era:function(n){if(void 0===n)return this.d.getFullYear()<0?"BC":"AD";n=n.toLowerCase();var t=this.d.getFullYear();return"bc"===n&&0<t&&(this.epoch=a.year(this,-1*t)),"ad"===n&&t<0&&(this.epoch=a.year(this,-1*t)),this},from:function(n){return(n=this.clone().set(n)).since(this)},fromNow:function(){return this.clone().set(Date.now()).since(this)}};o.milliseconds=o.millisecond,o.seconds=o.second,o.minutes=o.minute,o.hours=o.hour,o.hour24=o.hour,o.h12=o.hour12,o.h24=o.hour24,o.days=o.day,t.exports=o},{"../set/set":33,"../set/walk":34}],31:[function(n,t,e){"use strict";var i=n("../../data/days"),r=n("../../data/months"),s=n("../set/walk");t.exports={day:function(n){if(void 0===n)return this.d.getDay();var t=this.clone(),e=n;"string"==typeof n&&(n=n.toLowerCase(),-1===(e=i.short().indexOf(n))&&(e=i.long().indexOf(n)));var r=this.d.getDay(),o=r-e,a=this.subtract(24*o,"hours");return s(a,{hour:t.hour(),minute:t.minute(),second:t.second()}),this.epoch=a.epoch,a},ampm:function(n){var t="am";return 12<=this.hour()&&(t="pm"),void 0===n?t:(n===t||("am"===n?this.subtract(12,"hours"):this.add(12,"hours")),this)},dayName:function(n){return void 0===n?i.long()[this.day()]:(this.day(n),this)},monthName:function(n){return void 0===n?r.long()[this.month()]:(this.month(n),this)}}},{"../../data/days":5,"../../data/months":8,"../set/walk":34}],32:[function(n,t,e){"use strict";var r={millisecond:function(n){return n.epoch},second:function(n){return[n.year(),n.month(),n.date(),n.hour(),n.minute(),n.second()].join("-")},minute:function(n){return[n.year(),n.month(),n.date(),n.hour(),n.minute()].join("-")},hour:function(n){return[n.year(),n.month(),n.date(),n.hour()].join("-")},day:function(n){return[n.year(),n.month(),n.date()].join("-")},week:function(n){return[n.year(),n.week()].join("-")},month:function(n){return[n.year(),n.month()].join("-")},quarter:function(n){return[n.year(),n.quarter()].join("-")},year:function(n){return n.year()}};r.date=r.day;t.exports=function(e){e.prototype.isSame=function(n,t){return"string"!=typeof n&&"number"!=typeof n||(n=new e(n,this.timezone.name)),t=t.replace(/s$/,""),r[t]?r[t](this)===r[t](n):null}}},{}],33:[function(n,t,e){"use strict";var o=n("../../data/milliseconds"),r=n("../../data/months"),a=n("../../data/monthLengths"),i=n("./walk"),s=function(n){return"string"==typeof n&&(n=parseInt(n,10)),n},u=["year","month","date","hour","minute","second","millisecond"],c=function(n,t,e){for(var r=u.indexOf(e),o=u.slice(r,u.length),a=0;a<o.length;a++){var i=t[o[a]]();n[o[a]](i)}return n};t.exports={milliseconds:function(n,t){t=s(t);var e=n.millisecond()-t;return n.epoch-e},seconds:function(n,t){t=s(t);var e=(n.second()-t)*o.second;return n.epoch-e},minutes:function(n,t){t=s(t);var e=n.clone(),r=(n.minute()-t)*o.minute;return n.epoch-=r,c(n,e,"second"),n.epoch},hours:function(n,t){t=s(t);var e=n.clone(),r=(n.hour()-t)*o.hour;return n.epoch-=r,c(n,e,"minute"),n.epoch},time:function(n,t){var e=t.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);if(!e){if(!(e=t.match(/([0-9]{1,2})(am|pm)/)))return n.epoch;e.splice(2,0,"0")}var r=!1,o=parseInt(e[1],10),a=parseInt(e[2],10);return 12<o&&(r=!0),!1===r&&("am"===e[3]&&12===o&&(o=0),"pm"===e[3]&&o<12&&(o+=12)),n.hour(o),n.minute(a),n.second(0),n.millisecond(0),n.epoch},date:function(n,t){return t=s(t),i(n,{date:t}),n.epoch},month:function(n,t){"string"==typeof t&&(t=r.mapping()[t.toLowerCase()]),t=s(t);var e=n.date();return e>a[t]&&(e=a[t]),i(n,{month:t,date:e}),n.epoch},year:function(n,t){return t=s(t),i(n,{year:t}),n.epoch},dayOfYear:function(n,t){t=s(t);var e=n.clone(),r=(t-n.dayOfYear())*o.day;return n.epoch+=r,c(n,e,"hour"),n.epoch}}},{"../../data/milliseconds":6,"../../data/monthLengths":7,"../../data/months":8,"./walk":34}],34:[function(n,t,e){"use strict";var h=n("../../data/milliseconds"),r=function(n,t,e,r,o){var a=n.d[e]();if(a!==t){var i=null===o?null:n.d[o](),s=n.epoch,u=t-a;n.epoch+=h[r]*u;for(var c=h[r]/2;n.d[e]()<t;)n.epoch+=c;for(;n.d[e]()>t;)n.epoch-=c;null!==o&&i!==n.d[o]()&&(n.epoch=s)}},s={year:{valid:function(n){return-4e3<n&&n<4e3},walkTo:function(n,t){return r(n,t,"getFullYear","year",null)}},month:{valid:function(n){return 0<=n&&n<=11},walkTo:function(n,t){var e=n.d.getMonth(),r=n.epoch,o=n.d.getYear();if(e!==t){var a=t-e;for(n.epoch+=h.day*(28*a),o!==n.d.getYear()&&(n.epoch=r);n.d.getMonth()<t;)n.epoch+=h.day;for(;n.d.getMonth()>t;)n.epoch-=h.day}}},date:{valid:function(n){return 0<n&&n<=31},walkTo:function(n,t){return r(n,t,"getDate","day","getMonth")}},hour:{valid:function(n){return 0<=n&&n<24},walkTo:function(n,t){return r(n,t,"getHours","hour","getDate")}},minute:{valid:function(n){return 0<=n&&n<60},walkTo:function(n,t){return r(n,t,"getMinutes","minute","getHours")}},second:{valid:function(n){return 0<=n&&n<60},walkTo:function(n,t){return r(n,t,"getSeconds","second","getMinutes")}},millisecond:{valid:function(n){return 0<=n&&n<1e3},walkTo:function(n,t){n.milliseconds(t)}}};t.exports=function(n,t){for(var e=Object.keys(s),r=n.clone(),o=0;o<e.length;o++){var a=e[o],i=t[a];if(void 0===i&&(i=r[a]()),"string"==typeof i&&(i=parseInt(i,10)),!s[a].valid(i))return n.epoch=null,void console.warn("invalid "+a+": "+i);s[a].walkTo(n,i)}}},{"../../data/milliseconds":6}],35:[function(n,t,e){"use strict";var r=n("../fns"),d={months:{almost:10,over:4},days:{almost:25,over:10},hours:{almost:20,over:8},minutes:{almost:50,over:20},seconds:{almost:50,over:20}};function f(n,t){return 1===n&&(t=t.slice(0,-1)),n+" "+t}t.exports=function(n,t){var s=function(n,t){var e=n.isBefore(t),r=e?t:n,o=e?n:t;o=o.clone();var a={years:0,months:0,days:0,hours:0,minutes:0,seconds:0};return Object.keys(a).forEach(function(n){if(!o.isSame(r,n)){var t=o.diff(r,n);o.add(t,n),o.epoch>r.epoch+10&&(o.subtract(1,n),t-=1),a[n]=t}}),e&&Object.keys(a).forEach(function(n){0!==a[n]&&(a[n]*=-1)}),a}(n,t=r.beADate(t,n));if(!0===Object.keys(s).every(function(n){return!s[n]}))return{diff:s,rounded:"now",qualified:"now",precise:"now"};var u=void 0,c=void 0,e=void 0,h=[];return Object.keys(s).forEach(function(n,t,e){var r=Math.abs(s[n]);if(0!==r){var o=f(r,n);if(h.push(o),!u){if(u=c=o,4<t)return;var a=e[t+1],i=Math.abs(s[a]);i>d[a].almost?(u=f(r+1,n),c="almost "+u):i>d[a].over&&(c="over "+o)}}}),e=h.splice(0,2).join(", "),!0===n.isAfter(t)?(u+=" ago",c+=" ago",e+=" ago"):(u="in "+u,c="in "+c,e="in "+e),{diff:s,rounded:u,qualified:c,precise:e}}},{"../fns":12}],36:[function(n,t,e){"use strict";var a=n("../data/seasons"),r=n("../data/quarters"),i=n("./set/walk"),o={minute:function(n){return i(n,{second:0,millisecond:0}),n},quarterHour:function(n){var t=n.minutes();return 45<=t?n.minutes(45):30<=t?n.minutes(30):15<=t?n.minutes(15):n.minutes(0),i(n,{second:0,millisecond:0}),n},hour:function(n){return i(n,{minute:0,second:0,millisecond:0}),n},day:function(n){return i(n,{hour:0,minute:0,second:0,millisecond:0}),n},week:function(n){var t=n.clone();return n.day(1),n.isAfter(t)&&n.subtract(1,"week"),i(n,{hour:0,minute:0,second:0,millisecond:0}),n},month:function(n){return i(n,{date:1,hour:0,minute:0,second:0,millisecond:0}),n},quarter:function(n){var t=n.quarter();return r[t]&&i(n,{month:r[t][0],date:r[t][1],hour:0,minute:0,second:0,millisecond:0}),n},season:function(n){var t=n.season(),e="north";"South"===n.timezone().hemisphere&&(e="south");for(var r=0;r<a[e].length;r++)if(a[e][r][0]===t){var o=n.year();return"winter"===t&&n.month()<3&&(o-=1),i(n,{year:o,month:a[e][r][1],date:a[e][r][2],hour:0,minute:0,second:0,millisecond:0}),n}return n},year:function(n){return i(n,{month:0,date:1,hour:0,minute:0,second:0,millisecond:0}),n}};o.date=o.day;t.exports={startOf:function(n,t){return o[t]?o[t](n):"summer"===t||"winter"===t?(n.season(t),o.season(n)):n},endOf:function(n,t){return o[t]&&((n=o[t](n)).add(1,t),n.subtract(1,"milliseconds")),n}}},{"../data/quarters":9,"../data/seasons":10,"./set/walk":34}],37:[function(n,t,e){"use strict";var r=n("./timezone/guessTz"),o=n("./timezone/index"),a=n("./input"),i=n("./methods"),s=n("../data"),u=function(n,t,e){e=e||{},this.tz=t||r(),this.silent=e.silent||!1,Object.defineProperty(this,"d",{get:function(){var n=o(this)||{},t=(new Date(this.epoch).getTimezoneOffset()||0)+60*n.current.offset;t=60*t*1e3;var e=this.epoch+t;return new Date(e)}}),Object.defineProperty(this,"timezones",{get:function(){return s},set:function(n){return s=n}}),a(this,n,t,e)};Object.keys(i).forEach(function(n){u.prototype[n]=i[n]}),u.prototype.clone=function(){return new u(this.epoch,this.tz,{silent:this.silent})},n("./methods/query")(u),n("./methods/add")(u),n("./methods/same")(u),n("./methods/compare")(u),n("./methods/i18n")(u),t.exports=u},{"../data":1,"./input":15,"./methods":19,"./methods/add":20,"./methods/compare":21,"./methods/i18n":25,"./methods/query":29,"./methods/same":32,"./timezone/guessTz":38,"./timezone/index":39}],38:[function(n,t,e){"use strict";t.exports=function(){var n=function(){if("undefined"==typeof Intl||void 0===Intl.DateTimeFormat)return null;var n=Intl.DateTimeFormat();if(void 0===n||void 0===n.resolvedOptions)return null;var t=n.resolvedOptions().timeZone;return!t||-1===t.indexOf("/")&&"UTC"===t?null:t}();return null===n?"Asia/Shanghai":n}},{}],39:[function(n,t,e){"use strict";var c=n("./summerTime");t.exports=function(n){var t=n.tz||"",e=n.timezones,r=t.split("/");if(!1===e.hasOwnProperty(t)&&2<r.length&&(t=r[0]+"/"+r[1]),!1===e.hasOwnProperty(t))return console.warn("Warn: could not find given or local timezone - '"+t+"'"),{current:{epochShift:0}};var o,a={name:t,hasDst:Boolean(e[t].dst),hemisphere:"s"===e[t].h?"South":"North",change:{},current:{}};if(!0===a.hasDst){var i=(o=e[t].dst)?o.split("->"):[];a.change={start:i[0],back:i[1]}}var s=e[t].o,u=s;return!0===a.hasDst&&(u="North"===a.hemisphere?s-1:e[t].o+1),!1===a.hasDst?(a.current.offset=s,a.current.isDST=!1):!0===c(n,a,s)?(a.current.offset=s,a.current.isDST="North"===a.hemisphere):(a.current.offset=u,a.current.isDST="South"===a.hemisphere),a}},{"./summerTime":40}],40:[function(n,t,e){"use strict";var s=n("../fns").zeroPad;t.exports=function(n,t,e){if(!0!==t.hasDst||!t.change.start||!t.change.back)return!1;var r=new Date(n.epoch),o=(r.getTimezoneOffset()||0)+60*e;o=60*o*1e3,r=new Date(n.epoch+o);var a,i=s((a=r).getMonth()+1)+"/"+s(a.getDate())+":"+s(a.getHours());return i>=t.change.start&&i<t.change.back}},{"../fns":12}]},{},[13])(13)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(_dereq_,module,exports){
let colors = {
  blue: '#6699cc',
  green: '#6accb2',
  yellow: '#e1e6b3',
  red: '#cc7066',
  pink: '#e6b8b3',
  brown: '#9c896c',
  orange: '#cc8a66',
  purple: '#d8b3e6',

  navy: '#335799',
  olive: '#7f9c6c',
  burnt: '#603a39',
  beige: '#e6d7b3',
  fuscia: '#603960',
// cherry: '#cc6966',
// rose: '#cc6f66',
// rose:'#',
// rose:'#',
// pink: '#e6b3bc',
}
module.exports = colors

},{}],8:[function(_dereq_,module,exports){

const greys = {
  white: '#fbfbfb',
  // grey2: '#4d4d4d',
  grey: '#4d4d4d',
  // light: '#a3a5a5',
  dim: '#d7d5d2',
  light2: '#949a9e',
  // slate: '#51433e',
  dark: '#443d3d',
  bluegrey: '#606c74',
  black: '#333333'
}
module.exports = greys

},{}],9:[function(_dereq_,module,exports){
const greys = _dereq_('./greys')
const colors = _dereq_('./colors')

module.exports = Object.assign({}, colors, greys)

},{"./colors":7,"./greys":8}]},{},[5]);