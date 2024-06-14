import React from 'react';
import { IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function DataSourceSelector({ onSelect }) {
  return (
    <div className="data-source-icons">
      <IconButton onClick={() => onSelect('s3')}><CloudIcon /></IconButton>
      <IconButton onClick={() => onSelect('azure')}><CloudQueueIcon /></IconButton>
      <IconButton onClick={() => onSelect('gdrive')}><FolderIcon /></IconButton>
      <IconButton onClick={() => onSelect('csv')}><DescriptionIcon /></IconButton>
      <IconButton onClick={() => onSelect('pdf')}><PictureAsPdfIcon /></IconButton>
    </div>
  );
}

export default DataSourceSelector;

