const jsc = require('jsverify');
const { are_isomorphic } = require('./code');

// Helper: create random adjacency matrix
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

// Helper: permute adjacency matrix
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

// Run property manually without Mocha
const prop = jsc.forall(jsc.nat(4), (size) => {
    const n = Math.max(2, size);
    const graph = randomAdjMatrix(n);
    const perm = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    const permuted = permuteGraph(graph, perm);
    return are_isomorphic(graph, permuted);
});

try {
    jsc.assert(prop);
    console.log("✅ All jsverify tests passed!");
} catch (err) {
    console.error("❌ jsverify property test failed:", err);
}
