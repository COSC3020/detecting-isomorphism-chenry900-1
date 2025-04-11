const jsc = require('jsverify');
const { are_isomorphic } = require('./code');

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

describe("Graph isomorphism tests", () => {
    jsc.property("graph is isomorphic to its permutation", jsc.nat(4), (size) => {
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
});
