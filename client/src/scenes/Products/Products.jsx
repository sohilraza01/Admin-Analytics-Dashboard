import {Box, Card,CardActions, Rating,  CardContent, Collapse, Button, Typography,  useTheme, useMediaQuery, } from '@mui/material'
import { useState } from 'react';
import { useGetProductsQuery } from '../../state/api';
import Header from '../../components/Header';
const Products = () => {
    const Product = ({
        _id,
        name,
        description,
        price,
        rating,
        category,
        supply,
        stat
    }) =>{
        const theme = useTheme();
        const [isExpanded, setIsExpanded] = useState(false);

        return(
            <Card sx={{
                backgroundColor:theme.palette.background.alt,
                background:'none',
                borderRadius:'0.55rem',
            }}>
            <CardContent>
                <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb:'1.5rem'}} color={theme.palette.secondary[400]}>
                ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly/>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>
                <CardActions>
                    <Button
                    variant='primary'
                    size='small'
                    onClick={()=> setIsExpanded(!isExpanded)}
                    >
                    See More
                    </Button>
                </CardActions>
                <Collapse
                in={isExpanded}
                timeout='auto'
                unmountOnExit
                sx={{
                    color:theme.palette.neutral[300]
                }}
                >
                <CardContent>
                <Typography>id:{_id}</Typography>
                <Typography>Supply Left:{supply}</Typography>
                <Typography>Yearly Sales This Year:{stat.yearlySalesTotal}</Typography>
                <Typography>Yearly Units Sold This Year:{stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
                </Collapse>
            </Card>
        )
    }
    const {data,isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    console.log('data :',data);
    return (  
        <Box m="1.5rem 2.5rem">
            <Header title='Products' subTitle='See your list of products.' />
            {data || !isLoading ?<Box mt='20px' display='grid' gridTemplateColumns='repeat(4,minmax(0,1fr))' justifyContent='space-between' rowGap='20px' columnGap='1.33%'
            sx={{
                "& > div":{gridColumn: isNonMobile ? undefined : 'span 4'}
            }}
            >
            {data.map(({
            _id,
            name,
            description,
            price,
            category,
            supply,
            stat
        }) => (
            <Product
            key={_id}
            _id={ _id}
            name={ name}
            description={  description}
            price={    price}
            category={   category}
            supply={ supply}
            stat={stat}/>
        ))}
            </Box>:<>Loading...</>}
        </Box>
    );
}
 
export default Products;