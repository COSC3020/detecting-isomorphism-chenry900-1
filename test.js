const fs = require('fs');
const jsc = require('jsverify');
const { are_isomorphic } = require('./code');

// Helper to generate random undirected adjacency matrix
function randomAdjMatrix(n) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const edge = Math.random() < 0.5 ? 1 : 0;
            matrix[i][j] = matrix[j][i] = edge;
        }
    }
    return matrix;
}

// Permute a graph using a permutation
function permuteGraph(graph, perm) {
    const n = graph.length;
    const newGraph = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            newGraph[i][j] = graph[perm[i]][perm[j]];
        }
    }
    return newGraph;
}

// Property-based test: a graph should be isomorphic to any permutation of itself
jsc.property("graph is isomorphic to its permutation", jsc.nat(4), function (size) {
    const n = Math.max(2, size); // Ensure at least 2 nodes
    const originalGraph = randomAdjMatrix(n);
    const perm = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    const permutedGraph = permuteGraph(originalGraph, perm);

    return are_isomorphic(originalGraph, permutedGraph);
});

// Optional manual test + file output
function manualTest() {
    const graph1 = [
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
    ];
    const graph2 = [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 0]
    ];
    const result = are_isomorphic(graph1, graph2);
    console.log("Manual isomorphic check:", result);

    fs.writeFileSync("manual-result.json", JSON.stringify({ graph1, graph2, result }, null, 2));
}

manualTest();
