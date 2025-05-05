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

// Property: graph and its permutation are isomorphic
const propIsomorphic = jsc.forall(jsc.nat(4), (size) => {
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

// Property: two random graphs are likely not isomorphic
const propNonIsomorphic = jsc.forall(jsc.nat(4), (size) => {
    const n = Math.max(3, size);
    const g1 = randomAdjMatrix(n);
    let g2;
    do {
        g2 = randomAdjMatrix(n);
    } while (JSON.stringify(g1) === JSON.stringify(g2)); // avoid identical graphs

    // The function should return false unless they are accidentally isomorphic
    return !are_isomorphic(g1, g2) || JSON.stringify(g1) === JSON.stringify(g2);
});

// Run tests
try {
    jsc.assert(propIsomorphic);
    console.log("✅ Isomorphic (positive) tests passed!");

    jsc.assert(propNonIsomorphic);
    console.log("✅ Non-isomorphic (negative) tests passed!");
} catch (err) {
    console.error("❌ jsverify test failed:", err);
}
