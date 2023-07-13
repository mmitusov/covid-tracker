import { Card, CardContent } from '@mui/material'
import React from 'react'
import Table from './Table'
import LineGraph from './LineGraph'

const HomePageRight = ({tableData}) => {
  return (
    <div>
        <Card>
            <CardContent>
                <h3>Live cases by country</h3>
                <Table tableData={tableData}/>
                <h3>Worldwide new cases</h3>
                <LineGraph caseType={'cases'}/>
                <h3>Worldwide recovered cases</h3>
                <LineGraph caseType={'recovered'}/>
                <h3>Worldwide deaths cases</h3>
                <LineGraph caseType={'deaths'}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default HomePageRight