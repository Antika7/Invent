import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImages } from '../services/apiService'; // Adjust the import path as necessary

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
        <div>
            <div
                {...getRootProps({ className: 'dropzone' })}
                style={{
                    border: '2px dashed #cccccc',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '10px',
                }}
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
                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', margin: '5px' }}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Drag and drop images here, or click to select one</p>
                )}
            </div>
            <button onClick={handleAdd} style={{ marginRight: '10px' }}>
                Add
            </button>
            <button onClick={handleFind}>Find</button>
        </div>
    );
};

export default ImageUpload;
