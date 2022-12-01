// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default {
    getLabel(svg, nodes, links) {
        return svg.selectAll(null)
            .data(nodes)
            .enter()
            .append('text')
            .text(function (d) {
                return d.id;
            })
            .attr('class', function(d) {
                const numberOfLinks = links.filter(function(l) {
                    return l.source.id === d.id || l.target.id === d.id;
                }).length;
                const finalClass = [];
                finalClass.push('label');

                if (numberOfLinks > 10) {
                    finalClass.push('label-major-node');
                }
                else if (numberOfLinks === 0) {
                    finalClass.push('label-single-node');
                }

                return finalClass.join(' ');
            })
            .style('text-anchor', 'middle')
            .style('fill', '#373D3F')
            .style('pointer-events', 'none')
            .style('visibility', function(d) {
                const numberOfLinks = links.filter(function(l) {
                    return l.source.id === d.id || l.target.id === d.id;
                }).length;

                return (numberOfLinks > 10 || numberOfLinks === 0) ? 'visible' : 'hidden';
            });
    }
};