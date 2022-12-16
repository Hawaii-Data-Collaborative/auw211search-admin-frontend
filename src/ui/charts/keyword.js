import './keyword.scss'

import axios from 'axios'
import dayjs from 'dayjs'
import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { useNotify } from 'react-admin'
import { API_URL } from '../../constants'

const divId = 'keyword-chart'

export function KeywordChart() {
  const notify = useNotify()
  const [data, setData] = useState(null)
  const [range, setRange] = useState('LAST_30_DAYS')

  useEffect(() => {
    setData(null)

    const startMap = {
      LAST_24_HOURS: dayjs().startOf('day').subtract(1, 'day').toJSON(),
      LAST_7_DAYS: dayjs().startOf('day').subtract(7, 'day').toJSON(),
      LAST_30_DAYS: dayjs().startOf('day').subtract(30, 'day').toJSON(),
      LAST_90_DAYS: dayjs().startOf('day').subtract(90, 'day').toJSON()
    }

    const start = startMap[range]

    axios
      .get(API_URL + '/chart/keyword?start=' + start)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        notify(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  useEffect(() => {
    if (data) {
      buildChart(data, '#' + divId)
    }
  }, [data])

  return (
    <div className="KeywordChart">
      <div className="header">
        <div>
          <b>Most popular keyword searches</b>
        </div>
        <div>
          <select value={range} onChange={e => setRange(e.target.value)}>
            <option value="LAST_24_HOURS">Last 24 hours</option>
            <option value="LAST_7_DAYS">Last 7 days</option>
            <option value="LAST_30_DAYS">Last 30 days</option>
            <option value="LAST_90_DAYS">Last 90 days</option>
            {/* <option value="CUSTOM">Custom</option> */}
          </select>
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

function buildChart(data, selector) {
  const X = d3.map(data, d => d.keyword)
  const Y = d3.map(data, d => d.count)

  // const title // given d in data, returns the title text
  const marginTop = 20 // the top margin, in pixels
  const marginRight = 0 // the right margin, in pixels
  const marginBottom = 30 // the bottom margin, in pixels
  const marginLeft = 40 // the left margin, in pixels
  const width = 450 // the outer width of the chart, in pixels
  const height = 220 // the outer height of the chart, in pixels
  const xRange = [marginLeft, width - marginRight] // [left, right]
  const yType = d3.scaleLinear // y-scale type
  const yRange = [height - marginBottom, marginTop] // [bottom, top]
  const xPadding = 0.1 // amount of x-range to reserve to separate bars
  // const yFormat // a format specifier string for the y-axis
  // const yLabel // a label for the y-axis
  const color = '#f16525' // bar fill color
  let xDomain
  let yDomain
  let title

  // Compute default domains, and unique the x-domain.
  if (xDomain === undefined) xDomain = X
  if (yDomain === undefined) yDomain = [0, d3.max(Y)]
  xDomain = new d3.InternSet(xDomain)

  // Omit any data not present in the x-domain.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]))

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding)
  const yScale = yType(yDomain, yRange)
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0)
  const yAxis = d3.axisLeft(yScale).ticks(height / 40)

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100)
    title = i => `${X[i]}\n${formatValue(Y[i])}`
  } else {
    const O = d3.map(data, d => d)
    const T = title
    title = i => T(O[i], i, data)
  }

  const svg = d3
    .select(selector)
    .html('')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxis)
    .call(g => g.select('.domain').remove())
    .call(g =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginLeft - marginRight)
        .attr('stroke-opacity', 0.1)
    )
    .call(g =>
      g.append('text').attr('x', -marginLeft).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start')
    )

  const bar = svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(I)
    .join('rect')
    .attr('x', i => xScale(X[i]))
    .attr('y', i => yScale(Y[i]))
    .attr('height', i => yScale(0) - yScale(Y[i]))
    .attr('width', xScale.bandwidth())

  if (title) bar.append('title').text(title)

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(xAxis)
}
