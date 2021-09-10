import React from 'react';

import VelocityOverviewExperienceConnector from '../velocityOverview/VelocityOverviewExperienceConnector';
import BaseLayout from './BaseLayout';
import VelocityOverviewExperience from '../velocityOverview/VelocityOverviewExperience';

export default function InsightsPage() {
  return (
    <BaseLayout>
      <h2>Insights</h2>
      <div>
        <h3>Velocity</h3>
        <VelocityOverviewExperienceConnector>
          {({ isVelocityOverviewLoading, velocities }) => {
            return (
              isVelocityOverviewLoading ? <div>"Loading..."</div> : <VelocityOverviewExperience velocities={velocities} />
            );
          }}
        </VelocityOverviewExperienceConnector>
      </div>
    </BaseLayout>
  );
}
