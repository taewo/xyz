import React from 'react';

class Camera extends React.Component {
	render() {
		return (
			<div>
			<form action="server.cgi" method="post" enctype="multipart/form-data">
  				<input type="file" name="image" accept="image/*" capture/>
  				<input type="submit" value="Upload"/>
			</form>
		</div>
			)
	}
}

module.exports = Camera;