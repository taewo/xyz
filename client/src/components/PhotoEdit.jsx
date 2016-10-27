import React from 'react';
import { fabric, freeDrawingBrush, Canvas, Image, isDrawingMode, clipTo } from 'fabric';
import $ from 'jquery'

class PhotoEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewURL: ''
		};
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

// preventDefault : 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드
	_handleSubmit(e) {
		e.preventDefault();
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewURL: reader.result
			});
		}
// readAsDataURL : 컨텐츠를 특정 Blob 이나 File에서 읽어 오는 메서드
		reader.readAsDataURL(file)
	}


	
	_handlePhoto() {
		const canvas = document.getElementById('c');
		const ctx = canvas.getContext('2d');
		const img = document.createElement('IMG');

		img.onload = function() {
			const OwnCanv = new fabric.Canvas('c', {
				isDrawingMode: true
			});

			const imgInstance = new fabric.Image(img, {
				left: 0,
				top: 0
			});
			OwnCanv.add(imgInstance);

			OwnCanv.freeDrawingBrush.color = "purple"
			OwnCanv.freeDrawingBrush.width = 4

			OwnCanv.on('path:created', function(option) {
				const path = option.path;
				OwnCanv.isDrawingMode = false;
				OwnCanv.remove(imgInstance);
				OwnCanv.remove(path);
				OwnCanv.clipTo = function(ctx) {
					path.render(ctx);
				};
				OwnCanv.add(imgInstance);
			});
		}

	img.src = "http://upload.wikimedia.org/wikipedia/commons/3/33/Jbassette4.jpg?uselang=fi";
	}
	

//{$imagePreview}

	render() {
		let {imagePreviewURL} = this.state;
		// let $imagePreview = null;
		// if(imagePreviewURL) {
		// 	$imagePreview = (<img src={imagePreviewURL} />);
		// }

		return (
			<div>
			    <form onSubmit={this._handleSubmit}>
					<input type="file" accept="image/*" capture="camera" onChange={this._handleImageChange} />
					<button type="submit" onClick={this._handlePhoto}>edit</button>
				</form>
				<canvas id="c" width="500" height="500"></canvas>
				
			</div>
			)
	}
}



module.exports = PhotoEdit;