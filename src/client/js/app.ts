import dbVisualizer_d3ForceDirectedGraph from './dbVisualizer_d3ForceDirectedGraph.js';

(async function () {
    const graphData = await (await fetch('/graph-data')).json();
    const groups = await (await fetch('/groups')).json();

    const chart = dbVisualizer_d3ForceDirectedGraph.getGraph(graphData, groups);

    document.querySelector('.chart-container')?.appendChild(chart);
})();