import "../styles/homePageLeft.scss";
import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({title, cases, total, isRed, active, ...props}) => {
  return (
        <Card 
            onClick={props.onClick} //Оживляем внешний onClick
            className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} //Если карточка активна то отрисовуем доп стиль
            //Если мы повесили isRed на компонет, то теперь мы можем это проверять и отрисовывать стили
        >
            <CardContent>
                <Typography color="textSecondary" className='infoBox__title'>
                    {title}
                </Typography>
                <h2 className='infoBox__cases'>
                    {cases}
                </h2>
                <Typography color="textSecondary" className='infoBox__total'>
                    {total} - total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox