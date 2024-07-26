import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImages } from '../services/apiService'; // Adjust the import path as necessary
import './ImageUpload.css';
import {Button} from "@ui5/webcomponents-react"; // Import the CSS file

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });

    const handleAdd = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFind = async () => {
        if (images.length > 0) {
            try {
                const result = await uploadImages(images);
                console.log('Success:', result);
                alert('Images uploaded successfully!');
            } catch (error) {
                alert('Failed to upload images.');
            }
        } else {
            alert('Please add images before finding.');
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    return (
        <div className={'container-dropzone'}>
            <div
                {...getRootProps({ className: 'dropzone' })}
            >
                <input {...getInputProps()} />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {images.length > 0 ? (
                    <div>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Preview ${index}`}
                                className="imagePreview"
                            />
                        ))}
                    </div>
                ) : (
                    <p>Drag and drop images here, or click to select one</p>
                )}
            </div>
           <div className={'container-upload'}>
               <Button onClick={handleAdd} className="button">Add</Button>
               <Button onClick={handleFind} className="button">Find</Button>
           </div>
        </div>
    );
};

export default ImageUpload;
