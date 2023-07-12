import { Card, CardContent } from '@mui/material'
import React from 'react'
import Table from './Table'

const HomePageRight = ({tableData}) => {
  return (
    <div>
        <Card>
            <CardContent>
                <h3>Live cases by country</h3>
                <Table tableData={tableData}/>
                <h3>Worldwide new cases</h3>
            </CardContent>
        </Card>
    </div>
  )
}

export default HomePageRight