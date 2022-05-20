import React, { useState } from 'react'
import styles from './searchImage.module.css'
import { TextField, Button, Typography } from '@material-ui/core'
import axios from 'axios'

const SearchImage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [images, setImages] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchValue)
        makeRequest(searchValue)
    }

    const makeRequest = (searchValue) => {
        axios.get(`https://pixabay.com/api/?key=24457698-ba66d2e34c606df2a11a45e77&q=${searchValue}&image_type=photo&pretty=true`)
        .then(res => {
            console.log(res.data)
            setImages(res.data.hits)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className={styles.container}>
                <Typography  variant="h4">Search An Image</Typography>
                <form onSubmit={(e) => handleSearch(e)}>
                    <TextField variant="outlined" label="Search" fullWidth className={styles.searchInput}
                    style={{margin: '10px 0'}} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue} />
                    <Button variant="contained" color="primary" size="large" type="submit" fullWidth onClick={() => window.scrollBy(0, 200)}>SEARCH</Button>
                </form>
            </div>
            {/* 2nd part */}
            {
                images.length === 0 ? ''
                :
                <div className={styles.imageContainer}>
                <Typography variant="h4" className={styles.heading}>Search For <Typography variant="h3" color="primary" component="span">{searchValue}</Typography></Typography>
                <Typography variant="h6" className={styles.heading2}>( Right Click On Your Favorite Image To Save )</Typography>
                <div className={styles.imageC}>
                {
                    images.map((image) => (
                        <img src={image.largeImageURL} alt={image.id} />
                    ))
                }
                </div>
            </div>
            }
        </div>
    )
}

export default SearchImage

// https://pixabay.com/api/?key=24457698-ba66d2e34c606df2a11a45e77&q=animal&image_type=photo&pretty=true
// https://pixabay.com/api/docs/#api_search_images
// 24457698-ba66d2e34c606df2a11a45e77