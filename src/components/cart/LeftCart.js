import { Container, Typography, Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cart';

const LeftCart = () => {
    const [prodCount, setProdCount] = useState({});
    const { carts } = useContext(CartContext);

    const handleIncreaseCount = (id) => {
        setProdCount((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1,
        }));
    };

    const handleDecreaseCount = (id) => {
        setProdCount((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
        }));
    };

    return (
        <Container
            sx={{
                boxShadow:
                    '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                    padding: '10px',
                    borderBottom: '1px solid grey',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    Shopping Cart
                    <span
                        className="title-shopping"
                        style={{
                            fontSize: '16px',
                        }}
                    >
                        Items selected.
                    </span>
                </Typography>
                <Typography>Price</Typography>
            </Box>
            {
                carts.length > 0 ? 
                carts.map((item) => (
                    <Box
                        key={item._id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid grey',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            <img src={item.Photo} height={200} width={200} alt="Product" />
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '5px',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: '30px',
                                        width: '30px',
                                    }}
                                    onClick={() => handleDecreaseCount(item._id)}
                                >
                                    -
                                </Button>
                                <p>{prodCount[item._id] || 0}</p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: '30px',
                                        width: '30px',
                                    }}
                                    onClick={() => handleIncreaseCount(item._id)}
                                >
                                    +
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    marginTop: '7px',
                                    textAlign: 'left',
                                }}
                            >
                                {item.Description}
                            </Typography>
                            <span style={{ textAlign: 'left' }}>In stock</span>
                            <Typography
                                sx={{
                                    marginTop: '5px',
                                }}
                            >
                                Eligible for shipping
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    gap: '5px',
                                    paddingTop: '10px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        cursor: 'pointer',
                                        fontSize: '10px',
                                        borderLeft: '1px solid grey',
                                        padding: '8px',
                                        color: '#76C9F3',
                                    }}
                                >
                                    Share
                                </Typography>
                                <Typography
                                    sx={{
                                        cursor: 'pointer',
                                        borderLeft: '1px solid grey',
                                        padding: '8px',
                                        color: '#76C9F3',
                                        fontSize: '10px',
                                    }}
                                >
                                    Delete
                                </Typography>
                                <Typography
                                    sx={{
                                        cursor: 'pointer',
                                        borderLeft: '1px solid grey',
                                        padding: '8px',
                                        color: '#76C9F3',
                                        fontSize: '10px',
                                    }}
                                >
                                    Save for later
                                </Typography>
                                <Typography
                                    sx={{
                                        cursor: 'pointer',
                                        borderLeft: '1px solid grey',
                                        padding: '8px',
                                        color: '#76C9F3',
                                        fontSize: '10px',
                                    }}
                                >
                                    See more like this
                                </Typography>
                            </Box>
                        </Box>
                        <Typography>{item.Price}</Typography>
                    </Box>
                )) : (
                    <Typography>Nothing to display</Typography>
                )
            }
        </Container>
    );
};

export default LeftCart;
