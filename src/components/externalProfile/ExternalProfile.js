import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ExternalProfile (props) {

    const [reviews, setReviews] = useState()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(true)

    const id = props.location.pathname.substring(6);

    useEffect(() => {
        axios.get(`/api/profile/${id}`, )
            .then(res => {
                setReviews(res.data)
                setProfile(res.data[0])
                setLoading(false)
        })
    }, [])
    
    console.log('REVIEWS',reviews)
    console.log('PROFILE',profile)
    console.log('ID', id)
    
    if (loading === true) {
        return (
          <div>
            
          </div>
        );
      }

    return (
        <div>
            
        </div>
    )
}

export default ExternalProfile
