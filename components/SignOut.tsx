import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React from 'react';
import { signOut } from 'next-auth/client';

const SignIn: React.FC<{ open; handleClose }> = (props): JSX.Element => {
  const handleSignOut = async (): Promise<void> => {
    await signOut();
    window.location.reload(); // next-auth issue #532 - workaround to reload site after user signs out
  };
  return (
    <Dialog id="sign-out" open={props.open} onClose={props.handleClose}>
      <DialogTitle>Are you sure you want to sign out?</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={props.handleClose}>
          No
        </Button>
        <Button color="secondary" onClick={handleSignOut}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
