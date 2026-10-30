import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Typography, FormControlLabel, Switch, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Alert, AlertTitle,
} from '@mui/material';

const baseUrl = `https://6adff4c48e42963c8d5e85ec.mockapi.io/player`;

function Add() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      nation: "",
      club: "",
      cost: 0,
      clip: "",
      description: "",
      img: "",
      top: false
    },
    onSubmit: (values) => {
      fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`)
        }
        return response.json()
      })
        .then(() => setOpen(true))
        .catch(error => console.log(error.message));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      nation: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      club: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      cost: Yup.number().integer().typeError("Please type a number."),
      description: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      clip: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      img: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
    }),
  });

  return (
    <>
      <Typography variant="h6">Add a new player</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
        <TextField
          margin="dense"
          name="club"
          label="Club"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.club}
          onChange={formik.handleChange}
        />
        {formik.errors.club && (<Typography variant="caption" color="red">{formik.errors.club}</Typography>)}
        <TextField
          margin="dense"
          name="nation"
          label="Nation"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.nation}
          onChange={formik.handleChange}
        />
        {formik.errors.nation && (<Typography variant="caption" color="red">{formik.errors.nation}</Typography>)}
        <TextField
          margin="dense"
          name="img"
          label="URL of image"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.img}
          onChange={formik.handleChange}
        />
        {formik.errors.img && (<Typography variant="caption" color="red">{formik.errors.img}</Typography>)}
        <TextField
          margin="dense"
          name="cost"
          label="Market value"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.cost}
          onChange={formik.handleChange}
        />
        {formik.errors.cost && (<Typography variant="caption" color="red">{formik.errors.cost}</Typography>)}
        <TextField
          margin="dense"
          name="clip"
          label="Intro video"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.clip}
          onChange={formik.handleChange}
        />
        {formik.errors.clip && (<Typography variant="caption" color="red">{formik.errors.clip}</Typography>)}
        <TextField
          multiline
          rows={2}
          margin="dense"
          name="description"
          label="Information"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description && (<Typography variant="caption" color="red" display="block">{formik.errors.description}</Typography>)}
        <FormControlLabel control={<Switch />}
          label="Top players" name='agree'
        />
        <br />
        <Button variant="contained" size="small" type='submit'>Add</Button>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Congraturation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Adding successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Add
