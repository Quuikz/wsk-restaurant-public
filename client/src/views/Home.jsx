import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { useMedia } from '../hooks/apiHooks';

//import {useState} from 'react';

const Home = () => {
     const [selectedItem, setSelectedItem] = useState(
     null,
 );
    
     const {mediaArray} = useMedia();
    
     return (
         <>
             <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
             <table>
                 <tbody>
                     {mediaArray.map((mediaItem) => (
                         <MediaRow
                             key={mediaItem.media_id}
                             item={mediaItem}
                             setSelectedItem={setSelectedItem}
                         />
                     ))}
                 </tbody>
             </table>
         </>
     );
 };


export default Home;