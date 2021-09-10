import React from 'react';
import styled from '@emotion/styled';

const scoreToColor = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
  '#154825',
]

interface Velocity {
  day: Date
  score: number
}

interface VelocityOverviewProps {
  velocities: Velocity[][]
}

const Label = styled.text`
  font-size: 9px;
  fill: #767676;
`

export default function VelocityOverview({ velocities }: VelocityOverviewProps) {
  return (
    <div>
      <svg width="722" height="112">
        <g transform="translate(10, 20)">
          {velocities.map((week, index) => <Week velocities={week} xoffset={index} />)}
          <Label text-anchor="start" dx="-10" dy="22">Mon</Label>
          <Label text-anchor="start" dx="-10" dy="48">Wed</Label>
          <Label text-anchor="start" dx="-10" dy="73">Fri</Label>
        </g>
      </svg>
    </div>
  )
}

interface WeekProps {
  velocities: Velocity[]
  xoffset: number
}

function Week({ velocities, xoffset }: WeekProps) {
  return (
    <g transform={`translate(${xoffset * 14}, 0)`}>
      {velocities.map((day, index) => <Day velocity={day} yoffset={index} xoffset={xoffset} />)}
    </g>
  )
}

interface DayProps {
  velocity: Velocity
  yoffset: number
  xoffset: number
}

function Day({ velocity, yoffset, xoffset }: DayProps) {
  return (
    <rect height="10" width="10" x={xoffset + 14} y={yoffset * 13} fill={scoreToColor[velocity.score]} />
  )
}
