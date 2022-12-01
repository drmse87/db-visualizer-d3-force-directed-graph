import { Selection } from 'd3';

export default {
    createArrowDefinition(svg: Selection<SVGSVGElement, undefined, null, undefined>) {
        return svg.append('svg:defs')
            .append('svg:marker')
            .attr('id', 'arrow')
            .attr('fill', '#c0c0c0')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 18)
            .attr('refY', 5)
            .attr('markerUnits', 'strokeWidth')
            .attr('markerWidth', 8)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z');
    }
};