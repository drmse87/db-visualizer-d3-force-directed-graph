// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default function (link, node, label, nodeRadius, width, height) {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', function(d) {
        return d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
      })
      .attr('cy', function(d) {
        return d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
      });

    label
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y - 10;
      });
}