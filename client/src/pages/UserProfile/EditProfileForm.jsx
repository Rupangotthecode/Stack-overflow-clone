import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

const EditProfileForm = ({ currentUser, setSwitch , setHistory}) => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
    const isMobile = useMediaQuery({query: '(max-width: 1045px)'})
    setHistory(false)
    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()
    const {t} = useTranslation('UserProfile')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(tags.length === 0){
            dispatch(updateProfile( currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags }))
        } else{
            dispatch(updateProfile( currentUser?.result?._id, { name, about, tags }))
        }
        setSwitch(false)
        
    }

    return (
        <div>
            {isDesktopOrLaptop && <>
            <h1 className='edit-profile-title'>
            {t('edit_profile1')}
            </h1>
            <h2 className="edit-profile-title-2">
            {t('public_information')}
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>{t('display_name')}</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="about">
                    <h3>{t('about_me')}</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>{t('watched_tags')}</h3>
                    <p>{t('add_tags')}</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
                </label><br />
                <input type="submit" value='Save profile' className='user-submit-btn'/>
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>{t('cancel')}</button>
            </form>
            </>}
            {isMobile && <>
            <h1 className='edit-profile-title'>
            {t('edit_profile1')}
            </h1>
            <h2 className="edit-profile-title-2">
            {t('public_information')}
            </h2>
            <form className="mob-edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>{t('display_name')}</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="about">
                    <h3>{t('about_me')}</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>{t('watched_tags')}</h3>
                    <p>{t('add_tags')}</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
                </label><br />
                <input type="submit" value='Save profile' className='user-submit-btn'/>
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>{t('cancel')}</button>
            </form>
            </>}
        </div>
    )
}

export default EditProfileForm
