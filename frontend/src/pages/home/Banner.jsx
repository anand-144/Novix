import React from 'react'
import BannerImage from '../../assets/Banner.png' // Assuming you have an image in this path

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-8 justify-between items-center gap-12  px-6 md:px-12'>

            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={BannerImage} alt="" />
            </div>

            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
                <p className='mb-10'>Discover the latest page-turners and timeless classics at our bookstore. From gripping thrillers to heartwarming tales, find your next favorite read. Explore new releases every week and dive into captivating stories. Start your literary adventure today!</p>

                <button className='btn-primary'>Subscribe</button>
            </div>

        </div>
    )
}

export default Banner