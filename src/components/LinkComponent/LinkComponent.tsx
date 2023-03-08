import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useDispatch } from 'react-redux';
import formatDate from '../../utils/date';
import { AppDispatch } from '../../store';
import { Link, SaveLink, UnSaveLink, VoteLink } from '../../features/feed/feedSlice';

export default function LinkComponent(props: Link) {
  const { author, subreddit, createdUtc, title, url, saved, likes, name, score, numComments } =
    props;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{author.toUpperCase()[0]}</Avatar>}
        title={`posted by user /u${author} at /r/${subreddit}`}
        subheader={formatDate(createdUtc)}
      />
      <CardContent>
        <a
          target="_blank"
          rel="noreferrer"
          href={url}
          style={{
            textAlign: 'center',
            maxWidth: '30ch',
            display: 'block',
            margin: '0 auto',
            textDecoration: 'none',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </a>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <TrendingUpIcon />
          {score}
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(VoteLink({ name, dir: likes ? 0 : 1 }));
          }}
        >
          <FileUploadIcon style={{ color: likes ? 'orange' : 'black' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(VoteLink({ name, dir: likes === false ? 0 : -1 }));
          }}
        >
          <FileDownloadIcon style={{ color: likes === false ? 'blue' : 'black' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            if (saved) {
              dispatch(UnSaveLink({ name }));
              return;
            }
            dispatch(SaveLink({ name }));
          }}
        >
          <LibraryAddIcon style={{ color: saved ? 'green' : 'black' }} />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon /> {numComments}
        </IconButton>
      </CardActions>
    </Card>
  );
}
