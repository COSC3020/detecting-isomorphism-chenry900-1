const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

var graph1 = [];
var graph2 = [];
assert(are_isomorphic(graph1, graph2), "Failed test 1");

graph1 = [
    [0,1],
    [1,0]];  
assert(!are_isomorphic(graph1, graph2), "Failed test 2");

graph2 = [
    [0,1],
    [1,0]];
assert(are_isomorphic(graph1, graph2), "Failed test 3");

graph2 = [
    [0,0],
    [1,0]];
assert(!are_isomorphic(graph1, graph2), "Failed test 4");

graph1 = [
    [0,1,1],
    [1,0,0],
    [0,0,0]];
graph2 = [
    [0,0,0],
    [1,0,1],
    [0,1,0]];
assert(are_isomorphic(graph1, graph2), "Failed test 5");

graph2 = [
    [0,0,0],
    [1,0,1],
    [1,0,0]];
assert(!are_isomorphic(graph1, graph2), "Failed test 6");
