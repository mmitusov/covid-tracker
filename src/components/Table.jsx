import React from 'react'
import '../styles/HomePageRight.scss'

const Table = ({tableData}) => {
  return (
    <div className='table'>
        <table>
            <tbody>
                {tableData.map(({country, cases}) => (
                    <tr key={country}>
                        <td>{country}</td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table