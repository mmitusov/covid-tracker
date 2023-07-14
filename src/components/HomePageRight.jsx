import '../styles/homePageRight.scss'
import { Card, CardContent } from '@mui/material'
import React from 'react'
import Table from './Table'
import LineGraph from './LineGraph'

const HomePageRight = ({tableData, casesType}) => {
  return (
    <div>
        <Card className='rightSide'>
            <CardContent className='rightSide__card'>
              <div className='rightSide__table'>
                  <h3>Live cases by country</h3>
                  <Table tableData={tableData}/>
              </div>
              <div className='rightSide__lineGraph'>
                  <h3>Worldwide new {casesType}</h3>
                  <LineGraph casesType={casesType}/>
              </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default HomePageRight