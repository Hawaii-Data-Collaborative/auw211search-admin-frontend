import './relatedNeeds.scss'

import axios from 'axios'
import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { Button, Dialog, IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import { API_URL } from '../../constants'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { downloadDataset } from '../../util'

dayjs.extend(localizedFormat)

const divId = 'related-needs-chart'

export function RelatedNeedsChart() {
  const notify = useNotify()
  const [data, setData] = useState(null)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    setData(null)

    axios
      .get(API_URL + '/chart/related-needs')
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        notify(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      const node = ForceGraph(data)

      const parent = document.getElementById(divId)
      parent.innerHTML = ''
      parent.appendChild(node)
    }
  }, [data])

  const onExportClick = () => {
    downloadDataset(
      JSON.stringify(data, null, 2),
      dayjs().format('YYYYMMDD') + '_RelatedNeedsChartData.json',
      'application/json;charset=utf-8'
    )
  }

  return (
    <div className="RelatedNeedsChart">
      <div className="header">
        <div className="row-1">
          <b>
            Related Needs
            <IconButton onClick={() => setShowHelp(true)} style={{ transform: 'translateY(-2px)' }}>
              <InfoIcon fontSize="small" style={{ color: '#aaa' }} />
            </IconButton>
          </b>
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            onClick={onExportClick}
            startIcon={<DownloadIcon />}
          >
            Export
          </Button>
        </div>
      </div>
      {data ? (
        <div id={divId} />
      ) : (
        <div key="loading" className="loading" style={{ width: 450, height: 220 }}>
          Loading...
        </div>
      )}

      {showHelp && (
        <Dialog onClose={() => setShowHelp(false)} open>
          <div style={{ padding: 30 }}>
            Related Needs are when a user does multiple keyword searches with less than one hour between each search.
          </div>
        </Dialog>
      )}
    </div>
  )
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
function ForceGraph(
  {
    nodes, // an iterable of node objects (typically [{id}, …])
    links // an iterable of link objects (typically [{source, target}, …])
  },
  {
    nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
    nodeTitle = d => d.id, // given d in nodes, a title string
    nodeFill = 'currentColor', // node stroke fill (if not using a group color encoding)
    nodeStroke = '#ddd', // node stroke color
    nodeStrokeWidth = 1, // node stroke width, in pixels
    nodeStrokeOpacity = 1, // node stroke opacity
    nodeRadius = d => d.value + 20, // node radius, in pixels
    nodeStrength,
    linkSource = ({ source }) => source, // given d in links, returns a node identifier string
    linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
    linkStroke = '#ddd', // link stroke color
    linkStrokeOpacity = 0.6, // link stroke opacity
    linkStrokeWidth = 1, // given d in links, returns a stroke width in pixels
    linkStrokeLinecap = 'round', // link stroke linecap
    linkStrength,
    colors = d3.schemeTableau10, // an array of color strings, for the node groups
    width = window.innerWidth - 350, // outer width, in pixels
    height = 700, // outer height, in pixels
    invalidation // when this promise resolves, stop the simulation
  } = {}
) {
  // Compute values.
  const N = d3.map(nodes, nodeId).map(intern)
  const LS = d3.map(links, linkSource).map(intern)
  const LT = d3.map(links, linkTarget).map(intern)
  if (nodeTitle === undefined) nodeTitle = (_, i) => N[i]
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle)
  const W = typeof linkStrokeWidth !== 'function' ? null : d3.map(links, linkStrokeWidth)
  const L = typeof linkStroke !== 'function' ? null : d3.map(links, linkStroke)

  // Replace the input nodes and links with mutable objects for the simulation.
  nodes = d3.map(nodes, (n, i) => ({ id: N[i], value: n.value }))
  links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }))

  // Construct the forces.
  const forceNode = d3.forceManyBody()
  const forceLink = d3
    .forceLink(links)
    .id(({ index: i }) => N[i])
    .distance(70)
  if (nodeStrength !== undefined) forceNode.strength(nodeStrength)
  if (linkStrength !== undefined) forceLink.strength(linkStrength)

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', forceLink)
    .force('charge', forceNode)
    .force('center', d3.forceCenter())
    .on('tick', ticked)

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

  const link = svg
    .append('g')
    .attr('stroke', typeof linkStroke !== 'function' ? linkStroke : null)
    .attr('stroke-opacity', linkStrokeOpacity)
    .attr('stroke-width', typeof linkStrokeWidth !== 'function' ? linkStrokeWidth : null)
    .attr('stroke-linecap', linkStrokeLinecap)
    .selectAll('line')
    .data(links)
    .join('line')

  const nodeG = svg
    .append('g')
    .attr('fill', nodeFill)
    .attr('stroke', nodeStroke)
    .attr('stroke-opacity', nodeStrokeOpacity)
    .attr('stroke-width', nodeStrokeWidth)

  const node = nodeG
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', nodeRadius)
    .attr('fill', '#fff')
    .attr('stroke', '#ddd')
    .attr('stroke-width', '1')

  // .on('mouseover', (event, d) => {
  //   showTooltip(d.id, event.x, event.y)
  // })
  // .on('mouseout', () => {
  //   hideTooltip()
  // })

  const labels = nodeG
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'arial')
    .attr('font-size', '11')
    .attr('fill', '#555')
    .attr('stroke', 'none')
    .text(d => d.id)

  if (W) link.attr('stroke-width', ({ index: i }) => W[i])
  if (L) link.attr('stroke', ({ index: i }) => L[i])
  if (T) node.append('title').text(({ index: i }) => T[i])
  if (invalidation != null) invalidation.then(() => simulation.stop())

  function intern(value) {
    return value !== null && typeof value === 'object' ? value.valueOf() : value
  }

  function ticked() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    node.attr('cx', d => d.x).attr('cy', d => d.y)
    labels.attr('x', d => d.x).attr('y', d => d.y + 3.5)
  }

  return svg.node()
}
