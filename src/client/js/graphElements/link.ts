// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default {
    getLink(svg, config, links) {
        return svg.append('g')
            .attr('stroke', typeof config.linkStroke !== 'function' ? config.linkStroke : null)
            .attr('stroke-opacity', config.linkStrokeOpacity)
            .attr('stroke-width', typeof config.linkStrokeWidth !== 'function' ? config.linkStrokeWidth : null)
            .attr('stroke-linecap', config.linkStrokeLinecap)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link')
            .attr('marker-end', 'url(#arrow)');
    }
};