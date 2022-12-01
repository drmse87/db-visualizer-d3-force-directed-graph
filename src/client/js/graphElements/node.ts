/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import drag from '../util/drag.js';
import infoWindow from './infoWindow.js';

export default {
    getNode(svg, config, simulation, nodes, links) {
        return svg.append('g')
            .attr('stroke', config.nodeStroke)
            .attr('stroke-opacity', config.nodeStrokeOpacity)
            .attr('stroke-width', config.nodeStrokeWidth)
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('class', 'node')
            .attr('r', config.nodeRadius)
            .on('click', function(e, d) {
                infoWindow.createNewInfoWindow(e, d, links);
            })
            .on('mouseover', function(e, d) {
                const tableName = d.id;

                svg
                    .selectAll('.label')
                    .filter(function(labelDatum) {
                        return tableName === labelDatum.id;
                    })
                    .style('visibility', 'visible');
            })
            .on('mouseout', function(e, d) {
                const tableName = d.id;

                svg
                    .selectAll('.label')
                    .filter(function(labelDatum) {
                        return tableName === labelDatum.id;
                    })
                    .style('visibility', function(d) {
                        const node = d3.select(this).node();

                        if (!node.classList.contains('label-major-node') && !node.classList.contains('label-single-node')) {
                            return 'hidden';
                        } else {
                            return 'visible';
                        }
                    });
            })
            .call(drag(simulation));
    }
};