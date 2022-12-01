/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-this-alias */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import date from './date.js';

export default {
    addDateFilterListener(svg, simulation) {
        const me = this;

        d3.select('.filter-date-select').on('change', function(e) {
            me.applyFilter(e, svg, simulation);
        });
    },

    addToggleAllGroupsListener(svg, simulation) {
        const me = this;

        d3.select('.filter-groups-toggle-all').on('change', function(e) {
            const shouldBeChecked = e.target.checked;

            d3.selectAll('.filter-groups-list-item').nodes().forEach(n => {
                n.checked = shouldBeChecked;
            });

            me.applyFilter(e, svg, simulation);
        });
    },

    createGroupFilterCheckboxes(svg, simulation, groups) {
        const me = this;

        groups
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
            .forEach((m) => {
                me.createGroupFilterCheckbox(svg, simulation, m);
            });

        me.createGroupFilterCheckbox(svg, simulation);
    },

    createGroupFilterCheckbox(svg, simulation, Group) {
        const me = this;
        const listItem = d3.select('.filter-groups-list').append('li');
        const label = listItem.append('label');
        const GroupName = Group !== undefined ? Group.name : 'Unknown';
        const GroupDisplayName = Group !== undefined ? Group.displayName : '(Unsorted)';

        label
            .append('span')
            .text(GroupDisplayName);
        label
            .append('input')
            .attr('class', 'filter-groups-list-item')
            .attr('type','checkbox')
            .attr('data-Group-name', GroupName)
            .attr('checked', true)
            .on('change', function(e) {
                me.applyFilter(e, svg, simulation);
            });
    },

    getCheckedGroups() {
        return d3
            .selectAll('.filter-groups-list input[type="checkbox"]')
            .nodes()
            .map(n => ({
                GroupName: n.getAttribute('data-Group-name'),
                checked: n.checked
            }));
    },

    getLabelVisibility(node) {
        if (node.classList.contains('label-major-node') || node.classList.contains('label-single-node')) {
            return 'visible';
        }
        else {
            return 'hidden';
        }
    },

    getLinkVisibility(d) {
        const groupsFilterStatus = this.getCheckedGroups();
        const sourceGroupName = d.source.GroupName;
        const targetGroupName = d.target.GroupName;
        const isBothGroupsInvolvedBeingShown = groupsFilterStatus.some(mf => mf.checked && mf.GroupName === sourceGroupName) &&
            groupsFilterStatus.some(mf => mf.checked && mf.GroupName === targetGroupName);

        const dateFilterValue = d3
            .select('.filter-date-select')
            .node()
            .value;
        const sourceCreated = date.getDateDataAttribute(d.source.created);
        const targetCreated = date.getDateDataAttribute(d.target.created);
        const isDateFilterApplied = dateFilterValue !== 'all';
        const isTargetAndSourceNodesCreatedInSamePeriod = sourceCreated === targetCreated;

        if ((isBothGroupsInvolvedBeingShown && isDateFilterApplied && isTargetAndSourceNodesCreatedInSamePeriod) ||
            (isBothGroupsInvolvedBeingShown && !isDateFilterApplied)) {
            return 'visible';
        }
        else {
            return 'hidden';
        }
    },

    applyFilter(e, svg, simulation) {
        const me = this;
        const checkedGroups = this.getCheckedGroups().filter(m => m.checked).map(m => m.GroupName);
        const dateFilterValue = d3
            .select('.filter-date-select')
            .node()
            .value;
        let filteredNodes, filteredLabels, filteredLinks;

        svg.selectAll('.node, .link, .label').style('visibility', 'hidden');

        filteredNodes = svg
            .selectAll('.node')
            .filter(function (n) {
                return checkedGroups.includes(n.GroupName);
            });
        filteredLabels = svg
            .selectAll('.label')
            .filter(function (n) {
                return checkedGroups.includes(n.GroupName);
            });
        filteredLinks = svg
            .selectAll('.link')
            .filter(function (link) {
                return checkedGroups.includes(link.source.GroupName) || checkedGroups.includes(link.target.GroupName);
            });

        if (dateFilterValue !== 'all') {
            filteredNodes = filteredNodes.filter(function(d) {
                return date.getDateDataAttribute(d.created) === dateFilterValue;
            });
            filteredLabels = filteredLabels.filter(function(d) {
                return date.getDateDataAttribute(d.created) === dateFilterValue;
            });
            filteredLinks = filteredLinks.filter(function(d) {
                return date.getDateDataAttribute(d.target.created) === dateFilterValue || date.getDateDataAttribute(d.source.created) === dateFilterValue;
            });
        }

        filteredNodes.style('visibility', 'visible');
        filteredLabels.style('visibility', function(d) {
            return me.getLabelVisibility(d3.select(this).node());
        });
        filteredLinks.style('visibility', function(d) {
            return me.getLinkVisibility(d);
        });

        simulation.alphaTarget(0.01).restart();
    },

    setUpFilterListeners(svg, simulation) {
        this.addToggleAllGroupsListener(svg, simulation);
        this.addDateFilterListener(svg, simulation);
    }
};