import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

export const MyDropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFileName(acceptedFiles[0].name);
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <p> {fileName}</p>
      ) : (
        <p> Arraste sua imagem para cá ou clique para selecionar</p>
      )}
    </div>
  );
};

export default MyDropzone;
