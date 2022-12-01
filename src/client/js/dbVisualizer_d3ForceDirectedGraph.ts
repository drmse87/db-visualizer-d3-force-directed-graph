/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph

import group from './util/group.js';
import zoom from './util/zoom.js';
import tick from './util/tick.js';
import filter from './util/filter.js';
import search from './util/search.js';

import linkElement from './graphElements/link.js';
import labelElement from './graphElements/label.js';
import arrowElement from './graphElements/arrow.js';
import nodeElement from './graphElements/node.js';
import globalListeners from './util/globalListeners.js';

export default {
  graphConfig: {
    nodeTitle: d => `${d.id}\n${d.group}`, // given d in nodes, a title string
    nodeFill: 'currentColor', // node stroke fill (if not using a group color encoding)
    nodeStroke: '#fff', // node stroke color
    nodeStrokeWidth: 1.5, // node stroke width, in pixels
    nodeStrokeOpacity: 1, // node stroke opacity
    nodeRadius: 7, // node radius, in pixels
    linkSource: ({ source }) => source, // given d in links, returns a node identifier string
    linkTarget: ({ target }) => target, // given d in links, returns a node identifier string
    linkStroke: '#999', // link stroke color
    linkStrokeOpacity: 0.6, // link stroke opacity
    linkStrokeWidth: 1.5, // given d in links, returns a stroke width in pixels
    linkStrokeLinecap: 'round', // link stroke linecap
    width: window.innerWidth, // outer width, in pixels
    height: window.innerHeight // outer height, in pixels
  },

  getGraph(graphData, groups): SVGElement {
    const groupColors = groups.map(m => m.color);
    groupColors.push('gray'); // Unknown group

    Object.assign(this.graphConfig, {
      nodeData: d => ({
        id: d.id,
        GroupName: group.getGroupNameByNodeId(groups, d.id),
        columns: d.columns.split(', ').sort(),
        created: d.created,
        modified: d.modified
      }), // given d in nodes, returns a unique identifier (string)
      nodeGroup: d => group.getGroupIndexByNodeId(groups, d.id), // given d in nodes, returns an (ordinal) value for color
      colors: groupColors // an array of color strings, for the node groups
    });

    return this.createGraph(graphData, groups, this.graphConfig);
  },

  createGraph({ nodes, links }, groups, config) {
    // Compute values.
    const LS = d3.map(links, config.linkSource).map(intern);
    const LT = d3.map(links, config.linkTarget).map(intern);
    const T = d3.map(nodes, config.nodeTitle);
    const G = d3.map(nodes, config.nodeGroup).map(intern);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, config.nodeData).map(intern);
    links = d3.map(links, (_, i) => ({
      source: LS[i],
      target: LT[i]
    }));

    // Compute default domains.
    if (G && config.nodeGroups === undefined) {
      config.nodeGroups = d3.sort(G);
    }

    // Construct the scales.
    const color = config.nodeGroup === null ? null : d3.scaleOrdinal(config.nodeGroups, config.colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody().strength(function(d) {
      const numberOfLinks = links.filter(function(l) {
        return l.source.id === d.id || l.target.id === d.id;
      }).length;

      return numberOfLinks > 10 ? -150 : 1;
    });
    const forceLink = d3.forceLink(links).id(({ index: i }) => nodes[i].id).distance(function(d) {
      const numberOfLinks = links.filter(function(l) {
        return l.source.id === d.id || l.target.id === d.id;
      }).length;

      return numberOfLinks > 10 ? 100 : 45;
    });

    const simulation = d3.forceSimulation(nodes)
      .force('link', forceLink)
      .force('charge', forceNode)
      .force('center',  d3.forceCenter(config.width / 2, config.height / 2))
      .force('collide', d3.forceCollide(config.nodeRadius))
      .on('tick', function () {
        tick(link, node, label, config.nodeRadius, config.width, config.height);
      });

    const svg = d3.create('svg')
      .attr('preserveAspectRatio','xMinYMin meet')
      .attr('viewBox', `0 0 ${config.width} ${config.height}`);

    arrowElement.createArrowDefinition(svg);
    const link = linkElement.getLink(svg, config, links);
    const node = nodeElement.getNode(svg, config, simulation, nodes, links);
    node.attr('fill', ({ index: i }) => color(G[i]));
    node.append('title').text(({ index: i }) => T[i]);
    const label = labelElement.getLabel(svg, nodes, links);

    function intern(value) {
      return value !== null && typeof value === 'object' ? value.valueOf() : value;
    }

    filter.createGroupFilterCheckboxes(svg, simulation, groups);
    filter.setUpFilterListeners(svg, simulation);
    search.setUpSearchListener(svg);
    globalListeners.setUpGlobalListeners(svg);
    zoom(svg, config.width, config.height);

    return Object.assign(svg.node(), {
      scales: {
        color
      }
    });
  }
};
