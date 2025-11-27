// src/components/MediaRow.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router';


const MediaRow = ({ item }) => {
  //const {item} = props;
  return (
    // TODO: move <tr> element in foreach from Home.jsx here
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>

      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>

      <td>
        <Link to='/single' state={{ item }}>Open</Link>
      </td>

    </tr>
  );
};

export default MediaRow;
