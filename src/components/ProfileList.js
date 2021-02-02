import React, { useState, useEffect } from 'react'
import { Row, Spin, Pagination, Col, message } from 'antd'
import axios from 'axios'

import ProfileCard from './ProfileCard'
import Filter from './Filter'

const ProfileList = () => {
    const [record, loadRecord] = useState([])
    const [dProfiles, updateProfiles] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const profileRange = 20

    const url = "https://api.enye.tech/v1/challenge/records"
    
    
    // Changes pages to show other profile with a maximum of 20 profiles per page
    const changePage = (record, page=1) =>{
        const endPoint =  profileRange * page - 1
        const startPoint = endPoint -  profileRange + 1
        const { profiles } = record.records;
        
        if (endPoint > record.size){
            updateProfiles(profiles.slice(startPoint))
        }
        else{
            updateProfiles(profiles.slice(startPoint, endPoint + 1))
        }
    }


    const filterProfiles = (list, filterParameter) =>{
        const { profiles } = record.records
        list.length ? updateProfiles(profiles.filter(profile => list.includes(profile[filterParameter]))) :
        updateProfiles(profiles)
    }


    useEffect(() => {
        const getProfiles = url =>{
            setLoading(true)
            message.info("Loading profiles")
            axios.get(url)
            .then( res =>{
                const records = res.data;
                setLoading(false)
                message.success("Done!")
                loadRecord(records)
                changePage(records)
            })
            .catch(err =>{
                setLoading(false)
                setError("Error loading profiles")
                message.error("Error loading profiles")
            })
        }
        getProfiles(url);
    }, [])

    const handlePageChange = p =>{
        changePage(record, p);
    }
 
    
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
                isLoading ? <Spin size="large" />
                : !error ?
                <>
                <Col span={24}>
                    <Row justify="space-between" style={{ marginBottom: "1.3rem" }}>
                        <Filter filterProfiles={filterProfiles}/>
                        <Pagination
                            simple
                            defaultCurrent={1} 
                            pageSize={20} 
                            total={record.size} 
                            showSizeChanger={false}
                            onChange={handlePageChange}
                        />
                    </Row>
                </Col>
                {
                    dProfiles.map((profile, index) => (
                        <Col xs={24} sm={12} md={8} key={index} style={{ marginBottom: "1.3rem" }}>
                            <ProfileCard profile={profile}/>
                        </Col>
                    ))
                }
                </>
                :
                <p className="text-center">{error}</p>
            }
            
        </Row>
    )
}


export default ProfileList;