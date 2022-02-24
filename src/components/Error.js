// ! FILES
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error'>
      <p>There are no Pokemon in these bushes</p>
      <Link className='error-btn' to='/'>
        back home
      </Link>
    </div>
  );
};

export default Error;
