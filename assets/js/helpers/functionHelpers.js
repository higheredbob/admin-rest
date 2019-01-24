$(document).ready(function(){

ob = function(arr, d, f) {
    //2 object array convert col to row
    hadji = Array.from({length}, (_, i) => ({
        coordinates: hadji[i],
        start: hadji[i],
        duration: hadji[i]
    }))
    return arr;
};
co = function(arr, d, f) {
  arr = ({d: arr.map(d => d.coordinates),
    f: Float64Array.from(arr, d => d.f)
  })
};

// use: take(date, [0, 1, 2])
// for parrallel array, array of values + array of indexes, returns a new array of same type
function take(values, index) {
    return values.constructor.from(index, i => values[i]);
}
})
// take from multiple arrays
// use: [onearray, twoarray].map(taker([0,1,2index]))
function taker(index) {
    return values => values.constructor.from(index, i => values[i])
}
// function return [arrayone, arraytwo].map(get(0index))
function get(i) {
    return values => values[i];
}


// range(length)
function range(start, stop, step) {
    const n = arguments.length;
    start = +start, stop = +stop, step = n < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
    return Uint32Array.from({length: Math.ceil((stop - start)/step)}, (_, i) => start + i * step);
}
// below example filters an array against another and returns a new one of filtered items from array two and one
//take(arrayone, range(length).filter(i => arraytwo[i] > n))


//faster filter
function filter(values, test) {
    const I = [], n = values.length;
    for (let i = 0; i < n; ++i) {
        if (test(values[i], i, values)) {
            I.push(i);
        }
    }
    return I;
}
// variation that takes existing index
// use: [arrayone, arraytwo].map(take(filter(arraytwo, d => d < n)))
// use: if date object can filter by date [arrayDate, arraytwo].map(take(filter(arrayDate, d => d.getMonth() == 11 && d.getDate() == 25)))
function filteri(values, index, test) {
  const I = [], n = index.length;
  for (let i = 0; i < n; ++i) {
    const j = index[i];
    if (test(values[j], j, values)) {
      I.push(j);
    }
  }
  return I;
}

// can sort up or down, copy of array, instead of inplace. Sorti is for sparse index
//example: [date, precipitation].map(taker(sort(precipitation, descending).slice(0, 10)))
function sort(values, order = ascending) {
  return range(values.length).sort((i, j) => order(values[i], values[j]));
}

function sorti(values, index, order = ascending) {
  return index.slice().sort((i, j) => order(values[i], values[j]));
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function sum(values) {
  let sum = 0;
  for (let i = 0, n = values.length; i < n; ++i) {
    const v = +values[i];
    if (v) sum += v;
  }
  return sum;
}

//sum(precipitation)
function sumi(values, index) {
  let sum = 0;
  for (let i = 0, n = index.length; i < n; ++i) {
    const v = +values[index[i]];
    if (v) sum += v;
  }
  return sum;
}
//[date, precipitation].map(count)
function count(values) {
  let count = 0;
  for (let i = 0, n = values.length; i < n; ++i) {
    const v = +values[i];
    if (v === v) ++count;
  }
  return count;
}

function counti(values, index) {
  let count = 0;
  for (let i = 0, n = index.length; i < n; ++i) {
    const v = +values[index[i]];
    if (v === v) ++count;
  }
  return count;
}

function mean(values) {
  return sum(values) / count(values);
}

function meani(values, index) {
  return sumi(values, index) / counti(values, index);
}

//% of days that saw rain
//mean(precipitation.map(d => d > 0))
//regular mean
//mean(precipitation)

function max(values) {
  let maxIndex, maxValue = -Infinity;
  for (let i = 0, n = values.length; i < n; ++i) {
    const v = +values[i];
    if (v > maxValue) maxIndex = i, maxValue = v;
  }
  return maxIndex;
}

function maxi(values, index) {
  let maxIndex, maxValue = -Infinity;
  for (let i = 0, n = index.length; i < n; ++i) {
    const v = +values[index[i]];
    if (v > maxValue) maxIndex = index[i], maxValue = v;
  }
  return maxIndex;
}
// date that had highest rain
//[date, precipitation].map(get(max(precipitation)))

function min(values) {
  let minIndex, minValue = Infinity;
  for (let i = 0, n = values.length; i < n; ++i) {
    const v = +values[i];
    if (v < minValue) minIndex = i, minValue = v;
  }
  return minIndex;
}

function mini(values, index) {
  let minIndex, minValue = Infinity;
  for (let i = 0, n = index.length; i < n; ++i) {
    const v = +values[index[i]];
    if (v < minValue) minIndex = index[i], minValue = v;
  }
  return minIndex;
}

// min
// [date, temp_min].map(get(min(temp_min)))
//max
//[date, temp_max].map(get(max(temp_max)))

function group(keys, value) {
  const map = new Map;
  for (let i = 0, n = keys.length; i < n; ++i) {
    let k = keys[i], v = map.get(k);
    if (v === undefined) map.set(k, [i]);
    else v.push(i);
  }
  if (value !== undefined) {
    for (const [key, index] of map) {
      map.set(key, value(index));
    }
  }
  return map;
}
group(collect.features.map(d => d.getFullYear()), i => [collect.features, temp_min].map(get(mini(temp_min, i))))
// w/out value defined, sorts in order
// group(date.map(d => d.getFullYear()))
// avg per mo, of yr, show 05-09 of year
//group(date.map(d => d.getFullYear()), i => sumi(precipitation, i))
// 5 coldest days
// group(date.map(d => d.getFullYear()), i => take(date, bottomi(temp_min, i, 5)))
// the rainiest
// group(collect.features.map(d => d.getFullYear()), i => [collect.features, temp_min].map(get(mini(temp_min, i))))
