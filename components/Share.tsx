import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Facebook, FileCopy, LinkedIn, Twitter } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { userObject } from './types';

const Share: React.FC<{ open: boolean; handleClose: { (): void }; user: userObject }> = (
  props
): JSX.Element => {
  const textFieldInputRef = useRef(null);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const copyToClipboard = (e): void => {
    textFieldInputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setSnackbarIsOpen(true);
  };

  const handleCloseSnackbar = (
    e: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') return;
    setSnackbarIsOpen(false);
  };

  return (
    <>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <DialogTitle>Share your map</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your map with the world. Anyone with the share link can see the cities you&apos;ve
            added.
          </DialogContentText>

          <Tooltip aria-label="Copy to clipboard" placement="top" title="Copy to clipboard">
            <IconButton onClick={copyToClipboard}>
              <FileCopy />
            </IconButton>
          </Tooltip>
          <Tooltip aria-label="Tweet it" placement="top" title="Tweet it">
            <IconButton
              href={`https://twitter.com/intent/tweet?url=https://city-tracker.vercel.app/user/${props.user.uid}&text=Check out the cities I've visited, want to visit, and my favourites in my world map!`}
              target="_blank"
            >
              <Twitter />
            </IconButton>
          </Tooltip>
          <Tooltip aria-label="Share on Facebook" placement="top" title="Share on Facebook">
            <IconButton
              href={`https://www.facebook.com/sharer/sharer.php?u=https://city-tracker.vercel.app/user/${props.user.uid}`}
              target="_blank"
            >
              <Facebook />
            </IconButton>
          </Tooltip>
          <Tooltip aria-label="Share on LinkedIn" placement="top" title="Share on LinkedIn">
            <IconButton
              href={`https://www.linkedin.com/shareArticle?mini=true&url=https://city-tracker.vercel.app/user/${props.user.uid}&title=&summary=Check out the cities I've visited, want to visit and my favourites in my world map!`}
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          </Tooltip>
          <TextField
            fullWidth
            inputRef={textFieldInputRef}
            margin="dense"
            value={`https://city-tracker.vercel.app/user/${props.user.uid}`}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={3000}
        message="Copied to clipboard!"
        open={snackbarIsOpen}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default Share;
