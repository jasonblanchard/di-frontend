import React from 'react';

import VelocityOvierviewExperience from './VelocityOverviewExperience';

export default { title: 'VelocityOvierviewExperience' };

const velocities = [
  [
    {
      "day": new Date("2020-07-05T00:00:00.000Z"),
      "score": 1
    },
    {
      "day": new Date("2020-07-06T00:00:00.000Z"),
      "score": 2
    },
    {
      "day": new Date("2020-07-07T00:00:00.000Z"),
      "score": 3
    },
    {
      "day": new Date("2020-07-08T00:00:00.000Z"),
      "score": 4
    },
    {
      "day": new Date("2020-07-09T00:00:00.000Z"),
      "score": 5
    },
    {
      "day": new Date("2020-07-10T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-11T00:00:00.000Z"),
      "score": 0
    },
  ],
  [
    {
      "day": new Date("2020-07-12T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-13T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-14T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-15T00:00:00.000Z"),
      "score": 3
    },
    {
      "day": new Date("2020-07-16T00:00:00.000Z"),
      "score": 2
    },
    {
      "day": new Date("2020-07-17T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-18T00:00:00.000Z"),
      "score": 1
    },
  ],
  [
    {
      "day": new Date("2020-07-19T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-20T00:00:00.000Z"),
      "score": 1
    },
    {
      "day": new Date("2020-07-21T00:00:00.000Z"),
      "score": 1
    },
    {
      "day": new Date("2020-07-22T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-23T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-24T00:00:00.000Z"),
      "score": 2
    },
    {
      "day": new Date("2020-07-25T00:00:00.000Z"),
      "score": 5
    },
  ],
  [
    {
      "day": new Date("2020-07-26T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-27T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-28T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-29T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-30T00:00:00.000Z"),
      "score": 0
    },
    {
      "day": new Date("2020-07-31T00:00:00.000Z"),
      "score": 2
    },
    {
      "day": new Date("2020-08-01T00:00:00.000Z"),
      "score": 4
    },
  ]
];

export const base = () => {
  return (
    <VelocityOvierviewExperience velocities={velocities} />
  )
}







