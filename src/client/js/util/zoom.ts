// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default function(svg: Selection<SVGSVGElement, unknown, null, undefined>, width: number, height: number) {
    const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .translateExtent([[0, 0], [width, height]])
        .on('zoom', function(event: any) {
            svg
            .selectAll('svg > *')
            .attr('transform', event.transform);
        });

    svg.call(zoom);
}