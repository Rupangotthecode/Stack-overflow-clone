import React from 'react'

import { useTranslation } from 'react-i18next'

const ProfileBio = ({currentProfile}) => {
    const {t} = useTranslation('UserProfile')
    return (
        <div>
            <div>
                {
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>{t('tags_watched')}</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>{t('no_tags_watched')}</p>
                    )
                }
            </div>
                
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>{t('about')}</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>{t('no_bio_found')}</p>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileBio
