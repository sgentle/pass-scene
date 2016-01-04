(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.passScene = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
},{}],2:[function(require,module,exports){
var base, data, domain, domaindata, entropy, entropyOf, k, kind, kindwords, pos, posdata, randKind, randOf, randPos, ref, tagRE, tmpl, words;

data = require('./data.json');

words = {};

for (kind in data) {
  kindwords = data[kind];
  ref = kind.split('.'), pos = ref[0], domain = ref[1];
  posdata = (words[pos] || (words[pos] = {
    count: 0,
    domains: {}
  }));
  domaindata = ((base = posdata.domains)[domain] || (base[domain] = {}));
  domaindata.words = kindwords;
  domaindata.count = kindwords.length;
  posdata.count += domaindata.count;
}

randKind = function(pos, domain) {
  domaindata = words[pos].domains[domain];
  return domaindata.words[Math.floor(Math.random() * domaindata.count)];
};

randPos = function(pos) {
  var num, ref1;
  num = Math.floor(Math.random() * words[pos].count);
  ref1 = words[pos].domains;
  for (domain in ref1) {
    domaindata = ref1[domain];
    if (num < domaindata.count) {
      return domaindata.words[num];
    } else {
      num -= domaindata.count;
    }
  }
};

randOf = function(kind) {
  var ref1;
  ref1 = kind.split('.'), pos = ref1[0], domain = ref1[1];
  if (!pos) {
    return;
  }
  if (domain) {
    return randKind(pos, domain);
  } else {
    return randPos(pos);
  }
};

entropyOf = function(kind) {
  var ref1, ref2, ref3, ref4, ref5;
  ref1 = kind.split('.'), pos = ref1[0], domain = ref1[1];
  if (!pos) {
    return;
  }
  if (domain) {
    return Math.log2((ref2 = words[pos]) != null ? (ref3 = ref2.domains) != null ? (ref4 = ref3[domain]) != null ? ref4.count : void 0 : void 0 : void 0);
  } else {
    return Math.log2((ref5 = words[pos]) != null ? ref5.count : void 0);
  }
};

tagRE = /{(.*?)}/g;

entropy = function(str) {
  var bits, i, len, match, matchBits, ref1;
  bits = 0;
  ref1 = str.match(tagRE) || [];
  for (i = 0, len = ref1.length; i < len; i++) {
    match = ref1[i];
    match = match.replace(tagRE, '$1');
    matchBits = entropyOf(match) || 0;
    bits += matchBits;
  }
  return bits;
};

tmpl = function(str) {
  return str.replace(tagRE, function(match, tag) {
    return randOf(tag);
  });
};

tmpl.entropy = entropy;

tmpl.kinds = ((function() {
  var results;
  results = [];
  for (k in data) {
    results.push(k);
  }
  return results;
})()).sort();

module.exports = tmpl;


},{"./data.json":1}]},{},[2])(2)
});