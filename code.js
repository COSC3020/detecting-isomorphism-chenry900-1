function are_isomorphic(graph1, graph2) {
    if (graph1.length != graph2.length) {
        return false;
    }
    if (graph1.length == 0 && graph2.length == 0) {
        return true;
    }
    var perm = findPerm(graph1.length);

    for (var x of perm) {
        if(check(x, graph1, graph2)) {
            return true;
        }
            
    }
    return false;
}
function findPerm (graph1) {
    var recurPerm = [];
    if (graph1.length <= 1) {
        return [graph1];
    }
    

    for (var i = 0; i < graph1.length; i++) {
        var partial = findPerm(graph1.slice(0, i).concat(graph1.slice(i + 1)));//copilot changed graph1.slice(0,i) + graph2(i +1) to concat
        for (var x of partial) {
            recurPerm.push([graph1[i]].concat(x));
        }
    }
    return recurPerm;
}

function check(x, graph1, graph2) {
    for (var o = 0; o < x.length; o++) {
        for (var i = 0; i < x.length; i++) {
            if (graph1[o][i] != graph2[x[o]][x[i]]) {// copilot helped me fix graph2 to work correctly
                return false;
            }
        }
    }
    return true;
}

