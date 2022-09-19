import React from 'react'
import StoryCard from './StoryCard'



const stories = [
    {
        name: 'Stephen Asiedu',
        src: 'https://links.papareact.com/zof',
        profile: 'https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/305983383_439628251518952_5249107730901739523_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGjHn1BmrXQ2_EeTy8od_TPcaWUI1mGENJxpZQjWYYQ0uK6JiM6qJU7Uh3OvqG4FmN4k27f71xkAJax0TsOACiY&_nc_ohc=Gamkr9Kj8MUAX9eL7K1&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&oh=00_AT_5PQH02ePqqnqUDDuv0q9SGAKdnvyNLJRbOcyOVWb5sA&oe=6322CCD5',
    },
    {
        name: 'Elon Musk',
        src: 'https://links.papareact.com/4zn',
        profile: 'https://links.papareact.com/kxk',
    },
    {
        name: 'Jeff Bezos',
        src: 'https://links.papareact.com/k2j',
        profile: 'https://links.papareact.com/f0p',
    },
    {
        name: 'Mark Zuckerberg',
        src: 'https://links.papareact.com/xql',
        profile: 'https://links.papareact.com/snf',
    }, 
    {
        name: 'Bill Gates',
        src: 'https://links.papareact.com/4u4',
        profile: 'https://links.papareact.com/zvy',
    }, 
]

function Stories() {
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
        {stories.map((story) => (
            <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile}/>
        ))}
    </div>
  )
}

export default Stories