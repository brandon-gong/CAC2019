import { withNavigationFocus } from 'react-navigation';
import CameraView from './CameraView';
import React from 'react';

// Very high lag?

class CameraWrapper extends React.Component {

    state = {
        visible: false,
    }

    componentDidMount() {
		setTimeout(() => {
			this.setState({
				visible: true
			});
		}, 100); // Delay 300 ms
    }
    
    render() {
        return (this.props.isFocused && this.state.visible) ? < CameraView /> : null;
    }
}

export default withNavigationFocus(CameraWrapper);
