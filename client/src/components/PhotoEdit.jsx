import React from 'react';
import { fabric, freeDrawingBrush, Canvas, Image, isDrawingMode, clipTo } from 'fabric';
import loadImage from 'blueimp-load-image-npm'


class PhotoEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewURL: ''
		};
		this._handleImageChange = this._handleImageChange.bind(this)
		this._handleSubmit = this._handleSubmit.bind(this)
		this._handlePhoto = this._handlePhoto.bind(this)
		this._handleCrop = this._handleCrop.bind(this)
	}

// preventDefault : 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드
	_handleSubmit(e) {
		e.preventDefault()
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader()
		let file = e.target.files[0]

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewURL: reader.result
			});
		}
// readAsDataURL : 컨텐츠를 특정 Blob 이나 File에서 읽어 오는 메서드
		reader.readAsDataURL(file)
	}
	_handlePhoto(e) {

		//const selectFile = document.getElementById('photo').files[0]
		const file = this.state.file
		const img = document.createElement('IMG');
		const reader = new FileReader()
		const canvas = document.getElementById('c')

		const thisImage = this.state
		const thisImageURL = this.state.imagePreviewURL
		console.log('CHECK1')

		
		reader.onloadend = function() {
			console.log('CHECK2')
			img.onload = function() {
				//console.log('hahaha2')
		    	const options = {
		    		canvas: true,
		    		maxWidth: 600
		    	}
		    	//console.log('hahaha3')
		    	const currentfile = file
		    	//console.log('hahaha4')
		    	loadImage.parseMetaData(currentfile, function (data) {
		    		      //console.log(data.exif[0x0112]);
		    		      //console.log(data.exif.get('Orientation'))
		    		      options.orientation = data.exif.get('Orientation')
		    		      //const orientation = data.exif.get('Orientation')
		    		      //console.log(orientation)
		    		      //console.log(option.orientation)
		    		  }
		    	    )
		    	loadImage (
		    		currentfile,
		    		(img) => {
		    		    document.getElementById('c')
		    		}, 
		    		options
		    		)
			    }
			    
			    img.src = thisImageURL

			    

			}
			reader.readAsDataURL(file)

	}

	_handleCrop() {

		const canvas = document.getElementById('c');
		const ctx = canvas.getContext('2d');
		const img = document.createElement('IMG');

		const base64data = canvas.toDataURL("image/jpeg")
		console.log(base64data)
		const img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '')
		console.log(img_src)

		console.log(this.state.imagePreviewURL)

		
		img.onload = function() {
			const OwnCanv = new fabric.Canvas('c', {
				isDrawingMode: true
			});

			
			canvas.width = img.width;
		    canvas.height = img.height;

			const imgInstance = new fabric.Image(img, {
				async: false,
				left: 0,
				top: 0,
				lockMovementX: true,
				lockMovementY: true
			});
			OwnCanv.add(imgInstance);


			OwnCanv.freeDrawingBrush.color = "purple"
			OwnCanv.freeDrawingBrush.width = 5

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

// // input에 올라간 파일의 URL을 만들어서 src에 설정
    img.src = base64data

	}

	render() {

		
		return (
			<div>
			    <input type='file' accept='image/*' capture id ='inputFile' onChange={this._handleImageChange} />
			    <button id='load' onClick={this._handlePhoto}>Load</button>
			    <button id='edit' onClick={this._handleCrop}>Edit</button>
			    <canvas id='c'></canvas>

			    
			</div>
			)
	}
}



module.exports = PhotoEdit;