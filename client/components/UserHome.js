import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
// import { Link} from "react-router-dom";
import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SwipeableTextMobileStepper from "./Carousel";

// import classNames from 'classnames';
const UserHome = (props) => {
  return (
    <div align="center" className = "userHome"> 
      <Typography variant="h3" component="h3" >
        Welcome {props.userName}!
      </Typography>
      <div>
        <br />
        {/* <Link to={`/users/${props.userName}/cabinet`}>Recently made drinks</Link> */}
        <Typography variant="h6" component="h6" >
  <Link href={`/users/${props.userName}/cabinet`} >
  Recently made drinks
  </Link>
</Typography>
      </div>
      <SwipeableTextMobileStepper />
      <Button variant="contained" href="/scan" align="center" className="scanItemsButton" color="57ada0">
        Scan items
      </Button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapState, null)(UserHome);
// export default connect(mapState, null)(withStyles(styles)(UserHome))
/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
