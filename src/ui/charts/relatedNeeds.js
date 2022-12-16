import './relatedNeeds.scss'

import axios from 'axios'
import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { API_URL } from '../../constants'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const divId = 'related-needs-chart'

export function RelatedNeedsChart() {
  const notify = useNotify()
  const [data, setData] = useState(null)

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
      const node = buildChart(data)

      const parent = document.getElementById(divId)
      parent.innerHTML = ''
      parent.appendChild(node)
    }
  }, [data])

  return (
    <div className="RelatedNeedsChart">
      <div className="header">
        <div>
          <b>Related Needs</b>
        </div>
      </div>
      {data ? (
        <div id={divId} />
      ) : (
        <div key="loading" className="loading" style={{ width: 450, height: 220 }}>
          Loading...
        </div>
      )}
    </div>
  )
}

function buildChart(data, { width = window.innerWidth * 0.6, height = window.innerHeight * 0.6 } = {}) {
  const root = d3.hierarchy(data)

  const margin = { top: 10, right: 120, bottom: 10, left: 40 }
  const dx = 10
  const dy = width / 6
  const tree = d3.tree().nodeSize([dx, dy])

  root.x0 = dy / 2
  root.y0 = 0
  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children
    // if (d.depth && d.data.name.length !== 7) d.children = null
  })

  const svg = d3
    .create('svg')
    .attr('viewBox', [-margin.left, -margin.top, width, dx])
    .style('font', '10px sans-serif')
    .style('user-select', 'none')

  const gLink = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)

  const gNode = svg.append('g').attr('cursor', 'pointer').attr('pointer-events', 'all')

  let popupDiv
  function showPopup(data, x, y) {
    const keyword = data.name
    const date = dayjs(data.createdAt).format('l LT')
    popupDiv = document.createElement('div')
    popupDiv.className = 'RelatedNeedsPopup'
    popupDiv.style.left = `${x}px`
    popupDiv.style.top = `${y - 30}px`
    popupDiv.innerHTML = `<div>"${keyword}" searched at ${date}</div>`
    document.body.appendChild(popupDiv)
  }

  function hidePopup() {
    document.body.removeChild(popupDiv)
  }

  function update(source) {
    // const duration = d3.event && d3.event.altKey ? 2500 : 250
    const duration = 250
    const nodes = root.descendants().reverse()
    const links = root.links()

    // Compute the new tree layout.
    tree(root)

    let left = root
    let right = root
    root.eachBefore(node => {
      if (node.x < left.x) left = node
      if (node.x > right.x) right = node
    })

    const height = right.x - left.x + margin.top + margin.bottom

    const transition = svg
      .transition()
      .duration(duration)
      .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
      .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))

    // Update the nodes…
    const node = gNode.selectAll('g').data(nodes, d => d.id)

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .on('click', (event, d) => {
        d.children = d.children ? null : d._children
        update(d)
      })
      .on('mouseover', (event, d) => {
        showPopup(d.data, event.x, event.y)
      })
      .on('mouseout', (event, d) => {
        hidePopup()
      })

    nodeEnter
      .append('circle')
      .attr('r', 2.5)
      .attr('fill', d => (d._children ? '#555' : '#999'))
      .attr('stroke-width', 10)
      .attr('title', d => dayjs(d.data.createdAt).format('l LT'))

    nodeEnter
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', d => (d._children ? -6 : 6))
      .attr('text-anchor', d => (d._children ? 'end' : 'start'))
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')

    // Transition nodes to their new position.
    // eslint-disable-next-line no-unused-vars
    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    // eslint-disable-next-line no-unused-vars
    const nodeExit = node
      .exit()
      .transition(transition)
      .remove()
      .attr('transform', d => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    // Update the links…
    const link = gLink.selectAll('path').data(links, d => d.target.id)

    const diagonal = d3
      .linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .append('path')
      .attr('d', d => {
        const o = { x: source.x0, y: source.y0 }
        return diagonal({ source: o, target: o })
      })

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition).attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .remove()
      .attr('d', d => {
        const o = { x: source.x, y: source.y }
        return diagonal({ source: o, target: o })
      })

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  update(root)

  return svg.node()
}
