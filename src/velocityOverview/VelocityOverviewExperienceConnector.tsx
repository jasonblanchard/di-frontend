import React, { useEffect, useState } from 'react';

// import groupVelocityByWeek from '../utils/groupVelocityByWeek';
// import getCsrfToken from '../utils/getCsrfToken';

// const velocityOverviewQuery = `
//   {
//     velocityOverview {
//       day
//       score
//     }
//   }
// `

interface VelocityOverviewExperienceConnectorProps {
  children: (arg0: VelocityOverviewConnectorRenderProps) => React.ReactElement;
}

interface Velocity {
  day: Date
  score: number
}

interface VelocityOverviewConnectorRenderProps {
  velocities: Velocity[][]
  isVelocityOverviewLoading: boolean
}

// const csrfToken = getCsrfToken();

export default function VelocityOverviewExperienceConnector({ children }: VelocityOverviewExperienceConnectorProps) {
  const [velocities] = useState<Velocity[][]>([]);
  const [isVelocityOverviewLoading, setIsVelocityOverviewLoading] = useState(false);

  useEffect(() => {
    async function fetchVelocityOverview() {
      setIsVelocityOverviewLoading(true)
      // const { velocityOverview } = await client.request(velocityOverviewQuery);

      // const velocitiesWithDate = velocityOverview.map((velocity: { day: Date, score: number }) => {
      //   return {
      //     day: new Date(velocity.day),
      //     score: velocity.score,
      //   }
      // })

      // setVelocities(groupVelocityByWeek(velocitiesWithDate))
      // setIsVelocityOverviewLoading(false)
    }

    fetchVelocityOverview();
  }, [])

  return children({
    velocities,
    isVelocityOverviewLoading: isVelocityOverviewLoading,
  })
}
