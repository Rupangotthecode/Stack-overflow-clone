import { Box,Heading } from '@chakra-ui/react'
import Moment from 'react-moment';
import React from 'react'

const LoginHistory = (props) => {
    console.log(props.data)
  return (
    <div>
      <div className="history-main-container">
        {props.data.map((obj) =>(
            <Box key={obj._id} borderBottom='2px solid black' width= '100%'>
                <Heading size='md'>Login Date & Time : <Moment format="YYYY/MM/DD, hh:mm:ss">{obj.loginTime}</Moment>
                </Heading>
                <Heading size='sm' fontWeight='normal'>IP Address: {obj.ipAddress}</Heading>
                <Heading size='sm' fontWeight='normal'>Device: {obj.device}</Heading>
            </Box>
            
        ))}
      </div>
    </div>
  )
}

export default LoginHistory
