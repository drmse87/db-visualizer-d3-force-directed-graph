/* eslint-disable @typescript-eslint/no-this-alias */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default {
    setUpSearchListener(svg) {
        const me = this;

        d3.select('.search-field').on('keyup', function(e) {
            me.search(e, svg);
        });

        d3.selectAll('input[name="search-for"').on('change', function(e) {
            me.search(e, svg);
        });
    },

    isMatchingTableName(GroupName: string, searchString: string) {
        return GroupName.toLowerCase().includes(searchString);
    },

    isMatchingColumnName(columns: string[], searchString: string) {
        return columns.some(c => c.toLowerCase().includes(searchString));
    },

    search(e: KeyboardEvent, svg: Selection<SVGSVGElement, undefined, null, undefined>) {
        const me = this;
        const searchString = d3.select('.search-field').node().value.toLowerCase();
        const searchFor = d3.select('input[name="search-for"]:checked').node().value;

        if (searchString.length === 0) {
            this.restoreAllNodesAndLinks(svg);

            return;
        }

        svg.selectAll('.node').style('opacity', 0.2);
        svg.selectAll('.link').style('opacity', 0.2);
        svg.selectAll('.label').style('opacity', 0.2);

        svg
            .selectAll('.node')
            .filter(function(d) {
                if (searchFor === 'table') {
                    return me.isMatchingTableName(d.id, searchString);
                }
                else if (searchFor === 'column') {
                    return me.isMatchingColumnName(d.columns, searchString);
                }
            })
            .style('opacity', 1);
        svg
            .selectAll('.label')
            .filter(function(d) {
                if (searchFor === 'table') {
                    return me.isMatchingTableName(d.id, searchString);
                }
                else if (searchFor === 'column') {
                    return me.isMatchingColumnName(d.columns, searchString);
                }
            })
            .style('opacity', 1);
        svg
            .selectAll('.link')
            .filter(function(link) {
                if (searchFor === 'table') {
                    return me.isMatchingTableName(link.source.id, searchString) || me.isMatchingTableName(link.target.id, searchString);
                }
                else if (searchFor === 'column') {
                    return me.isMatchingColumnName(link.source.columns, searchString) || me.isMatchingColumnName(link.target.columns, searchString);
                }
            })
            .style('opacity', 1);
    },

    restoreAllNodesAndLinks(svg: Selection<SVGSVGElement, undefined, null, undefined>) {
        svg.selectAll('.link').style('opacity', 1);
        svg.selectAll('.node').style('opacity', 1);
        svg.selectAll('.label').style('opacity', 1);
    }
};