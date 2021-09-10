import React from 'react'

import BaseLayout from '../pages/BaseLayout'
import SearchExperience from './SearchExperience';
import SearchExperienceConnector from './SearchExperienceConnector';

export default function SearchPage() {
    return (
        <BaseLayout>
            <SearchExperienceConnector>
                {({ entries, onClickMore, hasNextPage }) => (
                    <SearchExperience entries={entries} onClickMore={onClickMore} showSearchMoreButton={hasNextPage} />
                )}
            </SearchExperienceConnector>
        </BaseLayout>
    )
}