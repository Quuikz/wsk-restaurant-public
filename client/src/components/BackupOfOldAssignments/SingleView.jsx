// SingleView.jsx
const SingleView = (props) => {
    
    const stylebtn = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '20px',
    cursor: 'pointer',
  }




  const {item, setSelectedItem} = props;

  if(!item){
        return null;
    }
  return (
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
    
      <dialog open={Boolean(item)}>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.username}</p>
            <button style={stylebtn} onClick={() => setSelectedItem(null)}>Close</button>

            {item.media_type.startsWith('image') ? 
            (
                <img src={item.filename} alt={item.title} style={{ width: '100%' }} />
            ) : 
            (
                <video src={item.filename} controls style={{ width: '100%' }} />
            )}


        </div>
      </dialog>
  );
};
export default SingleView;
