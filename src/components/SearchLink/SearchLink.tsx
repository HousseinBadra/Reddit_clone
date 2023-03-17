import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import formatDate from '../../utils/date';
import formatNumber from '../../utils/number';
import { Link } from '../../features/feed/feedSlice';

export default function SearchLink(props: Link) {
  const { author, subreddit, createdUtc, title, url, score, numComments, award } = props;

  return (
    <Card style={{ width: '100%' }}>
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
        <Button>
          <TrendingUpIcon />
          {formatNumber(score)}
        </Button>
        <Button>
          <EmojiEventsIcon />
          {formatNumber(award)}
        </Button>
        <Button>
          <ChatBubbleOutlineIcon /> {formatNumber(numComments)}
        </Button>
      </CardActions>
    </Card>
  );
}
