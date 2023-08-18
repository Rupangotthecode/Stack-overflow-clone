import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import './Tags.css'

const Tags = () => {

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
    const isMobile = useMediaQuery({query: '(max-width: 1045px)'})

    const {t} = useTranslation('Tags')

    const tagsList = [{
        id: 1,
        tagName: "javascript",
        tagDesc: t('Tags.0.tagDesc'),
    },{
        id: 2,
        tagName: "python",
        tagDesc: t('Tags.1.tagDesc'),
    },{
        id: 3,
        tagName: "c#",
        tagDesc: t('Tags.2.tagDesc'),
    },{
        id: 4,
        tagName: "java",
        tagDesc: t('Tags.3.tagDesc')
    },{
        id: 5,
        tagName: "php",
        tagDesc: t('Tags.4.tagDesc')
    },{
        id: 6,
        tagName: "html",
        tagDesc: t('Tags.5.tagDesc')
    },{
        id: 7,
        tagName: "android",
        tagDesc: t('Tags.6.tagDesc')
    },{
        id: 8,
        tagName: "css",
        tagDesc:t('Tags.7.tagDesc')
    },{
        id: 9,
        tagName: "Reactjs",
        tagDesc: t('Tags.8.tagDesc')
    },{
        id: 10,
        tagName: "node.js",
        tagDesc: t('Tags.9.tagDesc')
    }] 

    return (
        <>
        {isDesktopOrLaptop && 
            <div className='tags-home-container-1'>
                <LeftSidebar />
                <div className="tags-home-container-2">
                    <h1 className='tags-h1'>Tags</h1>
                    <p className='tags-p'>{t('tag_description_1')}</p>
                    <p className='tags-p'>{t('tag_description_2')}</p>
                    <div className='tags-list-container'>
                        {
                            tagsList.map((tag) => (
                                <TagsList tag={tag} key={tagsList.id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
        {isMobile && 
            <div className='mob-tags-home-container-1'>
                <LeftSidebar />
                <div className="mob-tags-home-container-2">
                    <h1 className='tags-h1'>Tags</h1>
                    <p className='tags-p'>{t('tag_description_1')}</p>
                    <p className='tags-p'>{t('tag_description_2')}</p>
                    <div className='tags-list-container'>
                        {
                            tagsList.map((tag) => (
                                <TagsList tag={tag} key={tagsList.id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Tags
