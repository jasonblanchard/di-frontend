import React from 'react';

import VelocityOverview from '../components/VelocityOverview';

interface Velocity {
  day: Date
  score: number
}

interface VelocityOverviewExperienceProps {
  velocities: Velocity[][]
}

export default function VelocityOverviewExperience({ velocities }: VelocityOverviewExperienceProps) {
  return (
    <>
      <VelocityOverview velocities={velocities} />
    </>
  )
}
