import React from 'react'
import { useSelector } from 'react-redux'
import SimpleSpinner from '../Loader/SimpleSpinner';
import Tweet from './../Tweet/Tweet';

export default function Mentions() {
    const notifications = useSelector(state => state.notifications.mentionsNotifications);
    const fetching = useSelector((state) => state.notifications.fetchingMentionNotifications);
    const fetchError = useSelector(state => state.notifications.mentionsFetchError)
  return (
    <div className='mentions-notifications'>
        {fetching && <SimpleSpinner topCenter/>}
        {notifications && notifications.map(e => <Tweet tweet={e.data.tweet} key={e._id} className='mention-tweet'/>)}
        {fetchError && <p className='error-text'>{fetchError}</p>}
    </div>
  )
}
